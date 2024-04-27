import React, { useRef, useMemo } from "react";
import { type TreeSelectMultipleProps } from "./typing";

import { SelectCollect } from "./select-collect";
import { defaultFn } from "@/utils";
import { SelectCollectContext } from "./context";
import { pick } from "lodash-es";
export const TreeSelectMultiple = <ValueType,>(
  props: TreeSelectMultipleProps<ValueType>
) => {
  const { children, instance } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());
  useMemo(() => {
    if (instance) {
      instance.getAllItem = () => {
        return collect
          .getAllItem()
          ?.map(([key, item]) => [
            key,
            pick(item, ["id", "isChecked", "value"]),
          ]);
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
          result.push({
            id: item.id,
            isChecked: item.isChecked,
            value: item.value,
          });
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

export const useTreeSelectMultipleInstance = <ValueType,>() => {
  return useRef({
    trigger: defaultFn,
    getAllItem: defaultFn,
  }).current as unknown as TreeSelectMultipleProps<ValueType>["instance"];
};
