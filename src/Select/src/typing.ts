export type Id = string | number
export interface SelectItem<ValueType> {
  id: Id,
  value: ValueType,
  isChecked: boolean,
  refreshHandler: () => void,
}


export interface IContext<ValueType> {
  addSelectItem(selectItemId: Id, selectItem: SelectItem<ValueType>): void
  deleteSelectItem(selectItemId: Id): void
  getSelectItem(selectItemId: Id): SelectItem<ValueType> | undefined
  getAllSelectItem(): SelectItem<ValueType>[]
}

export interface SelectedValue<ValueType> {
  id: Id,
  value: ValueType
}