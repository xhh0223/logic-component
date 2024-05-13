import React, { useRef, useMemo } from "react";
import { type SelectMultipleProps } from "./typing";

import { SelectCollect } from "./select-collect";
import { defaultFn } from "@/utils";
import { SelectCollectContext } from "./context";
import { pick } from "lodash-es";
import { Id } from "@/typing";

const PickColumns = ["id", "isChecked", "value"];
export const SelectMultiple = <ValueType,>(
  props: SelectMultipleProps<ValueType>
) => {
  const { children, instance } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());
  useMemo(() => {
    if (instance) {
      instance.getAllItem = () => {
        return collect
          .getAllItem()
          ?.map(([id, item]) => [id, pick(item, PickColumns)]);
      };
      instance.getItems = (ids: Id[]) => {
        const result = [];
        ids.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            result.push([id, pick(item, PickColumns)]);
          }
        });
        return result as any;
      };
      instance.selectAll = () => {
        collect.getAllItem().forEach(([key, item]) => {
          if (!item.isChecked) {
            collect.updateItemPartialColumn(key, { isChecked: true });
            item.refresh();
          }
        });
        return instance.getAllItem();
      };
      instance.trigger = (ids) => {
        const result: any = [];
        ids.forEach((id) => {
          const item = collect.getItem(id);
          if (!item) {
            return;
          }
          /** 允许重复点击一个 */
          if (item.allowRepeatChecked) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true });
              item.refresh();
            }
          } else {
            collect.updateItemPartialColumn(id, {
              isChecked: !item.isChecked,
            });
            item.refresh();
          }
          result.push(pick(item, PickColumns));
        });
        return result;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SelectCollectContext.Provider value={collect}>
      {children}
    </SelectCollectContext.Provider>
  );
};

export const useSelectMultipleInstance = <ValueType,>() => {
  return useRef({
    selectAll: defaultFn,
    trigger: defaultFn,
    getItems: defaultFn,
    getAllItem: defaultFn,
  }).current as unknown as SelectMultipleProps<ValueType>["instance"];
};