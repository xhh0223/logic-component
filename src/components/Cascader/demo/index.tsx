import React from "react";
import { CascaderCheckList } from "../index";

const Demo = () => {
    return (
        <div>
            <CascaderCheckList
                options={[
                    {
                        node() {
                            return 1;
                        },
                        value: 1,
                        children: [
                            {
                                node() {
                                    return 2;
                                },
                                value: 2,
                            },
                            {
                                node() {
                                    return 3;
                                },
                                value: 3,
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default Demo;
