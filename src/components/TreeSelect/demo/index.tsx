import React from "react";
import { TreeSelect, TreeSelectItem } from "../src";

const index = () => {
    return (
        <TreeSelect
            instance={{
                triggerSelect(value) {
                    console.log(value);
                },
            }}
        >
            {Array.from({ length: 3 }).map((item, index) => (
                <TreeSelectItem value={index}>
                    <TreeSelectItem />
                </TreeSelectItem>
            ))}
        </TreeSelect>
    );
};

export default index;
