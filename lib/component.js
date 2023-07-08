import React, { createContext, useMemo, useId, useContext, useState, useEffect } from "react";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = React, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a)
      m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React$1 = React;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type3) {
        if (typeof type3 === "string" || typeof type3 === "function") {
          return true;
        }
        if (type3 === REACT_FRAGMENT_TYPE || type3 === REACT_PROFILER_TYPE || enableDebugTracing || type3 === REACT_STRICT_MODE_TYPE || type3 === REACT_SUSPENSE_TYPE || type3 === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type3 === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type3 === "object" && type3 !== null) {
          if (type3.$$typeof === REACT_LAZY_TYPE || type3.$$typeof === REACT_MEMO_TYPE || type3.$$typeof === REACT_PROVIDER_TYPE || type3.$$typeof === REACT_CONTEXT_TYPE || type3.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type3.$$typeof === REACT_MODULE_REFERENCE || type3.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type3) {
        return type3.displayName || "Context";
      }
      function getComponentNameFromType(type3) {
        if (type3 == null) {
          return null;
        }
        {
          if (typeof type3.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type3 === "function") {
          return type3.displayName || type3.name || null;
        }
        if (typeof type3 === "string") {
          return type3;
        }
        switch (type3) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type3 === "object") {
          switch (type3.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type3;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type3;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type3, type3.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type3.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type3.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type3;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type3, source, ownerFn) {
        if (type3 == null) {
          return "";
        }
        if (typeof type3 === "function") {
          {
            return describeNativeComponentFrame(type3, shouldConstruct(type3));
          }
        }
        if (typeof type3 === "string") {
          return describeBuiltInComponentFrame(type3);
        }
        switch (type3) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type3 === "object") {
          switch (type3.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type3.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type3.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type3;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type3 = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type3;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type3, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type3,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type3, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type3 && type3.defaultProps) {
            var defaultProps = type3.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type3 === "function" ? type3.displayName || type3.name || "Unknown" : type3;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type3, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type3 = element.type;
          if (type3 === null || type3 === void 0 || typeof type3 === "string") {
            return;
          }
          var propTypes;
          if (typeof type3 === "function") {
            propTypes = type3.propTypes;
          } else if (typeof type3 === "object" && (type3.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type3.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type3.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type3);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type3.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type3);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type3.getDefaultProps === "function" && !type3.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type3, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type3);
          if (!validType) {
            var info = "";
            if (type3 === void 0 || typeof type3 === "object" && type3 !== null && Object.keys(type3).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type3 === null) {
              typeString = "null";
            } else if (isArray(type3)) {
              typeString = "array";
            } else if (type3 !== void 0 && type3.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type3.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type3;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type3, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type3);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type3);
              }
            }
          }
          if (type3 === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type3, props, key) {
        {
          return jsxWithValidation(type3, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type3, props, key) {
        {
          return jsxWithValidation(type3, props, key, false);
        }
      }
      var jsx2 = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx2;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
if (process.env.NODE_ENV === "production") {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;
const jsx = jsxRuntimeExports.jsx;
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
  return /* @__PURE__ */ jsx(SubjectContext.Provider, { value: subjectContext, children });
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
  return /* @__PURE__ */ jsx(SelectContext.Provider, { value: context, children: /* @__PURE__ */ jsx(Subject, { instance, children }) });
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
  return /* @__PURE__ */ jsx(
    SubjectItem,
    {
      subject: {
        [currentId]() {
        }
      },
      children: () => {
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
