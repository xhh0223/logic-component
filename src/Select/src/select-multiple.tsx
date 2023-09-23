import React, {
  type Ref,
  forwardRef,
  useImperativeHandle,
  useMemo
} from 'react'
import { type Id, type SelectedValue } from './typing'
import { Context, SelectContext } from './context'

export interface SelectMultipleProps {
  children: React.ReactNode
}

export interface SelectMultipleRef<ValueType> {
  getAllValue: () => Array<SelectedValue<ValueType>>
  reset: (ids?: Id[]) => Promise<void>
  trigger: (selectedIds: Id[]) => Promise<Array<SelectedValue<ValueType>>>
}

const InnerSelectMultiple = <ValueType,>(
  props: SelectMultipleProps,
  ref: Ref<SelectMultipleRef<ValueType>>
) => {
  const { children } = props

  const selectContext = useMemo(() => new Context<ValueType>(), [])

  useImperativeHandle(
    ref,
    () => ({
      getAllValue () {
        const { getAllSelectItem } = selectContext
        return getAllSelectItem().map((item) => ({
          id: item.id,
          value: item.value,
          isChecked: item.isChecked
        }))
      },
      async reset (ids) {
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
          allSelectItem.forEach((item) => {
            if (item.isChecked) {
              item.isChecked = false
              item.refreshHandler()
            }
          })
        }
      },
      async trigger (ids) {
        const { getSelectItem } = selectContext
        if (Array.isArray(ids)) {
          /** 多选 */
          const selectedItems: Array<SelectedValue<ValueType>> = []
          ids?.forEach((id) => {
            const selectItem = getSelectItem(id)
            if (!selectItem) return

            if (selectItem.repeatTriggerUnselected) {
              selectItem.isChecked = !selectItem.isChecked
            } else {
              selectItem.isChecked = true
            }
            selectedItems.push({
              id: selectItem.id,
              value: selectItem.value,
              isChecked: selectItem.isChecked
            })
          })
          return selectedItems
        }
        return []
      }
    }),
    [selectContext]
  )
  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  )
}

type ForwardRefReturnType<Value> = ReturnType<
  typeof forwardRef<SelectMultipleRef<Value>, SelectMultipleProps>
>

/** 保留多选泛型 */
type InnerSelectMultipleType = <Value>(
  ...params: Parameters<ForwardRefReturnType<Value>>
) => ReturnType<ForwardRefReturnType<Value>>

export const SelectMultiple = forwardRef(
  InnerSelectMultiple
) as InnerSelectMultipleType
