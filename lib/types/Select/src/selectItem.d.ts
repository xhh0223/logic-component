import React from "react";
export interface SelectItemProps<Value> {
    triggerEvent?: "onClick" | string;
    value: Value;
    children?: React.ReactNode | ((params: {
        isChecked: boolean;
    }) => React.ReactNode);
}
export declare const SelectItem: <ValueType>(props: SelectItemProps<ValueType>) => JSX.Element;
