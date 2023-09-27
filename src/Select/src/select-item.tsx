import React, { useContext, useEffect, useState } from 'react'
import { type IContext, type Id } from './typing'
import { SelectContext } from './context'

export interface SelectItemProps<ValueType> {
  id: Id
  value: ValueType
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode)
}

export const SelectItem = <ValueType,>(props: SelectItemProps<ValueType>): React.ReactElement => {
  const { value, children, id, repeatTriggerUnselected = true } = props
  const [, refresh] = useState({})
  const { setSelectItem, deleteSelectItem, getSelectItem } = useContext(SelectContext) as IContext<ValueType>

  useEffect(() => {
    const selectItem = getSelectItem(id)
    if (!selectItem) {
      setSelectItem(id, {
        id,
        value,
        isChecked: false,
        repeatTriggerUnselected,
        refreshHandler: () => {
          refresh({})
        }
      })
    } else {
      /** id发生变化时 */
      selectItem.id = id
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
      setSelectItem(id, selectItem)
    }

  }, [value, repeatTriggerUnselected, getSelectItem, id, setSelectItem, deleteSelectItem])

  return <>
    {typeof children === 'function'
      ? children({
        isChecked: !!((getSelectItem(id)?.isChecked) ?? false)
      })
      : children}
  </>
}
