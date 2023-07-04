import React, { useEffect, useMemo, useState } from "react";

import "./index.scss";
import { clone, equals, flatten, last } from "ramda";

export interface Option<ValueType> {
    key?: React.Key;
    node:
        | React.ReactNode
        | ((nodeInfo: {
              /** 当前节点是否被选中 */
              isChecked: boolean;
              /** 当前节点是否是叶子节点 */
              isLeaf: boolean;
              /** 当前节点的孩子节点 */
              children?: Option<ValueType>[];
              /** 当前节点下选中的孩子节点 */
              getCheckedChildren?: () => Option<ValueType>[];
              /**
               * 当前节点下是否有后代节点被选中,
               * 主要用于判断祖先节点是否处于选中状态
               */
              hasDescendantNodeChecked?: () => boolean;
          }) => React.ReactNode);
    value: ValueType;
    children?: Option<ValueType>[];
}

export interface CascaderCheckListProps<ValueType> {
    className?: string;
    value?: ValueType | ValueType[];
    multiple?: boolean;
    options: Option<ValueType>[];
    onChange?: (
        value: ValueType | ValueType[],
        path: number[] | number[][]
    ) => void;
    /** 每列全选节点, 仅多选有效，按顺序添加，不用则在对应的位置填null或者undefined */
    allSelectedNodes?: (
        | ((params: { isChecked: boolean }) => React.ReactNode)
        | null
    )[];
    /** 每一列的className */
    everyLevelClassName?: (string | "" | null | undefined)[];
    /** 是否展开第一项 */
    isExpandFirstOption?: boolean;
}

