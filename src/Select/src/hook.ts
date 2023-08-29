import { useMemo } from "react"
import { SelectInstance } from "./interface"

export const useSelectInstance = () => {
  return useMemo<SelectInstance>(() => {
    return {
      triggerSelect() {
        console.log("请在组件挂在后使用")
      },
    }
  }, [])
}