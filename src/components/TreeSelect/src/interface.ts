type Id = string | number

export interface TreeSelectItemInfo {
  id: Id
  isChecked: boolean
  value: any
  refreshHandler: () => void
}
export interface TreeSelectItemProps {
  id: Id
  value?: any;
  children?:
  | React.ReactNode
  | ((nodeInfo: { isChecked: boolean }) => React.ReactNode);
}

export interface TreeSelectContextInterface {
  addSelectItem(id: Id, item: TreeSelectItemInfo): void
  delSelectItem(id: Id): void
  getSelectItem(id: Id): TreeSelectItemInfo
  getAllSelectItems(): TreeSelectItemInfo[]
}

export interface TreeSelectInstance {
  /** 触发选中 */
  triggerSelect(selectedId: Id | (Id[])): void;
}

export interface TreeSelectOption {
  id: Id
  node: TreeSelectItemProps["children"];
  value: any;
  childrenOptions?: TreeSelectOption[];
  // | (() => TreeSelectOption[]);
}

export interface TreeSelectProps {
  mode?: "single" | "multiple";
  instance: TreeSelectInstance;
  options: TreeSelectOption[];
  /** 重复触发,取消选中状态，针对单选有效 */
  repeatTriggerUnselected?: boolean;
  selectedId?: any;
  onChange?(value: any, id: Id | (Id[])): void;
}