import React, { type Ref, forwardRef, useImperativeHandle, useMemo, useEffect } from 'react'
import { Context, SelectContext } from './context'
import { type Id, type SelectedValue } from './typing'
import { computedPath, getChildrenIds } from './utils'
import { omit } from 'ramda'

export interface TreeSelectSingleProps {
  children: React.ReactNode
}

export interface TreeSelectSingleRef<ValueType> {
  reset: () => Promise<void>
  trigger: (selectedId: Id) => Promise<SelectedValue<ValueType> | undefined>
}

const InnerTreeSelectSingle = <ValueType,>(props: TreeSelectSingleProps, ref: Ref<TreeSelectSingleRef<ValueType>>) => {
  const { children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), [])

  useImperativeHandle(ref, () => ({
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

      if (!selectedItem.path) {
        selectedItem.path = computedPath(selectedItem.id, [], selectContext)
        selectedItem.level = selectedItem.path?.length
      }
      if (!selectedItem.childrenIds) {
        selectedItem.childrenIds = getChildrenIds(selectedItem.id, selectContext)
      }

      return omit(['refreshHandler', 'repeatTriggerUnselected'], selectedItem)
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
