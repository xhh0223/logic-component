import React, { useContext, useEffect, useId, useMemo, useState } from "react";
import { SubjectContext } from "./context";

export interface SubjectItemOnMessageHandler {
    (message: any, fromSubjectId: string): void;
}

export interface SubjectItemProps {
    subject?: Record<string, SubjectItemOnMessageHandler>;
    children?: (
        ...rest: Parameters<SubjectItemOnMessageHandler>
    ) => React.ReactNode;
}

export const SubjectItem: React.FC<SubjectItemProps> = (props) => {
    const { children, subject } = props as any;
    const subjectItemId = useId();
    const context = useContext(SubjectContext);
    if (!context) {
        console.error("请配合Subject一起使用");
    }
    const state = useMemo(() => {
        return {
            message: undefined as any,
            fromSubjectId: undefined as unknown as string,
        };
    }, []);
    const [_, update] = useState({});

    useEffect(() => {
        const decoratedSubject = {};
        if (typeof subject === "object" && subject) {
            Object.entries(subject).forEach(([subject, handler]: any) => {
                Object.assign(decoratedSubject, {
                    [subject](message: any) {
                        state.message = message;
                        state.fromSubjectId = subject;
                        handler(message);
                    },
                });
            });
        }
        context?.addSubjectItem(subjectItemId, {
            subject: decoratedSubject,
            refreshHandler() {
                update({});
            },
        });
        return () => {
            context?.deleteSubjectItem(subjectItemId);
        };
    }, []);

    if (typeof children === "function") {
        return children(state.message, state.fromSubjectId);
    }
    return null;
};
