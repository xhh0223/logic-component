import React from "react";
export interface SubjectInstance {
    send<Message>(subjectIdId: string, message: Message): void;
}
export interface SubjectProps {
    instance?: SubjectInstance;
    children?: React.ReactNode;
}
export declare const Subject: React.FC<SubjectProps>;
