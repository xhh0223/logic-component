import React from "react"

export interface SelectContextInterface {
  selectItemMap: Map<any, any>
  selectItemValueMap: Map<any, any>
}

export const SelectContext = React.createContext<SelectContextInterface>(undefined!)