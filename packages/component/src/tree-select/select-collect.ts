import { type Id } from "@/typing";

import {
  type CanUpdateITreeSelectItem,
  type ISelectCollect,
  type ITreeSelectItem,
} from "./typing";

import { pick } from "lodash-es";
export class SelectCollect<ValueType = any>
  implements ISelectCollect<ValueType>
{
  private readonly itemsCollect = new Map<Id, ITreeSelectItem<ValueType>>();

  updateItemPartialColumn = (
    id: Id,
    params: Partial<CanUpdateITreeSelectItem<ValueType>>
  ) => {
    const item = this.getItem(id);
    if (params) {
      this.itemsCollect.set(id, {
        ...item,
        ...pick(params, [
          "parentId",
          "descendantsIds",
          "isChecked",
          "allowRepeatChecked",
          "value",
        ]),
      });
    }
  };

  getItem = (id: Id) => {
    return this.itemsCollect.get(id);
  };

  addItem = (item: ITreeSelectItem<ValueType>) => {
    this.itemsCollect.set(item.id, item);
  };

  delItem = (id: Id) => {
    this.itemsCollect.delete(id);
  };

  getAllItem = () => {
    return [...this.itemsCollect.entries()].map(([, value]) => value) as any;
  };
}
