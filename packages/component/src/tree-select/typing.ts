import { type Id } from "@/typing";

export interface ITreeSelectItem<ValueType> {
  id: Id;
  isChecked?: boolean;
  allowRepeatChecked?: boolean;
  value?: ValueType;
  refresh: () => void;
  parentId: Id;
  descendantsIds?: Array<{
    id: Id;
    children: Pick<ITreeSelectItem<ValueType>, "descendantsIds">;
  }>;
}

export type CanUpdateITreeSelectItem<ValueType> = Pick<
  ITreeSelectItem<ValueType>,
  "isChecked" | "allowRepeatChecked" | "descendantsIds" | "parentId" | "value"
>;

export interface ISelectCollect<ValueType> {
  addItem: (item: ITreeSelectItem<ValueType>) => void;
  delItem: (id: Id) => void;
  getItem: (id: Id) => ITreeSelectItem<ValueType> | undefined;
  updateItemPartialColumn: (
    id: Id,
    params: Partial<ITreeSelectItem<ValueType>>
  ) => void;
  getAllItem: () => Array<ITreeSelectItem<ValueType>>;
}

export type RequiredITreeSelectItem<ValueType> = Required<
  Pick<
    ITreeSelectItem<ValueType>,
    "id" | "isChecked" | "value" | "descendantsIds" | "parentId"
  >
>;

export interface CommonTreeSelectItemProps<ValueType> {
  id: ITreeSelectItem<ValueType>["id"];
  parentId: ITreeSelectItem<ValueType>["parentId"];
  /** 后代ids */
  descendantsIds?: ITreeSelectItem<ValueType>["descendantsIds"];
  value?: ITreeSelectItem<ValueType>["value"];
  allowRepeatChecked?: ITreeSelectItem<ValueType>["allowRepeatChecked"];
}
