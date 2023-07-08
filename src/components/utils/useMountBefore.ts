import { DependencyList, useMemo } from "react"

export const useMountBefore = (handler: () => void, deps: DependencyList | undefined) => {
  useMemo(handler, deps)
}
export default useMountBefore
