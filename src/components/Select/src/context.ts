import React from "react"

type SelectItemInstance = { value: any, isChecked: boolean, id: string, refreshHandler: () => void }

export interface SelectContextInterface {
  addSelectItem(selectItemId: string, selectItemInstance: SelectItemInstance): void
  deleteSelectItem(selectItemId: string): void
  getSelectItem(selectItemId: string): SelectItemInstance
  getAllSelectItem(): SelectItemInstance[]
}

export class Context implements SelectContextInterface {
  private selectItemMap = {} as Record<string, SelectItemInstance>
  addSelectItem = (selectItemId: string, selectItemInstance: SelectItemInstance): void => {
    Reflect.set(this.selectItemMap, selectItemId, selectItemInstance)
  }
  deleteSelectItem = (selectItemId: string): void => {
    Reflect.deleteProperty(this.selectItemMap, selectItemId)
  }
  getSelectItem = (selectItemId: string): SelectItemInstance => {
    return Reflect.get(this.selectItemMap, selectItemId)
  }
  getAllSelectItem = () => {
    return Object.values(this.selectItemMap)
  }
}

export const SelectContext = React.createContext<SelectContextInterface>(undefined!)