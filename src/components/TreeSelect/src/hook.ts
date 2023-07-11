import { useMemo } from "react";
import { TreeSelectInstance } from "./treeSelect";

export const useTreeSelectInstance = ()=>{
  return useMemo<TreeSelectInstance>(()=>{
    return {
      triggerSelect(){
        console.log("请在组件挂载后使用")
      }
    }
  },[])
}