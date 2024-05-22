import { pick } from 'lodash-es'
import { useMemo, useRef } from 'react'

import { SelectCollect } from '../select-collect'
import { TreeSelectSingleCollectContext } from './context'
import { type TreeSelectSingleProps } from './typing'

const PickColumns = ['id', 'isChecked', 'value', 'childrenIds', 'parentId']

export const TreeSelectSingle = <ValueType,>(props: TreeSelectSingleProps<ValueType>) => {
  const { children, handler: outHandler } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())
  const innerHandler = useMemo(() => {
    const handler: TreeSelectSingleProps['handler'] = {
      getItems: (ids) => {
        const result = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push(pick(item, PickColumns))
          }
        })
        return result
      },
      getAncestorsIds: (id) => {
        const getResult = (id, result = []) => {
          const parentId = collect.getItem(id)?.parentId
          if (parentId) {
            result.push(parentId)
            getResult(parentId)
          }
          return result
        }

        return getResult(id)
      },
      getDescendantsIds: (id) => {
        const descendantsIds = collect.getItem(id)?.childrenIds ?? []
        const list = (ids, result = []) => {
          const items = ids?.map((i) => collect.getItem(i))?.filter(Boolean)
          items?.forEach((item) => {
            result.push(item.id)
            list(item.childrenIds, result)
          })
          return result
        }
        return list(descendantsIds)
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

  if (outHandler) {
    Object.assign(outHandler, innerHandler)
  }
  return (
    <TreeSelectSingleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </TreeSelectSingleCollectContext.Provider>
  )
}

export const useTreeSelectSingleHandler = <ValueType,>() => {
  return useRef({}).current as unknown as TreeSelectSingleProps<ValueType>['handler']
}
