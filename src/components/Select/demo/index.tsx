import React from "react";
import { Select } from "../src/select";
import { SelectItem } from "../src/selectItem";
import { json } from "react-router-dom";

const index = () => {
    return (
        <Select
            mode='multiple'
            repeatClickDeselect={false}
            onChange={(v) => {
                console.log(v);
            }}
        >
            {Array.from({ length: 10 }).map((item, index) => {
                return (
                    <SelectItem key={index} value={index}>
                        {({ isChecked }) => (
                            <div>
                                {index}
                                {JSON.stringify(isChecked)}
                            </div>
                        )}
                    </SelectItem>
                );
            })}
        </Select>
    );
};

export default index;
