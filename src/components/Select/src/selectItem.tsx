import { SubjectItem } from "@/components/Subject/src";
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
    const { selectItemMap } = useContext(SelectContext) ?? {};
    const currentId = useId();
    useEffect(() => {
        selectItemMap.set(currentId, {
            value,
            isChecked: false,
        });
        return () => {
            selectItemMap.delete(currentId);
        };
    }, [value]);

    return (
        <SubjectItem
            subject={{
                [currentId]() {},
            }}
        >
            {() => {
                return typeof children === "function"
                    ? children({
                          isChecked: !!selectItemMap.get(currentId)?.isChecked,
                      })
                    : children;
            }}
        </SubjectItem>
    );
};
