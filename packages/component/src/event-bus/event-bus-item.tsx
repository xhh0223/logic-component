import { useContext, useEffect, useMemo, useState } from 'react'

import { EventBusCollectContext } from './context'
import { EventBusItemProps, MultipleParams } from './typing'

export const EventBusItem = <Value,>(props: EventBusItemProps<Value>) => {
  const { id, onIds, render, initCallback } = props
  const { collect, handler } = useContext(EventBusCollectContext)

  const [, update] = useState({})

  const memoInfo = useMemo(() => {
    const params = new Map()
    const on = (onIdsParams: MultipleParams<any>) => {
      onIdsParams.forEach((item) => {
        params.set(item.id, item.params)
      })
      update({})
    }
    /** 新增 */
    collect.setItem(id, {
      id,
      onIds,
      on,
    })
    if (typeof initCallback === 'function') {
      initCallback({ handler })
    }
    return {
      id,
      params,
      on,
    }
  }, [])

  /** 修改 */
  useMemo(() => {
    if (id !== memoInfo.id) {
      /** 1、删掉之前的 */
      collect.delItem(memoInfo.id)
      memoInfo.id = id
    }
    /** 2、重新添加 */
    collect.setItem(id, {
      id,
      onIds,
      on: memoInfo.on,
    })
  }, [id, onIds])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(memoInfo.id)
    }
  }, [])

  return render({
    id,
    onIdsParams: [...memoInfo.params.entries()].map(([id, params]) => ({ id, params })),
    handler,
    context: collect.getContext(),
  })
}
