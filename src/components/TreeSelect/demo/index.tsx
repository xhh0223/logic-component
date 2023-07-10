import React from "react";
import { TreeSelect } from "../src";
const index = () => {
    return (
        <TreeSelect
            options={Array.from({ length: 3 }).map((item, index) => ({
                node: <div>{index}</div>,
                value: index,
                childrenOption: Array.from({ length: 2 }).map((item, j) => ({
                    node: <div>{`${index}---${j}`}</div>,
                    value: `${index}---${j}`,
                    childrenOption: Array.from({ length: 2 }).map(
                        (item, k) => ({
                            node: <div>{`${index}---${j}--${k}`}</div>,
                            value: `${index}---${j}--${k}`,
                        })
                    ),
                })),
            }))}
            instance={{
                triggerSelect() {},
            }}
        />
    );
};

export default index;
