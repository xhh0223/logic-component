import { useContext, useEffect, useMemo, useState } from 'react'

import { SelectMultipleCollectContext } from './context'
import { SelectMultipleItemProps } from './typing'

export const SelectMultipleItem = <Value,>(props: SelectMultipleItemProps<Value>) => {
  const { id, value, render } = props
  const { collect, handler } = useContext(SelectMultipleCollectContext)

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
