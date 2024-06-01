import { pick } from 'lodash-es'
import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { SelectCollect } from '../select-collect'
import { SelectSingleCollectContext } from './context'
import { type SelectSingleProps, SelectSingleRef } from './typing'

const PickColumns = ['id', 'isChecked', 'value']

const InnerSelectSingle = <ValueType,>(props: SelectSingleProps<ValueType>, ref: Ref<SelectSingleRef<ValueType>>) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())
  const innerHandler = useMemo(() => {
    const handler: SelectSingleRef<ValueType> = {
      getItems: (ids: Id[]) => {
        const result = []
        ids.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push(pick(item, PickColumns))
          }
        })
        return result as any
      },
      trigger: (id) => {
        const item = collect.getItem(id)

        if (!item) {
          return
        }
        /** 允许重复点击一个 */
        if (item.allowRepeatChecked) {
          if (!item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: true })
            item.refresh()
            collect.getAllItem().forEach((item) => {
              if (item.id !== id && item.isChecked) {
                collect.updateItemPartialColumn(item.id, {
                  isChecked: false,
                })
                item.refresh()
              }
            })
          }
        } else {
          collect.updateItemPartialColumn(id, {
            isChecked: !item.isChecked,
          })
          item.refresh()
          collect.getAllItem().forEach((item) => {
            if (item.id !== id && item.isChecked) {
              collect.updateItemPartialColumn(item.id, {
                isChecked: false,
              })
              item.refresh()
            }
          })
        }
        return pick(collect.getItem(id), PickColumns)
      },
    }

    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <SelectSingleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </SelectSingleCollectContext.Provider>
  )
}

export const SelectSingle = forwardRef(InnerSelectSingle) as typeof InnerSelectSingle
