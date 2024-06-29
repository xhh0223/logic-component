import { cloneDeep } from 'lodash-es'

import { Id } from '@/typing'

import { IdsEntries, IEventCollect, IEventItem } from './typing'
export class EventCollect<Context = any> implements IEventCollect<Context> {
  private collect = new Map<Id, IEventItem>()
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

  setItem = (id: any, params: IEventItem) => {
    this.collect.set(id, params)
  }
  delItem = (id) => {
    this.collect.delete(id)
  }
  trigger = <Params = any>(idsEntries: IdsEntries<Params>) => {
    const idsMap = new Map<Id, Params>(idsEntries as any)

    for (const item of this.collect.values()) {
      const dependencySet = new Set(item.dependency)
      if (idsMap.has(item.id) || item.dependency?.some((id) => idsMap.has(id))) {
        item.on(cloneDeep(idsEntries.filter(([id]) => dependencySet.has(id))))
      }
    }
  }
}
