import React, { useContext, useEffect, useState } from "react";
import { IContext, Id } from "./typing";
import { SelectContext } from "./context";

export interface SelectItemProps<ValueType> {
  id: Id
  value: ValueType;
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const SelectItem = <ValueType,>(props: SelectItemProps<ValueType>) => {
  const { value, children, id, repeatTriggerUnselected = true } = props;
  const [_, refresh] = useState({});
  const { setSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext) as IContext<ValueType>;
  useEffect(() => {
    setSelectItem(id, {
      id,
      value,
      isChecked: false,
      repeatTriggerUnselected,
      refreshHandler: () => {
        refresh({});
      },
    });
    return () => {
      deleteSelectItem(id);
    };
  }, [id]);

  useEffect(() => {
    const item = getSelectItem(id)
    if (item) {
      item.value = value
      item.repeatTriggerUnselected = repeatTriggerUnselected
    }
  }, [value, repeatTriggerUnselected])

  return <>
    {typeof children === "function"
      ? children({
        isChecked: !!getSelectItem(id)?.isChecked,
      })
      : children}
  </>
};