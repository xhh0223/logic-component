import React, { useContext, useEffect, useState } from "react";
import { TreeSelectContext } from "./context";
import { TreeSelectItemProps } from "./interface";

export const TreeSelectItem: React.FC<TreeSelectItemProps> = (props) => {
    const { children, value, id } = props;
    const [_, refresh] = useState({});
    const { addSelectItem, delSelectItem, getSelectItem } =
        useContext(TreeSelectContext);
    useEffect(() => {
        addSelectItem(id, {
            id,
            value,
            isChecked: false,
            refreshHandler: () => {
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
