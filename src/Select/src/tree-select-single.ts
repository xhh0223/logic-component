import { equals } from "ramda";
import {
  type TreeSelectItem,
  type TreeSelectInterface,
  type Id,
} from "./typing";
import { computedPath, getChildrenIds } from "./utils";

export class TreeSelectSingle<ValueType>
  implements TreeSelectInterface<ValueType>
{
  private readonly map = new Map<Id, TreeSelectItem<ValueType>>();

  constructor(options: Array<TreeSelectItem<ValueType>>) {
    options?.forEach((option) => {
      this.setSelectItem(option.id, option);
    });
  }

  getPath = (id: Id) => {
    return computedPath<ValueType>(
      id,
      [],
      this as TreeSelectInterface<ValueType>
    );
  };

  async reset() {
    for (const item of this.getAllSelectItem()) {
      if (item.isChecked) {
        item.isChecked = false;
        item.onCheckedChange(item);
        break;
      }
    }
  }

  trigger = (id: Id) => {
    const selectedItem = this.getSelectItem(id);
    if (!selectedItem) {
      console.error("treeSelectItem的id不存在");
      return;
    }

    for (const item of this.getAllSelectItem()) {
      if (item.isChecked && item.id !== id) {
        item.isChecked = false;
        item.onCheckedChange(item);
        break;
      }
    }

    if (selectedItem.repeatTriggerUnselected) {
      selectedItem.isChecked = !selectedItem.isChecked;
    } else {
      selectedItem.isChecked = true;
    }
    selectedItem.onCheckedChange(selectedItem);
    return selectedItem;
  };

  getLevel = (id: Id) => {
    return computedPath(id, [], this as TreeSelectInterface<ValueType>)?.length;
  };

  getChildrenIds = (id: Id) => {
    return getChildrenIds(id, this as TreeSelectInterface<ValueType>);
  };

  getIdByValue = (value: ValueType) => {
    for (const item of this.getAllSelectItem()) {
      if (equals(item.value, value)) {
        return item.id;
      }
    }
  };

  setSelectItem = (selectItemId: Id, selectItem: TreeSelectItem<ValueType>) => {
    this.map.set(selectItemId, selectItem);
  };

  deleteSelectItem = (selectItemId: Id) => {
    this.map.delete(selectItemId);
  };

  getSelectItem = (selectItemId: Id) => {
    return this.map.get(selectItemId);
  };

  getAllSelectItem = () => {
    return [...this.map.values()];
  };
}
