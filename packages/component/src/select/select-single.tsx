import React, { useRef, useMemo } from "react";
import { pick } from "lodash-es";
import { type SelectSingleProps } from "./typing";

import { SelectCollect } from "./select-collect";
import { defaultFn } from "@/utils";
import { SelectCollectContext } from "./context";

export const SelectSingle = <ValueType,>(
  props: SelectSingleProps<ValueType>
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
      instance.trigger = (id) => {
        const item = collect.getItem(id);

        if (!item) {
          return;
        }
        /** 允许重复点击一个 */
        if (item.allowRepeatChecked) {
          if (!item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: true });
            item.refresh();
            collect.getAllItem().forEach(([key, item]) => {
              if (key !== id && item.isChecked) {
                collect.updateItemPartialColumn(key, {
                  isChecked: false,
                });
                item.refresh();
              }
            });
          }
        } else {
          collect.updateItemPartialColumn(id, {
            isChecked: !item.isChecked,
          });
          item.refresh();
          collect.getAllItem().forEach(([key, item]) => {
            if (key !== id && item.isChecked) {
              collect.updateItemPartialColumn(key, {
                isChecked: false,
              });
              item.refresh();
            }
          });
        }
        return pick(collect.getItem(id), ["id", "isChecked", "value"]);
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

export const useSelectSingleInstance = <ValueType,>() => {
  return useRef({
    trigger: defaultFn,
    getAllItem: defaultFn,
  }).current as unknown as SelectSingleProps<ValueType>["instance"];
};
