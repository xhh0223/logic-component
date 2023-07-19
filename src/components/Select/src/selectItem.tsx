import React, { useContext, useEffect, useId } from "react";
import { SelectContext } from "./context";

export interface SelectItemProps {
    value: any;
    children?:
        | React.ReactNode
        | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const SelectItem: React.FC<SelectItemProps> = (props) => {
    const { value, children } = props;
    const { addSelectItem, deleteSelectItem, getSelectItem } =
        useContext(SelectContext) ?? {};
    const currentId = useId();
    useEffect(() => {
        addSelectItem(currentId, {
            id: currentId,
            value,
            isChecked: false,
        });
        return () => {
            deleteSelectItem(currentId);
        };
    }, [value]);

    return typeof children === "function"
        ? children({
              isChecked: !!getSelectItem(currentId)?.isChecked,
          })
        : children;
};
