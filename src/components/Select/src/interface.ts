export interface SelectInstance {
  /** 触发选中 */
  triggerSelect(selectedValue: any): void;
}

export interface SelectItemProps {
  value: any;
  children?:
  | React.ReactNode
  | ((params: { isChecked: boolean }) => React.ReactNode);
}


export interface SelectOption {
  /** reactKey diff算法用的 */
  key?: React.Key;
  node: SelectItemProps["children"];
  value: any;
}

export interface SelectProps {
  mode?: "single" | "multiple";
  /** 重复触发,取消选中状态，针对单选有效 */
  repeatTriggerUnselected?: boolean;
  /** 用来动态初始化选中值 */
  selectedValue?: any;
  onChange?(selectedValue: any): void;
  instance: SelectInstance;
  options: SelectOption[];
}
