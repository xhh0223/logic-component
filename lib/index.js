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
var type = /* @__PURE__ */ _curry1(function type2(val) {
  return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
});
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
    repeatClickDeselect = true,
    mode = "single"
  } = props;
  const instance = useSubjectInstance();
  const context = useMemo(() => {
    const selectItemMap = /* @__PURE__ */ new Map();
    return {
      mode,
      repeatClickDeselect,
      subjectInstance: instance,
      selectItemMap,
      onChange,
      clickHandler: {
        single(currentId) {
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
              currentItem.isChecked ? clone$1(currentItem.value) : void 0
            );
          }
          instance.send(currentId, currentId);
        },
        multiple(currentId) {
          const currentItem = selectItemMap.get(currentId);
          if (currentItem.isChecked) {
            currentItem.isChecked = false;
          } else {
            currentItem.isChecked = true;
          }
          if (onChange) {
            const selectValues = [];
            selectItemMap.forEach((item) => {
              if (item.isChecked) {
                selectValues.push(item.value);
              }
            });
            onChange(clone$1(selectValues));
            instance.send(currentId, currentId);
          }
        }
      }
    };
  }, []);
  return /* @__PURE__ */ React.createElement(SelectContext.Provider, { value: context }, /* @__PURE__ */ React.createElement(Subject, { instance }, children));
};
const SelectItem = (props) => {
  const { value, children, triggerEvent = "onClick" } = props;
  const { selectItemMap, clickHandler, mode } = useContext(SelectContext) ?? {};
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
      var _a, _b;
      let resultChild = children;
      if (typeof children === "function") {
        resultChild = children({
          isChecked: !!((_a = selectItemMap.get(currentId)) == null ? void 0 : _a.isChecked)
        });
      }
      if (React.isValidElement(resultChild)) {
        let triggerEventFn = (_b = resultChild == null ? void 0 : resultChild.props) == null ? void 0 : _b[triggerEvent];
        resultChild = React.cloneElement(resultChild, {
          [triggerEvent](e) {
            if (triggerEventFn) {
              triggerEventFn(e);
            }
            clickHandler == null ? void 0 : clickHandler[mode](currentId);
          }
        });
      }
      return resultChild;
    }
  );
};
export {
  Select,
  SelectItem,
  Subject,
  SubjectItem,
  useSubjectInstance
};
