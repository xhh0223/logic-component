import { createContext } from "react";
import { type ISelectCollect } from "./typing";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SelectCollectContext = createContext<ISelectCollect<any>>(null!);
