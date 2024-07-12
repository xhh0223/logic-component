import { useContext, useEffect, useMemo, useState } from 'react'

import { TreeSelectMultipleCollectContext } from './context'
import { type TreeSelectMultipleItemProps } from './typing'

export const TreeSelectMultipleItem = <Value = any,>(props: TreeSelectMultipleItemProps<Value>) => {
  const { id, value, render, childrenIds, parentId } = props
  const { collect, handler } = useContext(TreeSelectMultipleCollectContext)

  const memoInfo = useMemo(() => {
    const refresh = () => {
      update({})
    }
    /** 新增 */
    collect.setItem(id, {
      parentId,
      id,
      value,
      isChecked: false,
      childrenIds,
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
      /** 删除 */
      const beforeItem = collect.getItem(memoInfo.id)
      collect.delItem(memoInfo.id)
      memoInfo.id = id
      /** 新增 */
      collect.setItem(id, {
        id,
        parentId,
        childrenIds,
        value,
        isChecked: beforeItem?.isChecked ?? false,
        refresh: memoInfo.refresh,
      })
    } else {
      collect.updateItemColumn(id, {
        parentId,
        childrenIds,
        value,
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
