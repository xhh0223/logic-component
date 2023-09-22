export type Id = string | number
export interface SelectItem<ValueType> {
  id: Id
  value: ValueType
  isChecked: boolean
  refreshHandler: () => void
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean
}

export interface IContext<ValueType> {
  setSelectItem: (selectItemId: Id, selectItem: SelectItem<ValueType>) => void
  deleteSelectItem: (selectItemId: Id) => void
  getSelectItem: (selectItemId: Id) => SelectItem<ValueType> | undefined
  getAllSelectItem: () => Array<SelectItem<ValueType>>
}

export interface SelectedValue<ValueType> {
  id: Id
  value: ValueType
  isChecked: boolean
}
