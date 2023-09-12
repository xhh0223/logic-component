import React, { useContext, useEffect, useState } from "react";
import { IContext, Id } from "./typing";
import { SelectContext } from "./context";

export interface SelectItemProps<ValueType> {
  id: Id
  value: ValueType;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const SelectItem = <ValueType,>(props: SelectItemProps<ValueType>) => {
  const { value, children, id } = props;
  const [_, refresh] = useState({});
  const { addSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext) as IContext<ValueType>;
  useEffect(() => {
    addSelectItem(id, {
      id,
      value,
      isChecked: false,
      refreshHandler: () => {
        refresh({});
      },
    });
    return () => {
      deleteSelectItem(id);
    };
  }, [value]);

  return <>
    {typeof children === "function"
      ? children({
        isChecked: !!getSelectItem(id)?.isChecked,
      })
      : children}
  </>
};