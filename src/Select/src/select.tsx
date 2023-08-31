import React, { Ref, forwardRef, useImperativeHandle, useMemo } from "react";
import { Context, SelectContext } from "./context";
import { clone, equals } from "ramda";
import { Id } from "./typing";
export interface SelectProps<Value> {
  /** 重复触发,取消选中状态，针对单选有效 */
  repeatTriggerUnselected?: boolean;
  onChange(selectedValue: Value | undefined, selectedId: Id | undefined): void;
  onChange(selectedValues: Value[], selectedIds: Id[]): void;
  children: React.ReactNode
}

export interface SelectRef {
  trigger(selectedId: Id): void
  trigger(selectedIds: Id[]): void
}

const InnerSelect = <Value,>(props: SelectProps<Value>, ref: Ref<SelectRef>) => {
  const {
    repeatTriggerUnselected = true,
    onChange,
    children
  } = props;

  const selectContext = useMemo(() => new Context<Value>(), []);

  useImperativeHandle(ref, () => ({
    trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      if (Array.isArray(id)) {
        const ids = id
        const allSelectItem = getAllSelectItem();
        ids?.forEach((id) => {
          const selectItem = getSelectItem(id);
          if (selectItem) {
            selectItem.isChecked = !selectItem.isChecked;
            selectItem.refreshHandler();
          }
        });
        if (onChange) {
          const selectValues: Value[] = [];
          const selectedIds: Id[] = [];
          allSelectItem.forEach((item) => {
            if (item.isChecked) {
              selectValues.push(item.value);
              selectedIds.push(item.id);
            }
          });
          onChange(clone(selectValues), selectedIds);
        }
      } else {
        /** 单选 */
        if (![typeof id === 'number', typeof id === 'string'].includes(true)) {
          return
        }
        let selectedItem = getSelectItem(id)
        for (let item of getAllSelectItem()) {
          if (item.isChecked && item.id !== id) {
            item.isChecked = false
            item.refreshHandler()
            break;
          }
        }
        if (repeatTriggerUnselected) {
          selectedItem.isChecked = !selectedItem.isChecked
        }
        selectedItem?.refreshHandler()
        if (onChange) {
          onChange(
            selectedItem.isChecked
              ? clone(selectedItem?.value)
              : undefined,
            selectedItem.isChecked ?
              selectedItem.id :
              undefined
          );
        }
      }
    }
  }), [])

  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  );
};

export const Select = forwardRef(InnerSelect)