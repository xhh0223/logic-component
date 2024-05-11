import { Fragment } from "react";

export { genTreeData } from "./tree-mock-data";

export const mergeClass = (...args: string[]) => {
  return args.reduce((pre, cur) => {
    if (!cur) return pre;
    return `${pre ?? ""} ${cur ?? ""}`;
  }, "");
};

export const renderGeneratorJsx = (generatorJsx) => {
  return [...generatorJsx()].map((i) => <Fragment key={i}>{i}</Fragment>);
};
