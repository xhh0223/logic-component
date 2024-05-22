import { createContext } from "react";

import { type ISelectCollect } from "../typing";
import { TreeSelectMultipleProps } from "./typing";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const TreeSelectMultipleCollectContext = createContext<{
  collect: ISelectCollect<any>;
  handler: TreeSelectMultipleProps["handler"];
}>(null!);
