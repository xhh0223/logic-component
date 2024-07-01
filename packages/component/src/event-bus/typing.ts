import { Ref } from 'react'

import { type Id, IdsEntries } from '@/typing'

export interface IEventBusItem {
  id: Id
  dependency: Id[]
  on(dependencyEntries: IdsEntries<any>): void
}

export interface IEventBusCollect<Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  getItem: (id) => IEventBusItem | undefined
  setItem: (id, params: IEventBusItem) => void
  delItem: (id: Id) => void
  emit: <Params = any>(idsEntries: IdsEntries<Params>) => void
}

export type EventBusRef<Context = any> = {
  emit: IEventBusCollect<Context>['emit']
  on: <Params>(params: { id: Id; dependency: Id[]; callback: (dependencyEntries: IdsEntries<Params>) => void }) => void
  off: (id: Id) => void
  getContext: IEventBusCollect<Context>['getContext']
  setContext: IEventBusCollect<Context>['setContext']
}
export interface EventBusProps<Context> {
  children: React.ReactNode
  ref?: Ref<EventBusRef<Context>>
}
export interface EventBusItemProps<Params = any, Context = any> {
  id: Id
  dependency?: Id[]
  render: (params: {
    id: Id
    dependencyEntries: IdsEntries<Params>
    handler: EventBusRef<Context>
    context: Context
  }) => React.ReactNode
}
