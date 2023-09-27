import React, { type Ref, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Context, SelectContext } from './context'
import { type Id, type SelectedValue } from './typing'
import { computedPath, getChildrenIds } from './utils'
import { omit } from 'ramda'

export interface TreeSelectSingleProps {
  children: React.ReactNode
}

export interface TreeSelectSingleRef<ValueType> {
  getPath: (id: Id) => Id[]
  getChildrenIds: (id: Id) => (Id[]) | undefined
  getLevel: (id: Id) => number
  getById: (id: Id) => (SelectedValue<ValueType>) | undefined
  deleteById: (id: Id) => void
  reset: () => Promise<void>
  trigger: (selectedId: Id) => Promise<SelectedValue<ValueType> | undefined>
}

const InnerTreeSelectSingle = <ValueType,>(props: TreeSelectSingleProps, ref: Ref<TreeSelectSingleRef<ValueType>>) => {
  const { children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), [])

  useImperativeHandle(ref, () => ({
    getPath(id) {
      return computedPath(id, [], selectContext)
    },
    getLevel(id) {
      return computedPath(id, [], selectContext)?.length
    },
    getChildrenIds(id) {
      return getChildrenIds(id, selectContext)
    },
    getById(id) {
      const { getSelectItem } = selectContext
      const item = omit(['refreshHandler', 'repeatTriggerUnselected'], getSelectItem(id))
      return item as SelectedValue<ValueType>
    },
    deleteById(id) {
      const { deleteSelectItem } = selectContext
      deleteSelectItem(id)
    },
    async reset() {
      const { getAllSelectItem } = selectContext
      for (const item of getAllSelectItem()) {
        if (item.isChecked) {
          item.isChecked = false
          item.refreshHandler()
          break
        }
      }
    },
    async trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      const allSelectItem = getAllSelectItem()

      const selectedItem = getSelectItem(id)
      if (!selectedItem) {
        console.error('treeSelectItem的id不存在')
        return
      }

      for (const item of allSelectItem) {
        if (item.isChecked && item.id !== id) {
          item.isChecked = false
          item.refreshHandler()
          break
        }
      }

      if (selectedItem.repeatTriggerUnselected) {
        selectedItem.isChecked = !selectedItem.isChecked
      } else {
        selectedItem.isChecked = true
      }
      selectedItem.refreshHandler()

      return omit(['refreshHandler', 'repeatTriggerUnselected'], selectedItem)
    }
  }), [selectContext])

  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  )
}

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<TreeSelectSingleRef<Value>, TreeSelectSingleProps>>

/** 保留单选泛型 */
type InnerTreeSelectSingleType = <Value, >(
  ...params: Parameters<ForwardRefReturnType<Value>>
) => ReturnType<ForwardRefReturnType<Value>>

export const TreeSelectSingle = forwardRef(InnerTreeSelectSingle) as InnerTreeSelectSingleType
