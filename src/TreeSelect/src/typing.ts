import { Id as tempId, SelectItem as Item, SelectedValue as Value } from '@/Select/src/typing'

export type Id = tempId

export type SelectItem<ValueType> = Item<ValueType> & {
  parentId: Id
}

export interface IContext<ValueType> {
  addSelectItem(selectItemId: Id, selectItem: SelectItem<ValueType>): void
  deleteSelectItem(selectItemId: Id): void
  getSelectItem(selectItemId: Id): SelectItem<ValueType>
  getAllSelectItem(): SelectItem<ValueType>[]
}

export type SelectedValue<ValueType> = Value<ValueType> & {
  path: Id[],
  /** 当前选中值的层级 */
  level: number,
  parentId: Id,
  childrenIds: Id[]
}