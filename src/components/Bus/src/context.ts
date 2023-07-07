import { createContext } from "react";

export interface BusContextInterface {
  busItemMap: Map<any, any>
  addBusItem<IdType, Item>(id: IdType, item: Item): void
  deleteBusItem<IdType>(id: IdType): void
}

export const BusContext = createContext<BusContextInterface>(undefined!) 