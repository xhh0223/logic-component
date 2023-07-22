import React, { useEffect, useMemo } from "react";
import { Context, SelectContext, SelectContextInterface } from "./context";
import { clone, equals } from "ramda";
import { SelectItem } from "./selectItem";
import { SelectProps } from "./interface";

export const Select: React.FC<SelectProps> = (props) => {
    const {
        options,
        selectedId,
        onChange,
        repeatTriggerUnselected = true,
        mode = "single",
        instance,
    } = props;
    const context = useMemo<SelectContextInterface>(() => {
        const tempContext = new Context();
        const { getAllSelectItem, getSelectItem } = tempContext;
        const triggerMap = {
            single(selectedId) {
                for (let item of getAllSelectItem()) {
                    if (item.isChecked && !equals(item.id, selectedId)) {
                        item.isChecked = false;
                        item.refreshHandler();
                        break;
                    }
                }
                const selectItem = getSelectItem(selectedId);
                if (selectItem) {
                    if (repeatTriggerUnselected) {
                        selectItem.isChecked = !selectItem.isChecked;
                    } else {
                        selectItem.isChecked = true;
                    }
                    selectItem.refreshHandler();
                }
                if (onChange) {
                    onChange(
                        selectItem?.isChecked
                            ? clone(selectItem.value)
                            : undefined,
                        selectItem?.isChecked ? selectItem.id : undefined
                    );
                }
            },
            multiple(selectedIds) {
                const values = getAllSelectItem();
                selectedIds?.forEach((id: any) => {
                    const selectItem = getSelectItem(id);
                    if (selectItem) {
                        selectItem.isChecked = !selectItem.isChecked;
                        selectItem.refreshHandler();
                    }
                });
                if (onChange) {
                    const selectValues: any = [];
                    const selectedIds = [];
                    values.forEach((item) => {
                        if (item.isChecked) {
                            selectValues.push(item.value);
                            selectedIds.push(item.id);
                        }
                    });
                    onChange(clone(selectValues), selectedIds);
                }
            },
        };
        if (typeof instance === "object" && instance) {
            Object.assign(instance, {
                triggerSelect(selectedValue: any) {
                    triggerMap[mode]?.(selectedValue);
                },
            });
        }
        return tempContext;
    }, []);

    useEffect(() => {
        const initSelectedValueMap = {
            single() {
                if (!Array.isArray(selectedId)) {
                    const selectItem = context.getSelectItem(selectedId);
                    if (selectItem) {
                        for (let item of context.getAllSelectItem()) {
                            if (
                                item.isChecked &&
                                !equals(item.id, selectedId)
                            ) {
                                item.isChecked = false;
                                item.refreshHandler();
                                break;
                            }
                        }
                        selectItem.isChecked = true;
                        selectItem.refreshHandler();
                    }
                }
            },
            multiple() {
                if (Array.isArray(selectedId)) {
                    selectedId?.forEach((id) => {
                        const selectItem = context.getSelectItem(id);
                        if (selectItem) {
                            selectItem.isChecked = true;
                            selectItem.refreshHandler();
                        }
                    });
                }
            },
        };
        initSelectedValueMap[mode]();
    }, [selectedId]);
    return (
        <SelectContext.Provider value={context}>
            {options.map((item, index) => (
                <SelectItem
                    value={item.value}
                    key={item.id ?? index}
                    id={item.id ?? `${index}`}
                >
                    {item.node}
                </SelectItem>
            ))}
        </SelectContext.Provider>
    );
};
