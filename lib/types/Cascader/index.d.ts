import React from "react";
export interface Option<ValueType> {
    key?: React.Key;
    node: React.ReactNode | ((nodeInfo: {
        /** 当前节点是否被选中 */
        isChecked: boolean;
        /** 当前节点是否是叶子节点 */
        isLeaf: boolean;
        /** 当前节点的孩子节点 */
        children?: Option<ValueType>[];
        /** 当前节点下选中的孩子节点 */
        getCheckedChildren?: () => Option<ValueType>[];
        /**
         * 当前节点下是否有后代节点被选中,
         * 主要用于判断祖先节点是否处于选中状态
         */
        hasDescendantNodeChecked?: () => boolean;
    }) => React.ReactNode);
    value: ValueType;
    children?: Option<ValueType>[];
}
export interface CascaderCheckListProps<ValueType> {
    className?: string;
    value?: ValueType | ValueType[];
    multiple?: boolean;
    options: Option<ValueType>[];
    onChange?: (value: ValueType | ValueType[], path: number[] | number[][]) => void;
    /** 每列全选节点, 仅多选有效，按顺序添加，不用则在对应的位置填null或者undefined */
    allSelectedNodes?: (((params: {
        isChecked: boolean;
    }) => React.ReactNode) | null)[];
    /** 每一列的className */
    everyLevelClassName?: (string | "" | null | undefined)[];
    /** 是否展开第一项 */
    isExpandFirstOption?: boolean;
}
export declare function CascaderCheckList<ValueType>(props: CascaderCheckListProps<ValueType>): JSX.Element;
