import { createContext } from "react";
import { SelectMultipleProps, type ISelectCollect } from "../typing";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>;
  handler: SelectMultipleProps["handler"];
}>(null!);
