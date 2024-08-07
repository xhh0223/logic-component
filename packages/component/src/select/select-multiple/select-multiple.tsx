import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { SelectCollect } from '../select-collect'
import { RequiredISelectItem } from '../typing'
import { SelectMultipleCollectContext } from './context'
import { SelectMultipleHandler, type SelectMultipleProps } from './typing'

const InnerSelectMultiple = <ValueType,>(
  props: SelectMultipleProps<ValueType>,
  ref: Ref<SelectMultipleHandler<ValueType>>,
) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())

  const innerHandler = useMemo(() => {
    const handler: SelectMultipleHandler<ValueType> = {
      getItems: (ids: Id[]) => {
        const result: Array<RequiredISelectItem<ValueType>> = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push({
              id: item.id,
              value: item.value,
              isChecked: item.isChecked,
            })
          }
        })
        return result
      },
      getAllItems() {
        return collect.getAllItem().map((i) => ({ id: i.id, isChecked: i.isChecked, value: i.value }))
      },
      select: (multipleOptions) => {
        const result: Array<RequiredISelectItem<ValueType>> = []
        multipleOptions?.forEach((i) => {
          const { id, options } = i
          const item = collect.getItem(id)
          if (!item) {
            return
          }
          /** 允许重复点击一个 */
          if (options?.allowRepeatSelect) {
            if (!item.isChecked) {
              collect.updateItemColumn(id, { isChecked: true })
            }
          } else {
            collect.updateItemColumn(id, {
              isChecked: !item.isChecked,
            })
          }
          result.push({
            id: item.id,
            value: item.value,
            isChecked: item.isChecked,
          })
        })
        return result
      },
      cancel: (ids) => {
        const result: Array<RequiredISelectItem<ValueType>> = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item.isChecked) {
            collect.updateItemColumn(id, { isChecked: false })
          }
          result.push({
            id: item.id,
            value: item.value,
            isChecked: item.isChecked,
          })
        })
        return result
      },
    }
    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <SelectMultipleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </SelectMultipleCollectContext.Provider>
  )
}

export const SelectMultiple = forwardRef(InnerSelectMultiple) as typeof InnerSelectMultiple
