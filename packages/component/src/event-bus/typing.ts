import { Ref } from 'react'

import { type Id } from '@/typing'

export type MultipleParams<Param> = Array<{
  id: Id
  params: Param
}>

export interface IEventBusItem {
  id: Id
  onIds: Id[]
  on(onIdsParams: MultipleParams<any>): void
}

export interface IEventBusCollect<Context = any> {
  getContext: () => Context
  setContext: (context: Context) => void
  getItem: (id) => IEventBusItem | undefined
  setItem: (id, params: IEventBusItem) => void
  delItem: (id: Id) => void
  emit: <Params = any>(multipleParams: MultipleParams<Params>) => void
}

export type EventBusRef<Context = any> = {
  emit: IEventBusCollect<Context>['emit']
  on: <Params>(params: { id: Id; onIds: Id[]; callback: (multipleParams: MultipleParams<Params>) => void }) => void
  off: (id: Id) => void
  getContext: IEventBusCollect<Context>['getContext']
  setContext: IEventBusCollect<Context>['setContext']
}
export interface EventBusProps<Context> {
  initCallback?: (params: { handler: EventBusRef<Context> }) => void
  children: React.ReactNode
  ref?: Ref<EventBusRef<Context>>
}
export interface EventBusItemProps<Params = any, Context = any> {
  key: Id
  id: Id
  onIds?: Id[]
  initCallback?: (params: { handler: EventBusRef<Context> }) => void
  render: (params: {
    id: Id
    onIdsParams: MultipleParams<Params>
    handler: EventBusRef<Context>
    context: Context
  }) => React.ReactNode
}
