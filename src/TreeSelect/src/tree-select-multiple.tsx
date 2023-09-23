import React, { useMemo, type Ref, useImperativeHandle, forwardRef, useEffect } from 'react'
import { type Id, type SelectedValue } from './typing'
import { Context, SelectContext } from './context'
import { computedPath, getChildrenIds } from './utils'
import { omit } from 'ramda'

export interface TreeSelectMultipleProps {
  children: React.ReactNode
}

export interface TreeSelectMultipleRef<ValueType> {
  getAllValue: () => Array<SelectedValue<ValueType>>
  reset: (ids?: Id[]) => Promise<void>
  trigger: (selectedIds: Id[]) => Promise<Array<SelectedValue<ValueType>>>
}
const InnerTreeSelectMultiple = <ValueType,>(props: TreeSelectMultipleProps, ref: Ref<TreeSelectMultipleRef<ValueType>>) => {
  const { children } = props

  const selectContext = useMemo(() => new Context<ValueType>(), [])

  useImperativeHandle(ref, () => ({
    getAllValue() {
      const { getAllSelectItem } = selectContext
      return getAllSelectItem().map(item => omit(['refreshHandler', 'repeatTriggerUnselected'], item))
    },
    async reset(ids) {
      const { getAllSelectItem, getSelectItem } = selectContext
      const allSelectItem = getAllSelectItem()
      if (Array.isArray(ids)) {
        /** 多选 */
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id)
          if (selectItem && selectItem.isChecked) {
            selectItem.isChecked = false
            selectItem.refreshHandler()
          }
        })
      } else {
        allSelectItem.forEach(item => {
          if (item.isChecked) {
            item.isChecked = false
            item.refreshHandler()
          }
        })
      }
    },
    async trigger(ids) {
      const { getSelectItem } = selectContext
      if (Array.isArray(ids)) {
        /** 多选 */
        const selectedItems: Array<SelectedValue<ValueType>> = []
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id)
          if (!selectItem) {
            return
          }
          if (selectItem.repeatTriggerUnselected) {
            selectItem.isChecked = !selectItem.isChecked
          } else {
            selectItem.isChecked = true
          }

          if (!selectItem.path) {
            selectItem.path = computedPath(selectItem.id, [], selectContext)
            selectItem.level = selectItem.path?.length
          }
          if (!selectItem.childrenIds) {
            selectItem.childrenIds = getChildrenIds(selectItem.id, selectContext)
          }

          selectedItems.push(omit(['refreshHandler', 'repeatTriggerUnselected'], selectItem))
        })
        return selectedItems
      }
      return []
    }
  }), [])

  useEffect(() => {
    /** 初始化每个节点的信息 */
    selectContext.getAllSelectItem().forEach(item => {
      const path = computedPath(item.id, [], selectContext)
      item.path = path
      item.level = path.length
      item.childrenIds = getChildrenIds(item.id, selectContext)
    })
  }, [])

  return <SelectContext.Provider value={selectContext}>
    {children}
  </SelectContext.Provider>
}

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<TreeSelectMultipleRef<Value>, TreeSelectMultipleProps>>

/** 保留单选泛型 */
type InnerTreeSelectMultipleType = <Value, >(
  ...params: Parameters<ForwardRefReturnType<Value>>
) => ReturnType<ForwardRefReturnType<Value>>

export const TreeSelectMultiple = forwardRef(InnerTreeSelectMultiple) as InnerTreeSelectMultipleType
