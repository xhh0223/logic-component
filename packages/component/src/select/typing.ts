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
  getAllItem: () => Array<[Id, ISelectItem<ValueType>]>;
}

export type RequiredISelectItem<ValueType> = Required<
  Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">
>;

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (id: Id) => void;
    getAllItem: () => Array<[Id, RequiredISelectItem<ValueType>]>;
  };
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (ids: Id[]) => Array<[Id, RequiredISelectItem<ValueType>]>;
    selectAll: () => Array<[Id, RequiredISelectItem<ValueType>]>;
    getAllItem: () => Array<[Id, RequiredISelectItem<ValueType>]>;
  };
}

export type SelectItemProps<ValueType> = Omit<
  ISelectItem<ValueType>,
  "refresh"
> & {
  render: (params: RequiredISelectItem<ValueType>) => React.ReactNode;
};
