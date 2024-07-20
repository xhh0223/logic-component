import { createContext, useContext } from 'react'

import { EventBusHandler, IEventBusCollect } from './typing'

export const EventBusCollectContext = createContext<{
  collect: IEventBusCollect<any>
  handler: EventBusHandler<any>
}>(null!)

export const useEventBus = <Context = any>() => {
  const { handler } = useContext(EventBusCollectContext)
  return handler as EventBusHandler<Context>
}
