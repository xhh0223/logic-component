import { Ref } from 'react'

import { type Id } from '@/typing'
export type IdsEntries<Params> = Array<[Id, Params?]>

export interface IEventItem {
  id: Id
  dependency: Id[]
  on(idsEntries: IdsEntries<any>): void
}

export interface IEventCollect<Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  getItem: (id) => IEventItem | undefined
  setItem: (id, params: IEventItem) => void
  delItem: (id: Id) => void
  trigger: <Params = any>(idsEntries: IdsEntries<Params>) => void
}

export type EventRef<Context = any> = {
  trigger: IEventCollect<Context>['trigger']
  getContext: IEventCollect<Context>['getContext']
  setContext: IEventCollect<Context>['setContext']
}
export interface EventProps<Context> {
  children: React.ReactNode
  ref?: Ref<EventRef<Context>>
}
export interface EventItemProps<Params = any, Context = any> {
  id: Id
  dependency?: Id[]
  render: (params: { id: Id; dependencyEntries: IdsEntries<Params>; handler: EventRef<Context> }) => React.ReactNode
}
