import { Id } from "@/typing";

import { CommonSelectItemProps, RequiredISelectItem } from "../typing";

export interface SelectMultipleProps<ValueType = any> {
  children: React.ReactNode;
  handler?: {
    trigger: (ids: Id[]) => Array<RequiredISelectItem<ValueType>>;
    select: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
    cancelSelected: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
    getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
  };
}
export type SelectMultipleItemProps<ValueType> =
  CommonSelectItemProps<ValueType> & {
    render: (
      params: RequiredISelectItem<ValueType> & {
        handler: SelectMultipleProps["handler"];
      }
    ) => React.ReactNode;
  };
