import React, { useContext, useEffect, useState } from 'react'
import { Id } from './typing';
import { SelectContext } from './context';

export interface TreeSelectItemProps<ValueType> {
  id: Id
  parentId: Id
  value: ValueType;
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const TreeSelectItem = <ValueType,>(props: TreeSelectItemProps<ValueType>) => {
  const { value, children, id, parentId, repeatTriggerUnselected } = props;
  const [_, refresh] = useState({});
  const { setSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext)

  useEffect(() => {
    const selectItem = getSelectItem(id)
    if (!selectItem) {
      setSelectItem(id, {
        id,
        value,
        parentId,
        isChecked: false,
        refreshHandler: () => {
          refresh({});
        },
      });
    }
    return () => {
      if (selectItem) {
        deleteSelectItem(id);
      }
    };
  }, [id]);

  useEffect(() => {
    const item = getSelectItem(id)
    if (item) {
      item.value = value
      item.parentId = parentId
      item.repeatTriggerUnselected = repeatTriggerUnselected
    }
  }, [value, parentId, repeatTriggerUnselected])

  return <>{typeof children === "function"
    ? children({
      isChecked: !!getSelectItem(id)?.isChecked,
    })
    : children}
  </>
}
