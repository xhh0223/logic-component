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
  set: (selectItemId: Id, selectItem: SelectItem<ValueType>) => void;
  delete: (selectItemId: Id) => void;
  get: (selectItemId: Id) => SelectItem<ValueType> | undefined;
  getAll: () => Array<SelectItem<ValueType>>;
}

export interface SelectSingleInterface<ValueType>
  extends SelectInterface<ValueType> {
  trigger: (selectItemId: Id) => SelectItem<ValueType>|undefined;
  reset: () => void;
}

export interface SelectMultipleInterface<ValueType>
  extends SelectInterface<ValueType> {
  getIdsByValues: (values: ValueType[]) => Id[];
  triggerAll: () => void;
  trigger: (selectItemIds: Id[]) => Array<SelectItem<ValueType>>;
  reset: (selectItemIds?: Id[]) => void;
}

export interface TreeSelectInterface<ValueType> {
  getPath: (id: Id) => Id[];
  getChildrenIds: (id: Id) => Id[] | undefined;
  getLevel: (id: Id) => number;
  set: (
    selectItemId: Id,
    selectItem: TreeSelectItem<ValueType>
  ) => void;
  delete: (selectItemId: Id) => void;
  get: (selectItemId: Id) => TreeSelectItem<ValueType> | undefined;
  getAll: () => Array<TreeSelectItem<ValueType>>;
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
