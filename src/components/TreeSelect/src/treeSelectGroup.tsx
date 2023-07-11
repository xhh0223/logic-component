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
    const { treeSelectGroupItemMap } = useContext(TreeSelectContext);
    useEffect(() => {
      treeSelectGroupItemMap.set(id, {
            value,
            isChecked: false,
        });
        return () => {
          treeSelectGroupItemMap.delete(id);
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
