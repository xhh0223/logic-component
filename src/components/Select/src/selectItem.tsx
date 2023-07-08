import { SubjectItem } from "@/components/Subject/src";
import React, { useContext, useEffect, useId, useMemo } from "react";
import { SelectContext } from "./context";
import { clone } from "ramda";

export interface SelectItemProps<Value> {
    triggerEvent?: "onClick" | string;
    value: Value;
    children?:
        | React.ReactNode
        | ((params: { isChecked: boolean }) => React.ReactNode);
}

export const SelectItem = <ValueType,>(props: SelectItemProps<ValueType>) => {
    const { value, children, triggerEvent = "onClick" } = props;
    const { selectItemMap, clickHandler, mode } =
        useContext(SelectContext) ?? {};
    const currentId = useId();
    useEffect(() => {
        selectItemMap.set(currentId, {
            value,
            isChecked: false,
        });
        return () => {
            selectItemMap.delete(currentId);
        };
    }, [value]);

    if (!selectItemMap) {
        console.error("请搭配Select一起使用");
    }

    return (
        <SubjectItem
            subject={{
                [currentId]() {},
            }}
        >
            {() => {
                let resultChild = children as any;
                if (typeof children === "function") {
                    resultChild = children({
                        isChecked: !!selectItemMap.get(currentId)?.isChecked,
                    });
                }
                if (React.isValidElement(resultChild)) {
                    // @ts-ignore
                    let triggerEventFn = resultChild?.props?.[triggerEvent];
                    resultChild = React.cloneElement(resultChild, {
                        [triggerEvent](e: any) {
                            if (triggerEventFn) {
                                triggerEventFn(e);
                            }
                            clickHandler?.[mode](currentId);
                        },
                    });
                }
                return resultChild;
            }}
        </SubjectItem>
    );
};
