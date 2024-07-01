import { createContext } from 'react'

import { EventBusRef, IEventBusCollect } from './typing'

export const EventBusCollectContext = createContext<{
  collect: IEventBusCollect<any>
  handler: EventBusRef<any>
}>(null!)
