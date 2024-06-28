import { useContext, useEffect, useMemo, useState } from 'react'

import { SelectSingleCollectContext } from './context'
import { type SelectSingleItemProps } from './typing'

export const SelectSingleItem = <Value,>(props: SelectSingleItemProps<Value>) => {
  const { id, value, render } = props
  const { collect, handler } = useContext(SelectSingleCollectContext)

  const [, update] = useState({})

  const memoInfo = useMemo(() => {
    /** 新增 */
    collect.setItem({
      id,
      value,
      isChecked: false,
      refresh() {
        update({})
      },
    })
    return {
      id,
    }
  }, [])

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      const beforeItem = collect.getItem(memoInfo.id)
      collect.setItem({
        ...beforeItem,
        id,
        value,
      })
      memoInfo.id = id
    } else {
      collect.updateItemPartialColumn(memoInfo.id, {
        value,
      })
    }
  }, [id, collect, value])

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
    isChecked: !!item.isChecked,
  })
}
