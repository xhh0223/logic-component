import { forwardRef, Ref, useImperativeHandle, useMemo, useRef } from 'react'

import { Id } from '@/typing'

import { EventCollectContext } from './context'
import { EventCollect } from './event-collect'
import { EventProps, EventRef, IdsEntries } from './typing'

const InnerEvent = <Context,>(props: EventProps<Context>, ref: Ref<EventRef<Context>>) => {
  const { children } = props
  const { current: collect } = useRef(new EventCollect<Context>())

  const innerHandler = useMemo(() => {
    const handler: EventRef<Context> = {
      emit: <Params = any,>(idsEntries: IdsEntries<Params>) => {
        collect.emit(idsEntries)
      },
      getContext: () => {
        return collect.getContext()
      },
      setContext: (context: Context) => {
        return collect.setContext(context)
      },
      on: <Params,>(params: {
        id: Id
        dependency: Id[]
        callback: (dependencyEntries: IdsEntries<Params>) => void
      }) => {
        const { id, dependency, callback } = params

        collect.setItem(id, {
          id,
          dependency,
          on(dependencyEntries: IdsEntries<Params>): void {
            callback(dependencyEntries)
          },
        })
      },
      off: (id: Id) => {
        collect.delItem(id)
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
