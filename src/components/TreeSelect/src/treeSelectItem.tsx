import React, { useContext, useEffect, useId } from "react";
import { TreeSelectContext, TreeSelectGroupContext } from "./context";

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
        return () => {
            treeSelectItemMap.delete(id);
        };
    });
    return children;
};
