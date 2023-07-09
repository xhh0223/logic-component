import { useMemo } from "react"
import { SelectInstance } from "./select"

export const useSelectInstance = () => {
  return useMemo<SelectInstance>(() => {
    return {
      triggerSelect() {
        console.log("请在组件挂在后使用")
      },
    }
  }, [])
}