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

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  handler: {
    trigger: (id: Id) => RequiredISelectItem<ValueType> | undefined;
    getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
  };
}

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  handler: {
    trigger: (ids: Id[]) => Array<RequiredISelectItem<ValueType>>;
    select: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
    cancelSelected: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
    getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
  };
}

type SelectItemProps<ValueType> = Pick<
  ISelectItem<ValueType>,
  "id" | "allowRepeatChecked" | "value"
>;

export type SelectSingleItemProps<ValueType> = SelectItemProps<ValueType> & {
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectSingleProps["handler"];
    }
  ) => React.ReactNode;
};

export type SelectMultipleItemProps<ValueType> = SelectItemProps<ValueType> & {
  render: (
    params: RequiredISelectItem<ValueType> & {
      handler: SelectMultipleProps["handler"];
    }
  ) => React.ReactNode;
};
