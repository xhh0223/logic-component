import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Context, TreeSelectContext } from "./context";
import { TreeSelectItem } from "./treeSelectItem";
import { clone, equals } from "ramda";
import { TreeSelectOption, TreeSelectProps } from "./interface";

export const TreeSelect: React.FC<TreeSelectProps> = (props) => {
    const {
        mode = "single",
        options,
        instance,
        selectedValue,
        onChange,
        repeatTriggerUnselected = true,
    } = props;
    const [_, setUpdate] = useState({});
    const context = useMemo(() => {
        const tempContext = new Context();
        const { getAllSelectItems, getSelectItem } = tempContext;
        Object.assign(instance, {
            triggerSelect(value) {
                const treeSelectModeMap = {
                    single() {
                        for (let item of getAllSelectItems()) {
                            if (equals(value, item.value)) {
                                if (repeatTriggerUnselected) {
                                    item.isChecked = !item.isChecked;
                                } else {
                                    item.isChecked = true;
                                }
                                if (onChange) {
                                    onChange(
                                        item.isChecked
                                            ? clone(item.value)
                                            : undefined
                                    );
                                }
                                setUpdate({});
                            } else {
                                item.isChecked = false;
                            }
                        }
                    },
                    multiple() {
                        let selectedValue = [];
                        let allSelectItems = getAllSelectItems();
                        value?.forEach((v) => {
                            for (let item of allSelectItems) {
                                if (equals(item.value, v)) {
                                    item.isChecked = !item.isChecked;
                                    item.refresh();
                                    if (item.isChecked) {
                                        selectedValue.push(item.value);
                                    }
                                    break;
                                }
                            }
                        });
                        if (onChange) {
                            onChange(clone(selectedValue));
                        }
                    },
                };
                treeSelectModeMap[mode]();
            },
        });
        return tempContext;
    }, []);
    const GenTreeSelect = useCallback(
        (props: { options: TreeSelectOption[] }) => {
            const { options } = props;
            return options.map((item, index) => (
                <React.Fragment key={item.key ?? index}>
                    <TreeSelectItem value={item.value}>
                        {item.node}
                    </TreeSelectItem>
                    {Array.isArray(item.childrenOptions) &&
                        !!item.childrenOptions.length && (
                            <GenTreeSelect options={item.childrenOptions} />
                        )}
                </React.Fragment>
            ));
        },
        [options]
    );

    useEffect(() => {
        const treeSelectModeMap = {
            single() {
                for (let item of context.getAllSelectItems()) {
                    if (equals(item.value, selectedValue)) {
                        item.isChecked = true;
                        setUpdate({});
                    } else {
                        item.isChecked = false;
                    }
                }
            },
            multiple() {
                let allSelectItems = context.getAllSelectItems();
                selectedValue?.foreach((v) => {
                    for (let item of allSelectItems) {
                        if (equals(item.value, v)) {
                            item.isChecked = !item.isChecked;
                            if (item.isChecked) {
                                selectedValue.push(item.value);
                            }
                            item.refresh();
                        }
                        break;
                    }
                });
            },
        };
        treeSelectModeMap[mode]();
    }, [selectedValue]);
    return (
        <TreeSelectContext.Provider value={context}>
            <GenTreeSelect options={options} />
        </TreeSelectContext.Provider>
    );
};
