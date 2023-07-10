import React, { useCallback, useMemo } from "react";
import { TreeSelectContext } from "./context";
import { TreeSelectItem, TreeSelectItemProps } from "./treeSelectItem";
import { TreeSelectGroup } from "./treeSelectGroup";

export interface TreeSelectInstance {
    /** 触发选中 */
    triggerSelect(value: any): void;
}

export interface TreeSelectOption {
    key?: React.Key;
    node: TreeSelectItemProps["children"];
    value: any;
    childrenOption?: TreeSelectOption[];
    // | (() => TreeSelectOption[]);
}

export interface TreeSelectProps {
    instance: TreeSelectInstance;
    options: TreeSelectOption[];
}

export const TreeSelect: React.FC<TreeSelectProps> = (props) => {
    const { options, instance } = props;
    const context = useMemo(
        () => ({
            treeSelectGroupMap: new Map(),
        }),
        []
    );
    console.log(context.treeSelectGroupMap);
    const GenTreeSelect = useCallback(
        (props: { options: TreeSelectOption[] }) => {
            const { options } = props;
            return options.map((item, index) => (
                <TreeSelectGroup key={item.key ?? index} value={item.value}>
                    <TreeSelectItem value={item.value}>
                        {item.node}
                    </TreeSelectItem>
                    {Array.isArray(item.childrenOption) &&
                        !!item.childrenOption.length && (
                            <GenTreeSelect options={item.childrenOption} />
                        )}
                </TreeSelectGroup>
            ));
        },
        [options]
    );
    return (
        <TreeSelectContext.Provider value={context}>
            <GenTreeSelect options={options} />
        </TreeSelectContext.Provider>
    );
};
