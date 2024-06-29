import { createContext } from 'react'

import { EventRef, IEventCollect } from './typing'

export const EventCollectContext = createContext<{
  collect: IEventCollect<any>
  handler: EventRef<any>
}>(null!)
