import { useRef, useMemo } from "react";
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
      instance.getItems = (ids: Id[]) => {
        const result = [];
        ids.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            result.push(pick(item, PickColumns));
          }
        });
        return result as any;
      };

      instance.select = (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (!item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: true });
            item.refresh();
          }
          result.push(item);
        });
        return result;
      };

      instance.cancelSelected = (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: false });
            item.refresh();
          }
          result.push(item);
        });
        return result;
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
    select: defaultFn,
    cancelSelected: defaultFn,
    trigger: defaultFn,
    getItems: defaultFn,
  }).current as unknown as SelectMultipleProps<ValueType>["instance"];
};
