import { equals } from "ramda";
import {
  type TreeSelectItem,
  type TreeSelectInterface,
  type Id,
} from "./typing";
import { computedPath, getChildrenIds } from "./utils";

export class TreeSelectMultiple<ValueType>
  implements TreeSelectInterface<ValueType>
{
  private readonly map = new Map<Id, TreeSelectItem<ValueType>>();

  constructor(options: Array<TreeSelectItem<ValueType>>) {
    options?.forEach((option) => {
      this.set(option.id, option);
    });
  }

  reset = (selectItemIds?: Id[]) => {
    const allSelectItem = this.getAll();
    if (Array.isArray(selectItemIds)) {
      /** 多选 */
      selectItemIds?.forEach((id) => {
        const selectItem = this.get(id);
        if (selectItem?.isChecked) {
          selectItem.isChecked = false;
          selectItem.onCheckedChange(selectItem);
        }
      });
    } else {
      allSelectItem.forEach((item) => {
        if (item.isChecked) {
          item.isChecked = false;
          item.onCheckedChange(item);
        }
      });
    }
  };

  triggerAll = () => {
    this.getAll()?.forEach((i) => {
      if (!i.isChecked) {
        i.onCheckedChange(i);
      }
    });
  };

  trigger = (selectItemIds: Id[]) => {
    if (Array.isArray(selectItemIds)) {
      /** 多选 */
      const selectedItems: Array<TreeSelectItem<ValueType>> = [];
      selectItemIds?.forEach((id) => {
        const selectItem = this.get(id);
        if (!selectItem) {
          return;
        }
        if (selectItem.repeatTriggerUnselected) {
          selectItem.isChecked = !selectItem.isChecked;
        } else {
          selectItem.isChecked = true;
        }
        selectItem.onCheckedChange(selectItem);
        selectedItems.push(selectItem);
      });
      return selectedItems;
    }
    return [];
  };

  getPath(id: Id) {
    return computedPath(id, [], this as TreeSelectInterface<ValueType>);
  }

  getLevel(id: Id) {
    return computedPath(id, [], this as TreeSelectInterface<ValueType>)?.length;
  }

  getChildrenIds(id: Id) {
    return getChildrenIds(id, this as TreeSelectInterface<ValueType>);
  }

  getIdByValue = (value: ValueType) => {
    for (const item of this.getAll()) {
      if (equals(item.value, value)) {
        return item.id;
      }
    }
  };

  getIdsByValues = (values: ValueType[]) => {
    const allSelectItem = this.getAll();
    const ids: Id[] = [];
    if (Array.isArray(values)) {
      values?.forEach((value) => {
        for (const item of allSelectItem) {
          if (equals(item.value, value)) {
            ids.push(item.id);
            break;
          }
        }
      });
    }
    return ids;
  };

  set = (selectItemId: Id, selectItem: TreeSelectItem<ValueType>) => {
    this.map.set(selectItemId, selectItem);
  };

  delete = (selectItemId: Id) => {
    this.map.delete(selectItemId);
  };

  get = (selectItemId: Id) => {
    return this.map.get(selectItemId);
  };

  getAll = () => {
    return [...this.map.values()];
  };
}
