import { useContext, useEffect, useMemo, useState } from 'react'

import { SelectSingleCollectContext } from './context'
import { type SelectSingleItemProps } from './typing'

export const SelectSingleItem = <Value,>(props: SelectSingleItemProps<Value>) => {
  const { id, value, render } = props
  const { collect, handler } = useContext(SelectSingleCollectContext)

  const [, update] = useState({})

  const memoInfo = useMemo(() => {
    const refresh = () => {
      update({})
    }
    /** 新增 */
    collect.setItem(id, {
      id,
      value,
      isChecked: false,
      refresh,
    })
    return {
      id,
      refresh,
    }
  }, [])

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      /** 1、删掉之前的 */
      const beforeItem = collect.getItem(memoInfo.id)
      collect.delItem(memoInfo.id)
      memoInfo.id = id
      /** 2、重新添加 */
      collect.setItem(memoInfo.id, {
        id,
        value,
        isChecked: beforeItem?.isChecked ?? false,
        refresh: memoInfo.refresh,
      })
    } else {
      collect.updateItemColumn(memoInfo.id, {
        value,
      })
    }
  }, [id, value])

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
  })
}
