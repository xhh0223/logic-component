import React from "react";
export interface SelectProps {
    mode?: "single" | "multiple";
    /** 重复点击取消选中 */
    repeatClickDeselect?: boolean;
    onChange?(value: any): void;
    children?: React.ReactNode;
}
export declare const Select: React.FC<SelectProps>;
