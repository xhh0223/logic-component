import { createContext } from "react";
import { SubjectItemOnMessageHandler } from "./subjectItem";

export interface SubjectItemInstance {
  subject?: {
    [key: string]: SubjectItemOnMessageHandler
  },
  refreshHandler: () => void
}
export interface SubjectContextInterface {
  subjectItemMap: Map<string, SubjectItemInstance>
  addSubjectItem(id: string, subjectItemInstance: SubjectItemInstance): void
  deleteSubjectItem(id: string): void
}

export const SubjectContext = createContext<SubjectContextInterface>(undefined!) 