import { Bus as InnerBus } from "./bus";
import { BusItem as InnerBusItem } from "./busItem";
import { useBusRef } from "./hook";
type BusInterface = typeof InnerBus & {
    Item: typeof InnerBusItem;
    useBusRef: typeof useBusRef;
};

export const Bus: BusInterface = InnerBus as BusInterface;
Bus.Item = InnerBusItem;
Bus.useBusRef = useBusRef;
