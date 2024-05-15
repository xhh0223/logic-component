import { Id } from "@/typing";
import { CommonSelectItemProps, RequiredISelectItem } from "../typing";

export interface SelectSingleProps<ValueType = any> {
  children: React.ReactNode;
  handler?: {
    trigger: (id: Id) => RequiredISelectItem<ValueType> | undefined;
    getItems: (id: Id[]) => Array<RequiredISelectItem<ValueType>>;
  };
}

export type SelectSingleItemProps<ValueType> =
  CommonSelectItemProps<ValueType> & {
    render: (
      params: RequiredISelectItem<ValueType> & {
        handler: SelectSingleProps["handler"];
      }
    ) => React.ReactNode;
  };
