import { Subject, useSubjectInstance } from "@/components/Subject/src";
import React, { useMemo } from "react";
import { SelectContext, SelectContextInterface } from "./context";
import { clone } from "ramda";

export interface SelectProps {
    mode?: "single" | "multiple";
    /** 重复点击取消选中 */
    repeatClickDeselect?: boolean;
    onChange?(value: any): void;
    children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = (props) => {
    const {
        children,
        onChange,
        repeatClickDeselect = true,
        mode = "single",
    } = props;
    const instance = useSubjectInstance();
    const context = useMemo<SelectContextInterface>(() => {
        const selectItemMap = new Map();
        return {
            mode,
            repeatClickDeselect,
            subjectInstance: instance,
            selectItemMap,
            onChange,
            clickHandler: {
                single(currentId: string) {
                    const currentItem = selectItemMap.get(currentId);
                    if (repeatClickDeselect) {
                        if (currentItem.isChecked) {
                            currentItem.isChecked = false;
                        } else {
                            currentItem.isChecked = true;
                        }
                        selectItemMap.forEach((item, id) => {
                            if (id !== currentId) {
                                item.isChecked = false;
                                instance.send(id, id);
                            }
                        });
                    } else {
                        selectItemMap.forEach((item, id) => {
                            item.isChecked = false;
                            instance.send(id, id);
                        });
                        currentItem.isChecked = true;
                    }
                    if (onChange) {
                        onChange(
                            currentItem.isChecked
                                ? clone(currentItem.value)
                                : undefined
                        );
                    }
                    instance.send(currentId, currentId);
                },
                multiple(currentId: string) {
                    const currentItem = selectItemMap.get(currentId);
                    if (currentItem.isChecked) {
                        currentItem.isChecked = false;
                    } else {
                        currentItem.isChecked = true;
                    }
                    if (onChange) {
                        const selectValues: any = [];
                        selectItemMap.forEach((item) => {
                            if (item.isChecked) {
                                selectValues.push(item.value);
                            }
                        });

                        onChange(clone(selectValues));
                        instance.send(currentId, currentId);
                    }
                },
            },
        };
    }, []);
    return (
        <SelectContext.Provider value={context}>
            <Subject instance={instance}>{children}</Subject>
        </SelectContext.Provider>
    );
};
