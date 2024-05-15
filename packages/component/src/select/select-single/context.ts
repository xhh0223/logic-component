import { createContext } from "react";
import { SelectSingleProps, type ISelectCollect } from "../typing";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SelectSingleCollectContext = createContext<{
  collect: ISelectCollect<any>;
  handler: SelectSingleProps["handler"];
}>(null!);
