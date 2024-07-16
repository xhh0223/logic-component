import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

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
      getAllItems() {
        return collect.getAllItem()?.map((i) => ({
          id: i.id,
          parentId: i.parentId,
          childrenIds: i.childrenIds,
          value: i.value,
          isChecked: i.isChecked,
        }))
      },
      getAncestorsIds: (id) => {
        const result: Array<Id> = []
        let currentId = id
        while (currentId) {
          currentId = collect.getItem(currentId)?.parentId
          if (currentId) {
            result.push(currentId)
          }
        }
        return result
      },
      getDescendantsIds: (id) => {
        const result: Array<Id> = []
        const queue = [id]
        while (queue?.length) {
          const currentId = queue.shift()
          result.push(currentId)
          const item = collect.getItem(currentId)
          item?.childrenIds?.forEach((id) => {
            queue.push(id)
          })
        }
        result.shift()
        return result
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
      select: (multipleOptions) => {
        const result: Array<RequiredITreeSelectItem<ValueType>> = []

        multipleOptions.forEach((i) => {
          const { id, options } = i
          if (!Array.isArray(i)) {
            throw '传入值必须是Array<[id:Id,any]>类型'
          }
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
