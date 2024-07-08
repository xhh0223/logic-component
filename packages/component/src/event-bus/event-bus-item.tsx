import { useContext, useEffect, useMemo, useState } from 'react'

import { IdsEntries } from '@/typing'

import { EventBusCollectContext } from './context'
import { EventBusItemProps } from './typing'

export const EventBusItem = <Value,>(props: EventBusItemProps<Value>) => {
  const { id, onIds, render, initCallback } = props
  const { collect, handler } = useContext(EventBusCollectContext)

  const [, update] = useState({})

  const memoInfo = useMemo(() => {
    const params = new Map()
    /** 新增 */
    collect.setItem(id, {
      id,
      onIds,
      on: (onIdsEntries: IdsEntries<any>) => {
        onIdsEntries.forEach(([id, value]) => {
          params.set(id, value)
        })
        update({})
      },
    })
    if (typeof initCallback === 'function') {
      initCallback({ handler: { setContext: handler.setContext, getContext: handler.getContext } })
    }
    return {
      id,
      params,
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
      collect.setItem(id, {
        id,
        onIds,
        on: beforeItem.on,
      })
    } else {
      const item = collect.getItem(id)
      collect.setItem(id, {
        id,
        onIds,
        on: item.on,
      })
    }
  }, [id, onIds])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(memoInfo.id)
    }
  }, [])

  return render({
    id,
    onIdsEntries: [...memoInfo.params.entries()],
    handler,
    context: collect.getContext(),
  })
}
