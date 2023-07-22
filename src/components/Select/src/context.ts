import React from "react"
import { Id } from "./interface"

type SelectItemInstance = { value: any, isChecked: boolean, id: Id, refreshHandler: () => void }

export interface SelectContextInterface {
  addSelectItem(selectItemId: Id, selectItemInstance: SelectItemInstance): void
  deleteSelectItem(selectItemId: Id): void
  getSelectItem(selectItemId: Id): SelectItemInstance
  getAllSelectItem(): SelectItemInstance[]
}

export class Context implements SelectContextInterface {
  private selectItemMap = {} as Record<string, SelectItemInstance>
  addSelectItem = (selectItemId: Id, selectItemInstance: SelectItemInstance): void => {
    Reflect.set(this.selectItemMap, selectItemId, selectItemInstance)
  }
  deleteSelectItem = (selectItemId: Id): void => {
    Reflect.deleteProperty(this.selectItemMap, selectItemId)
  }
  getSelectItem = (selectItemId: Id): SelectItemInstance => {
    return Reflect.get(this.selectItemMap, selectItemId)
  }
  getAllSelectItem = () => {
    return Object.values(this.selectItemMap)
  }
}

export const SelectContext = React.createContext<SelectContextInterface>(undefined!)