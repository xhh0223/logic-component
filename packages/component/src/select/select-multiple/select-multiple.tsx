import { pick } from 'lodash-es'
import { useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { SelectCollect } from '../select-collect'
import { SelectMultipleCollectContext } from './context'
import { type SelectMultipleProps } from './typing'

const PickColumns = ['id', 'isChecked', 'value']
export const SelectMultiple = <ValueType,>(props: SelectMultipleProps<ValueType>) => {
  const { children, handler: outerHandler } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())

  const innerHandler = useMemo(() => {
    const handler: SelectMultipleProps<ValueType>['handler'] = {
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
      select: (ids) => {
        const result = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (!item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: true })
            item.refresh()
          }
          result.push(pick(collect.getItem(id), PickColumns))
        })
        return result
      },
      cancelSelected: (ids) => {
        const result = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item.isChecked) {
            collect.updateItemPartialColumn(id, { isChecked: false })
            item.refresh()
          }
          result.push(pick(collect.getItem(id), PickColumns))
        })
        return result
      },
      trigger: (ids) => {
        const result: any = []
        ids.forEach((id) => {
          const item = collect.getItem(id)
          if (!item) {
            return
          }
          /** 允许重复点击一个 */
          if (item.allowRepeatChecked) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true })
              item.refresh()
            }
          } else {
            collect.updateItemPartialColumn(id, {
              isChecked: !item.isChecked,
            })
            item.refresh()
          }
          result.push(pick(collect.getItem(id), PickColumns))
        })
        return result
      },
    }
    return handler
  }, [])
  if (outerHandler) {
    Object.assign(outerHandler, innerHandler)
  }
  return (
    <SelectMultipleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </SelectMultipleCollectContext.Provider>
  )
}

export const useSelectMultipleHandler = <ValueType,>() => {
  return useRef({}).current as unknown as SelectMultipleProps<ValueType>['handler']
}
