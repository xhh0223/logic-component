import { createContext } from "react";
import { SubjectItemOnMessageHandler } from "./subjectItem";

export interface SubjectItemInstance {
  subject?: Record<string, SubjectItemOnMessageHandler>,
  refreshHandler: () => void
}
export interface SubjectContextInterface {
  subjectItemMap: Record<string, SubjectItemInstance>
  addSubjectItem(id: string, subjectItemInstance: SubjectItemInstance): void
  deleteSubjectItem(id: string): void
}

export const SubjectContext = createContext<SubjectContextInterface>(undefined!) 