export function CascaderCheckList<ValueType>(
    props: CascaderCheckListProps<ValueType>
) {
    const {
        className,

        options,

        onChange,

        multiple = false,

        value,
        allSelectedNodes = [],
        everyLevelClassName = [],

        isExpandFirstOption = true,
    } = props;
    const [_, update] = useState({});
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
        if (multiple) {
            initSelectedValue = value ?? [];
            initSelectedPath = initSelectedValue
                .map((item) => findValuePath(options, item))
                .filter(Boolean);

            initSelectedValue = initSelectedPath.map((path: number[]) =>
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

            if (selected.path instanceof Array && selected.path.length > 0) {
                if (isExpandFirstOption) {
                    state.everyLevelOptions = getEveryLevelOptionsOfPath(
                        [0],
                        options
                    );
                } else {
                    // 展开最近选中的选项
                    state.everyLevelOptions = getEveryLevelOptionsOfPath(
                        last(selected.path),
                        options
                    );
                }
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
        update({});
    }, [options, selected, state]);

    const actions = useMemo(
        () => ({
            // 设置某一层options
            setLevelOptions: (level: number, opts: Option<ValueType>[]) => {
                state.everyLevelOptions[level] = opts;
                state.everyLevelOptions.splice(
                    level + 1,
                    state.everyLevelOptions.length - level
                );
                update({});
            },
            // 全选
            setAllSelected(opts: Option<ValueType>[]) {
                function setAll(arr: Option<ValueType>[]) {
                    arr.forEach((item) => {
                        const isLeaf = !(
                            item?.children instanceof Array &&
                            item?.children?.length
                        );
                        if (isLeaf) {
                            if (!state.nodeCheckedMap.get(item.value)) {
                                state.nodeCheckedMap.set(item.value, true);
                                selected.value.push(item.value);
                            }
                        } else {
                            setAll(item.children!);
                        }
                    });
                }
                setAll(opts);
                /** 获取path */
                const allPath = selected.value
                    .map((tempValue: ValueType) =>
                        findValuePath(options, tempValue)
                    )
                    .filter(Boolean);
                selected.path = allPath;
                if (onChange) {
                    onChange(selected.value, allPath);
                }
                update({});
            },
            // 取消全选
            setCancelAllSelected(opts: Option<ValueType>[]) {
                function setAllCancel(arr: Option<ValueType>[]) {
                    arr.forEach((item) => {
                        const isLeaf = !(
                            item?.children instanceof Array &&
                            item?.children?.length
                        );
                        if (isLeaf) {
                            if (state.nodeCheckedMap.get(item.value) === true) {
                                state.nodeCheckedMap.set(item.value, false);
                                const deleteIndex = selected.value.findIndex(
                                    (val: ValueType) => val === item.value
                                );
                                if (deleteIndex > -1) {
                                    selected.value.splice(deleteIndex, 1);
                                }
                            }
                        } else {
                            setAllCancel(item.children!);
                        }
                    });
                }
                setAllCancel(opts);
                /** 获取path */
                const allPath = selected.value
                    .map((tempValue: ValueType) =>
                        findValuePath(options, tempValue)
                    )
                    .filter(Boolean);
                selected.path = allPath;
                if (onChange) {
                    onChange(selected.value, allPath);
                }
                update({});
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
                            (temp) => equals(temp, nodeValue)
                        );
                        if (beforeChosenNodeIndex >= 0) {
                            selected.value.splice(beforeChosenNodeIndex, 1);
                            state.nodeCheckedMap.set(nodeValue, false);
                        }
                    } else {
                        state.nodeCheckedMap.set(nodeValue, true);
                        selected.value.push(nodeValue);
                    }
                    /** 获取path */
                    const allPath = selected.value
                        .map((tempValue) => findValuePath(options, tempValue))
                        .filter(Boolean);
                    selected.path = allPath;
                    if (onChange) {
                        onChange(clone(selected.value), selected.path);
                    }
                }
                // 单选
                if (!multiple && isLeaf) {
                    state.nodeCheckedMap.clear();
                    state.nodeCheckedMap.set(nodeValue, true);
                    // 获取path
                    const path = findValuePath(options, nodeValue) ?? [];
                    selected.path = path;
                    selected.value = nodeValue;
                    if (onChange) {
                        onChange(clone(selected.value), selected.path);
                    }
                }
                update({});
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
        <div className={`cascader-check-list ${className ?? ""}`}>
            {state.everyLevelOptions.map((opts, level) => (
                <div
                    key={level}
                    className={`cascader-check-list-group ${
                        everyLevelClassName[level] ?? ""
                    }`}
                >
                    {/* //!notice 全选节点 */}
                    <div
                        onClick={() => {
                            // 当前层是否已经全选
                            const currentLevelOptionsIsAllSelected = opts
                                ?.filter((item) => !item.children)
                                ?.every((item) =>
                                    state.nodeCheckedMap.get(item.value)
                                );
                            if (!currentLevelOptionsIsAllSelected) {
                                actions.setAllSelected(opts);
                            } else {
                                actions.setCancelAllSelected(opts);
                            }
                        }}
                    >
                        {typeof allSelectedNodes[level] === "function" &&
                            allSelectedNodes?.[level]?.({
                                isChecked: !opts
                                    ?.filter((item) => !item?.children?.length)
                                    ?.every((item) =>
                                        state.nodeCheckedMap.get(item.value)
                                    ),
                            })}
                    </div>
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
                                          item?.children instanceof Array &&
                                          item?.children?.length > 0
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
                                      hasDescendantNodeChecked() {
                                          const isLeaf = !(
                                              item?.children instanceof Array &&
                                              item?.children?.length > 0
                                          );
                                          if (isLeaf) {
                                              return false;
                                          }
                                          /** 多选 */
                                          if (
                                              multiple &&
                                              selected?.path?.length
                                          ) {
                                              /** 路径上每个节点的值 */
                                              const allValue =
                                                  selected.path.map(
                                                      (p: any[]) => {
                                                          const tempValue =
                                                              [] as ValueType[];
                                                          let tempOptions =
                                                              options;
                                                          for (
                                                              let i = 0;
                                                              i < p.length;

                                                          ) {
                                                              tempValue.push(
                                                                  tempOptions[
                                                                      p[i]
                                                                  ].value
                                                              );
                                                              tempOptions =
                                                                  tempOptions[
                                                                      p[i]
                                                                  ].children!;
                                                              i += 1;
                                                          }
                                                          return tempValue;
                                                      }
                                                  );
                                              return flatten(
                                                  allValue
                                              )?.includes(item.value);
                                          }
                                          if (!multiple && selected?.path) {
                                              const tempValue =
                                                  [] as ValueType[];
                                              let tempOptions = options;
                                              for (
                                                  let i = 0;
                                                  i < selected.path.length;

                                              ) {
                                                  tempValue.push(
                                                      tempOptions[
                                                          selected.path?.[i]
                                                      ].value
                                                  );
                                                  tempOptions =
                                                      tempOptions[
                                                          selected.path?.[i]
                                                      ].children!;
                                                  i += 1;
                                              }
                                              return tempValue.includes(
                                                  item.value
                                              );
                                          }
                                          return false;
                                      },
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
function getValueOfPath<ValueType>(
    options: Option<ValueType>[],
    path: number[]
) {
    path.forEach((item) => {
        options = options[item]?.children ?? (options[item]?.value as any);
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
        if (pathAndIsFindFlag[1]) {
            break;
        }
        path[level] = index;
        if (equals(options[index].value, value)) {
            pathAndIsFindFlag[1] = true;
            pathAndIsFindFlag[0] = path.slice(0, level + 1);
            break;
        }
        if (options[index]?.children?.length) {
            findValuePath(
                options[index].children!,
                value,
                pathAndIsFindFlag,
                level + 1
            );
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
