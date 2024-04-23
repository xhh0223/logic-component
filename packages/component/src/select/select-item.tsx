import { useContext, useMemo, useState } from "react";
import { type SelectItemProps } from "./typing";
import { SelectCollectContext } from "./context";

export const SelectItem = <Value,>(props: SelectItemProps<Value>) => {
  const { id, value, render, allowRepeatChecked = false } = props;
  const collect = useContext(SelectCollectContext);

  const [, update] = useState({});

  useMemo(() => {
    collect.addItem({
      id,
      value,
      allowRepeatChecked,
      refresh() {
        update({});
      },
    });
    return () => {
      collect.delItem(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    if (value) {
      collect.updateItemPartialColumn(id, {
        allowRepeatChecked,
        value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.allowRepeatChecked]);

  return render({
    id,
    value,
    isChecked: !!collect.getItem(id)?.isChecked,
  });
};
