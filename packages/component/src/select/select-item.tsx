import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { type SelectItemProps } from "./typing";
import { SelectCollectContext } from "./context";

export const SelectItem = <Value,>(props: SelectItemProps<Value>) => {
  const { id, value, render, allowRepeatChecked = false } = props;
  const collect = useContext(SelectCollectContext);

  /** todo注意修改的情况 */
  const memoInfo = useRef(props);
  const [, update] = useState({});
  /** 新增 */
  useMemo(() => {
    collect.addItem({
      id: memoInfo.current.id,
      value: memoInfo.current.value,
      isChecked: false,
      allowRepeatChecked: memoInfo.current.allowRepeatChecked,
      refresh() {
        update({});
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.current.id) {
      const beforeItem = collect.getItem(memoInfo.current.id);
      collect.delItem(memoInfo.current.id);
      collect.addItem({
        id,
        ...beforeItem,
      });
    } else {
      collect.updateItemPartialColumn(memoInfo.current.id, {
        value,
        allowRepeatChecked,
      });
    }
  }, [value, collect, id, allowRepeatChecked]);

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(id);
    };
  }, [collect, id]);
  return render({
    id,
    value,
    isChecked: !!collect.getItem(id)?.isChecked,
  });
};
