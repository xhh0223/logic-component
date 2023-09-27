import React, { useContext, useEffect, useState } from 'react'
import { type Id } from './typing'
import { SelectContext } from './context'
export interface TreeSelectItemProps<ValueType> {
  id: Id
  parentId: Id
  value: ValueType
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode)
}

export const TreeSelectItem = <ValueType,>(props: TreeSelectItemProps<ValueType>) => {
  const { value, children, id, parentId, repeatTriggerUnselected = true } = props
  const [, refresh] = useState({})
  const selectContext = useContext(SelectContext)
  const { setSelectItem, deleteSelectItem, getSelectItem } = selectContext

  useEffect(() => {
    const selectItem = getSelectItem(id)

    if (!selectItem) {
      setSelectItem(id, {
        id,
        value,
        parentId,
        isChecked: false,
        repeatTriggerUnselected,
        refreshHandler: () => {
          refresh({})
        },
      })
    } else {
      selectItem.id = id
      selectItem.parentId = parentId
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
      setSelectItem(id, selectItem)
    }
  }, [value, repeatTriggerUnselected, getSelectItem, id, setSelectItem, deleteSelectItem, parentId, selectContext])

  return <>{typeof children === 'function'
    ? children({
      isChecked: !!getSelectItem(id)?.isChecked
    })
    : children}
  </>
}
