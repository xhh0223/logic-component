import React from "react";
import { TreeSelect } from "../src";
const index = () => {
    return (
        <TreeSelect
            options={Array.from({ length: 3 }).map((item, index) => ({
                node: (
                    <div
                        onClick={() => {
                            console.log(index);
                        }}
                    >
                        {index}
                    </div>
                ),
                value: index,
                childrenOptions: Array.from({ length: 2 }).map((item, j) => ({
                    node: (
                        <div
                            onClick={() => {
                                console.log(`${index}---${j}`);
                            }}
                        >{`${index}---${j}`}</div>
                    ),
                    value: `${index}---${j}`,
                    childrenOptions: Array.from({ length: 2 }).map(
                        (item, k) => ({
                            node: (
                                <div
                                    onClick={() => {
                                        console.log(`${index}---${j}--${k}`);
                                    }}
                                >{`${index}---${j}--${k}`}</div>
                            ),
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
