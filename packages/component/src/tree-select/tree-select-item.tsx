import { useContext, useEffect, useMemo, useState } from "react";
import { type TreeSelectItemProps } from "./typing";
import { SelectCollectContext } from "./context";

export const TreeSelectItem = <Value,>(props: TreeSelectItemProps<Value>) => {
  const {
    id,
    value,
    render,
    allowRepeatChecked = false,
    children,
    parentId,
  } = props;
  const collect = useContext(SelectCollectContext);

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
        children,
        refresh() {
          update({});
        },
      });
      return {
        id,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        value,
        allowRepeatChecked,
      });
    } else {
      collect.updateItemPartialColumn(memoInfo.id, {
        value,
        allowRepeatChecked,
      });
    }
  }, [id, memoInfo, collect, value, allowRepeatChecked]);

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(id);
    };
  }, [collect, id]);

  const item = collect.getItem(id);
  return render({
    id,
    value: item.value,
    isChecked: !!item.isChecked,
    children: item.children,
  });
};
