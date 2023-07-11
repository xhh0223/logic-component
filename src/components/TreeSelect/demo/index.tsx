import React from "react";
import { TreeSelect } from "../src";

const index = () => {
    return (
        <TreeSelect
            instance={{
                triggerSelect(value) {
                    console.log(value);
                },
            }}
            options={[]}
        />
    );
};

export default index;
