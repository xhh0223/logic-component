import React, { useEffect, useMemo, useState } from "react";
import { Context, SelectContext, SelectContextInterface } from "./context";
import { clone, equals } from "ramda";
import { SelectItem } from "./selectItem";
import { SelectProps } from "./interface";

export const Select: React.FC<SelectProps> = (props) => {
    const {
        options,
        selectedValue,
        onChange,
        repeatTriggerUnselected = true,
        mode = "single",
        instance,
    } = props;
    const [_, update] = useState({});
    const context = useMemo<SelectContextInterface>(() => {
        const tempContext = new Context();
        const { getAllSelectItem } = tempContext;
        const triggerMap = {
            single(selectedValue) {
                update({});
                for (let item of getAllSelectItem()) {
                    if (equals(item.value, selectedValue)) {
                        if (repeatTriggerUnselected) {
                            item.isChecked = !item.isChecked;
                        } else {
                            item.isChecked = true;
                        }
                        if (onChange) {
                            onChange(
                                item?.isChecked ? clone(item.value) : undefined
                            );
                        }
                    } else {
                        item.isChecked = false;
                    }
                }
            },
            multiple(selectedValue) {
                const values = getAllSelectItem();
                selectedValue?.forEach((value: any) => {
                    for (let i of values) {
                        if (equals(i.value, value)) {
                            if (i.isChecked) {
                                i.isChecked = false;
                            } else {
                                i.isChecked = true;
                            }
                            break;
                        }
                        i.refreshHandler();
                    }
                });
                if (onChange) {
                    const selectValues: any = [];
                    values.forEach((item) => {
                        if (item.isChecked) {
                            selectValues.push(item.value);
                        }
                    });
                    onChange(clone(selectValues));
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
                    if (equals(item.value, selectedValue)) {
                        item.isChecked = true;
                        item.refreshHandler();
                    }
                });
            },
            multiple() {
                const values = context.getAllSelectItem();
                selectedValue?.forEach((item: any) => {
                    for (let i of values) {
                        if (equals(i.value, item)) {
                            i.isChecked = true;
                            i.refreshHandler();
                            break;
                        }
                    }
                });
            },
        };
        initSelectedValueMap[mode]();
    }, [selectedValue]);
    return (
        <SelectContext.Provider value={context}>
            {options.map((item, index) => (
                <SelectItem value={item.value} key={item.key ?? index}>
                    {item.node}
                </SelectItem>
            ))}
        </SelectContext.Provider>
    );
};
