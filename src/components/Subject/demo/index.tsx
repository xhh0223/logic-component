import React from "react";
import { Subject, SubjectItem, useSubjectInstance } from "../src";
const index = () => {
    const instance = useSubjectInstance();
    return (
        <>
            <Subject instance={instance}>
                <SubjectItem
                    subject={{
                        a(message: string) {
                            console.log(message, "a");
                        },
                        b(message: string) {
                            console.log(message, "b");
                        },
                    }}
                >
                    {(v, id) => (
                        <div
                            onClick={() => {
                                instance.send("a", Math.random());
                            }}
                        >
                            {id}
                            update
                            {v}
                        </div>
                    )}
                </SubjectItem>
                <SubjectItem>
                    {() => (
                        <div
                            onClick={() => {
                                instance.send("b", Math.random());
                            }}
                        >
                            update
                        </div>
                    )}
                </SubjectItem>
            </Subject>
        </>
    );
};

export default index;
