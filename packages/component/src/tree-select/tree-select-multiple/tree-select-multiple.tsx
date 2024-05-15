import { useRef, useMemo } from "react";
import { type TreeSelectMultipleProps } from "./typing";

import { SelectCollect } from "../select-collect";
import { TreeSelectMultipleCollectContext } from "./context";
import { pick } from "lodash-es";

const PickColumns = ["id", "isChecked", "value", "descendantsIds", "parentId"];

export const TreeSelectMultiple = <ValueType,>(
  props: TreeSelectMultipleProps<ValueType>
) => {
  const { children, handler: outerHandler } = props;
  const { current: collect } = useRef(new SelectCollect<ValueType>());

  const innerHandler = useMemo(() => {
    const handler: TreeSelectMultipleProps<ValueType>["handler"] = {
      getItems: (ids) => {
        let result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            result.push(pick(item, PickColumns));
          }
        });
        return result;
      },
      getAncestorsIdsList: (id) => {
        const getResult = (id, result = []) => {
          const parentId = collect.getItem(id)?.parentId;
          if (parentId) {
            result.push(parentId);
            getResult(parentId);
          }
          return result;
        };

        return getResult(id);
      },
      getDescendantsIdsList: (id) => {
        const descendantsIds = collect.getItem(id)?.descendantsIds ?? [];
        const list = (ids, result = []) => {
          const items = handler.getItems(ids?.map((i) => i.id));
          items.forEach((item) => {
            result.push(item.id);
            if (item.descendantsIds) {
              list(item.descendantsIds, result);
            }
          });
          return result;
        };
        return list(descendantsIds);
      },
      select: (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true });
              item.refresh();
            }
            result.push(pick(item, PickColumns));
          }
        });
        return result;
      },
      cancelSelected: (ids) => {
        const result = [];
        ids?.forEach((id) => {
          const item = collect.getItem(id);
          if (item) {
            if (item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: false });
              item.refresh();
            }
            result.push(pick(item, PickColumns));
          }
        });
        return result;
      },
      trigger: (ids) => {
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
      },
    };
    return handler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (outerHandler) {
    Object.assign(outerHandler, innerHandler);
  }
  return (
    <TreeSelectMultipleCollectContext.Provider
      value={{ collect, handler: innerHandler }}
    >
      {children}
    </TreeSelectMultipleCollectContext.Provider>
  );
};

export const useTreeSelectMultipleHandler = <ValueType,>() => {
  return useRef({}).current as TreeSelectMultipleProps<ValueType>["handler"];
};
