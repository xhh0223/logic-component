import React, { Ref, forwardRef, useImperativeHandle, useMemo } from "react";
import { Context, SelectContext } from "./context";
import { clone } from "ramda";
import { Id, SelectedValue } from "./typing";


export interface TreeSelectSingleProps {
  /** 重复触发取消选中 */
  repeatTriggerUnselected?: boolean;
  children: React.ReactNode
}

export interface TreeSelectSingleRef<ValueType> {
  reset(): Promise<void>
  trigger(selectedId: Id): Promise<SelectedValue<ValueType>>
}

const InnerTreeSelectSingle = <ValueType,>(props: TreeSelectSingleProps, ref: Ref<TreeSelectSingleRef<ValueType>>) => {
  const { repeatTriggerUnselected = true, children } = props
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
      if ([!(typeof id === 'string'), !selectedItem].includes(true)) {
        return Promise.reject("id不存在")
      }

      for (let item of allSelectItem) {
        if (item.isChecked && item.id !== id) {
          item.isChecked = false
          item.refreshHandler()
          break;
        }
      }

      if (repeatTriggerUnselected) {
        selectedItem.isChecked = !selectedItem.isChecked
      } else {
        selectedItem.isChecked = true
      }
      selectedItem.refreshHandler()

      function computedPath(id: Id, path = [] as Id[]) {
        path.unshift(id)
        const selectedItem = getSelectItem(id)
        if (!selectedItem) {
          return path
        }
        computedPath(selectedItem.parentId, path)
        return path
      }

      function getChildrenIds(id: Id) {
        let result = []
        for (let i of allSelectItem) {
          if (i.parentId === id) {
            result.push(i.id)
          }
        }
        return result
      }

      const path = computedPath(selectedItem.id, [])
      let result: SelectedValue<ValueType> = {
        id: selectedItem.id,
        value: selectedItem.isChecked ? clone(selectedItem.value) : undefined,
        isChecked: selectedItem.isChecked,
        parentId: selectedItem.parentId,
        path,
        level: path.length,
        childrenIds: getChildrenIds(selectedItem.id)
      }
      return result
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