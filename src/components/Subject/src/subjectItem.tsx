import React, { useContext, useEffect, useId, useMemo, useState } from "react";
import { SubjectContext } from "./context";
import useMountBefore from "@/components/utils/useMountBefore";

export interface SubjectItemOnMessageHandler {
    (message: any): void;
}

export interface SubjectItemProps {
    subject?: {
        [key: string]: SubjectItemOnMessageHandler;
    };
    children?:
        | React.ReactNode
        | ((message: any, fromSubjectId: string) => React.ReactNode);
}

export const SubjectItem: React.FC<SubjectItemProps> = (props) => {
    const { children, subject } = props;
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

    useMountBefore(() => {
        const decoratedSubject = {};
        if (typeof subject === "object" && subject) {
            Object.entries(subject).forEach(([subject, handler]) => {
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
    }, []);
    useEffect(() => {
        return () => {
            context?.deleteSubjectItem(subjectItemId);
        };
    }, []);
    return typeof children === "function"
        ? children(state.message, state.fromSubjectId)
        : children;
};
