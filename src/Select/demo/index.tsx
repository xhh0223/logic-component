import React from "react";
import { Select, useSelectInstance } from "../src";

const index = () => {
    const multipleInstance = useSelectInstance();
    const singeInstance = useSelectInstance();
    return (
        <>
            <Select
                mode="multiple"
                instance={multipleInstance}
                selectedId={[1, 2, 3, 4]}
                repeatTriggerUnselected={false}
                onChange={(_) => {
                    console.log(_);
                }}
                options={Array.from({ length: 10 }).map((_, index) => {
                    return {
                        id: index,
                        node({ isChecked }) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        multipleInstance.triggerSelect([index]);
                                    }}
                                >
                                    {index}
                                    {JSON.stringify(isChecked)}
                                </div>
                            );
                        },
                        value: index,
                    };
                })}
            />
            <hr />
            <Select
                mode="single"
                instance={singeInstance}
                selectedId={1}
                repeatTriggerUnselected={false}
                onChange={(..._) => {
                  console.log(_)
                }}
                options={Array.from({ length: 10 }).map((_, index) => {
                    return {
                        id: index,
                        node({ isChecked }) {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        singeInstance.triggerSelect(index);
                                    }}
                                >
                                    {index}
                                    {JSON.stringify(isChecked)}
                                </div>
                            );
                        },
                        value: index,
                    };
                })}
            />
        </>
    );
};

export default index;
