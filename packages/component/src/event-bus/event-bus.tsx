import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { EventBusCollectContext } from './context'
import { EventBusCollect } from './event-collect'
import { EventBusProps, EventBusRef, MultipleParams } from './typing'

const InnerEventBus = <Context,>(props: EventBusProps<Context>, ref: Ref<EventBusRef<Context>>) => {
  const { children, initCallback } = props
  const { current: collect } = useRef(new EventBusCollect<Context>())

  const innerHandler = useMemo(() => {
    const handler: EventBusRef<Context> = {
      emit: <Params = any,>(multipleParams: MultipleParams<Params>) => {
        collect.emit(multipleParams)
      },
      getContext: () => {
        return collect.getContext()
      },
      setContext: (context: Context) => {
        return collect.setContext(context)
      },
      on: <Params,>(params: { id: Id; onIds: Id[]; callback: (onMultipleParams: MultipleParams<Params>) => void }) => {
        const { id, onIds, callback } = params

        collect.setItem(id, {
          id,
          onIds,
          on(onMultipleParams: MultipleParams<Params>): void {
            callback(onMultipleParams)
          },
        })
      },
      off: (id: Id) => {
        collect.delItem(id)
      },
    }
    if (typeof initCallback === 'function') {
      initCallback({ handler })
    }
    return handler
  }, [])

  useImperativeHandle(ref, () => innerHandler, [ref])

  return (
    <EventBusCollectContext.Provider value={{ collect, handler: innerHandler }}>
      {children}
    </EventBusCollectContext.Provider>
  )
}

export const EventBus = forwardRef(InnerEventBus) as typeof InnerEventBus
