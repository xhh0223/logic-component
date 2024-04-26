import { useContext, useEffect, useMemo, useState } from "react";
import { type SelectItemProps } from "./typing";
import { SelectCollectContext } from "./context";

export const SelectItem = <Value,>(props: SelectItemProps<Value>) => {
  const { id, value, render, allowRepeatChecked = false } = props;
  const collect = useContext(SelectCollectContext);

  /** 记录第一次初始化的值 */
  const memoInfo = useMemo(
    () => ({
      id,
      value,
      allowRepeatChecked,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [, update] = useState({});

  /** 新增 */
  useMemo(() => {
    collect.addItem({
      id: memoInfo.id,
      value: memoInfo.value,
      isChecked: false,
      allowRepeatChecked: memoInfo.allowRepeatChecked,
      refresh() {
        update({});
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      const beforeItem = collect.getItem(memoInfo.id);
      collect.delItem(memoInfo.id);
      memoInfo.id = id;
      collect.addItem({
        id: memoInfo.id,
        ...beforeItem,
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

  return render({
    id: memoInfo.id,
    value: memoInfo.value,
    isChecked: !!collect.getItem(id)?.isChecked,
  });
};
