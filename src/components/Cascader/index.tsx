import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import last from "lodash/last";
import React, { useEffect, useMemo, useState } from "react";

import "./index.scss";

export interface Option<ValueType> {
    key?: React.Key;
    node:
        | React.ReactNode
        | ((nodeInfo: {
              isChecked: boolean;
              isLeaf: boolean;
              children?: Option<ValueType>[];
              getCheckedChildren?: () => Option<ValueType>[];
              /** //todo是否有子孙节点被选中 */
              hasDescendantNodeChecked?: () => boolean;
          }) => React.ReactNode);
    value: ValueType;
    children?: Option<ValueType>[];
}

export interface CascaderCheckListProps<ValueType> {
    value?: ValueType | ValueType[];
    multiple?: boolean;
    options: Option<ValueType>[];
    onChange?: (
        value: ValueType | ValueType[],
        path: number[] | number[][]
    ) => void;
}

export function CascaderCheckList<ValueType>(
    props: CascaderCheckListProps<ValueType>
) {
    const { options, onChange, multiple = false, value } = props;
    const [_, setRefresh] = useState(0);
    const state = useMemo(
        () => ({
            // 每一层展开的选项列表
            everyLevelOptions: [options],
            // 记录选中状态
            nodeCheckedMap: new Map<ValueType, boolean>(),
        }),
        [options]
    );
    // 选中值
    const selected = useMemo(() => {
        let initSelectedValue;
        let initSelectedPath;
        /** 初始化选中值 */
        if (multiple && value instanceof Array) {
            initSelectedPath = value
                .map((item) => findValuePath(options, item))
                .filter(Boolean);
            initSelectedValue = initSelectedPath.map((path) =>
                getValueOfPath(options, path!)
            );
        } else if (!multiple) {
            initSelectedPath = findValuePath(options, value);
            if (initSelectedPath) {
                initSelectedValue = getValueOfPath(options, initSelectedPath);
            }
        }
        return {
            value: initSelectedValue,
            path: initSelectedPath,
        };
    }, [multiple, options, value]);

    // 初始化选中状态
    useEffect(() => {
        const nodeCheckedMap = new Map();
        if (Array.isArray(selected.value)) {
            // 设置选中
            selected.value.forEach((item) => {
                nodeCheckedMap.set(item, true);
            });
            // 展开最近选中的选项
            if (selected.path instanceof Array && selected.path.length > 0) {
                state.everyLevelOptions = getEveryLevelOptionsOfPath(
                    last(selected.path),
                    options
                );
            }
        } else if (selected.value && selected.path) {
            // 设置选中
            nodeCheckedMap.set(selected.value, true);
            // 展开选中的选项
            state.everyLevelOptions = getEveryLevelOptionsOfPath(
                selected.path,
                options
            );
        }
        state.nodeCheckedMap = nodeCheckedMap;
        setRefresh((count) => count + 1);
    }, [options, selected, state]);

    const actions = useMemo(
        () => ({
            // 设置某一层options
            setLevelOptions: (level, opts) => {
                state.everyLevelOptions[level] = opts;
                state.everyLevelOptions.splice(
                    level + 1,
                    state.everyLevelOptions.length - level
                );
                setRefresh((count) => count + 1);
            },
            // 设置节点选中
            setNodeChecked: (option: Option<ValueType>) => {
                const nodeValue = option.value;

                const isLeaf = !(
                    option.children instanceof Array &&
                    option.children.length > 0
                );
                // 多选
                if (multiple && selected.value instanceof Array && isLeaf) {
                    if (state.nodeCheckedMap.get(nodeValue)) {
                        // 重复点击取消选中
                        const beforeChosenNodeIndex = selected.value.findIndex(
                            (temp) => isEqual(temp, nodeValue)
                        );
                        if (beforeChosenNodeIndex >= 0) {
                            selected.value.splice(beforeChosenNodeIndex, 1);
                            state.nodeCheckedMap.set(nodeValue, false);
                        }
                    } else {
                        state.nodeCheckedMap.set(nodeValue, true);
                        selected.value.push(nodeValue);
                    }
                    if (onChange) {
                        /** 获取path */
                        const allPath = selected.value
                            .map((tempValue) =>
                                findValuePath(options, tempValue)
                            )
                            .filter(Boolean);
                        onChange(
                            cloneDeep(selected.value),
                            allPath as number[][]
                        );
                    }
                }
                // 单选
                if (!multiple && !(selected.value instanceof Array) && isLeaf) {
                    actions.resetNodeChecked();
                    state.nodeCheckedMap.set(nodeValue, true);
                    if (onChange && !multiple) {
                        // 获取path
                        const path =
                            findValuePath(
                                options,
                                selected.value as ValueType
                            ) ?? [];
                        onChange(cloneDeep(selected.value), path);
                    }
                }
                setRefresh((count) => count + 1);
            },
            // 重置节点选中
            resetNodeChecked: () => {
                state.nodeCheckedMap.clear();
                if (selected.value instanceof Array) {
                    selected.value.splice(0, selected.value.length);
                } else {
                    selected.value = undefined!;
                }
                setRefresh((count) => count + 1);
            },
        }),
        [
            multiple,
            onChange,
            options,
            selected,
            state.everyLevelOptions,
            state.nodeCheckedMap,
        ]
    );
    return (
        <div className="cascader-check-list">
            {state.everyLevelOptions.map((opts, level) => (
                <div className="cascader-check-list-group" key={level}>
                    {opts.map((item, index) => (
                        <div
                            key={item.key ?? index}
                            onClick={() => {
                                /** 展开子面板 */
                                if (
                                    item.children instanceof Array &&
                                    item.children.length > 0
                                ) {
                                    actions.setLevelOptions(
                                        level + 1,
                                        item.children
                                    );
                                }
                                /** 设置节点选中 */
                                actions.setNodeChecked(item);
                            }}
                        >
                            {typeof item.node === "function"
                                ? item.node({
                                      isLeaf: !(
                                          item.children instanceof Array &&
                                          item.children.length > 0
                                      ),
                                      isChecked:
                                          state.nodeCheckedMap.get(
                                              item.value
                                          ) ?? false,
                                      getCheckedChildren: () =>
                                          item?.children?.filter((temp) =>
                                              state.nodeCheckedMap.get(
                                                  temp.value
                                              )
                                          ) ?? [],
                                      children: item?.children,
                                  })
                                : item.node}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// 根据路径得到路径值
function getValueOfPath(options, path: number[]) {
    path.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        options = options[item]?.children ?? options[item]?.value;
    });
    return options;
}

// 找到值对应的路径
function findValuePath<ValueType>(
    options: Option<ValueType>[],
    value: ValueType,
    pathAndIsFindFlag: [number[], boolean] = [[], false],
    level = 0
) {
    const [path] = pathAndIsFindFlag;
    const optionsLength = options.length;
    for (let index = 0; index < optionsLength; ) {
        path[level] = index;
        if (isEqual(options[index].value, value)) {
            // eslint-disable-next-line no-param-reassign
            pathAndIsFindFlag[1] = true;
            // eslint-disable-next-line no-param-reassign
            pathAndIsFindFlag[0] = path.slice(0, level + 1);
            return undefined;
        }
        if (options[index]?.children?.length) {
            findValuePath(
                options[index].children!,
                value,
                pathAndIsFindFlag,
                level + 1
            );
            if (pathAndIsFindFlag[1]) {
                break;
            }
        }
        index += 1;
    }
    return pathAndIsFindFlag[1] ? pathAndIsFindFlag[0] : undefined;
}

function getEveryLevelOptionsOfPath<ValueType>(
    path: number[],
    opts: Option<ValueType>[]
) {
    const everyLevelOptions = [opts];
    let tempOptions = opts;

    path?.forEach((tempPath) => {
        if (
            tempOptions?.[tempPath]?.children instanceof Array &&
            tempOptions?.[tempPath]?.children?.length
        ) {
            everyLevelOptions.push(
                tempOptions?.[tempPath]?.children as Option<ValueType>[]
            );
            tempOptions = tempOptions?.[tempPath]
                ?.children as Option<ValueType>[];
        }
    });
    return everyLevelOptions;
}
