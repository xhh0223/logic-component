import React, { useContext, useEffect, useId, useState } from "react";
import { SelectContext } from "./context";
import { SelectItemProps } from "./interface";

export const SelectItem: React.FC<SelectItemProps> = (props) => {
    const { value, children } = props;
    const [_, refresh] = useState({});
    const { addSelectItem, deleteSelectItem, getSelectItem } =
        useContext(SelectContext) ?? {};
    const currentId = useId();
    useEffect(() => {
        addSelectItem(currentId, {
            id: currentId,
            value,
            isChecked: false,
            refreshHandler: () => {
                refresh({});
            },
        });
        return () => {
            deleteSelectItem(currentId);
        };
    }, [value]);

    return typeof children === "function"
        ? children({
              isChecked: !!getSelectItem(currentId)?.isChecked,
          })
        : children;
};
