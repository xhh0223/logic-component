import React, { Ref, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Id, SelectedValue } from './typing'
import { Context, SelectContext } from './context'

export interface SelectMultipleProps {
  children: React.ReactNode
}

export interface SelectMultipleRef<ValueType> {
  trigger(selectedIds: Id[]): Promise<SelectedValue<ValueType>[]>
}

const InnerSelectMultiple = <ValueType,>(props: SelectMultipleProps, ref: Ref<SelectMultipleRef<ValueType>>) => {
  const { children } = props

  const selectContext = useMemo(() => new Context<ValueType>(), []);

  useImperativeHandle(ref, () => ({
    async trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      if (Array.isArray(id)) {
        /** 多选 */
        const ids = id
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
            selectedItems.push({
              id: item.id,
              value: item.value
            })
          }
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

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<SelectMultipleRef<Value>, SelectMultipleProps>>

/** 保留多选泛型 */
interface InnerSelectMultipleType {
  <Value,>(
    ...params: Parameters<ForwardRefReturnType<Value>>
  ): ReturnType<ForwardRefReturnType<Value>>
}


export const SelectMultiple = forwardRef(InnerSelectMultiple) as InnerSelectMultipleType
