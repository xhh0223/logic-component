import React, { useEffect, useMemo, useState } from "react";
import { SelectContext, SelectContextInterface } from "./context";
import { clone, equals } from "ramda";
import { SelectItem, SelectItemProps } from "./selectItem";

export interface SelectInstance {
    /** 触发选中 */
    triggerSelect(selectedValue: any): void;
}

export interface SelectOption {
    /** reactKey diff算法用的 */
    key?: React.Key;
    node: SelectItemProps["children"];
    value: any;
}

export interface SelectProps {
    mode?: "single" | "multiple";
    /** 重复触发,取消选中状态，针对单选有效 */
    repeatTriggerUnselected?: boolean;
    /** 用来动态初始化选中值 */
    selectedValue?: any;
    onChange?(selectedValue: any): void;
    instance: SelectInstance;
    options: SelectOption[];
}

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
        const selectItemMap: SelectContextInterface["selectItemMap"] = {};
        const triggerMap = {
            single(selectedValue) {
                let selectedId;
                for (let i of Object.values(selectItemMap)) {
                    if (equals(i.value, selectedValue)) {
                        selectedId = i.id;
                        break;
                    }
                }
                for (let [key, item] of Object.entries(selectItemMap)) {
                    if (key === selectedId) {
                        if (repeatTriggerUnselected) {
                            if (item.isChecked) {
                                item.isChecked = false;
                            } else {
                                item.isChecked = true;
                            }
                        } else {
                            item.isChecked = true;
                        }
                        if (onChange) {
                            onChange(
                                item?.isChecked ? clone(item.value) : undefined
                            );
                        }
                    } else if (selectedId) {
                        item.isChecked = false;
                    }
                }
                update({});
            },
            multiple(selectedValue) {
                const values = Object.values(selectItemMap);
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
        return {
            selectItemMap,
            addSelectItem(id, item) {
                Reflect.set(this.selectItemMap, id, item);
            },
            deleteSelectItem(id) {
                Reflect.deleteProperty(this.selectItemMap, id);
            },
            getSelectItem(id) {
                return Reflect.get(this.selectItemMap, id);
            },
        };
    }, []);

    useEffect(() => {
        const { selectItemMap } = context;
        const initSelectedValueMap = {
            single() {
                Object.values(selectItemMap).forEach((item) => {
                    if (equals(item.value, selectedValue)) {
                        item.isChecked = true;
                    } else {
                        item.isChecked = false;
                    }
                });
            },
            multiple() {
                const values = Object.values(selectItemMap);
                selectedValue?.forEach((item: any) => {
                    for (let i of values) {
                        if (equals(i.value, item)) {
                            i.isChecked = true;
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
