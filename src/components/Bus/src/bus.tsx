import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { BusContext, BusContextInterface } from "./context";

export interface BusRef {
    getBusItemIds(): any;
    sendMessage(id: any, message: any): void;
}

export interface BusProps {
    children?: React.ReactNode;
}

export const Bus = forwardRef<BusRef, BusProps>(({ children }, ref) => {
    const busContext = useMemo<BusContextInterface>(() => {
        return {
            busItemMap: new Map(),
            addBusItem(id, item) {
                this.busItemMap.set(id, item);
            },
            deleteBusItem(id) {
                this.busItemMap.delete(id);
            },
        };
    }, []);
    useImperativeHandle(ref, () => ({
        getBusItemIds() {
            return [...busContext.busItemMap.keys()];
        },
        sendMessage(id, message) {
            busContext.busItemMap.get(id)?.onMessage(message);
        },
    }));
    return (
        <BusContext.Provider value={busContext}>{children}</BusContext.Provider>
    );
});
