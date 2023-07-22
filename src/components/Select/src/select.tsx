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
        const { getAllSelectItem } = tempContext;
        const triggerMap = {
            single(selectedId) {
                for (let item of getAllSelectItem()) {
                    if (item.isChecked && !equals(item.id, selectedId)) {
                        item.isChecked = false;
                        item.refreshHandler();
                    }
                    if (equals(item.id, selectedId)) {
                        if (repeatTriggerUnselected) {
                            item.isChecked = !item.isChecked;
                        } else {
                            item.isChecked = true;
                        }
                        item.refreshHandler();
                        if (onChange) {
                            onChange(
                                item?.isChecked ? clone(item.value) : undefined,
                                item?.isChecked ? item.id : undefined
                            );
                        }
                    }
                }
            },
            multiple(selectedIds) {
                const values = getAllSelectItem();
                selectedIds?.forEach((id: any) => {
                    for (let i of values) {
                        if (equals(i.id, id)) {
                            if (i.isChecked) {
                                i.isChecked = false;
                            } else {
                                i.isChecked = true;
                            }
                            i.refreshHandler();
                            break;
                        }
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
                context.getAllSelectItem().forEach((item) => {
                    if (equals(item.id, selectedId)) {
                        item.isChecked = true;
                        item.refreshHandler();
                    }
                });
            },
            multiple() {
                const values = context.getAllSelectItem();
                if (Array.isArray(selectedId)) {
                    selectedId?.forEach((id: any) => {
                        for (let i of values) {
                            if (equals(i.id, id)) {
                                i.isChecked = true;
                                i.refreshHandler();
                                break;
                            }
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
