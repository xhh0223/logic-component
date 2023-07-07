import { useRef } from "react"
import { BusRef } from "./bus"

export const useBusRef = () => {
  return useRef<BusRef>(undefined!)
}