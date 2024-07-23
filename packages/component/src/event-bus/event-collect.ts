import { Id } from '@/typing'

import { IEventBusCollect, IEventBusItem, MultipleParams } from './typing'
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
  emit = <Params = any>(multipleParams: MultipleParams<Params>) => {
    const idsMap = new Map<Id, Params>(multipleParams?.map((i) => [i.id, i.params]))
    for (const item of this.collect.values()) {
      const dependencySet = new Set(item.onIds)
      if (item.onIds?.some((id) => idsMap.has(id))) {
        item.on(multipleParams.filter((item) => dependencySet.has(item.id)))
      }
    }
  }
}
