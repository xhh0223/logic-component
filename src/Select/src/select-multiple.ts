import { equals } from "ramda";
import {
  type SelectMultipleSelectInterface,
  type Id,
  type SelectItem,
} from "./typing";

export class SelectMultiple<ValueType>
  implements SelectMultipleSelectInterface<ValueType>
{
  private readonly map = new Map<Id, SelectItem<ValueType>>();
  constructor(options?: Array<SelectItem<ValueType>>) {
    options?.forEach((option) => {
      this.setSelectItem(option.id, option);
    });
  }

  getIdsByValues = (values: ValueType[]) => {
    const allSelectItem = this.getAllSelectItem();
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

  reset = (selectItemIds?: Id[]) => {
    const allSelectItem = this.getAllSelectItem();
    if (Array.isArray(selectItemIds)) {
      /** 多选 */
      selectItemIds?.forEach((id) => {
        const selectItem = this.getSelectItem(id);
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
    this.getAllSelectItem()?.forEach((i) => {
      if (!i.isChecked) {
        i.onCheckedChange(i);
      }
    });
  };

  trigger = (selectItemIds: Id[]) => {
    if (Array.isArray(selectItemIds)) {
      /** 多选 */
      const selectedItems: Array<SelectItem<ValueType>> = [];
      selectItemIds?.forEach((id) => {
        const selectItem = this.getSelectItem(id);
        if (!selectItem) return;

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

  getIdByValue = (value: ValueType) => {
    for (const item of this.getAllSelectItem()) {
      if (equals(item.value, value)) {
        return item.id;
      }
    }
  };

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
