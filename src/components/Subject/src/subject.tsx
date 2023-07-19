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
            subjectItemMap: {},
            addSubjectItem(subjectItemId, item) {
                Reflect.set(this.subjectItemMap, subjectItemId, item);
            },
            deleteSubjectItem(subjectItemId) {
                Reflect.deleteProperty(this.subjectItemMap, subjectItemId);
            },
        };
    }, []);
    useMemo(() => {
        if (instance) {
            Object.assign(instance, {
                send(subjectId: string, message: any) {
                    Object.keys(subjectContext.subjectItemMap).forEach((id) => {
                        const { subject, refreshHandler } =
                            Reflect.get(subjectContext.subjectItemMap, id) ??
                            {};
                        if (subject && subject[subjectId]) {
                            subject[subjectId](message, subjectId);
                            refreshHandler();
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
