import React from "react"
import { IContext, Id, SelectItem } from "./typing"


export class Context<Value> implements IContext<Value> {
  private selectItemMap = new Map<Id, SelectItem<Value>>()
  addSelectItem = (selectItemId: Id, selectItemInstance: SelectItem<Value>): void => {
    this.selectItemMap.set(selectItemId, selectItemInstance)
  }
  deleteSelectItem = (selectItemId: Id): void => {
    this.selectItemMap.delete(selectItemId)
  }
  getSelectItem = (selectItemId: Id): SelectItem<Value> | undefined => {
    return this.selectItemMap.get(selectItemId)
  }
  getAllSelectItem = () => {
    return [...this.selectItemMap.values()]
  }
}

export const SelectContext = React.createContext<Context<any>>(undefined!)