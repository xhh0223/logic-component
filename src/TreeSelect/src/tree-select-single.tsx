import React, { Ref, forwardRef, useImperativeHandle, useMemo } from "react";
import { Context, SelectContext } from "./context";
import { Id, SelectedValue } from "./typing";
import { computedPath, getChildrenIds } from "./utils";


export interface TreeSelectSingleProps {
  children: React.ReactNode
}

export interface TreeSelectSingleRef<ValueType> {
  reset(): Promise<void>
  trigger(selectedId: Id): Promise<SelectedValue<ValueType>>
}

const InnerTreeSelectSingle = <ValueType,>(props: TreeSelectSingleProps, ref: Ref<TreeSelectSingleRef<ValueType>>) => {
  const { children } = props
  const selectContext = useMemo(() => new Context<ValueType>(), []);

  useImperativeHandle(ref, () => ({
    async reset() {
      const { getAllSelectItem } = selectContext
      for (let item of getAllSelectItem()) {
        if (item.isChecked) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }
    },
    async trigger(id) {
      const { getAllSelectItem, getSelectItem } = selectContext
      const allSelectItem = getAllSelectItem()

      let selectedItem = getSelectItem(id)
      if (!selectedItem) {
        return Promise.reject("id不存在")
      }

      for (let item of allSelectItem) {
        if (item.isChecked && item.id !== id) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }

      if (selectedItem.repeatTriggerUnselected) {
        selectedItem.isChecked = !selectedItem.isChecked
      } else {
        selectedItem.isChecked = true
      }
      selectedItem.refreshHandler()

      const path = computedPath(selectedItem.id, [], selectContext)
      return {
        id: selectedItem.id,
        value: selectedItem.value,
        isChecked: selectedItem.isChecked,
        parentId: selectedItem.parentId,
        path,
        level: path.length,
        childrenIds: getChildrenIds(selectedItem.id, selectContext)
      }
    }
  }), [])

  return (
    <SelectContext.Provider value={selectContext}>
      {children}
    </SelectContext.Provider>
  );
};

type ForwardRefReturnType<Value> = ReturnType<typeof forwardRef<TreeSelectSingleRef<Value>, TreeSelectSingleProps>>

/** 保留单选泛型 */
interface InnerTreeSelectSingleType {
  <Value,>(
    ...params: Parameters<ForwardRefReturnType<Value>>
  ): ReturnType<ForwardRefReturnType<Value>>
}

export const TreeSelectSingle = forwardRef(InnerTreeSelectSingle) as InnerTreeSelectSingleType