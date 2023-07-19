import { createContext } from "react";
import { TreeSelectContextInterface, TreeSelectItemInfo } from "./interface";


export class Context implements TreeSelectContextInterface {
  private treeSelectItemMap: Record<string, TreeSelectItemInfo> = {}
  addSelectItem = (id: string, item: TreeSelectItemInfo) => {
    Reflect.set(this.treeSelectItemMap, id, item)
  }
  delSelectItem = (id: string) => {
    Reflect.deleteProperty(this.treeSelectItemMap, id)
  }
  getSelectItem = (id: string) => {
    return Reflect.get(this.treeSelectItemMap, id)
  }
  getAllSelectItems = () => {
    return Object.values(this.treeSelectItemMap)
  }

}

export const TreeSelectContext = createContext<TreeSelectContextInterface>(undefined!)