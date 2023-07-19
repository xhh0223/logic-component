import React from "react"

type SelectItemInstance = { value: any, isChecked: boolean,id:string }

export interface SelectContextInterface {
  selectItemMap: Record<string, SelectItemInstance>
  addSelectItem(selectItemId: string, selectItemInstance: SelectItemInstance): void
  deleteSelectItem(selectItemId: string): void
  getSelectItem(selectItemId: string): SelectItemInstance
}

export const SelectContext = React.createContext<SelectContextInterface>(undefined!)