import { useMemo } from "react"
import { SubjectInstance } from "./subject"

export const useSubjectInstance = () => {
  const instance = useMemo<SubjectInstance>(() => {
    const errorMessage = "请在组件挂在后使用"
    return {
      send() {
        throw errorMessage
      }
    }
  }, [])

  return instance
}