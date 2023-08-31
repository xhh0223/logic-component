export type Id = string

export interface SelectRef {
  /** 触发选中,单选传一个ID,多选传多个ID */
  triggerSelect(selectedId: Id | Id[]): void;
}

export interface SelectItem<Value> {
  id: Id,
  value: Value,
  isChecked: boolean,
  refreshHandler: () => void,
}

export interface IContext<Value> {
  addSelectItem(selectItemId: Id, selectItem: SelectItem<Value>): void
  deleteSelectItem(selectItemId: Id): void
  getSelectItem(selectItemId: Id): SelectItem<Value>
  getAllSelectItem(): SelectItem<Value>[]
}