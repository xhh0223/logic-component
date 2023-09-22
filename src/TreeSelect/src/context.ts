import React from 'react'
import { type IContext, type Id, type SelectItem } from './typing'

export class Context<Value> implements IContext<Value> {
  private readonly selectItemMap = new Map<Id, SelectItem<Value>>()
  setSelectItem = (selectItemId: Id, selectItemInstance: SelectItem<Value>): void => {
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const SelectContext = React.createContext<Context<any>>(undefined!)
