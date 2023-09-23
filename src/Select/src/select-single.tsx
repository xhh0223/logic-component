import React, { type Ref, forwardRef, useImperativeHandle, useMemo } from 'react'
import { type Id, type SelectedValue } from './typing'
import { Context, SelectContext } from './context'

export interface SelectSingleProps {
  children: React.ReactNode
}

export interface SelectSingleRef<ValueType> {
  reset: () => Promise<void>
  trigger: (selectedId: Id) => Promise<SelectedValue<ValueType> | undefined>
}

const InnerSelectSingle = <ValueType,>(props: SelectSingleProps, ref: Ref<SelectSingleRef<ValueType>>) => {
  const { children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), [])

  useImperativeHandle(ref, () => ({
    async reset () {
      const { getAllSelectItem } = selectContext
      for (const item of getAllSelectItem()) {
        if (item.isChecked) {
          item.isChecked = false
          item.refreshHandler()
          break
        }
      }
    },
    async trigger (id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      const selectedItem = getSelectItem(id)
      if (!selectedItem) {
        console.error('selectItem的id不存在')
        return
      }

      for (const item of getAllSelectItem()) {
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
      return {
        isChecked: selectedItem.isChecked,
        id: selectedItem.id,
        value: selectedItem.value
      }
    }
  }), [selectContext])

  return <SelectContext.Provider value={selectContext}>
    {children}
  </SelectContext.Provider>
}

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<SelectSingleRef<Value>, SelectSingleProps>>

/** 保留单选泛型 */
type InnerSelectSingleType = <Value, >(
  ...params: Parameters<ForwardRefReturnType<Value>>
) => ReturnType<ForwardRefReturnType<Value>>

export const SelectSingle = forwardRef(InnerSelectSingle) as InnerSelectSingleType
