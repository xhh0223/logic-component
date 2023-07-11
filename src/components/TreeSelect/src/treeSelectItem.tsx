import React, { useContext, useEffect, useId } from "react";
import { TreeSelectContext } from "./context";
import { SubjectItem } from "@/components/Subject/src";

export interface TreeSelectItemProps {
    value?: any;
    children?:
        | React.ReactNode
        | ((nodeInfo: { isChecked: boolean }) => React.ReactNode);
}

export const TreeSelectItem: React.FC<TreeSelectItemProps> = (props) => {
    const { children, value } = props;
    const id = useId();
    const { treeSelectItemMap, treeSelectItemValueMap } =
        useContext(TreeSelectContext);
    useEffect(() => {
        treeSelectItemMap.set(id, {
            value,
            isChecked: false,
        });
        treeSelectItemValueMap.set(value, id);
        return () => {
            treeSelectItemMap.delete(id);
            treeSelectItemValueMap.delete(value);
        };
    });
    return (
        <SubjectItem
            subject={{
                [id]() {},
            }}
        >
            {() => {
                if (typeof children === "function") {
                    return children({
                        isChecked: !!treeSelectItemMap.get(id)?.isChecked,
                    });
                }
                return children;
            }}
        </SubjectItem>
    );
};
