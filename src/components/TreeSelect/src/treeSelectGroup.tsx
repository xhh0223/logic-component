import React, { useContext, useEffect, useId, useMemo } from "react";
import { TreeSelectContext, TreeSelectGroupContext } from "./context";

export interface TreeSelectItemProps {
    value: any;
    children?: React.ReactNode;
    //  | (() => React.ReactNode);
}

export const TreeSelectGroup: React.FC<TreeSelectItemProps> = (props) => {
    const { children, value } = props;
    const id = useId();
    const { treeSelectGroupMap } = useContext(TreeSelectContext);
    useEffect(() => {
        treeSelectGroupMap.set(id, {
            value,
            isChecked: false,
        });
        return () => {
            treeSelectGroupMap.delete(id);
        };
    });

    const context = useMemo(() => {
        return {
            treeSelectItemMap: new Map(),
        };
    }, []);
    return (
        <TreeSelectGroupContext.Provider value={context}>
            {children}
        </TreeSelectGroupContext.Provider>
    );
};
