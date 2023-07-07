import React, { useEffect } from "react";
import { Bus } from "../src";
const index = () => {
    const busRef = Bus.useBusRef();
    return (
        <>
            <Bus ref={busRef}>
                {Math.random()}
                <Bus.Item id={1}>
                    {(v) => {
                        return (
                            <div
                                onClick={() => {
                                    busRef.current.getBusItemIds();
                                    busRef.current.sendMessage(
                                        1,
                                        Math.random()
                                    );
                                }}
                            >
                                update{v}
                            </div>
                        );
                    }}
                </Bus.Item>
            </Bus>
        </>
    );
};

export default index;
