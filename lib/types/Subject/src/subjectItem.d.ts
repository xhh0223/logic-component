import React from "react";
export interface SubjectItemOnMessageHandler {
    (message: any): void;
}
export interface SubjectItemProps {
    subject?: {
        [key: string]: SubjectItemOnMessageHandler;
    };
    children?: React.ReactNode | ((message: any, fromSubjectId: string) => React.ReactNode);
}
export declare const SubjectItem: React.FC<SubjectItemProps>;
