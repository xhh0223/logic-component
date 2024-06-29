import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { EventCollectContext } from './context'
import { EventCollect } from './event-collect'
import { EventProps, EventRef, IdsEntries } from './typing'

const InnerEvent = <Context,>(props: EventProps<Context>, ref: Ref<EventRef<Context>>) => {
  const { children } = props
  const { current: collect } = useRef(new EventCollect<Context>())

  const innerHandler = useMemo(() => {
    const handler: EventRef<Context> = {
      trigger: <Params = any,>(idsEntries: IdsEntries<Params>) => {
        collect.trigger(idsEntries)
      },
      getContext: () => {
        return collect.getContext()
      },
      setContext: (context: Context) => {
        return collect.setContext(context)
      },
    }
    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <EventCollectContext.Provider value={{ collect, handler: innerHandler }}>{children}</EventCollectContext.Provider>
  )
}

export const Event = forwardRef(InnerEvent) as typeof InnerEvent
