import { type Id } from "@/typing";
import {
  type CanUpdateISelectItem,
  type ISelectCollect,
  type ISelectItem,
} from "./typing";

import { omit } from "lodash-es";
export class SelectCollect<ValueType = any>
  implements ISelectCollect<ValueType>
{
  private readonly itemsCollect = new Map<Id, ISelectItem<ValueType>>();

  updateItemPartialColumn = (
    id: Id,
    params: Partial<CanUpdateISelectItem<ValueType>>
  ) => {
    const item = this.getItem(id);
    if (params) {
      this.itemsCollect.set(id, {
        ...item,
        ...params,
      });
    }
  };

  getItem = (id: Id) => {
    const item = this.itemsCollect.get(id);
    return item ? omit(item, ["id"]) : item;
  };

  addItem = (item: ISelectItem<ValueType>) => {
    this.itemsCollect.set(item.id, omit(item, ["id"]));
  };

  delItem = (id: Id) => {
    this.itemsCollect.delete(id);
  };

  getAllItem = () => {
    return [...this.itemsCollect.entries()].map(
      ([key, value]) => [key, value] as const
    ) as any;
  };
}
