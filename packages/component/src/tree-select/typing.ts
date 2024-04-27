import { type Id } from "@/typing";
import { type ISelectItem } from "@/select/typing";

export type ITreeSelectItem<ValueType> = ISelectItem<ValueType> & {
  parentId: Id;
  children?: ITreeSelectItem<ValueType>;
};

export type CanUpdateITreeSelectItem<ValueType> = Omit<
  ITreeSelectItem<ValueType>,
  "id"
>;

export interface ISelectCollect<ValueType> {
  addItem: (item: ITreeSelectItem<ValueType>) => void;
  delItem: (id: Id) => void;
  getItem: (id: Id) => ITreeSelectItem<ValueType> | undefined;
  updateItemPartialColumn: (
    id: Id,
    params: Partial<ITreeSelectItem<ValueType>>
  ) => void;
  getAllItem: () => Array<[Id, ITreeSelectItem<ValueType>]>;
}

export type RequiredITreeSelectItem<ValueType> = Required<
  Pick<ITreeSelectItem<ValueType>, "id" | "isChecked" | "value" | "children">
>;

export interface TreeSelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (id: Id) => void;
    getAllItem: () => Array<[Id, RequiredITreeSelectItem<ValueType>]>;
  };
}

export interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  instance: {
    trigger: (ids: Id[]) => Array<[Id, RequiredITreeSelectItem<ValueType>]>;
    selectAll: () => Array<[Id, RequiredITreeSelectItem<ValueType>]>;
    getAllItem: () => Array<[Id, RequiredITreeSelectItem<ValueType>]>;
  };
}

export interface TreeSelectItemProps<ValueType> {
  id: ITreeSelectItem<ValueType>["id"];
  parentId: ITreeSelectItem<ValueType>["parentId"];
  children?: ITreeSelectItem<ValueType>["children"];
  value?: ITreeSelectItem<ValueType>["value"];
  allowRepeatChecked?: ITreeSelectItem<ValueType>["allowRepeatChecked"];
  render: (params: RequiredITreeSelectItem<ValueType>) => React.ReactNode;
}
