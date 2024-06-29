import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { SelectCollect } from '../select-collect'
import { RequiredITreeSelectItem } from '../typing'
import { TreeSelectMultipleCollectContext } from './context'
import { type TreeSelectMultipleProps, TreeSelectMultipleRef } from './typing'

const InnerTreeSelectMultiple = <ValueType,>(
  props: TreeSelectMultipleProps<ValueType>,
  ref: Ref<TreeSelectMultipleRef<ValueType>>,
) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())

  const innerHandler = useMemo(() => {
    const handler: TreeSelectMultipleRef<ValueType> = {
      getItems: (ids) => {
        const result: Array<RequiredITreeSelectItem<ValueType>> = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push({
              id: item.id,
              isChecked: item.isChecked,
              value: item.value,
              childrenIds: item.childrenIds,
              parentId: item.parentId,
            })
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
      cancel: (ids) => {
        const result: Array<RequiredITreeSelectItem<ValueType>> = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (!item) {
            return
          }
          if (item.isChecked) {
            collect.updateItemColumn(id, { isChecked: false })
            item.refresh()
          }
          result.push({
            id: item.id,
            isChecked: collect.getItem(id).isChecked,
            value: item.value,
            childrenIds: item.childrenIds,
            parentId: item.parentId,
          })
        })
        return result
      },
      select: (idsEntries) => {
        const result: Array<RequiredITreeSelectItem<ValueType>> = []
        idsEntries.forEach(([id, options]) => {
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
            childrenIds: item.childrenIds,
            isChecked: collect.getItem(id).isChecked,
            value: item.value,
            parentId: item.parentId,
          })
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
