import { type Id } from '@/typing'

export interface ISelectItem<ValueType = any> {
  id: Id
  isChecked: boolean
  value: ValueType
  refresh: () => void
}

export interface ISelectCollect<ValueType> {
  setItem(id: Id, item: ISelectItem<ValueType>): void
  delItem(id: Id): void
  getItem(id: Id): ISelectItem<ValueType> | undefined
  updateItemColumn(id: Id, params: Partial<Pick<ISelectItem<ValueType>, 'isChecked' | 'value'>>): void
  getAllItem(): Array<ISelectItem<ValueType>>
}

export type RequiredISelectItem<ValueType> = Required<Pick<ISelectItem<ValueType>, 'id' | 'isChecked' | 'value'>>

export type MultipleOptions = Array<{
  id: Id
  options?: {
    allowRepeatSelect?: boolean
  }
}>
