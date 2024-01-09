export type Id = string | number;
export interface SelectItem<ValueType> {
  id: Id;
  value: ValueType;
  isChecked: boolean;
  /** 选中状态变化触发 */
  onCheckedChange: (item: SelectItem<ValueType>) => void;
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean;
}

export interface TreeSelectItem<ValueType> extends SelectItem<ValueType> {
  parentId: Id;
}

export interface SelectInterface<ValueType> {
  getIdByValue: (value: ValueType) => Id | undefined;
  setSelectItem: (selectItemId: Id, selectItem: SelectItem<ValueType>) => void;
  deleteSelectItem: (selectItemId: Id) => void;
  getSelectItem: (selectItemId: Id) => SelectItem<ValueType> | undefined;
  getAllSelectItem: () => Array<SelectItem<ValueType>>;
}

export interface SelectSingleSelectInterface<ValueType>
  extends SelectInterface<ValueType> {
  trigger: (selectItemId: Id) => void;
  reset: () => void;
}

export interface SelectMultipleSelectInterface<ValueType>
  extends SelectInterface<ValueType> {
  getIdsByValues: (values: ValueType[]) => Id[];
  triggerAll: () => void;
  trigger: (selectItemIds: Id[]) => void;
  reset: (selectItemIds?: Id[]) => void;
}

export interface TreeSelectInterface<ValueType> {
  getPath: (id: Id) => Id[];
  getChildrenIds: (id: Id) => Id[] | undefined;
  getLevel: (id: Id) => number;
  setSelectItem: (
    selectItemId: Id,
    selectItem: TreeSelectItem<ValueType>
  ) => void;
  deleteSelectItem: (selectItemId: Id) => void;
  getSelectItem: (selectItemId: Id) => TreeSelectItem<ValueType> | undefined;
  getAllSelectItem: () => Array<TreeSelectItem<ValueType>>;
}

export interface TreeSelectSingleInterface<ValueType>
  extends TreeSelectInterface<ValueType> {
  trigger: (selectItemId: Id) => void;
  reset: () => void;
}
export interface TreeSelectMultipleInterface<ValueType>
  extends TreeSelectInterface<ValueType> {
  getIdsByValues: (values: ValueType[]) => Id[];
  triggerAll: () => void;
  trigger: (selectItemIds: Id[]) => void;
  reset: (selectItemIds?: Id[]) => void;
}
