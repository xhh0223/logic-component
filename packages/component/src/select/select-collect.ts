import { type Id } from "@/typing";
import {
  type CanUpdateISelectItem,
  type ISelectCollect,
  type ISelectItem,
} from "./typing";
import { pick } from "lodash-es";
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
        ...pick(params, ["isChecked", "allowRepeatChecked", "value"]),
      });
    }
  };

  getItem = (id: Id) => {
    return this.itemsCollect.get(id);
  };

  addItem = (item: ISelectItem<ValueType>) => {
    this.itemsCollect.set(item.id, item);
  };

  delItem = (id: Id) => {
    this.itemsCollect.delete(id);
  };

  getAllItem = () => {
    return [...this.itemsCollect.entries()].map(([, value]) => value) as any;
  };
}
