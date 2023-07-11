import React, { useContext, useEffect, useId } from "react";
import { TreeSelectGroupContext } from "./context";
import { SubjectItem } from "@/components/Subject/src";

export interface TreeSelectItemProps {
    value?: any;
    children?: React.ReactNode;
    //  | (() => React.ReactNode);
}

export const TreeSelectItem: React.FC<TreeSelectItemProps> = (props) => {
    const { children, value } = props;
    const id = useId();
    const { treeSelectItemMap } = useContext(TreeSelectGroupContext);
    useEffect(() => {
        treeSelectItemMap.set(id, {
            value,
            isChecked: false,
        });
        treeSelectItemMap.set(value, id);
        return () => {
            treeSelectItemMap.delete(id);
            treeSelectItemMap.delete(value);
        };
    });
    return (
        <SubjectItem
            subject={{
                [id]() {},
            }}
        >
            {children}
        </SubjectItem>
    );
};
