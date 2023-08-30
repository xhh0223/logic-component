import React, { useContext, useEffect, useState } from "react";
import { IContext, Id } from "./typing";
import { SelectContext } from "./context";

export interface SelectItemProps<Value> {
  id: Id
  value: Value;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const SelectItem = <Value,>(props: SelectItemProps<Value>) => {
  const { value, children, id } = props;
  const [_, refresh] = useState({});
  const { addSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext) as IContext<Value>;
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

  return typeof children === "function"
    ? children({
      isChecked: !!getSelectItem(id)?.isChecked,
    })
    : children;
};