import React, { useMemo, type Ref, useImperativeHandle, forwardRef } from 'react'
import { type Id, type SelectedValue } from './typing'
import { Context, SelectContext } from './context'
import { computedPath, getChildrenIds } from './utils'
import { omit } from 'ramda'

export interface TreeSelectMultipleProps {
  children: React.ReactNode
}

export interface TreeSelectMultipleRef<ValueType> {
  getAll: () => Array<SelectedValue<ValueType>>
  getByIds: (id: Id[]) => Array<SelectedValue<ValueType>>
  getPath: (id: Id) => Id[]
  getChildrenIds: (id: Id) => (Id[]) | undefined
  getLevel: (id: Id) => number
  deleteByIds: (ids: Id[]) => void
  reset: (ids?: Id[]) => Promise<void>
  trigger: (selectedIds: Id[]) => Promise<Array<SelectedValue<ValueType>>>
}
const InnerTreeSelectMultiple = <ValueType,>(props: TreeSelectMultipleProps, ref: Ref<TreeSelectMultipleRef<ValueType>>) => {
  const { children } = props

  const selectContext = useMemo(() => new Context<ValueType>(), [])
  useImperativeHandle(ref, () => ({
    getAll() {
      const { getAllSelectItem } = selectContext
      return getAllSelectItem().map(item => omit(['refreshHandler', 'repeatTriggerUnselected'], item))
    },
    getPath(id) {
      return computedPath(id, [], selectContext)
    },
    getLevel(id) {
      return computedPath(id, [], selectContext)?.length - 2
    },
    getChildrenIds(id) {
      return getChildrenIds(id, selectContext)
    },
    getByIds(ids) {
      const { getSelectItem } = selectContext
      const items = ids?.map(id => omit(['refreshHandler', 'repeatTriggerUnselected'], getSelectItem(id)))
      return items as Array<SelectedValue<ValueType>>
    },
    deleteByIds(ids) {
      const { deleteSelectItem } = selectContext
      ids?.forEach((id) => {
        deleteSelectItem(id)
      })
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

          selectedItems.push(omit(['refreshHandler', 'repeatTriggerUnselected'], selectItem))
        })
        return selectedItems
      }
      return []
    }
  }), [selectContext])

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
