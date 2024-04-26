import { type Id } from "@/typing";
import { type ISelectCollect, type ISelectItem } from "./typing";

export class SelectCollect<ValueType = any>
  implements ISelectCollect<ValueType>
{
  private readonly itemsCollect = new Map();
  updateItemPartialColumn = (
    id: Id,
    params: Partial<Omit<ISelectItem<ValueType>, "id">>
  ) => {
    const item = this.getItem(id);
    if (params) {
      // todo
      Object.assign(item, params);
    }
  };

  getItem = (id: Id) => {
    return this.itemsCollect.get(id) as ISelectItem<any>;
  };

  addItem = (item: ISelectItem<ValueType>) => {
    this.itemsCollect.set(item.id, item);
  };

  delItem = (id: Id) => {
    this.itemsCollect.delete(id);
  };

  getAllItem = (): Array<[Id, ISelectItem<ValueType>]> => {
    return [...this.itemsCollect.entries()].map((i) => [i[0], i[1]]);
  };
}
