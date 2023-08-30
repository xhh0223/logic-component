import React from "react"
import { IContext, Id, SelectItem } from "./typing"


export class Context<Value> implements IContext<Value> {
  private selectItemMap = {} as Record<Id, SelectItem<Value>>
  addSelectItem = (selectItemId: Id, selectItemInstance: SelectItem<Value>): void => {
    Reflect.set(this.selectItemMap, selectItemId, selectItemInstance)
  }
  deleteSelectItem = (selectItemId: Id): void => {
    Reflect.deleteProperty(this.selectItemMap, selectItemId)
  }
  getSelectItem = (selectItemId: Id): SelectItem<Value> => {
    return Reflect.get(this.selectItemMap, selectItemId)
  }
  getAllSelectItem = () => {
    return Object.values(this.selectItemMap)
  }
}

export const SelectContext = React.createContext<Context<any>>(undefined!)