import React, { useContext, useEffect, useState } from "react";
import { BusContext } from "./context";

export interface BusItemProps {
    id: any;
    children?: (message: any) => React.ReactNode;
}

export const BusItem: React.FC<BusItemProps> = ({ id, children }) => {
    const context = useContext(BusContext);
    const [message, setMessage] = useState(undefined!);
    useEffect(() => {
        context.addBusItem(id, {
            onMessage(mess: any) {
                setMessage(mess);
            },
        });
        return () => {
            context.deleteBusItem(id);
        };
    }, []);
    return children ? children(message) : null;
};
