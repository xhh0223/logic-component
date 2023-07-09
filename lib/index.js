import React, { createContext, useMemo, useId, useContext, useState, useEffect } from "react";
const SubjectContext = createContext(void 0);
const Subject = ({ children, instance }) => {
  const subjectContext = useMemo(() => {
    return {
      subjectItemMap: /* @__PURE__ */ new Map(),
      addSubjectItem(subjectItemId, item) {
        this.subjectItemMap.set(subjectItemId, item);
      },
      deleteSubjectItem(subjectItemId) {
        this.subjectItemMap.delete(subjectItemId);
      }
    };
  }, []);
  useMemo(() => {
    if (instance) {
      Object.assign(instance, {
        send(subjectId, message) {
          [...subjectContext.subjectItemMap.keys()].forEach((id) => {
            const { subject, refreshHandler } = subjectContext.subjectItemMap.get(id) ?? {};
            if (subject && subject[subjectId]) {
              subject[subjectId](message);
              refreshHandler && refreshHandler();
            }
          });
        }
      });
    }
  }, []);
  return /* @__PURE__ */ React.createElement(SubjectContext.Provider, { value: subjectContext }, children);
};
const SubjectItem = (props) => {
  const { children, subject } = props;
  const subjectItemId = useId();
  const context = useContext(SubjectContext);
  if (!context) {
    console.error("请配合Subject一起使用");
  }
  const state = useMemo(() => {
    return {
      message: void 0,
      fromSubjectId: void 0
    };
  }, []);
  const [_, update] = useState({});
  useEffect(() => {
    const decoratedSubject = {};
    if (typeof subject === "object" && subject) {
      Object.entries(subject).forEach(([subject2, handler]) => {
        Object.assign(decoratedSubject, {
          [subject2](message) {
            state.message = message;
            state.fromSubjectId = subject2;
            handler(message);
          }
        });
      });
    }
    context == null ? void 0 : context.addSubjectItem(subjectItemId, {
      subject: decoratedSubject,
      refreshHandler() {
        update({});
      }
    });
    return () => {
      context == null ? void 0 : context.deleteSubjectItem(subjectItemId);
    };
  }, []);
  if (typeof children === "function") {
    return children(state.message, state.fromSubjectId);
  }
  return children;
};
const useSubjectInstance = () => {
  const instance = useMemo(() => {
    const errorMessage = "请在组件挂在后使用";
    return {
      send() {
        throw errorMessage;
      }
    };
  }, []);
  return instance;
};
const SelectContext = React.createContext(void 0);
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
function _functionName(f) {
  var match = String(f).match(/^function (\w*)/);
  return match == null ? "" : match[1];
}
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  } else {
    return a !== a && b !== b;
  }
}
const _objectIs$1 = typeof Object.is === "function" ? Object.is : _objectIs;
var toString = Object.prototype.toString;
var _isArguments = /* @__PURE__ */ function() {
  return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
    return toString.call(x) === "[object Arguments]";
  } : function _isArguments2(x) {
    return _has("callee", x);
  };
}();
var hasEnumBug = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString");
var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
var hasArgsEnumBug = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}();
var contains = function contains2(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};
var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) : /* @__PURE__ */ _curry1(function keys3(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
});
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);
  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }
  return !_includesWith(function(b2, aItem) {
    return !_includesWith(eq, aItem, b2);
  }, b, a);
}
function _equals(a, b, stackA, stackB) {
  if (_objectIs$1(a, b)) {
    return true;
  }
  var typeA = type(a);
  if (typeA !== type(b)) {
    return false;
  }
  if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
    return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
  }
  if (typeof a.equals === "function" || typeof b.equals === "function") {
    return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
  }
  switch (typeA) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
        return a === b;
      }
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof a === typeof b && _objectIs$1(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case "Date":
      if (!_objectIs$1(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case "Error":
      return a.name === b.name && a.message === b.message;
    case "RegExp":
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }
  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }
  switch (typeA) {
    case "Map":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case "Set":
      if (a.size !== b.size) {
        return false;
      }
      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return false;
  }
  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }
  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
  return _equals(a, b, [], []);
});
const equals$1 = equals;
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, pattern.flags ? pattern.flags : (pattern.global ? "g" : "") + (pattern.ignoreCase ? "i" : "") + (pattern.multiline ? "m" : "") + (pattern.sticky ? "y" : "") + (pattern.unicode ? "u" : "") + (pattern.dotAll ? "s" : ""));
}
function _clone(value, deep, map) {
  map || (map = new _ObjectMap());
  if (_isPrimitive(value)) {
    return value;
  }
  var copy = function copy2(copiedValue) {
    var cachedCopy = map.get(value);
    if (cachedCopy) {
      return cachedCopy;
    }
    map.set(value, copiedValue);
    for (var key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
      }
    }
    return copiedValue;
  };
  switch (type(value)) {
    case "Object":
      return copy(Object.create(Object.getPrototypeOf(value)));
    case "Array":
      return copy([]);
    case "Date":
      return new Date(value.valueOf());
    case "RegExp":
      return _cloneRegExp(value);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return value.slice();
    default:
      return value;
  }
}
function _isPrimitive(param) {
  var type3 = typeof param;
  return param == null || type3 != "object" && type3 != "function";
}
var _ObjectMap = /* @__PURE__ */ function() {
  function _ObjectMap2() {
    this.map = {};
    this.length = 0;
  }
  _ObjectMap2.prototype.set = function(key, value) {
    const hashedKey = this.hash(key);
    let bucket = this.map[hashedKey];
    if (!bucket) {
      this.map[hashedKey] = bucket = [];
    }
    bucket.push([key, value]);
    this.length += 1;
  };
  _ObjectMap2.prototype.hash = function(key) {
    let hashedKey = [];
    for (var value in key) {
      hashedKey.push(Object.prototype.toString.call(key[value]));
    }
    return hashedKey.join();
  };
  _ObjectMap2.prototype.get = function(key) {
    if (this.length <= 180) {
      for (const p in this.map) {
        const bucket2 = this.map[p];
        for (let i = 0; i < bucket2.length; i += 1) {
          const element = bucket2[i];
          if (element[0] === key) {
            return element[1];
          }
        }
      }
      return;
    }
    const hashedKey = this.hash(key);
    const bucket = this.map[hashedKey];
    if (!bucket) {
      return;
    }
    for (let i = 0; i < bucket.length; i += 1) {
      const element = bucket[i];
      if (element[0] === key) {
        return element[1];
      }
    }
  };
  return _ObjectMap2;
}();
var clone = /* @__PURE__ */ _curry1(function clone2(value) {
  return value != null && typeof value.clone === "function" ? value.clone() : _clone(value, true);
});
const clone$1 = clone;
const Select = (props) => {
  const {
    children,
    onChange,
    repeatTriggerUnselected = true,
    mode = "single",
    instance
  } = props;
  const subjectInstance = useSubjectInstance();
  const context = useMemo(() => {
    const selectItemMap = /* @__PURE__ */ new Map();
    if (typeof instance === "object" && instance) {
      Object.assign(instance, {
        triggerSelect(value) {
          let selectedId;
          selectItemMap.forEach((item, key) => {
            if (equals$1(item.value, value)) {
              selectedId = key;
            }
          });
          const triggerMap = {
            single(selectedId2) {
              const selectedItem = selectItemMap.get(selectedId2);
              if (repeatTriggerUnselected) {
                if (selectedItem.isChecked) {
                  selectedItem.isChecked = false;
                } else {
                  selectedItem.isChecked = true;
                }
                selectItemMap.forEach((item, id) => {
                  if (id !== selectedId2) {
                    item.isChecked = false;
                  }
                });
              } else {
                selectItemMap.forEach((item, id) => {
                  item.isChecked = false;
                });
                selectedItem.isChecked = true;
              }
              if (onChange) {
                onChange(
                  selectedItem.isChecked ? clone$1(selectedItem.value) : void 0
                );
              }
              selectItemMap.forEach((_, id) => {
                subjectInstance.send(id, void 0);
              });
            },
            multiple(selectedId2) {
              const selectedItem = selectItemMap.get(selectedId2);
              if (selectedItem.isChecked) {
                selectedItem.isChecked = false;
              } else {
                selectedItem.isChecked = true;
              }
              subjectInstance.send(selectedId2, void 0);
              if (onChange) {
                const selectValues = [];
                selectItemMap.forEach((item) => {
                  if (item.isChecked) {
                    selectValues.push(item.value);
                  }
                });
                onChange(clone$1(selectValues));
              }
            }
          };
          if (selectedId) {
            triggerMap[mode](selectedId);
          }
        }
      });
    }
    return {
      mode,
      repeatTriggerUnselected,
      subjectInstance,
      selectItemMap,
      onChange
    };
  }, []);
  return /* @__PURE__ */ React.createElement(SelectContext.Provider, { value: context }, /* @__PURE__ */ React.createElement(Subject, { instance: subjectInstance }, children));
};
const SelectItem = (props) => {
  const { value, children } = props;
  const { selectItemMap } = useContext(SelectContext) ?? {};
  const currentId = useId();
  useEffect(() => {
    selectItemMap.set(currentId, {
      value,
      isChecked: false
    });
    return () => {
      selectItemMap.delete(currentId);
    };
  }, [value]);
  if (!selectItemMap) {
    console.error("请搭配Select一起使用");
  }
  return /* @__PURE__ */ React.createElement(
    SubjectItem,
    {
      subject: {
        [currentId]() {
        }
      }
    },
    () => {
      var _a;
      return typeof children === "function" ? children({
        isChecked: !!((_a = selectItemMap.get(currentId)) == null ? void 0 : _a.isChecked)
      }) : children;
    }
  );
};
const useSelectInstance = () => {
  return useMemo(() => {
    return {
      triggerSelect() {
        console.log("请在组件挂在后使用");
      }
    };
  }, []);
};
export {
  Select,
  SelectItem,
  Subject,
  SubjectItem,
  useSelectInstance,
  useSubjectInstance
};
