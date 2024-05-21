import { useContext, useEffect, useMemo, useState } from "react";
import { type TreeSelectSingleItemProps } from "./typing";
import { TreeSelectSingleCollectContext } from "./context";

export const TreeSelectSingleItem = <Value = any,>(
  props: TreeSelectSingleItemProps<Value>
) => {
  const {
    id,
    value,
    render,
    allowRepeatChecked = false,
    childrenIds,
    parentId,
  } = props;
  const { collect, handler } = useContext(TreeSelectSingleCollectContext);

  /** 记录第一次初始化的值 */
  const memoInfo = useMemo(
    () => {
      /** 新增 */
      collect.addItem({
        parentId,
        id,
        value,
        isChecked: false,
        allowRepeatChecked,
        childrenIds,
        refresh() {
          update({});
        },
      });
      return {
        id,
      };
    },
    []
  );

  const [, update] = useState({});

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      const beforeItem = collect.getItem(memoInfo.id);
      collect.delItem(memoInfo.id);
      memoInfo.id = id;
      collect.addItem({
        ...beforeItem,
        id,
        parentId,
        childrenIds,
        value,
        allowRepeatChecked,
      });
    } else {
      collect.updateItemPartialColumn(memoInfo.id, {
        parentId,
        childrenIds,
        value,
        allowRepeatChecked,
      });
    }
  }, [
    id,
    memoInfo,
    collect,
    value,
    allowRepeatChecked,
    parentId,
    childrenIds,
  ]);

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(id);
    };
  }, [collect, id]);

  const item = collect.getItem(id);
  return render({
    handler,
    id,
    value: item.value,
    isChecked: !!item.isChecked,
    childrenIds: item.childrenIds,
    parentId: item.parentId,
  });
};
