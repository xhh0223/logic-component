import { j as jsxRuntimeExports } from "./react.js";
import { useState, useMemo, useEffect } from "react";
import { l as last, e as equals, c as clone, f as flatten } from "./ramda.js";
const jsx = jsxRuntimeExports.jsx;
const jsxs = jsxRuntimeExports.jsxs;
function CascaderCheckList(props) {
  const {
    className,
    options,
    onChange,
    multiple = false,
    value,
    allSelectedNodes = [],
    everyLevelClassName = [],
    isExpandFirstOption = true
  } = props;
  const [_, update] = useState({});
  const state = useMemo(
    () => ({
      // 每一层展开的选项列表
      everyLevelOptions: [options],
      // 记录选中状态
      nodeCheckedMap: /* @__PURE__ */ new Map()
    }),
    [options]
  );
  const selected = useMemo(() => {
    let initSelectedValue;
    let initSelectedPath;
    if (multiple) {
      initSelectedValue = value ?? [];
      initSelectedPath = initSelectedValue.map((item) => findValuePath(options, item)).filter(Boolean);
      initSelectedValue = initSelectedPath.map(
        (path) => getValueOfPath(options, path)
      );
    } else if (!multiple) {
      initSelectedPath = findValuePath(options, value);
      if (initSelectedPath) {
        initSelectedValue = getValueOfPath(options, initSelectedPath);
      }
    }
    return {
      value: initSelectedValue,
      path: initSelectedPath
    };
  }, [multiple, options, value]);
  useEffect(() => {
    const nodeCheckedMap = /* @__PURE__ */ new Map();
    if (Array.isArray(selected.value)) {
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
          state.everyLevelOptions = getEveryLevelOptionsOfPath(
            last(selected.path),
            options
          );
        }
      }
    } else if (selected.value && selected.path) {
      nodeCheckedMap.set(selected.value, true);
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
      setLevelOptions: (level, opts) => {
        state.everyLevelOptions[level] = opts;
        state.everyLevelOptions.splice(
          level + 1,
          state.everyLevelOptions.length - level
        );
        update({});
      },
      // 全选
      setAllSelected(opts) {
        function setAll(arr) {
          arr.forEach((item) => {
            var _a;
            const isLeaf = !((item == null ? void 0 : item.children) instanceof Array && ((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length));
            if (isLeaf) {
              if (!state.nodeCheckedMap.get(item.value)) {
                state.nodeCheckedMap.set(item.value, true);
                selected.value.push(item.value);
              }
            } else {
              setAll(item.children);
            }
          });
        }
        setAll(opts);
        const allPath = selected.value.map(
          (tempValue) => findValuePath(options, tempValue)
        ).filter(Boolean);
        selected.path = allPath;
        if (onChange) {
          onChange(selected.value, allPath);
        }
        update({});
      },
      // 取消全选
      setCancelAllSelected(opts) {
        function setAllCancel(arr) {
          arr.forEach((item) => {
            var _a;
            const isLeaf = !((item == null ? void 0 : item.children) instanceof Array && ((_a = item == null ? void 0 : item.children) == null ? void 0 : _a.length));
            if (isLeaf) {
              if (state.nodeCheckedMap.get(item.value) === true) {
                state.nodeCheckedMap.set(item.value, false);
                const deleteIndex = selected.value.findIndex(
                  (val) => val === item.value
                );
                if (deleteIndex > -1) {
                  selected.value.splice(deleteIndex, 1);
                }
              }
            } else {
              setAllCancel(item.children);
            }
          });
        }
        setAllCancel(opts);
        const allPath = selected.value.map(
          (tempValue) => findValuePath(options, tempValue)
        ).filter(Boolean);
        selected.path = allPath;
        if (onChange) {
          onChange(selected.value, allPath);
        }
        update({});
      },
      // 设置节点选中
      setNodeChecked: (option) => {
        const nodeValue = option.value;
        const isLeaf = !(option.children instanceof Array && option.children.length > 0);
        if (multiple && selected.value instanceof Array && isLeaf) {
          if (state.nodeCheckedMap.get(nodeValue)) {
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
          const allPath = selected.value.map((tempValue) => findValuePath(options, tempValue)).filter(Boolean);
          selected.path = allPath;
          if (onChange) {
            onChange(clone(selected.value), selected.path);
          }
        }
        if (!multiple && isLeaf) {
          state.nodeCheckedMap.clear();
          state.nodeCheckedMap.set(nodeValue, true);
          const path = findValuePath(options, nodeValue) ?? [];
          selected.path = path;
          selected.value = nodeValue;
          if (onChange) {
            onChange(clone(selected.value), selected.path);
          }
        }
        update({});
      }
    }),
    [
      multiple,
      onChange,
      options,
      selected,
      state.everyLevelOptions,
      state.nodeCheckedMap
    ]
  );
  return /* @__PURE__ */ jsx("div", { className: `cascader-check-list ${className ?? ""}`, children: state.everyLevelOptions.map((opts, level) => {
    var _a, _b;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `cascader-check-list-group ${everyLevelClassName[level] ?? ""}`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => {
                var _a2;
                const currentLevelOptionsIsAllSelected = (_a2 = opts == null ? void 0 : opts.filter((item) => !item.children)) == null ? void 0 : _a2.every(
                  (item) => state.nodeCheckedMap.get(item.value)
                );
                if (!currentLevelOptionsIsAllSelected) {
                  actions.setAllSelected(opts);
                } else {
                  actions.setCancelAllSelected(opts);
                }
              },
              children: typeof allSelectedNodes[level] === "function" && ((_b = allSelectedNodes == null ? void 0 : allSelectedNodes[level]) == null ? void 0 : _b.call(allSelectedNodes, {
                isChecked: !((_a = opts == null ? void 0 : opts.filter((item) => {
                  var _a2;
                  return !((_a2 = item == null ? void 0 : item.children) == null ? void 0 : _a2.length);
                })) == null ? void 0 : _a.every(
                  (item) => state.nodeCheckedMap.get(item.value)
                ))
              }))
            }
          ),
          opts.map((item, index) => {
            var _a2;
            return /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => {
                  if (item.children instanceof Array && item.children.length > 0) {
                    actions.setLevelOptions(
                      level + 1,
                      item.children
                    );
                  }
                  actions.setNodeChecked(item);
                },
                children: typeof item.node === "function" ? item.node({
                  isLeaf: !((item == null ? void 0 : item.children) instanceof Array && ((_a2 = item == null ? void 0 : item.children) == null ? void 0 : _a2.length) > 0),
                  isChecked: state.nodeCheckedMap.get(
                    item.value
                  ) ?? false,
                  getCheckedChildren: () => {
                    var _a3;
                    return ((_a3 = item == null ? void 0 : item.children) == null ? void 0 : _a3.filter(
                      (temp) => state.nodeCheckedMap.get(
                        temp.value
                      )
                    )) ?? [];
                  },
                  children: item == null ? void 0 : item.children,
                  hasDescendantNodeChecked() {
                    var _a3, _b2, _c, _d, _e;
                    const isLeaf = !((item == null ? void 0 : item.children) instanceof Array && ((_a3 = item == null ? void 0 : item.children) == null ? void 0 : _a3.length) > 0);
                    if (isLeaf) {
                      return false;
                    }
                    if (multiple && ((_b2 = selected == null ? void 0 : selected.path) == null ? void 0 : _b2.length)) {
                      const allValue = selected.path.map(
                        (p) => {
                          const tempValue = [];
                          let tempOptions = options;
                          for (let i = 0; i < p.length; ) {
                            tempValue.push(
                              tempOptions[p[i]].value
                            );
                            tempOptions = tempOptions[p[i]].children;
                            i += 1;
                          }
                          return tempValue;
                        }
                      );
                      return (_c = flatten(
                        allValue
                      )) == null ? void 0 : _c.includes(item.value);
                    }
                    if (!multiple && (selected == null ? void 0 : selected.path)) {
                      const tempValue = [];
                      let tempOptions = options;
                      for (let i = 0; i < selected.path.length; ) {
                        tempValue.push(
                          tempOptions[(_d = selected.path) == null ? void 0 : _d[i]].value
                        );
                        tempOptions = tempOptions[(_e = selected.path) == null ? void 0 : _e[i]].children;
                        i += 1;
                      }
                      return tempValue.includes(
                        item.value
                      );
                    }
                    return false;
                  }
                }) : item.node
              },
              item.key ?? index
            );
          })
        ]
      },
      level
    );
  }) });
}
function getValueOfPath(options, path) {
  path.forEach((item) => {
    var _a, _b;
    options = ((_a = options[item]) == null ? void 0 : _a.children) ?? ((_b = options[item]) == null ? void 0 : _b.value);
  });
  return options;
}
function findValuePath(options, value, pathAndIsFindFlag = [[], false], level = 0) {
  var _a, _b;
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
    if ((_b = (_a = options[index]) == null ? void 0 : _a.children) == null ? void 0 : _b.length) {
      findValuePath(
        options[index].children,
        value,
        pathAndIsFindFlag,
        level + 1
      );
    }
    index += 1;
  }
  return pathAndIsFindFlag[1] ? pathAndIsFindFlag[0] : void 0;
}
function getEveryLevelOptionsOfPath(path, opts) {
  const everyLevelOptions = [opts];
  let tempOptions = opts;
  path == null ? void 0 : path.forEach((tempPath) => {
    var _a, _b, _c, _d, _e;
    if (((_a = tempOptions == null ? void 0 : tempOptions[tempPath]) == null ? void 0 : _a.children) instanceof Array && ((_c = (_b = tempOptions == null ? void 0 : tempOptions[tempPath]) == null ? void 0 : _b.children) == null ? void 0 : _c.length)) {
      everyLevelOptions.push(
        (_d = tempOptions == null ? void 0 : tempOptions[tempPath]) == null ? void 0 : _d.children
      );
      tempOptions = (_e = tempOptions == null ? void 0 : tempOptions[tempPath]) == null ? void 0 : _e.children;
    }
  });
  return everyLevelOptions;
}
export {
  CascaderCheckList as C
};
