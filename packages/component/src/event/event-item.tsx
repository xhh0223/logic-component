import { useContext, useEffect, useMemo, useState } from 'react'

import { EventCollectContext } from './context'
import { EventItemProps, IdsEntries } from './typing'

export const EventItem = <Value,>(props: EventItemProps<Value>) => {
  const { id, dependency, render } = props
  const { collect, handler } = useContext(EventCollectContext)

  const [, update] = useState({})
  const memoInfo = useMemo(() => {
    let params: IdsEntries<any>
    /** 新增 */
    collect.setItem(id, {
      id,
      dependency,
      on: (idsEntries: IdsEntries<any>) => {
        memoInfo.params = idsEntries
        update({})
      },
    })
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
        dependency,
        on: beforeItem.on,
      })
    } else {
      const item = collect.getItem(id)
      collect.setItem(id, {
        id,
        dependency,
        on: item.on,
      })
    }
  }, [id, dependency])

  /** 删除 */
  useEffect(() => {
    return () => {
      collect.delItem(memoInfo.id)
    }
  }, [])

  return render({
    id,
    dependencyEntries: memoInfo.params,
    handler,
  })
}
