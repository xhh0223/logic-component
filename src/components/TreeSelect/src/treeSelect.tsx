import React, { useCallback, useMemo } from "react";
import { TreeSelectContext } from "./context";
import { TreeSelectItem, TreeSelectItemProps } from "./treeSelectItem";
import { TreeSelectGroup } from "./treeSelectGroup";
import { Subject } from "@/components/Subject/src";

export interface TreeSelectInstance {
    /** 触发选中 */
    triggerSelect(value: any): void;
}

export interface TreeSelectOption {
    key?: React.Key;
    node: TreeSelectItemProps["children"];
    value: any;
    childrenOptions?: TreeSelectOption[];
    // | (() => TreeSelectOption[]);
}

export interface TreeSelectProps {
    instance: TreeSelectInstance;
    options: TreeSelectOption[];
}

export const TreeSelect: React.FC<TreeSelectProps> = (props) => {
    const { options, instance } = props;
    const context = useMemo(() => {
        
        return {
            treeSelectGroupItemMap: new Map(),
        };
    }, []);
    const GenTreeSelect = useCallback(
        (props: { options: TreeSelectOption[] }) => {
            const { options } = props;
            return options.map((item, index) => (
                <TreeSelectGroup key={item.key ?? index} value={item.value}>
                    <TreeSelectItem value={item.value}>
                        {item.node}
                    </TreeSelectItem>
                    {Array.isArray(item.childrenOptions) &&
                        !!item.childrenOptions.length && (
                            <GenTreeSelect options={item.childrenOptions} />
                        )}
                </TreeSelectGroup>
            ));
        },
        [options]
    );
    return (
        <Subject>
            <TreeSelectContext.Provider value={context}>
                <GenTreeSelect options={options} />
            </TreeSelectContext.Provider>
        </Subject>
    );
};
