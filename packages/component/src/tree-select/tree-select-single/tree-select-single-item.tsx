import { useContext, useEffect, useMemo, useState } from 'react'

import { TreeSelectSingleCollectContext } from './context'
import { type TreeSelectSingleItemProps } from './typing'

export const TreeSelectSingleItem = <Value = any,>(props: TreeSelectSingleItemProps<Value>) => {
  const { id, value, render, childrenIds, parentId } = props
  const { collect, handler } = useContext(TreeSelectSingleCollectContext)

  /** 记录第一次初始化的值 */
  const memoInfo = useMemo(() => {
    const refresh = () => {
      update({})
    }
    /** 新增 */
    collect.setItem(id, {
      id,
      parentId,
      childrenIds,
      value,
      isChecked: false,
      refresh,
    })
    return {
      id,
      refresh,
    }
  }, [])

  const [, update] = useState({})

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      /** 1、删掉之前的 */
      const beforeItem = collect.getItem(memoInfo.id)
      collect.delItem(memoInfo.id)
      memoInfo.id = id
      /** 2、重新添加 */
      collect.setItem(id, {
        id,
        parentId,
        childrenIds,
        value,
        isChecked: beforeItem?.isChecked ?? false,
        refresh: memoInfo.refresh,
      })
    } else {
      collect.updateItemColumn(memoInfo.id, {
        value,
        parentId,
        childrenIds,
      })
    }
  }, [id, value, parentId, childrenIds])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(memoInfo.id)
    }
  }, [])

  const item = collect.getItem(id)
  return render({
    handler,
    id,
    value: item.value,
    isChecked: item.isChecked,
    childrenIds: item.childrenIds,
    parentId: item.parentId,
  })
}
