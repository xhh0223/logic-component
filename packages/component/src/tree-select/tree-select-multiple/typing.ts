import { Id } from "@/typing";
import { RequiredITreeSelectItem, CommonTreeSelectItemProps } from "../typing";

export interface TreeSelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  handler?: {
    trigger: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>;
    select: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>;
    cancelSelected: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>;
    getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>;
    getDescendantsIdsList: (id: Id) => Id[];
    getAncestorsIdsList: (id: Id) => Id[];
  };
}

export type TreeSelectMultipleItemProps<ValueType> =
  CommonTreeSelectItemProps<ValueType> & {
    render: (
      params: RequiredITreeSelectItem<ValueType> & {
        handler: TreeSelectMultipleProps<ValueType>["handler"];
      }
    ) => React.ReactNode;
  };
