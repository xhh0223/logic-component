export type Id = string | number

export interface SelectInstance {
  /** 触发选中,单选传一个ID,多选传多个ID */
  triggerSelect(selectedId: Id | Id[]): void;
}


export interface SelectItemProps {
  id: Id
  value: any;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}


export interface SelectOption {
  /** 快速找到value */
  id: Id;
  node: SelectItemProps["children"];
  value: any;
}

export interface SelectProps {
  mode?: "single" | "multiple";
  /** 重复触发,取消选中状态，针对单选有效 */
  repeatTriggerUnselected?: boolean;
  /** 用动态初始化选中值 */
  selectedId?: Id | (Id[]);
  onChange?(selectedValue: any, selectedId: Id | (Id[])): void;
  instance: SelectInstance;
  options: SelectOption[];
}
