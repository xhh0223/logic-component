import React, { useContext, useEffect, useId, useState } from "react";
import { TreeSelectContext } from "./context";
import { TreeSelectItemProps } from "./interface";

export const TreeSelectItem: React.FC<TreeSelectItemProps> = (props) => {
    const { children, value } = props;
    const [_, refresh] = useState({});
    const id = useId();
    const { addSelectItem, delSelectItem, getSelectItem } =
        useContext(TreeSelectContext);
    useEffect(() => {
        addSelectItem(id, {
            id,
            value,
            isChecked: false,
            refresh: () => {
                refresh({});
            },
        });
        return () => {
            delSelectItem(id);
        };
    });
    return typeof children === "function"
        ? children({
              isChecked: !!getSelectItem(id)?.isChecked,
          })
        : children;
};
