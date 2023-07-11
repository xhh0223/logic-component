import React, { useMemo } from "react";
import { TreeSelectContext } from "./context";
import { TreeSelectItem, TreeSelectItemProps } from "./treeSelectItem";
import { Subject } from "../../Subject/src";

export interface TreeSelectInstance {
    /** 触发选中 */
    triggerSelect(value: any): void;
}

export interface TreeSelectOption {
    key?: React.Key;
    node: TreeSelectItemProps["children"];
    value: any;
    childrenOption: TreeSelectOption[];
}

export interface TreeSelectProps {
    instance: TreeSelectInstance;
    options: TreeSelectOption[];
}

export const TreeSelect: React.FC<TreeSelectProps> = (props) => {
    const { options /* instance */ } = props;
    const context = useMemo(
        () => ({
            treeSelectItemMap: new Map(),
            treeSelectItemValueMap: new Map(),
        }),
        []
    );
    // const [_, update] = useState();

    return (
        <TreeSelectContext.Provider value={context}>
            <Subject>
                {options.map((item, index) => (
                    <TreeSelectItem key={item.key ?? index} value={item.value}>
                        {item.node}
                    </TreeSelectItem>
                ))}
            </Subject>
        </TreeSelectContext.Provider>
    );
};
