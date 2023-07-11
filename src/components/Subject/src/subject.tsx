import React, { useMemo } from "react";
import { SubjectContext, SubjectContextInterface } from "./context";

export interface SubjectInstance {
    send<Message>(subjectIdId: string, message: Message): void;
}

export interface SubjectProps {
    instance: SubjectInstance;
    children?: React.ReactNode;
}

export const Subject: React.FC<SubjectProps> = ({ children, instance }) => {
    const subjectContext = useMemo<SubjectContextInterface>(() => {
        return {
            subjectItemMap: new Map(),
            addSubjectItem(subjectItemId, item) {
                this.subjectItemMap.set(subjectItemId, item);
            },
            deleteSubjectItem(subjectItemId) {
                this.subjectItemMap.delete(subjectItemId);
            },
        };
    }, []);
    useMemo(() => {
        if (instance) {
            Object.assign(instance, {
                send(subjectId: string, message: any) {
                    [...subjectContext.subjectItemMap.keys()].forEach((id) => {
                        const { subject, refreshHandler } =
                            subjectContext.subjectItemMap.get(id) ?? {};
                        if (subject && subject[subjectId]) {
                            subject[subjectId](message);
                            refreshHandler && refreshHandler();
                        }
                    });
                },
            });
        }
    }, []);
    return (
        <SubjectContext.Provider value={subjectContext}>
            {children}
        </SubjectContext.Provider>
    );
};
