import { Id } from "@/typing";

import { CommonTreeSelectItemProps, RequiredITreeSelectItem } from "../typing";

export interface TreeSelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  handler?: {
    trigger: (id: Id) => RequiredITreeSelectItem<ValueType> | undefined;
    getItems: (ids: Id[]) => Array<RequiredITreeSelectItem<ValueType>>;
    getDescendantsIds: (id: Id) => Id[];
    getAncestorsIds: (id: Id) => Id[];
  };
}

export type TreeSelectSingleItemProps<ValueType> =
  CommonTreeSelectItemProps<ValueType> & {
    render: (
      params: RequiredITreeSelectItem<ValueType> & {
        handler: TreeSelectSingleProps<ValueType>["handler"];
      }
    ) => React.ReactNode;
  };
