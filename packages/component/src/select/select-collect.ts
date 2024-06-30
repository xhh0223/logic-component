import { type Id } from '@/typing'

import { type ISelectCollect, type ISelectItem } from './typing'
export class SelectCollect<ValueType = any> implements ISelectCollect<ValueType> {
  private readonly itemsCollect = new Map<Id, ISelectItem<ValueType>>()

  updateItemColumn(id: Id, params: Partial<Pick<ISelectItem<ValueType>, 'isChecked' | 'value'>>) {
    const item = this.getItem(id)
    if (params) {
      this.itemsCollect.set(id, {
        id,
        isChecked: params.isChecked ?? item.isChecked,
        value: params.value ?? item.value,
        refresh: item.refresh,
      })
      item?.refresh()
    }
  }

  getItem = (id: Id) => {
    return this.itemsCollect.get(id)
  }

  setItem = (id: Id, item: ISelectItem<ValueType>) => {
    this.itemsCollect.set(id, item)
  }

  delItem = (id: Id) => {
    this.itemsCollect.delete(id)
  }

  getAllItem = () => {
    return [...this.itemsCollect.entries()].map(([, value]) => value) as any
  }
}
