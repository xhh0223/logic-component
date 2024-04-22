import { type Id } from "@/typing";

export interface ISelectItem<ValueType = any> {
  id: Id;
  isChecked?: boolean;
  allowRepeatChecked?: boolean;
  value?: ValueType;
  refresh: () => void;
}

export interface ISelectCollect<ValueType> {
  addItem: (item: ISelectItem<ValueType>) => void;
  delItem: (id: Id) => void;
  getItem: (id: Id) => ISelectItem<ValueType> | undefined;
  updateItemPartialColumn: (
    id: Id,
    params: Partial<Omit<ISelectItem<ValueType>, "id">>
  ) => void;
  getAllItem: () => Array<[Id, ISelectItem<ValueType>]>;
}

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (id: Id) => void;
    getAllItem: () => Array<
      [Id, Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">]
    >;
  };
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (
      ids: Id[]
    ) => Array<
      [Id, Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">]
    >;
    selectAll: () => Array<
      [Id, Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">]
    >;
    getAllItem: () => Array<
      [Id, Pick<ISelectItem<ValueType>, "id" | "isChecked" | "value">]
    >;
  };
}

export type SelectItemProps<ValueType> = Pick<
  ISelectItem<ValueType>,
  "id" | "value" | "allowRepeatChecked"
> & {
  render: (
    params: Pick<ISelectItem<ValueType>, "id" | "value" | "isChecked">
  ) => React.ReactNode;
};
