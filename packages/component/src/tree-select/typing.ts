import { type Id } from '@/typing'

export interface ITreeSelectItem<ValueType = any> {
  id: Id
  isChecked: boolean
  value?: ValueType
  refresh: () => void
  parentId: Id
  childrenIds: Id[]
}

export type CanUpdateITreeSelectItem<ValueType> = Pick<
  ITreeSelectItem<ValueType>,
  'isChecked' | 'childrenIds' | 'parentId' | 'value'
>

export interface ISelectCollect<ValueType> {
  updateItemColumn(id: Id, params: CanUpdateITreeSelectItem<ValueType>): void
  setItem(id, item: ITreeSelectItem<ValueType>): void
  delItem(id: Id): void
  getItem(id: Id): ITreeSelectItem<ValueType> | undefined
  updateItemColumn(id: Id, params: Partial<ITreeSelectItem<ValueType>>): void
  getAllItem: () => Array<ITreeSelectItem<ValueType>>
}

export type RequiredITreeSelectItem<ValueType> = Required<
  Pick<ITreeSelectItem<ValueType>, 'id' | 'isChecked' | 'value' | 'childrenIds' | 'parentId'>
>

export interface CommonTreeSelectItemProps<ValueType> {
  key: Id
  id: ITreeSelectItem<ValueType>['id']
  parentId: ITreeSelectItem<ValueType>['parentId']
  childrenIds?: ITreeSelectItem<ValueType>['childrenIds']
  value?: ITreeSelectItem<ValueType>['value']
}

export type MultipleOptions = Array<{
  id: Id
  options?: {
    allowRepeatSelect?: boolean
  }
}>
