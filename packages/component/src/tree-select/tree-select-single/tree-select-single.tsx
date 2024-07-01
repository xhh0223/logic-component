import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { SelectCollect } from '../select-collect'
import { RequiredITreeSelectItem } from '../typing'
import { TreeSelectSingleCollectContext } from './context'
import { type TreeSelectSingleProps, TreeSelectSingleRef } from './typing'

const InnerTreeSelectSingle = <ValueType,>(
  props: TreeSelectSingleProps<ValueType>,
  ref: Ref<TreeSelectSingleRef<ValueType>>,
) => {
  const { children } = props
  const { current: collect } = useRef(new SelectCollect<ValueType>())
  const innerHandler = useMemo(() => {
    const handler: TreeSelectSingleRef<ValueType> = {
      getItems: (ids) => {
        const result: Array<RequiredITreeSelectItem<ValueType>> = []
        ids?.forEach((id) => {
          const item = collect.getItem(id)
          if (item) {
            result.push({
              id: item.id,
              parentId: item.parentId,
              childrenIds: item.childrenIds,
              isChecked: item.isChecked,
              value: item.value,
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
      select: (id, options) => {
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

        collect.getAllItem().forEach((item) => {
          if (item.id !== id && item.isChecked) {
            collect.updateItemColumn(item.id, {
              isChecked: false,
            })
          }
        })

        const res: RequiredITreeSelectItem<ValueType> = {
          id: item.id,
          isChecked: collect.getItem(id).isChecked,
          value: item.value,
          childrenIds: item.childrenIds,
          parentId: item.parentId,
        }
        return res
      },
    }

    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <TreeSelectSingleCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </TreeSelectSingleCollectContext.Provider>
  )
}

export const TreeSelectSingle = forwardRef(InnerTreeSelectSingle) as typeof InnerTreeSelectSingle
