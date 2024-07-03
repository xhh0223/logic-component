import { cloneDeep } from 'lodash-es'

import { Id, IdsEntries } from '@/typing'

import { IEventBusCollect, IEventBusItem } from './typing'
export class EventBusCollect<Context = any> implements IEventBusCollect<Context> {
  private collect = new Map<Id, IEventBusItem>()
  private context: any
  getContext = () => {
    return this.context
  }
  setContext = (context) => {
    this.context = context
  }

  getItem = (id) => {
    return this.collect.get(id)
  }

  setItem = (id: any, params: IEventBusItem) => {
    this.collect.set(id, params)
  }
  delItem = (id) => {
    this.collect.delete(id)
  }
  emit = <Params = any>(idsEntries: IdsEntries<Params>) => {
    const idsMap = new Map<Id, Params>(idsEntries as any)

    for (const item of this.collect.values()) {
      const dependencySet = new Set(item.onIds)
      if (item.onIds?.some((id) => idsMap.has(id))) {
        item.on(cloneDeep(idsEntries.filter(([id]) => dependencySet.has(id))))
      }
    }
  }
}
