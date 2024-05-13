import { useRef, useMemo } from "react";
import { pick } from "lodash-es";
import { type TreeSelectSingleProps } from "./typing";

import { SelectCollect } from "./select-collect";
import { defaultFn } from "@/utils";
import { SelectCollectContext } from "./context";

const PickColumns = ["id", "isChecked", "value", "descendantsIds", "parentId"];

export const TreeSelectSingle = <ValueType,>(
  props: TreeSelectSingleProps<ValueType>
) => {
  const { children, instance } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());
  useMemo(() => {
    if (instance) {
      instance.getAllItem = () => {
        return collect
          .getAllItem()
          ?.map(([key, item]) => [key, pick(item, PickColumns)]);
      };
      instance.getItems = (ids) => {
        let result = [];
        ids.forEach((i) => {
          const item = collect.getItem(i);
          if (item) {
            result.push([item.id, pick(item, PickColumns)]);
          }
        });
        return result;
      };

      instance.getDescendantsIdsList = (id) => {
        const descendantsIds = collect.getItem(id).descendantsIds;
        const list = (ids, result = []) => {
          const items = instance.getItems(ids?.map((i) => i.id));
          items.forEach(([id, item]) => {
            result.push(id);
            if (item.descendantsIds) {
              list(item.descendantsIds, result);
            }
          });
          return result;
        };
        return list(descendantsIds);
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
        return pick(collect.getItem(id), PickColumns);
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

export const useTreeSelectSingleInstance = <ValueType,>() => {
  return useRef({
    trigger: defaultFn,
    getAllItem: defaultFn,
    getItems: defaultFn,
    getDescendantsIdsList:defaultFn,
  }).current as unknown as TreeSelectSingleProps<ValueType>["instance"];
};
