import React from "react";
import { TreeSelect } from "../src";
import { useTreeSelectInstance } from "../src/hook";
const index = () => {
    const instance = useTreeSelectInstance();
    return (
        <TreeSelect
            mode="cascader-single"
            repeatTriggerUnselected={false}
            instance={instance}
            selectedValue={0}
            onChange={(v) => {
                console.log(v);
            }}
            options={Array.from({ length: 3 }).map((item, index) => ({
                node: ({ isChecked }) => (
                    <div
                        onClick={() => {
                            instance.triggerSelect(index);
                        }}
                    >
                        {index}
                        {JSON.stringify(isChecked)}
                    </div>
                ),
                value: index,
                childrenOptions: Array.from({ length: 2 }).map((item, j) => ({
                    node: (
                        <div
                            onClick={() => {
                                instance.triggerSelect(`${index}---${j}`);
                            }}
                        >{`${index}---${j}`}</div>
                    ),
                    value: `${index}---${j}`,
                    childrenOptions: Array.from({ length: 2 }).map(
                        (item, k) => ({
                            node: (
                                <div
                                    onClick={() => {
                                        instance.triggerSelect(
                                            `${index}---${j}--${k}`
                                        );
                                    }}
                                >{`${index}---${j}--${k}`}</div>
                            ),
                            value: `${index}---${j}--${k}`,
                        })
                    ),
                })),
            }))}
        />
    );
};

export default index;
