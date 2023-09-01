import React, { Ref, forwardRef, useImperativeHandle, useMemo } from 'react'
import { Id, SelectedValue } from './typing';
import { clone } from 'ramda';
import { Context, SelectContext } from './context';

export interface SelectSingleProps {
  /** 重复触发 */
  repeatTriggerUnselected?: boolean;
  children: React.ReactNode
}

export interface SelectSingleRef<ValueType> {
  reset(): Promise<void>
  trigger(selectedId: Id): Promise<SelectedValue<ValueType> | undefined>
}

const InnerSelectSingle = <ValueType,>(props: SelectSingleProps, ref: Ref<SelectSingleRef<ValueType>>) => {
  const { repeatTriggerUnselected = true, children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), []);

  useImperativeHandle(ref, () => ({
    async reset() {
      const { getAllSelectItem, getSelectItem } = selectContext
      for (let item of getAllSelectItem()) {
        if (item.isChecked) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }
    },
    async trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      let selectedItem = getSelectItem(id)
      if ([!(typeof id === 'string'), !selectedItem].includes(true)) {
        return undefined
      }

      for (let item of getAllSelectItem()) {
        if (item.isChecked && item.id !== id) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }

      if (repeatTriggerUnselected) {
        selectedItem.isChecked = !selectedItem.isChecked
      } else {
        selectedItem.isChecked = true
      }
      selectedItem.refreshHandler()
      return selectedItem.isChecked ? {
        id: selectedItem.id,
        value: clone(selectedItem.value)
      } : undefined
    }
  }), [])

  return <SelectContext.Provider value={selectContext}>
    {children}
  </SelectContext.Provider>
}

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<SelectSingleRef<Value>, SelectSingleProps>>

/** 保留单选泛型 */
interface InnerSelectSingleType {
  <Value,>(
    ...params: Parameters<ForwardRefReturnType<Value>>
  ): ReturnType<ForwardRefReturnType<Value>>
}

export const SelectSingle = forwardRef(InnerSelectSingle) as InnerSelectSingleType