import { equals } from "ramda";
import {
  type SelectSingleSelectInterface,
  type Id,
  type SelectItem,
} from "./typing";

export class SelectSingle<ValueType>
  implements SelectSingleSelectInterface<ValueType>
{
  private readonly map = new Map<Id, SelectItem<ValueType>>();
  constructor(options?: Array<SelectItem<ValueType>>) {
    options?.forEach((option) => {
      this.setSelectItem(option.id, option);
    });
  }

  async reset() {
    for (const item of this.getAllSelectItem()) {
      if (item.isChecked) {
        item.isChecked = false;
        item.onCheckedChange(item);
        break;
      }
    }
  }

  async trigger(selectItemId: Id) {
    const selectedItem = this.getSelectItem(selectItemId);
    if (!selectedItem) {
      console.error("selectItem的id不存在");
      return;
    }
    for (const item of this.getAllSelectItem()) {
      if (item.isChecked && item.id !== selectItemId) {
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
  }

  getIdByValue(value: ValueType) {
    for (const item of this.getAllSelectItem()) {
      if (equals(item.value, value)) {
        return item.id;
      }
    }
  }

  setSelectItem = (selectItemId: Id, selectItem: SelectItem<ValueType>) => {
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
