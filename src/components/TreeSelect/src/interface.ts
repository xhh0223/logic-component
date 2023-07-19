export interface TreeSelectItemInfo {
  id: string
  isChecked: boolean
  value: any
  refresh: () => void
}
export interface TreeSelectItemProps {
  value?: any;
  children?:
  | React.ReactNode
  | ((nodeInfo: { isChecked: boolean }) => React.ReactNode);
}

export interface TreeSelectContextInterface {
  addSelectItem(id: string, item: TreeSelectItemInfo): void
  delSelectItem(id: string): void
  getSelectItem(id: string): TreeSelectItemInfo
  getAllSelectItems(): TreeSelectItemInfo[]
}

export interface TreeSelectInstance {
  /** 触发选中 */
  triggerSelect(value: any): void;
}

export interface TreeSelectOption {
  key?: React.Key;
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
  selectedValue?: any;
  onChange?(v: any): void;
}