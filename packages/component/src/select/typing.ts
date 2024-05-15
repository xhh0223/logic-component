import { type Id } from "@/typing";

export interface ISelectItem<ValueType = any> {
  id: Id;
  isChecked?: boolean;
  allowRepeatChecked?: boolean;
  value?: ValueType;
  refresh: () => void;
}

export type CanUpdateISelectItem<ValueType> = Pick<
  ISelectItem<ValueType>,
  "isChecked" | "allowRepeatChecked" | "value"
>;

export interface ISelectCollect<ValueType> {
  addItem: (item: ISelectItem<ValueType>) => void;
  delItem: (id: Id) => void;
  getItem: (id: Id) => ISelectItem<ValueType> | undefined;
  updateItemPartialColumn: (
    id: Id,
    params: Partial<CanUpdateISelectItem<ValueType>>
  ) => void;
  getAllItem: () => Array<ISelectItem<ValueType>>;
}

export type RequiredISelectItem<ValueType> = Required<
  Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">
>;

export type CommonSelectItemProps<ValueType> = Pick<
  ISelectItem<ValueType>,
  "id" | "allowRepeatChecked" | "value"
>;
