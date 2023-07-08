import { SubjectInstance } from "@/components/Subject/src"
import React from "react"

export interface SelectContextInterface {
  mode: "single" | "multiple",
  subjectInstance: SubjectInstance
  selectItemMap: Map<any, any>
  onChange?(value: any): void
  clickHandler: {
    single(currentId: string): void
    multiple(currentId: string): void
  }
}

export const SelectContext = React.createContext<SelectContextInterface>(undefined!)