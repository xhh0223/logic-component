import React, { useMemo, Ref, useImperativeHandle, forwardRef } from 'react'
import { Id, SelectedValue } from './typing'
import { Context, SelectContext } from './context'
import { computedPath, getChildrenIds } from './utils'
import { clone } from 'ramda'

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
          if ([!(typeof id === 'string'), !selectItem].includes(true)) {
            return
          }
          if (selectItem) {
            selectItem.isChecked = false;
            selectItem.refreshHandler();
          }
        });
      } else {
        allSelectItem.forEach(item => {
          item.isChecked = false;
          item.refreshHandler();
        })
      }
    },
    async trigger(ids) {
      const { getAllSelectItem, getSelectItem } = selectContext
      if (Array.isArray(ids)) {
        /** 多选 */
        const allSelectItem = getAllSelectItem();
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id);
          if ([!(typeof id === 'string'), !selectItem].includes(true)) {
            return
          }
          if (selectItem) {
            selectItem.isChecked = !selectItem.isChecked;
            selectItem.refreshHandler();
          }
        });

        const selectedItems: SelectedValue<ValueType>[] = []
        allSelectItem.forEach((item) => {
          if (item.isChecked) {
            const path = computedPath(item.id, [], selectContext)
            selectedItems.push({
              id: item.id,
              value: clone(item.value),
              isChecked: item.isChecked,
              path,
              level: path.length,
              parentId: item.parentId,
              childrenIds: getChildrenIds(item.id, selectContext)
            })
          }
        });
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