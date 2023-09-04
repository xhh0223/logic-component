import React, { useContext, useEffect, useState } from 'react'
import { IContext } from './typing';
import { Id } from './typing';
import { SelectContext } from './context';

export interface TreeSelectItemProps<ValueType> {
  id: Id
  parentId: Id
  value: ValueType;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const TreeSelectItem = <ValueType,>(props: TreeSelectItemProps<ValueType>) => {
  const { value, children, id, parentId } = props;
  const [_, refresh] = useState({});
  const { addSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext) as IContext<ValueType>;
  useEffect(() => {
    addSelectItem(id, {
      id,
      value,
      parentId,
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
}
