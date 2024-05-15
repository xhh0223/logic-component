import { useRef, useMemo } from "react";
import { pick } from "lodash-es";
import { type SelectSingleProps } from "../typing";
import { Id } from "@/typing";
import { SelectCollect } from "../select-collect";
import { SelectSingleCollectContext } from "./context";

const PickColumns = ["id", "isChecked", "value"];

export const SelectSingle = <ValueType,>(
  props: SelectSingleProps<ValueType>
) => {
  const { children, handler: outerHandler } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());
  const innerHandler = useMemo(() => {
    const handler: SelectSingleProps<ValueType>["handler"] = {
      getItems: (ids: Id[]) => {
        const result = [];
        ids.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            result.push(pick(item, PickColumns));
          }
        });
        return result as any;
      },
      trigger: (id) => {
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
          collect.getAllItem().forEach((item) => {
            if (item.id !== id && item.isChecked) {
              collect.updateItemPartialColumn(item.id, {
                isChecked: false,
              });
              item.refresh();
            }
          });
        }
        return pick(collect.getItem(id), PickColumns);
      },
    };

    return handler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (outerHandler) {
    Object.assign(outerHandler, innerHandler);
  }

  return (
    <SelectSingleCollectContext.Provider
      value={{ collect, handler: innerHandler }}
    >
      {children}
    </SelectSingleCollectContext.Provider>
  );
};

export const useSelectSingleHandler = <ValueType,>() => {
  return useRef({})
    .current as unknown as SelectSingleProps<ValueType>["handler"];
};
