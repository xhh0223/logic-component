import { isNil, omitBy } from 'lodash-es'

import { type Id } from '@/typing'

import { type ISelectCollect, type ISelectItem } from './typing'
export class SelectCollect<ValueType = any> implements ISelectCollect<ValueType> {
  private readonly itemsCollect = new Map<Id, ISelectItem<ValueType>>()

  updateItemColumn(id: Id, params: Partial<Pick<ISelectItem<ValueType>, 'isChecked' | 'value'>>) {
    const item = this.getItem(id)
    if (params) {
      this.itemsCollect.set(
        id,
        omitBy(
          {
            ...item,
            isChecked: params.isChecked,
            value: params.value,
          },
          isNil,
        ),
      )
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
