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
        selectedId,
        onChange,
        repeatTriggerUnselected = true,
        // triggerExpandChildren = false,
    } = props;
    const context = useMemo(() => {
        const tempContext = new Context();
        const { getAllSelectItems, getSelectItem } = tempContext;
        Object.assign(instance, {
            triggerSelect(selectedId) {
                const treeSelectModeMap = {
                    single() {
                        for (let item of getAllSelectItems()) {
                            if (
                                item.isChecked &&
                                !equals(item.id, selectedId)
                            ) {
                                item.isChecked = false;
                                item.refreshHandler();
                                break;
                            }
                        }
                        const selectedItem = getSelectItem(selectedId);
                        if (selectedItem) {
                            if (repeatTriggerUnselected) {
                                selectedItem.isChecked =
                                    !selectedItem.isChecked;
                            }
                            selectedItem.isChecked = true;
                        }
                        if (onChange) {
                            onChange(
                                selectedItem.isChecked
                                    ? clone(selectedItem.value)
                                    : undefined,
                                selectedItem.isChecked
                                    ? selectedItem.id
                                    : undefined
                            );
                        }
                    },
                    multiple() {
                        const selectedValue = [];
                        const selectedIds = [];
                        selectedId?.forEach((id) => {
                            const selectedItem = getSelectItem(id);
                            if (selectedItem) {
                                selectedItem.isChecked =
                                    !selectedItem.isChecked;
                                selectedItem.refreshHandler();
                                if (selectedItem.isChecked) {
                                    selectedValue.push(selectedItem.value);
                                    selectedIds.push(selectedItem.id);
                                }
                            }
                        });
                        if (onChange) {
                            onChange(clone(selectedValue), selectedIds);
                        }
                    },
                    ["cascader-single"](v) {
                        console.log(v);
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
            const [_, setUpdate] = useState({});
            const state = useMemo(() => {
                return new Proxy(
                    {
                        displayCascaderChildrenOptions: false,
                    },
                    {
                        set(target, p) {
                            setUpdate({});
                            return target[p];
                        },
                    }
                );
            }, []);
            return options.map((item, index) => (
                <React.Fragment key={item.id ?? index}>
                    <TreeSelectItem
                        id={item.id}
                        value={item.value}
                        // childrenOptions={item.childrenOptions}
                    >
                        {item.node}
                    </TreeSelectItem>
                    {/* triggerExpandChildren === false */}
                    {mode === "single" &&
                        Array.isArray(item.childrenOptions) &&
                        !!item.childrenOptions.length && (
                            <GenTreeSelect options={item.childrenOptions} />
                        )}
                    {/* {mode === "cascader-single" &&
                        triggerExpandChildren === false &&
                        state.displayCascaderChildrenOptions &&
                        Array.isArray(item.childrenOptions) &&
                        !!item.childrenOptions.length && (
                            <GenTreeSelect options={item.childrenOptions} />
                        )} */}
                </React.Fragment>
            ));
        },
        [options]
    );

    useEffect(() => {
        const treeSelectModeMap = {
            single() {
                for (let item of context.getAllSelectItems()) {
                    if (item.isChecked && !equals(item.id, selectedId)) {
                        item.isChecked = false;
                        item.refreshHandler();
                        break;
                    }
                }
                const selectedItem = context.getSelectItem(selectedId);
                if (selectedItem) {
                    selectedItem.isChecked = true;
                    selectedItem.refreshHandler();
                }
            },
            multiple() {
                if (Array.isArray(selectedId)) {
                    selectedId?.forEach((id) => {
                        const selectedItem = context.getSelectItem(id);
                        if (selectedItem) {
                            selectedItem.isChecked = true;
                            selectedItem.refreshHandler();
                        }
                    });
                }
            },
        };
        treeSelectModeMap[mode]();
    }, [selectedId]);
    return (
        <TreeSelectContext.Provider value={context}>
            <GenTreeSelect options={options} />
        </TreeSelectContext.Provider>
    );
};
