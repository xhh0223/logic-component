import React, { useContext, useEffect, useId, useState } from "react";
import { SelectContext } from "./context";
import { SelectItemProps } from "./interface";

export const SelectItem: React.FC<SelectItemProps> = (props) => {
    const { value, children, id } = props;
    const [_, refresh] = useState({});
    const { addSelectItem, deleteSelectItem, getSelectItem } =
        useContext(SelectContext) ?? {};
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
            deleteSelectItem(id);
        };
    }, [value]);

    return typeof children === "function"
        ? children({
              isChecked: !!getSelectItem(id)?.isChecked,
          })
        : children;
};
