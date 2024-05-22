import { useContext, useEffect, useMemo, useState } from 'react'

import { SelectSingleCollectContext } from './context'
import { type SelectSingleItemProps } from './typing'

export const SelectSingleItem = <Value,>(props: SelectSingleItemProps<Value>) => {
  const { id, value, render, allowRepeatChecked = false } = props
  const { collect, handler } = useContext(SelectSingleCollectContext)

  /** 记录第一次初始化的值 */
  const memoInfo = useMemo(() => {
    /** 新增 */
    collect.addItem({
      id,
      value,
      isChecked: false,
      allowRepeatChecked,
      refresh() {
        update({})
      },
    })
    return {
      id,
    }
  }, [])

  const [, update] = useState({})

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      const beforeItem = collect.getItem(memoInfo.id)
      collect.delItem(memoInfo.id)
      memoInfo.id = id
      collect.addItem({
        ...beforeItem,
        id,
        value,
        allowRepeatChecked,
      })
    } else {
      collect.updateItemPartialColumn(memoInfo.id, {
        value,
        allowRepeatChecked,
      })
    }
  }, [id, memoInfo, collect, value, allowRepeatChecked])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(id)
    }
  }, [collect, id])

  const item = collect.getItem(id)
  return render({
    handler,
    id,
    value: item.value,
    isChecked: !!item.isChecked,
  })
}
