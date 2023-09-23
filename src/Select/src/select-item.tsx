import React, { useContext, useEffect, useMemo, useState } from 'react'
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

  const cacheInfo = useMemo(() => ({
    /** 只初始化一次id */
    id,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [])

  useEffect(() => {
    const selectItem = getSelectItem(cacheInfo.id)
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
    } else if (cacheInfo.id === id) {
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
    }
    else if (cacheInfo.id !== id) {
      /** id发生变化时 */
      selectItem.id = id
      selectItem.value = value
      selectItem.repeatTriggerUnselected = repeatTriggerUnselected
      deleteSelectItem(cacheInfo.id)
      cacheInfo.id = id
      setSelectItem(id, selectItem)
    }
    return () => {
      cacheInfo.id = id
    }
  }, [value, repeatTriggerUnselected, getSelectItem, id, setSelectItem, deleteSelectItem, cacheInfo])

  useEffect(() => {
    return () => {
      deleteSelectItem(cacheInfo.id)
    }
  }, [cacheInfo, deleteSelectItem])
  return <>
    {typeof children === 'function'
      ? children({
        isChecked: !!((getSelectItem(id)?.isChecked) ?? false)
      })
      : children}
  </>
}
