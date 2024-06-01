import { pick } from 'lodash-es'
import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { SelectCollect } from '../select-collect'
import { TreeSelectMultipleCollectContext } from './context'
import { type TreeSelectMultipleProps, TreeSelectMultipleRef } from './typing'

const PickColumns = ['id', 'isChecked', 'value', 'childrenIds', 'parentId']

const InnerTreeSelectMultiple = <ValueType,>(
  props: TreeSelectMultipleProps<ValueType>,
  ref: Ref<TreeSelectMultipleRef<ValueType>>,
) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())

  const innerHandler = useMemo(() => {
    const handler: TreeSelectMultipleProps<ValueType>['handler'] = {
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
      select: (ids) => {
        const result = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            if (!item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: true })
              item.refresh()
            }
            result.push(pick(collect.getItem(id), PickColumns))
          }
        })
        return result
      },
      cancelSelected: (ids) => {
        const result = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            if (item.isChecked) {
              collect.updateItemPartialColumn(id, { isChecked: false })
              item.refresh()
            }
            result.push(pick(collect.getItem(id), PickColumns))
          }
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

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <TreeSelectMultipleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </TreeSelectMultipleCollectContext.Provider>
  )
}
export const TreeSelectMultiple = forwardRef(InnerTreeSelectMultiple) as typeof InnerTreeSelectMultiple
