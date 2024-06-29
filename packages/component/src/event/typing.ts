import { Ref } from 'react'

import { type Id } from '@/typing'
export type IdsEntries<Params> = Array<[Id, Params?]>

export interface IEventItem {
  id: Id
  dependency: Id[]
  on(dependencyEntries: IdsEntries<any>): void
}

export interface IEventCollect<Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  getItem: (id) => IEventItem | undefined
  setItem: (id, params: IEventItem) => void
  delItem: (id: Id) => void
  emit: <Params = any>(idsEntries: IdsEntries<Params>) => void
}

export type EventRef<Context = any> = {
  emit: IEventCollect<Context>['emit']
  on: <Params>(params: { id: Id; dependency: Id[]; callback: (dependencyEntries: IdsEntries<Params>) => void }) => void
  off: (id: Id) => void
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
