import React, { useMemo, Ref, useImperativeHandle, forwardRef } from 'react'
import { Id, SelectedValue } from './typing'
import { Context, SelectContext } from './context'
import { computedPath, getChildrenIds } from './utils'

export interface TreeSelectMultipleProps {
  children: React.ReactNode
}

export interface TreeSelectMultipleRef<ValueType> {
  reset(ids?: Id[]): Promise<void>
  trigger(selectedIds: Id[]): Promise<SelectedValue<ValueType>[]>
}
const InnerTreeSelectMultiple = <ValueType,>(props: TreeSelectMultipleProps, ref: Ref<TreeSelectMultipleRef<ValueType>>) => {
  const { children } = props

  const selectContext = useMemo(() => new Context<ValueType>(), []);

  useImperativeHandle(ref, () => ({
    async reset(ids) {
      const { getAllSelectItem, getSelectItem } = selectContext
      const allSelectItem = getAllSelectItem();
      if (Array.isArray(ids)) {
        /** 多选 */
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id);
          if (selectItem && selectItem.isChecked) {
            selectItem.isChecked = false;
            selectItem.refreshHandler();
          }
        });
      } else {
        allSelectItem.forEach(item => {
          if (item.isChecked) {
            item.isChecked = false;
            item.refreshHandler();
          }
        })
      }
    },
    async trigger(ids) {
      const { getSelectItem } = selectContext
      if (Array.isArray(ids)) {
        /** 多选 */
        const selectedItems: SelectedValue<ValueType>[] = []
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id);
          if (!selectItem) {
            return
          }

          if (selectItem.repeatTriggerUnselected) {
            selectItem.isChecked = !selectItem.isChecked
          } else {
            selectItem.isChecked = true
          }
          const path = computedPath(selectItem.id, [], selectContext)
          selectedItems.push({
            id: selectItem.id,
            isChecked: true,
            value: selectItem.value,
            path,
            level: path.length,
            parentId: selectItem.parentId,
            childrenIds: getChildrenIds(selectItem.id, selectContext)
          })
        });
        return selectedItems
      }
      return []
    }
  }), [])
  return <SelectContext.Provider value={selectContext}>
    {children}
  </SelectContext.Provider>
}


type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<TreeSelectMultipleRef<Value>, TreeSelectMultipleProps>>

/** 保留单选泛型 */
interface InnerTreeSelectMultipleType {
  <Value,>(
    ...params: Parameters<ForwardRefReturnType<Value>>
  ): ReturnType<ForwardRefReturnType<Value>>
}

export const TreeSelectMultiple = forwardRef(InnerTreeSelectMultiple) as InnerTreeSelectMultipleType