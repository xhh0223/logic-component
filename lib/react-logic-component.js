var Br = { exports: {} }, Xe = {}, zr = { exports: {} }, j = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mt;
function cn() {
  if (mt)
    return j;
  mt = 1;
  var u = Symbol.for("react.element"), n = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), te = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), S = Symbol.iterator;
  function m(a) {
    return a === null || typeof a != "object" ? null : (a = S && a[S] || a["@@iterator"], typeof a == "function" ? a : null);
  }
  var oe = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, k = Object.assign, P = {};
  function V(a, p, O) {
    this.props = a, this.context = p, this.refs = P, this.updater = O || oe;
  }
  V.prototype.isReactComponent = {}, V.prototype.setState = function(a, p) {
    if (typeof a != "object" && typeof a != "function" && a != null)
      throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, p, "setState");
  }, V.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function q() {
  }
  q.prototype = V.prototype;
  function f(a, p, O) {
    this.props = a, this.context = p, this.refs = P, this.updater = O || oe;
  }
  var ne = f.prototype = new q();
  ne.constructor = f, k(ne, V.prototype), ne.isPureReactComponent = !0;
  var K = Array.isArray, W = Object.prototype.hasOwnProperty, Z = { current: null }, de = { key: !0, ref: !0, __self: !0, __source: !0 };
  function pe(a, p, O) {
    var $, x = {}, B = null, z = null;
    if (p != null)
      for ($ in p.ref !== void 0 && (z = p.ref), p.key !== void 0 && (B = "" + p.key), p)
        W.call(p, $) && !de.hasOwnProperty($) && (x[$] = p[$]);
    var N = arguments.length - 2;
    if (N === 1)
      x.children = O;
    else if (1 < N) {
      for (var M = Array(N), ue = 0; ue < N; ue++)
        M[ue] = arguments[ue + 2];
      x.children = M;
    }
    if (a && a.defaultProps)
      for ($ in N = a.defaultProps, N)
        x[$] === void 0 && (x[$] = N[$]);
    return { $$typeof: u, type: a, key: B, ref: z, props: x, _owner: Z.current };
  }
  function ye(a, p) {
    return { $$typeof: u, type: a.type, key: p, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function ge(a) {
    return typeof a == "object" && a !== null && a.$$typeof === u;
  }
  function me(a) {
    var p = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(O) {
      return p[O];
    });
  }
  var le = /\/+/g;
  function J(a, p) {
    return typeof a == "object" && a !== null && a.key != null ? me("" + a.key) : p.toString(36);
  }
  function ie(a, p, O, $, x) {
    var B = typeof a;
    (B === "undefined" || B === "boolean") && (a = null);
    var z = !1;
    if (a === null)
      z = !0;
    else
      switch (B) {
        case "string":
        case "number":
          z = !0;
          break;
        case "object":
          switch (a.$$typeof) {
            case u:
            case n:
              z = !0;
          }
      }
    if (z)
      return z = a, x = x(z), a = $ === "" ? "." + J(z, 0) : $, K(x) ? (O = "", a != null && (O = a.replace(le, "$&/") + "/"), ie(x, p, O, "", function(ue) {
        return ue;
      })) : x != null && (ge(x) && (x = ye(x, O + (!x.key || z && z.key === x.key ? "" : ("" + x.key).replace(le, "$&/") + "/") + a)), p.push(x)), 1;
    if (z = 0, $ = $ === "" ? "." : $ + ":", K(a))
      for (var N = 0; N < a.length; N++) {
        B = a[N];
        var M = $ + J(B, N);
        z += ie(B, p, O, M, x);
      }
    else if (M = m(a), typeof M == "function")
      for (a = M.call(a), N = 0; !(B = a.next()).done; )
        B = B.value, M = $ + J(B, N++), z += ie(B, p, O, M, x);
    else if (B === "object")
      throw p = String(a), Error("Objects are not valid as a React child (found: " + (p === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : p) + "). If you meant to render a collection of children, use an array instead.");
    return z;
  }
  function ee(a, p, O) {
    if (a == null)
      return a;
    var $ = [], x = 0;
    return ie(a, $, "", "", function(B) {
      return p.call(O, B, x++);
    }), $;
  }
  function ve(a) {
    if (a._status === -1) {
      var p = a._result;
      p = p(), p.then(function(O) {
        (a._status === 0 || a._status === -1) && (a._status = 1, a._result = O);
      }, function(O) {
        (a._status === 0 || a._status === -1) && (a._status = 2, a._result = O);
      }), a._status === -1 && (a._status = 0, a._result = p);
    }
    if (a._status === 1)
      return a._result.default;
    throw a._result;
  }
  var _ = { current: null }, _e = { transition: null }, Te = { ReactCurrentDispatcher: _, ReactCurrentBatchConfig: _e, ReactCurrentOwner: Z };
  return j.Children = { map: ee, forEach: function(a, p, O) {
    ee(a, function() {
      p.apply(this, arguments);
    }, O);
  }, count: function(a) {
    var p = 0;
    return ee(a, function() {
      p++;
    }), p;
  }, toArray: function(a) {
    return ee(a, function(p) {
      return p;
    }) || [];
  }, only: function(a) {
    if (!ge(a))
      throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } }, j.Component = V, j.Fragment = s, j.Profiler = h, j.PureComponent = f, j.StrictMode = l, j.Suspense = T, j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Te, j.cloneElement = function(a, p, O) {
    if (a == null)
      throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var $ = k({}, a.props), x = a.key, B = a.ref, z = a._owner;
    if (p != null) {
      if (p.ref !== void 0 && (B = p.ref, z = Z.current), p.key !== void 0 && (x = "" + p.key), a.type && a.type.defaultProps)
        var N = a.type.defaultProps;
      for (M in p)
        W.call(p, M) && !de.hasOwnProperty(M) && ($[M] = p[M] === void 0 && N !== void 0 ? N[M] : p[M]);
    }
    var M = arguments.length - 2;
    if (M === 1)
      $.children = O;
    else if (1 < M) {
      N = Array(M);
      for (var ue = 0; ue < M; ue++)
        N[ue] = arguments[ue + 2];
      $.children = N;
    }
    return { $$typeof: u, type: a.type, key: x, ref: B, props: $, _owner: z };
  }, j.createContext = function(a) {
    return a = { $$typeof: C, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, a.Provider = { $$typeof: E, _context: a }, a.Consumer = a;
  }, j.createElement = pe, j.createFactory = function(a) {
    var p = pe.bind(null, a);
    return p.type = a, p;
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(a) {
    return { $$typeof: w, render: a };
  }, j.isValidElement = ge, j.lazy = function(a) {
    return { $$typeof: U, _payload: { _status: -1, _result: a }, _init: ve };
  }, j.memo = function(a, p) {
    return { $$typeof: te, type: a, compare: p === void 0 ? null : p };
  }, j.startTransition = function(a) {
    var p = _e.transition;
    _e.transition = {};
    try {
      a();
    } finally {
      _e.transition = p;
    }
  }, j.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, j.useCallback = function(a, p) {
    return _.current.useCallback(a, p);
  }, j.useContext = function(a) {
    return _.current.useContext(a);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(a) {
    return _.current.useDeferredValue(a);
  }, j.useEffect = function(a, p) {
    return _.current.useEffect(a, p);
  }, j.useId = function() {
    return _.current.useId();
  }, j.useImperativeHandle = function(a, p, O) {
    return _.current.useImperativeHandle(a, p, O);
  }, j.useInsertionEffect = function(a, p) {
    return _.current.useInsertionEffect(a, p);
  }, j.useLayoutEffect = function(a, p) {
    return _.current.useLayoutEffect(a, p);
  }, j.useMemo = function(a, p) {
    return _.current.useMemo(a, p);
  }, j.useReducer = function(a, p, O) {
    return _.current.useReducer(a, p, O);
  }, j.useRef = function(a) {
    return _.current.useRef(a);
  }, j.useState = function(a) {
    return _.current.useState(a);
  }, j.useSyncExternalStore = function(a, p, O) {
    return _.current.useSyncExternalStore(a, p, O);
  }, j.useTransition = function() {
    return _.current.useTransition();
  }, j.version = "18.2.0", j;
}
var Ze = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Ze.exports;
var _t;
function ln() {
  return _t || (_t = 1, function(u, n) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.2.0", l = Symbol.for("react.element"), h = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), C = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), T = Symbol.for("react.provider"), te = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), oe = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), P = Symbol.for("react.offscreen"), V = Symbol.iterator, q = "@@iterator";
      function f(e) {
        if (e === null || typeof e != "object")
          return null;
        var r = V && e[V] || e[q];
        return typeof r == "function" ? r : null;
      }
      var ne = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, K = {
        transition: null
      }, W = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Z = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, de = {}, pe = null;
      function ye(e) {
        pe = e;
      }
      de.setExtraStackFrame = function(e) {
        pe = e;
      }, de.getCurrentStack = null, de.getStackAddendum = function() {
        var e = "";
        pe && (e += pe);
        var r = de.getCurrentStack;
        return r && (e += r() || ""), e;
      };
      var ge = !1, me = !1, le = !1, J = !1, ie = !1, ee = {
        ReactCurrentDispatcher: ne,
        ReactCurrentBatchConfig: K,
        ReactCurrentOwner: Z
      };
      ee.ReactDebugCurrentFrame = de, ee.ReactCurrentActQueue = W;
      function ve(e) {
        {
          for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            o[i - 1] = arguments[i];
          _e("warn", e, o);
        }
      }
      function _(e) {
        {
          for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
            o[i - 1] = arguments[i];
          _e("error", e, o);
        }
      }
      function _e(e, r, o) {
        {
          var i = ee.ReactDebugCurrentFrame, d = i.getStackAddendum();
          d !== "" && (r += "%s", o = o.concat([d]));
          var b = o.map(function(g) {
            return String(g);
          });
          b.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, b);
        }
      }
      var Te = {};
      function a(e, r) {
        {
          var o = e.constructor, i = o && (o.displayName || o.name) || "ReactClass", d = i + "." + r;
          if (Te[d])
            return;
          _("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", r, i), Te[d] = !0;
        }
      }
      var p = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(e) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(e, r, o) {
          a(e, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(e, r, o, i) {
          a(e, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(e, r, o, i) {
          a(e, "setState");
        }
      }, O = Object.assign, $ = {};
      Object.freeze($);
      function x(e, r, o) {
        this.props = e, this.context = r, this.refs = $, this.updater = o || p;
      }
      x.prototype.isReactComponent = {}, x.prototype.setState = function(e, r) {
        if (typeof e != "object" && typeof e != "function" && e != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, r, "setState");
      }, x.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      };
      {
        var B = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, z = function(e, r) {
          Object.defineProperty(x.prototype, e, {
            get: function() {
              ve("%s(...) is deprecated in plain JavaScript React classes. %s", r[0], r[1]);
            }
          });
        };
        for (var N in B)
          B.hasOwnProperty(N) && z(N, B[N]);
      }
      function M() {
      }
      M.prototype = x.prototype;
      function ue(e, r, o) {
        this.props = e, this.context = r, this.refs = $, this.updater = o || p;
      }
      var Ce = ue.prototype = new M();
      Ce.constructor = ue, O(Ce, x.prototype), Ce.isPureReactComponent = !0;
      function br() {
        var e = {
          current: null
        };
        return Object.seal(e), e;
      }
      var er = Array.isArray;
      function Ne(e) {
        return er(e);
      }
      function Er(e) {
        {
          var r = typeof Symbol == "function" && Symbol.toStringTag, o = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
          return o;
        }
      }
      function Ue(e) {
        try {
          return Pe(e), !1;
        } catch {
          return !0;
        }
      }
      function Pe(e) {
        return "" + e;
      }
      function Ae(e) {
        if (Ue(e))
          return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Er(e)), Pe(e);
      }
      function rr(e, r, o) {
        var i = e.displayName;
        if (i)
          return i;
        var d = r.displayName || r.name || "";
        return d !== "" ? o + "(" + d + ")" : o;
      }
      function je(e) {
        return e.displayName || "Context";
      }
      function be(e) {
        if (e == null)
          return null;
        if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
          return e.displayName || e.name || null;
        if (typeof e == "string")
          return e;
        switch (e) {
          case E:
            return "Fragment";
          case h:
            return "Portal";
          case w:
            return "Profiler";
          case C:
            return "StrictMode";
          case S:
            return "Suspense";
          case m:
            return "SuspenseList";
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case te:
              var r = e;
              return je(r) + ".Consumer";
            case T:
              var o = e;
              return je(o._context) + ".Provider";
            case U:
              return rr(e, e.render, "ForwardRef");
            case oe:
              var i = e.displayName || null;
              return i !== null ? i : be(e.type) || "Memo";
            case k: {
              var d = e, b = d._payload, g = d._init;
              try {
                return be(g(b));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var xe = Object.prototype.hasOwnProperty, Ve = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, tr, nr, We;
      We = {};
      function Ke(e) {
        if (xe.call(e, "ref")) {
          var r = Object.getOwnPropertyDescriptor(e, "ref").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.ref !== void 0;
      }
      function Oe(e) {
        if (xe.call(e, "key")) {
          var r = Object.getOwnPropertyDescriptor(e, "key").get;
          if (r && r.isReactWarning)
            return !1;
        }
        return e.key !== void 0;
      }
      function Rr(e, r) {
        var o = function() {
          tr || (tr = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: o,
          configurable: !0
        });
      }
      function ar(e, r) {
        var o = function() {
          nr || (nr = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        o.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: o,
          configurable: !0
        });
      }
      function or(e) {
        if (typeof e.ref == "string" && Z.current && e.__self && Z.current.stateNode !== e.__self) {
          var r = be(Z.current.type);
          We[r] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, e.ref), We[r] = !0);
        }
      }
      var Ie = function(e, r, o, i, d, b, g) {
        var R = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: l,
          // Built-in properties that belong on the element
          type: e,
          key: r,
          ref: o,
          props: g,
          // Record the component responsible for creating this element.
          _owner: b
        };
        return R._store = {}, Object.defineProperty(R._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(R, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: i
        }), Object.defineProperty(R, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: d
        }), Object.freeze && (Object.freeze(R.props), Object.freeze(R)), R;
      };
      function Cr(e, r, o) {
        var i, d = {}, b = null, g = null, R = null, D = null;
        if (r != null) {
          Ke(r) && (g = r.ref, or(r)), Oe(r) && (Ae(r.key), b = "" + r.key), R = r.__self === void 0 ? null : r.__self, D = r.__source === void 0 ? null : r.__source;
          for (i in r)
            xe.call(r, i) && !Ve.hasOwnProperty(i) && (d[i] = r[i]);
        }
        var Y = arguments.length - 2;
        if (Y === 1)
          d.children = o;
        else if (Y > 1) {
          for (var H = Array(Y), G = 0; G < Y; G++)
            H[G] = arguments[G + 2];
          Object.freeze && Object.freeze(H), d.children = H;
        }
        if (e && e.defaultProps) {
          var Q = e.defaultProps;
          for (i in Q)
            d[i] === void 0 && (d[i] = Q[i]);
        }
        if (b || g) {
          var ae = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          b && Rr(d, ae), g && ar(d, ae);
        }
        return Ie(e, b, g, R, D, Z.current, d);
      }
      function Or(e, r) {
        var o = Ie(e.type, r, e.ref, e._self, e._source, e._owner, e.props);
        return o;
      }
      function wr(e, r, o) {
        if (e == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var i, d = O({}, e.props), b = e.key, g = e.ref, R = e._self, D = e._source, Y = e._owner;
        if (r != null) {
          Ke(r) && (g = r.ref, Y = Z.current), Oe(r) && (Ae(r.key), b = "" + r.key);
          var H;
          e.type && e.type.defaultProps && (H = e.type.defaultProps);
          for (i in r)
            xe.call(r, i) && !Ve.hasOwnProperty(i) && (r[i] === void 0 && H !== void 0 ? d[i] = H[i] : d[i] = r[i]);
        }
        var G = arguments.length - 2;
        if (G === 1)
          d.children = o;
        else if (G > 1) {
          for (var Q = Array(G), ae = 0; ae < G; ae++)
            Q[ae] = arguments[ae + 2];
          d.children = Q;
        }
        return Ie(e.type, b, g, R, D, Y, d);
      }
      function we(e) {
        return typeof e == "object" && e !== null && e.$$typeof === l;
      }
      var ur = ".", Sr = ":";
      function kr(e) {
        var r = /[=:]/g, o = {
          "=": "=0",
          ":": "=2"
        }, i = e.replace(r, function(d) {
          return o[d];
        });
        return "$" + i;
      }
      var Ye = !1, ir = /\/+/g;
      function Ee(e) {
        return e.replace(ir, "$&/");
      }
      function De(e, r) {
        return typeof e == "object" && e !== null && e.key != null ? (Ae(e.key), kr("" + e.key)) : r.toString(36);
      }
      function Se(e, r, o, i, d) {
        var b = typeof e;
        (b === "undefined" || b === "boolean") && (e = null);
        var g = !1;
        if (e === null)
          g = !0;
        else
          switch (b) {
            case "string":
            case "number":
              g = !0;
              break;
            case "object":
              switch (e.$$typeof) {
                case l:
                case h:
                  g = !0;
              }
          }
        if (g) {
          var R = e, D = d(R), Y = i === "" ? ur + De(R, 0) : i;
          if (Ne(D)) {
            var H = "";
            Y != null && (H = Ee(Y) + "/"), Se(D, r, H, "", function(sn) {
              return sn;
            });
          } else
            D != null && (we(D) && (D.key && (!R || R.key !== D.key) && Ae(D.key), D = Or(
              D,
              // Keep both the (mapped) and old keys if they differ, just as
              // traverseAllChildren used to do for objects as children
              o + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
              (D.key && (!R || R.key !== D.key) ? (
                // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                // eslint-disable-next-line react-internal/safe-string-coercion
                Ee("" + D.key) + "/"
              ) : "") + Y
            )), r.push(D));
          return 1;
        }
        var G, Q, ae = 0, ce = i === "" ? ur : i + Sr;
        if (Ne(e))
          for (var mr = 0; mr < e.length; mr++)
            G = e[mr], Q = ce + De(G, mr), ae += Se(G, r, o, Q, d);
        else {
          var Vr = f(e);
          if (typeof Vr == "function") {
            var ht = e;
            Vr === ht.entries && (Ye || ve("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Ye = !0);
            for (var on = Vr.call(ht), yt, un = 0; !(yt = on.next()).done; )
              G = yt.value, Q = ce + De(G, un++), ae += Se(G, r, o, Q, d);
          } else if (b === "object") {
            var gt = String(e);
            throw new Error("Objects are not valid as a React child (found: " + (gt === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : gt) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return ae;
      }
      function Le(e, r, o) {
        if (e == null)
          return e;
        var i = [], d = 0;
        return Se(e, i, "", "", function(b) {
          return r.call(o, b, d++);
        }), i;
      }
      function Tr(e) {
        var r = 0;
        return Le(e, function() {
          r++;
        }), r;
      }
      function sr(e, r, o) {
        Le(e, function() {
          r.apply(this, arguments);
        }, o);
      }
      function Pr(e) {
        return Le(e, function(r) {
          return r;
        }) || [];
      }
      function cr(e) {
        if (!we(e))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return e;
      }
      function lr(e) {
        var r = {
          $$typeof: te,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: e,
          _currentValue2: e,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        r.Provider = {
          $$typeof: T,
          _context: r
        };
        var o = !1, i = !1, d = !1;
        {
          var b = {
            $$typeof: te,
            _context: r
          };
          Object.defineProperties(b, {
            Provider: {
              get: function() {
                return i || (i = !0, _("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), r.Provider;
              },
              set: function(g) {
                r.Provider = g;
              }
            },
            _currentValue: {
              get: function() {
                return r._currentValue;
              },
              set: function(g) {
                r._currentValue = g;
              }
            },
            _currentValue2: {
              get: function() {
                return r._currentValue2;
              },
              set: function(g) {
                r._currentValue2 = g;
              }
            },
            _threadCount: {
              get: function() {
                return r._threadCount;
              },
              set: function(g) {
                r._threadCount = g;
              }
            },
            Consumer: {
              get: function() {
                return o || (o = !0, _("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), r.Consumer;
              }
            },
            displayName: {
              get: function() {
                return r.displayName;
              },
              set: function(g) {
                d || (ve("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", g), d = !0);
              }
            }
          }), r.Consumer = b;
        }
        return r._currentRenderer = null, r._currentRenderer2 = null, r;
      }
      var $e = -1, He = 0, Ge = 1, Ar = 2;
      function jr(e) {
        if (e._status === $e) {
          var r = e._result, o = r();
          if (o.then(function(b) {
            if (e._status === He || e._status === $e) {
              var g = e;
              g._status = Ge, g._result = b;
            }
          }, function(b) {
            if (e._status === He || e._status === $e) {
              var g = e;
              g._status = Ar, g._result = b;
            }
          }), e._status === $e) {
            var i = e;
            i._status = He, i._result = o;
          }
        }
        if (e._status === Ge) {
          var d = e._result;
          return d === void 0 && _(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, d), "default" in d || _(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, d), d.default;
        } else
          throw e._result;
      }
      function xr(e) {
        var r = {
          // We use these fields to store the result.
          _status: $e,
          _result: e
        }, o = {
          $$typeof: k,
          _payload: r,
          _init: jr
        };
        {
          var i, d;
          Object.defineProperties(o, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return i;
              },
              set: function(b) {
                _("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), i = b, Object.defineProperty(o, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return d;
              },
              set: function(b) {
                _("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), d = b, Object.defineProperty(o, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return o;
      }
      function Ir(e) {
        e != null && e.$$typeof === oe ? _("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e != "function" ? _("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e) : e.length !== 0 && e.length !== 2 && _("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), e != null && (e.defaultProps != null || e.propTypes != null) && _("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var r = {
          $$typeof: U,
          render: e
        };
        {
          var o;
          Object.defineProperty(r, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return o;
            },
            set: function(i) {
              o = i, !e.name && !e.displayName && (e.displayName = i);
            }
          });
        }
        return r;
      }
      var t;
      t = Symbol.for("react.module.reference");
      function c(e) {
        return !!(typeof e == "string" || typeof e == "function" || e === E || e === w || ie || e === C || e === S || e === m || J || e === P || ge || me || le || typeof e == "object" && e !== null && (e.$$typeof === k || e.$$typeof === oe || e.$$typeof === T || e.$$typeof === te || e.$$typeof === U || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        e.$$typeof === t || e.getModuleId !== void 0));
      }
      function v(e, r) {
        c(e) || _("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e);
        var o = {
          $$typeof: oe,
          type: e,
          compare: r === void 0 ? null : r
        };
        {
          var i;
          Object.defineProperty(o, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return i;
            },
            set: function(d) {
              i = d, !e.name && !e.displayName && (e.displayName = d);
            }
          });
        }
        return o;
      }
      function y() {
        var e = ne.current;
        return e === null && _(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), e;
      }
      function L(e) {
        var r = y();
        if (e._context !== void 0) {
          var o = e._context;
          o.Consumer === e ? _("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : o.Provider === e && _("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return r.useContext(e);
      }
      function F(e) {
        var r = y();
        return r.useState(e);
      }
      function I(e, r, o) {
        var i = y();
        return i.useReducer(e, r, o);
      }
      function A(e) {
        var r = y();
        return r.useRef(e);
      }
      function se(e, r) {
        var o = y();
        return o.useEffect(e, r);
      }
      function X(e, r) {
        var o = y();
        return o.useInsertionEffect(e, r);
      }
      function re(e, r) {
        var o = y();
        return o.useLayoutEffect(e, r);
      }
      function fe(e, r) {
        var o = y();
        return o.useCallback(e, r);
      }
      function ke(e, r) {
        var o = y();
        return o.useMemo(e, r);
      }
      function fr(e, r, o) {
        var i = y();
        return i.useImperativeHandle(e, r, o);
      }
      function he(e, r) {
        {
          var o = y();
          return o.useDebugValue(e, r);
        }
      }
      function $t() {
        var e = y();
        return e.useTransition();
      }
      function Mt(e) {
        var r = y();
        return r.useDeferredValue(e);
      }
      function Ft() {
        var e = y();
        return e.useId();
      }
      function Nt(e, r, o) {
        var i = y();
        return i.useSyncExternalStore(e, r, o);
      }
      var Je = 0, Gr, Jr, Xr, Qr, Zr, et, rt;
      function tt() {
      }
      tt.__reactDisabledLog = !0;
      function Ut() {
        {
          if (Je === 0) {
            Gr = console.log, Jr = console.info, Xr = console.warn, Qr = console.error, Zr = console.group, et = console.groupCollapsed, rt = console.groupEnd;
            var e = {
              configurable: !0,
              enumerable: !0,
              value: tt,
              writable: !0
            };
            Object.defineProperties(console, {
              info: e,
              log: e,
              warn: e,
              error: e,
              group: e,
              groupCollapsed: e,
              groupEnd: e
            });
          }
          Je++;
        }
      }
      function Vt() {
        {
          if (Je--, Je === 0) {
            var e = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: O({}, e, {
                value: Gr
              }),
              info: O({}, e, {
                value: Jr
              }),
              warn: O({}, e, {
                value: Xr
              }),
              error: O({}, e, {
                value: Qr
              }),
              group: O({}, e, {
                value: Zr
              }),
              groupCollapsed: O({}, e, {
                value: et
              }),
              groupEnd: O({}, e, {
                value: rt
              })
            });
          }
          Je < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Dr = ee.ReactCurrentDispatcher, Lr;
      function dr(e, r, o) {
        {
          if (Lr === void 0)
            try {
              throw Error();
            } catch (d) {
              var i = d.stack.trim().match(/\n( *(at )?)/);
              Lr = i && i[1] || "";
            }
          return `
` + Lr + e;
        }
      }
      var $r = !1, pr;
      {
        var Wt = typeof WeakMap == "function" ? WeakMap : Map;
        pr = new Wt();
      }
      function nt(e, r) {
        if (!e || $r)
          return "";
        {
          var o = pr.get(e);
          if (o !== void 0)
            return o;
        }
        var i;
        $r = !0;
        var d = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var b;
        b = Dr.current, Dr.current = null, Ut();
        try {
          if (r) {
            var g = function() {
              throw Error();
            };
            if (Object.defineProperty(g.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(g, []);
              } catch (ce) {
                i = ce;
              }
              Reflect.construct(e, [], g);
            } else {
              try {
                g.call();
              } catch (ce) {
                i = ce;
              }
              e.call(g.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (ce) {
              i = ce;
            }
            e();
          }
        } catch (ce) {
          if (ce && i && typeof ce.stack == "string") {
            for (var R = ce.stack.split(`
`), D = i.stack.split(`
`), Y = R.length - 1, H = D.length - 1; Y >= 1 && H >= 0 && R[Y] !== D[H]; )
              H--;
            for (; Y >= 1 && H >= 0; Y--, H--)
              if (R[Y] !== D[H]) {
                if (Y !== 1 || H !== 1)
                  do
                    if (Y--, H--, H < 0 || R[Y] !== D[H]) {
                      var G = `
` + R[Y].replace(" at new ", " at ");
                      return e.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", e.displayName)), typeof e == "function" && pr.set(e, G), G;
                    }
                  while (Y >= 1 && H >= 0);
                break;
              }
          }
        } finally {
          $r = !1, Dr.current = b, Vt(), Error.prepareStackTrace = d;
        }
        var Q = e ? e.displayName || e.name : "", ae = Q ? dr(Q) : "";
        return typeof e == "function" && pr.set(e, ae), ae;
      }
      function Yt(e, r, o) {
        return nt(e, !1);
      }
      function qt(e) {
        var r = e.prototype;
        return !!(r && r.isReactComponent);
      }
      function vr(e, r, o) {
        if (e == null)
          return "";
        if (typeof e == "function")
          return nt(e, qt(e));
        if (typeof e == "string")
          return dr(e);
        switch (e) {
          case S:
            return dr("Suspense");
          case m:
            return dr("SuspenseList");
        }
        if (typeof e == "object")
          switch (e.$$typeof) {
            case U:
              return Yt(e.render);
            case oe:
              return vr(e.type, r, o);
            case k: {
              var i = e, d = i._payload, b = i._init;
              try {
                return vr(b(d), r, o);
              } catch {
              }
            }
          }
        return "";
      }
      var at = {}, ot = ee.ReactDebugCurrentFrame;
      function hr(e) {
        if (e) {
          var r = e._owner, o = vr(e.type, e._source, r ? r.type : null);
          ot.setExtraStackFrame(o);
        } else
          ot.setExtraStackFrame(null);
      }
      function Bt(e, r, o, i, d) {
        {
          var b = Function.call.bind(xe);
          for (var g in e)
            if (b(e, g)) {
              var R = void 0;
              try {
                if (typeof e[g] != "function") {
                  var D = Error((i || "React class") + ": " + o + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw D.name = "Invariant Violation", D;
                }
                R = e[g](r, g, i, o, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Y) {
                R = Y;
              }
              R && !(R instanceof Error) && (hr(d), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", o, g, typeof R), hr(null)), R instanceof Error && !(R.message in at) && (at[R.message] = !0, hr(d), _("Failed %s type: %s", o, R.message), hr(null));
            }
        }
      }
      function qe(e) {
        if (e) {
          var r = e._owner, o = vr(e.type, e._source, r ? r.type : null);
          ye(o);
        } else
          ye(null);
      }
      var Mr;
      Mr = !1;
      function ut() {
        if (Z.current) {
          var e = be(Z.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
      function zt(e) {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), o = e.lineNumber;
          return `

Check your code at ` + r + ":" + o + ".";
        }
        return "";
      }
      function Kt(e) {
        return e != null ? zt(e.__source) : "";
      }
      var it = {};
      function Ht(e) {
        var r = ut();
        if (!r) {
          var o = typeof e == "string" ? e : e.displayName || e.name;
          o && (r = `

Check the top-level render call using <` + o + ">.");
        }
        return r;
      }
      function st(e, r) {
        if (!(!e._store || e._store.validated || e.key != null)) {
          e._store.validated = !0;
          var o = Ht(r);
          if (!it[o]) {
            it[o] = !0;
            var i = "";
            e && e._owner && e._owner !== Z.current && (i = " It was passed a child from " + be(e._owner.type) + "."), qe(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', o, i), qe(null);
          }
        }
      }
      function ct(e, r) {
        if (typeof e == "object") {
          if (Ne(e))
            for (var o = 0; o < e.length; o++) {
              var i = e[o];
              we(i) && st(i, r);
            }
          else if (we(e))
            e._store && (e._store.validated = !0);
          else if (e) {
            var d = f(e);
            if (typeof d == "function" && d !== e.entries)
              for (var b = d.call(e), g; !(g = b.next()).done; )
                we(g.value) && st(g.value, r);
          }
        }
      }
      function lt(e) {
        {
          var r = e.type;
          if (r == null || typeof r == "string")
            return;
          var o;
          if (typeof r == "function")
            o = r.propTypes;
          else if (typeof r == "object" && (r.$$typeof === U || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          r.$$typeof === oe))
            o = r.propTypes;
          else
            return;
          if (o) {
            var i = be(r);
            Bt(o, e.props, "prop", i, e);
          } else if (r.PropTypes !== void 0 && !Mr) {
            Mr = !0;
            var d = be(r);
            _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
          }
          typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Gt(e) {
        {
          for (var r = Object.keys(e.props), o = 0; o < r.length; o++) {
            var i = r[o];
            if (i !== "children" && i !== "key") {
              qe(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", i), qe(null);
              break;
            }
          }
          e.ref !== null && (qe(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), qe(null));
        }
      }
      function ft(e, r, o) {
        var i = c(e);
        if (!i) {
          var d = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (d += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var b = Kt(r);
          b ? d += b : d += ut();
          var g;
          e === null ? g = "null" : Ne(e) ? g = "array" : e !== void 0 && e.$$typeof === l ? (g = "<" + (be(e.type) || "Unknown") + " />", d = " Did you accidentally export a JSX literal instead of a component?") : g = typeof e, _("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", g, d);
        }
        var R = Cr.apply(this, arguments);
        if (R == null)
          return R;
        if (i)
          for (var D = 2; D < arguments.length; D++)
            ct(arguments[D], e);
        return e === E ? Gt(R) : lt(R), R;
      }
      var dt = !1;
      function Jt(e) {
        var r = ft.bind(null, e);
        return r.type = e, dt || (dt = !0, ve("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(r, "type", {
          enumerable: !1,
          get: function() {
            return ve("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: e
            }), e;
          }
        }), r;
      }
      function Xt(e, r, o) {
        for (var i = wr.apply(this, arguments), d = 2; d < arguments.length; d++)
          ct(arguments[d], i.type);
        return lt(i), i;
      }
      function Qt(e, r) {
        var o = K.transition;
        K.transition = {};
        var i = K.transition;
        K.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          e();
        } finally {
          if (K.transition = o, o === null && i._updatedFibers) {
            var d = i._updatedFibers.size;
            d > 10 && ve("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
          }
        }
      }
      var pt = !1, yr = null;
      function Zt(e) {
        if (yr === null)
          try {
            var r = ("require" + Math.random()).slice(0, 7), o = u && u[r];
            yr = o.call(u, "timers").setImmediate;
          } catch {
            yr = function(d) {
              pt === !1 && (pt = !0, typeof MessageChannel > "u" && _("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var b = new MessageChannel();
              b.port1.onmessage = d, b.port2.postMessage(void 0);
            };
          }
        return yr(e);
      }
      var Be = 0, vt = !1;
      function en(e) {
        {
          var r = Be;
          Be++, W.current === null && (W.current = []);
          var o = W.isBatchingLegacy, i;
          try {
            if (W.isBatchingLegacy = !0, i = e(), !o && W.didScheduleLegacyUpdate) {
              var d = W.current;
              d !== null && (W.didScheduleLegacyUpdate = !1, Ur(d));
            }
          } catch (Q) {
            throw gr(r), Q;
          } finally {
            W.isBatchingLegacy = o;
          }
          if (i !== null && typeof i == "object" && typeof i.then == "function") {
            var b = i, g = !1, R = {
              then: function(Q, ae) {
                g = !0, b.then(function(ce) {
                  gr(r), Be === 0 ? Fr(ce, Q, ae) : Q(ce);
                }, function(ce) {
                  gr(r), ae(ce);
                });
              }
            };
            return !vt && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              g || (vt = !0, _("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), R;
          } else {
            var D = i;
            if (gr(r), Be === 0) {
              var Y = W.current;
              Y !== null && (Ur(Y), W.current = null);
              var H = {
                then: function(Q, ae) {
                  W.current === null ? (W.current = [], Fr(D, Q, ae)) : Q(D);
                }
              };
              return H;
            } else {
              var G = {
                then: function(Q, ae) {
                  Q(D);
                }
              };
              return G;
            }
          }
        }
      }
      function gr(e) {
        e !== Be - 1 && _("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Be = e;
      }
      function Fr(e, r, o) {
        {
          var i = W.current;
          if (i !== null)
            try {
              Ur(i), Zt(function() {
                i.length === 0 ? (W.current = null, r(e)) : Fr(e, r, o);
              });
            } catch (d) {
              o(d);
            }
          else
            r(e);
        }
      }
      var Nr = !1;
      function Ur(e) {
        if (!Nr) {
          Nr = !0;
          var r = 0;
          try {
            for (; r < e.length; r++) {
              var o = e[r];
              do
                o = o(!0);
              while (o !== null);
            }
            e.length = 0;
          } catch (i) {
            throw e = e.slice(r + 1), i;
          } finally {
            Nr = !1;
          }
        }
      }
      var rn = ft, tn = Xt, nn = Jt, an = {
        map: Le,
        forEach: sr,
        count: Tr,
        toArray: Pr,
        only: cr
      };
      n.Children = an, n.Component = x, n.Fragment = E, n.Profiler = w, n.PureComponent = ue, n.StrictMode = C, n.Suspense = S, n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee, n.cloneElement = tn, n.createContext = lr, n.createElement = rn, n.createFactory = nn, n.createRef = br, n.forwardRef = Ir, n.isValidElement = we, n.lazy = xr, n.memo = v, n.startTransition = Qt, n.unstable_act = en, n.useCallback = fe, n.useContext = L, n.useDebugValue = he, n.useDeferredValue = Mt, n.useEffect = se, n.useId = Ft, n.useImperativeHandle = fr, n.useInsertionEffect = X, n.useLayoutEffect = re, n.useMemo = ke, n.useReducer = I, n.useRef = A, n.useState = F, n.useSyncExternalStore = Nt, n.useTransition = $t, n.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Ze, Ze.exports)), Ze.exports;
}
process.env.NODE_ENV === "production" ? zr.exports = cn() : zr.exports = ln();
var Fe = zr.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bt;
function fn() {
  if (bt)
    return Xe;
  bt = 1;
  var u = Fe, n = Symbol.for("react.element"), s = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, h = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E = { key: !0, ref: !0, __self: !0, __source: !0 };
  function C(w, T, te) {
    var U, S = {}, m = null, oe = null;
    te !== void 0 && (m = "" + te), T.key !== void 0 && (m = "" + T.key), T.ref !== void 0 && (oe = T.ref);
    for (U in T)
      l.call(T, U) && !E.hasOwnProperty(U) && (S[U] = T[U]);
    if (w && w.defaultProps)
      for (U in T = w.defaultProps, T)
        S[U] === void 0 && (S[U] = T[U]);
    return { $$typeof: n, type: w, key: m, ref: oe, props: S, _owner: h.current };
  }
  return Xe.Fragment = s, Xe.jsx = C, Xe.jsxs = C, Xe;
}
var Qe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Et;
function dn() {
  return Et || (Et = 1, process.env.NODE_ENV !== "production" && function() {
    var u = Fe, n = Symbol.for("react.element"), s = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), w = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), oe = Symbol.for("react.offscreen"), k = Symbol.iterator, P = "@@iterator";
    function V(t) {
      if (t === null || typeof t != "object")
        return null;
      var c = k && t[k] || t[P];
      return typeof c == "function" ? c : null;
    }
    var q = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function f(t) {
      {
        for (var c = arguments.length, v = new Array(c > 1 ? c - 1 : 0), y = 1; y < c; y++)
          v[y - 1] = arguments[y];
        ne("error", t, v);
      }
    }
    function ne(t, c, v) {
      {
        var y = q.ReactDebugCurrentFrame, L = y.getStackAddendum();
        L !== "" && (c += "%s", v = v.concat([L]));
        var F = v.map(function(I) {
          return String(I);
        });
        F.unshift("Warning: " + c), Function.prototype.apply.call(console[t], console, F);
      }
    }
    var K = !1, W = !1, Z = !1, de = !1, pe = !1, ye;
    ye = Symbol.for("react.module.reference");
    function ge(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === l || t === E || pe || t === h || t === te || t === U || de || t === oe || K || W || Z || typeof t == "object" && t !== null && (t.$$typeof === m || t.$$typeof === S || t.$$typeof === C || t.$$typeof === w || t.$$typeof === T || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === ye || t.getModuleId !== void 0));
    }
    function me(t, c, v) {
      var y = t.displayName;
      if (y)
        return y;
      var L = c.displayName || c.name || "";
      return L !== "" ? v + "(" + L + ")" : v;
    }
    function le(t) {
      return t.displayName || "Context";
    }
    function J(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case l:
          return "Fragment";
        case s:
          return "Portal";
        case E:
          return "Profiler";
        case h:
          return "StrictMode";
        case te:
          return "Suspense";
        case U:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case w:
            var c = t;
            return le(c) + ".Consumer";
          case C:
            var v = t;
            return le(v._context) + ".Provider";
          case T:
            return me(t, t.render, "ForwardRef");
          case S:
            var y = t.displayName || null;
            return y !== null ? y : J(t.type) || "Memo";
          case m: {
            var L = t, F = L._payload, I = L._init;
            try {
              return J(I(F));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ie = Object.assign, ee = 0, ve, _, _e, Te, a, p, O;
    function $() {
    }
    $.__reactDisabledLog = !0;
    function x() {
      {
        if (ee === 0) {
          ve = console.log, _ = console.info, _e = console.warn, Te = console.error, a = console.group, p = console.groupCollapsed, O = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: $,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        ee++;
      }
    }
    function B() {
      {
        if (ee--, ee === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ie({}, t, {
              value: ve
            }),
            info: ie({}, t, {
              value: _
            }),
            warn: ie({}, t, {
              value: _e
            }),
            error: ie({}, t, {
              value: Te
            }),
            group: ie({}, t, {
              value: a
            }),
            groupCollapsed: ie({}, t, {
              value: p
            }),
            groupEnd: ie({}, t, {
              value: O
            })
          });
        }
        ee < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var z = q.ReactCurrentDispatcher, N;
    function M(t, c, v) {
      {
        if (N === void 0)
          try {
            throw Error();
          } catch (L) {
            var y = L.stack.trim().match(/\n( *(at )?)/);
            N = y && y[1] || "";
          }
        return `
` + N + t;
      }
    }
    var ue = !1, Ce;
    {
      var br = typeof WeakMap == "function" ? WeakMap : Map;
      Ce = new br();
    }
    function er(t, c) {
      if (!t || ue)
        return "";
      {
        var v = Ce.get(t);
        if (v !== void 0)
          return v;
      }
      var y;
      ue = !0;
      var L = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var F;
      F = z.current, z.current = null, x();
      try {
        if (c) {
          var I = function() {
            throw Error();
          };
          if (Object.defineProperty(I.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(I, []);
            } catch (he) {
              y = he;
            }
            Reflect.construct(t, [], I);
          } else {
            try {
              I.call();
            } catch (he) {
              y = he;
            }
            t.call(I.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (he) {
            y = he;
          }
          t();
        }
      } catch (he) {
        if (he && y && typeof he.stack == "string") {
          for (var A = he.stack.split(`
`), se = y.stack.split(`
`), X = A.length - 1, re = se.length - 1; X >= 1 && re >= 0 && A[X] !== se[re]; )
            re--;
          for (; X >= 1 && re >= 0; X--, re--)
            if (A[X] !== se[re]) {
              if (X !== 1 || re !== 1)
                do
                  if (X--, re--, re < 0 || A[X] !== se[re]) {
                    var fe = `
` + A[X].replace(" at new ", " at ");
                    return t.displayName && fe.includes("<anonymous>") && (fe = fe.replace("<anonymous>", t.displayName)), typeof t == "function" && Ce.set(t, fe), fe;
                  }
                while (X >= 1 && re >= 0);
              break;
            }
        }
      } finally {
        ue = !1, z.current = F, B(), Error.prepareStackTrace = L;
      }
      var ke = t ? t.displayName || t.name : "", fr = ke ? M(ke) : "";
      return typeof t == "function" && Ce.set(t, fr), fr;
    }
    function Ne(t, c, v) {
      return er(t, !1);
    }
    function Er(t) {
      var c = t.prototype;
      return !!(c && c.isReactComponent);
    }
    function Ue(t, c, v) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return er(t, Er(t));
      if (typeof t == "string")
        return M(t);
      switch (t) {
        case te:
          return M("Suspense");
        case U:
          return M("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case T:
            return Ne(t.render);
          case S:
            return Ue(t.type, c, v);
          case m: {
            var y = t, L = y._payload, F = y._init;
            try {
              return Ue(F(L), c, v);
            } catch {
            }
          }
        }
      return "";
    }
    var Pe = Object.prototype.hasOwnProperty, Ae = {}, rr = q.ReactDebugCurrentFrame;
    function je(t) {
      if (t) {
        var c = t._owner, v = Ue(t.type, t._source, c ? c.type : null);
        rr.setExtraStackFrame(v);
      } else
        rr.setExtraStackFrame(null);
    }
    function be(t, c, v, y, L) {
      {
        var F = Function.call.bind(Pe);
        for (var I in t)
          if (F(t, I)) {
            var A = void 0;
            try {
              if (typeof t[I] != "function") {
                var se = Error((y || "React class") + ": " + v + " type `" + I + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[I] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw se.name = "Invariant Violation", se;
              }
              A = t[I](c, I, y, v, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (X) {
              A = X;
            }
            A && !(A instanceof Error) && (je(L), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", y || "React class", v, I, typeof A), je(null)), A instanceof Error && !(A.message in Ae) && (Ae[A.message] = !0, je(L), f("Failed %s type: %s", v, A.message), je(null));
          }
      }
    }
    var xe = Array.isArray;
    function Ve(t) {
      return xe(t);
    }
    function tr(t) {
      {
        var c = typeof Symbol == "function" && Symbol.toStringTag, v = c && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return v;
      }
    }
    function nr(t) {
      try {
        return We(t), !1;
      } catch {
        return !0;
      }
    }
    function We(t) {
      return "" + t;
    }
    function Ke(t) {
      if (nr(t))
        return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(t)), We(t);
    }
    var Oe = q.ReactCurrentOwner, Rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ar, or, Ie;
    Ie = {};
    function Cr(t) {
      if (Pe.call(t, "ref")) {
        var c = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function Or(t) {
      if (Pe.call(t, "key")) {
        var c = Object.getOwnPropertyDescriptor(t, "key").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function wr(t, c) {
      if (typeof t.ref == "string" && Oe.current && c && Oe.current.stateNode !== c) {
        var v = J(Oe.current.type);
        Ie[v] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', J(Oe.current.type), t.ref), Ie[v] = !0);
      }
    }
    function we(t, c) {
      {
        var v = function() {
          ar || (ar = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        v.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: v,
          configurable: !0
        });
      }
    }
    function ur(t, c) {
      {
        var v = function() {
          or || (or = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        v.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: v,
          configurable: !0
        });
      }
    }
    var Sr = function(t, c, v, y, L, F, I) {
      var A = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: t,
        key: c,
        ref: v,
        props: I,
        // Record the component responsible for creating this element.
        _owner: F
      };
      return A._store = {}, Object.defineProperty(A._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(A, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: y
      }), Object.defineProperty(A, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: L
      }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
    };
    function kr(t, c, v, y, L) {
      {
        var F, I = {}, A = null, se = null;
        v !== void 0 && (Ke(v), A = "" + v), Or(c) && (Ke(c.key), A = "" + c.key), Cr(c) && (se = c.ref, wr(c, L));
        for (F in c)
          Pe.call(c, F) && !Rr.hasOwnProperty(F) && (I[F] = c[F]);
        if (t && t.defaultProps) {
          var X = t.defaultProps;
          for (F in X)
            I[F] === void 0 && (I[F] = X[F]);
        }
        if (A || se) {
          var re = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          A && we(I, re), se && ur(I, re);
        }
        return Sr(t, A, se, L, y, Oe.current, I);
      }
    }
    var Ye = q.ReactCurrentOwner, ir = q.ReactDebugCurrentFrame;
    function Ee(t) {
      if (t) {
        var c = t._owner, v = Ue(t.type, t._source, c ? c.type : null);
        ir.setExtraStackFrame(v);
      } else
        ir.setExtraStackFrame(null);
    }
    var De;
    De = !1;
    function Se(t) {
      return typeof t == "object" && t !== null && t.$$typeof === n;
    }
    function Le() {
      {
        if (Ye.current) {
          var t = J(Ye.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function Tr(t) {
      {
        if (t !== void 0) {
          var c = t.fileName.replace(/^.*[\\\/]/, ""), v = t.lineNumber;
          return `

Check your code at ` + c + ":" + v + ".";
        }
        return "";
      }
    }
    var sr = {};
    function Pr(t) {
      {
        var c = Le();
        if (!c) {
          var v = typeof t == "string" ? t : t.displayName || t.name;
          v && (c = `

Check the top-level render call using <` + v + ">.");
        }
        return c;
      }
    }
    function cr(t, c) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var v = Pr(c);
        if (sr[v])
          return;
        sr[v] = !0;
        var y = "";
        t && t._owner && t._owner !== Ye.current && (y = " It was passed a child from " + J(t._owner.type) + "."), Ee(t), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', v, y), Ee(null);
      }
    }
    function lr(t, c) {
      {
        if (typeof t != "object")
          return;
        if (Ve(t))
          for (var v = 0; v < t.length; v++) {
            var y = t[v];
            Se(y) && cr(y, c);
          }
        else if (Se(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var L = V(t);
          if (typeof L == "function" && L !== t.entries)
            for (var F = L.call(t), I; !(I = F.next()).done; )
              Se(I.value) && cr(I.value, c);
        }
      }
    }
    function $e(t) {
      {
        var c = t.type;
        if (c == null || typeof c == "string")
          return;
        var v;
        if (typeof c == "function")
          v = c.propTypes;
        else if (typeof c == "object" && (c.$$typeof === T || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        c.$$typeof === S))
          v = c.propTypes;
        else
          return;
        if (v) {
          var y = J(c);
          be(v, t.props, "prop", y, t);
        } else if (c.PropTypes !== void 0 && !De) {
          De = !0;
          var L = J(c);
          f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", L || "Unknown");
        }
        typeof c.getDefaultProps == "function" && !c.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function He(t) {
      {
        for (var c = Object.keys(t.props), v = 0; v < c.length; v++) {
          var y = c[v];
          if (y !== "children" && y !== "key") {
            Ee(t), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", y), Ee(null);
            break;
          }
        }
        t.ref !== null && (Ee(t), f("Invalid attribute `ref` supplied to `React.Fragment`."), Ee(null));
      }
    }
    function Ge(t, c, v, y, L, F) {
      {
        var I = ge(t);
        if (!I) {
          var A = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (A += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var se = Tr(L);
          se ? A += se : A += Le();
          var X;
          t === null ? X = "null" : Ve(t) ? X = "array" : t !== void 0 && t.$$typeof === n ? (X = "<" + (J(t.type) || "Unknown") + " />", A = " Did you accidentally export a JSX literal instead of a component?") : X = typeof t, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", X, A);
        }
        var re = kr(t, c, v, L, F);
        if (re == null)
          return re;
        if (I) {
          var fe = c.children;
          if (fe !== void 0)
            if (y)
              if (Ve(fe)) {
                for (var ke = 0; ke < fe.length; ke++)
                  lr(fe[ke], t);
                Object.freeze && Object.freeze(fe);
              } else
                f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              lr(fe, t);
        }
        return t === l ? He(re) : $e(re), re;
      }
    }
    function Ar(t, c, v) {
      return Ge(t, c, v, !0);
    }
    function jr(t, c, v) {
      return Ge(t, c, v, !1);
    }
    var xr = jr, Ir = Ar;
    Qe.Fragment = l, Qe.jsx = xr, Qe.jsxs = Ir;
  }()), Qe;
}
process.env.NODE_ENV === "production" ? Br.exports = fn() : Br.exports = dn();
var jt = Br.exports;
const Wr = jt.jsx, pn = jt.jsxs;
function ze(u) {
  return u != null && typeof u == "object" && u["@@functional/placeholder"] === !0;
}
function Re(u) {
  return function n(s) {
    return arguments.length === 0 || ze(s) ? n : u.apply(this, arguments);
  };
}
function xt(u) {
  return function n(s, l) {
    switch (arguments.length) {
      case 0:
        return n;
      case 1:
        return ze(s) ? n : Re(function(h) {
          return u(s, h);
        });
      default:
        return ze(s) && ze(l) ? n : ze(s) ? Re(function(h) {
          return u(h, l);
        }) : ze(l) ? Re(function(h) {
          return u(s, h);
        }) : u(s, l);
    }
  };
}
const vn = Array.isArray || function(n) {
  return n != null && n.length >= 0 && Object.prototype.toString.call(n) === "[object Array]";
};
function Rt(u) {
  for (var n = [], s; !(s = u.next()).done; )
    n.push(s.value);
  return n;
}
function Ct(u, n, s) {
  for (var l = 0, h = s.length; l < h; ) {
    if (u(n, s[l]))
      return !0;
    l += 1;
  }
  return !1;
}
function hn(u) {
  var n = String(u).match(/^function (\w*)/);
  return n == null ? "" : n[1];
}
function _r(u, n) {
  return Object.prototype.hasOwnProperty.call(n, u);
}
function yn(u, n) {
  return u === n ? u !== 0 || 1 / u === 1 / n : u !== u && n !== n;
}
const Yr = typeof Object.is == "function" ? Object.is : yn;
var Ot = Object.prototype.toString, gn = /* @__PURE__ */ function() {
  return Ot.call(arguments) === "[object Arguments]" ? function(n) {
    return Ot.call(n) === "[object Arguments]";
  } : function(n) {
    return _r("callee", n);
  };
}(), mn = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString"), wt = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], St = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}(), _n = function(n, s) {
  for (var l = 0; l < n.length; ) {
    if (n[l] === s)
      return !0;
    l += 1;
  }
  return !1;
}, kt = /* @__PURE__ */ Re(typeof Object.keys == "function" && !St ? function(n) {
  return Object(n) !== n ? [] : Object.keys(n);
} : function(n) {
  if (Object(n) !== n)
    return [];
  var s, l, h = [], E = St && gn(n);
  for (s in n)
    _r(s, n) && (!E || s !== "length") && (h[h.length] = s);
  if (mn)
    for (l = wt.length - 1; l >= 0; )
      s = wt[l], _r(s, n) && !_n(h, s) && (h[h.length] = s), l -= 1;
  return h;
}), Kr = /* @__PURE__ */ Re(function(n) {
  return n === null ? "Null" : n === void 0 ? "Undefined" : Object.prototype.toString.call(n).slice(8, -1);
});
function Tt(u, n, s, l) {
  var h = Rt(u), E = Rt(n);
  function C(w, T) {
    return Hr(w, T, s.slice(), l.slice());
  }
  return !Ct(function(w, T) {
    return !Ct(C, T, w);
  }, E, h);
}
function Hr(u, n, s, l) {
  if (Yr(u, n))
    return !0;
  var h = Kr(u);
  if (h !== Kr(n))
    return !1;
  if (typeof u["fantasy-land/equals"] == "function" || typeof n["fantasy-land/equals"] == "function")
    return typeof u["fantasy-land/equals"] == "function" && u["fantasy-land/equals"](n) && typeof n["fantasy-land/equals"] == "function" && n["fantasy-land/equals"](u);
  if (typeof u.equals == "function" || typeof n.equals == "function")
    return typeof u.equals == "function" && u.equals(n) && typeof n.equals == "function" && n.equals(u);
  switch (h) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof u.constructor == "function" && hn(u.constructor) === "Promise")
        return u === n;
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof u == typeof n && Yr(u.valueOf(), n.valueOf())))
        return !1;
      break;
    case "Date":
      if (!Yr(u.valueOf(), n.valueOf()))
        return !1;
      break;
    case "Error":
      return u.name === n.name && u.message === n.message;
    case "RegExp":
      if (!(u.source === n.source && u.global === n.global && u.ignoreCase === n.ignoreCase && u.multiline === n.multiline && u.sticky === n.sticky && u.unicode === n.unicode))
        return !1;
      break;
  }
  for (var E = s.length - 1; E >= 0; ) {
    if (s[E] === u)
      return l[E] === n;
    E -= 1;
  }
  switch (h) {
    case "Map":
      return u.size !== n.size ? !1 : Tt(u.entries(), n.entries(), s.concat([u]), l.concat([n]));
    case "Set":
      return u.size !== n.size ? !1 : Tt(u.values(), n.values(), s.concat([u]), l.concat([n]));
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
      return !1;
  }
  var C = kt(u);
  if (C.length !== kt(n).length)
    return !1;
  var w = s.concat([u]), T = l.concat([n]);
  for (E = C.length - 1; E >= 0; ) {
    var te = C[E];
    if (!(_r(te, n) && Hr(n[te], u[te], w, T)))
      return !1;
    E -= 1;
  }
  return !0;
}
var bn = /* @__PURE__ */ xt(function(n, s) {
  return Hr(n, s, [], []);
});
const It = bn;
function Dt(u) {
  return Object.prototype.toString.call(u) === "[object String]";
}
var En = /* @__PURE__ */ xt(function(n, s) {
  var l = n < 0 ? s.length + n : n;
  return Dt(s) ? s.charAt(l) : s[l];
});
const Rn = En;
var Cn = /* @__PURE__ */ Re(function(n) {
  return vn(n) ? !0 : !n || typeof n != "object" || Dt(n) ? !1 : n.length === 0 ? !0 : n.length > 0 ? n.hasOwnProperty(0) && n.hasOwnProperty(n.length - 1) : !1;
});
function On(u) {
  return function n(s) {
    for (var l, h, E, C = [], w = 0, T = s.length; w < T; ) {
      if (Cn(s[w]))
        for (l = u ? n(s[w]) : s[w], E = 0, h = l.length; E < h; )
          C[C.length] = l[E], E += 1;
      else
        C[C.length] = s[w];
      w += 1;
    }
    return C;
  };
}
function wn(u) {
  return new RegExp(u.source, u.flags ? u.flags : (u.global ? "g" : "") + (u.ignoreCase ? "i" : "") + (u.multiline ? "m" : "") + (u.sticky ? "y" : "") + (u.unicode ? "u" : "") + (u.dotAll ? "s" : ""));
}
function Lt(u, n, s) {
  if (s || (s = new kn()), Sn(u))
    return u;
  var l = function(E) {
    var C = s.get(u);
    if (C)
      return C;
    s.set(u, E);
    for (var w in u)
      Object.prototype.hasOwnProperty.call(u, w) && (E[w] = n ? Lt(u[w], !0, s) : u[w]);
    return E;
  };
  switch (Kr(u)) {
    case "Object":
      return l(Object.create(Object.getPrototypeOf(u)));
    case "Array":
      return l([]);
    case "Date":
      return new Date(u.valueOf());
    case "RegExp":
      return wn(u);
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
      return u.slice();
    default:
      return u;
  }
}
function Sn(u) {
  var n = typeof u;
  return u == null || n != "object" && n != "function";
}
var kn = /* @__PURE__ */ function() {
  function u() {
    this.map = {}, this.length = 0;
  }
  return u.prototype.set = function(n, s) {
    const l = this.hash(n);
    let h = this.map[l];
    h || (this.map[l] = h = []), h.push([n, s]), this.length += 1;
  }, u.prototype.hash = function(n) {
    let s = [];
    for (var l in n)
      s.push(Object.prototype.toString.call(n[l]));
    return s.join();
  }, u.prototype.get = function(n) {
    if (this.length <= 180) {
      for (const h in this.map) {
        const E = this.map[h];
        for (let C = 0; C < E.length; C += 1) {
          const w = E[C];
          if (w[0] === n)
            return w[1];
        }
      }
      return;
    }
    const s = this.hash(n), l = this.map[s];
    if (l)
      for (let h = 0; h < l.length; h += 1) {
        const E = l[h];
        if (E[0] === n)
          return E[1];
      }
  }, u;
}(), Tn = /* @__PURE__ */ Re(function(n) {
  return n != null && typeof n.clone == "function" ? n.clone() : Lt(n, !0);
});
const Pt = Tn;
var Pn = /* @__PURE__ */ Rn(-1);
const An = Pn;
var jn = /* @__PURE__ */ Re(
  /* @__PURE__ */ On(!0)
);
const xn = jn;
function In(u) {
  const {
    className: n,
    options: s,
    onChange: l,
    multiple: h = !1,
    value: E,
    allSelectedNodes: C = [],
    everyLevelClassName: w = [],
    isExpandFirstOption: T = !0
  } = u, [te, U] = Fe.useState({}), S = Fe.useMemo(
    () => ({
      // 每一层展开的选项列表
      everyLevelOptions: [s],
      // 记录选中状态
      nodeCheckedMap: /* @__PURE__ */ new Map()
    }),
    [s]
  ), m = Fe.useMemo(() => {
    let k, P;
    return h ? (k = E ?? [], P = k.map((V) => Me(s, V)).filter(Boolean), k = P.map(
      (V) => At(s, V)
    )) : h || (P = Me(s, E), P && (k = At(s, P))), {
      value: k,
      path: P
    };
  }, [h, s, E]);
  Fe.useEffect(() => {
    const k = /* @__PURE__ */ new Map();
    Array.isArray(m.value) ? (m.value.forEach((P) => {
      k.set(P, !0);
    }), m.path instanceof Array && m.path.length > 0 && (T ? S.everyLevelOptions = qr(
      [0],
      s
    ) : S.everyLevelOptions = qr(
      An(m.path),
      s
    ))) : m.value && m.path && (k.set(m.value, !0), S.everyLevelOptions = qr(
      m.path,
      s
    )), S.nodeCheckedMap = k, U({});
  }, [s, m, S]);
  const oe = Fe.useMemo(
    () => ({
      // 设置某一层options
      setLevelOptions: (k, P) => {
        S.everyLevelOptions[k] = P, S.everyLevelOptions.splice(
          k + 1,
          S.everyLevelOptions.length - k
        ), U({});
      },
      // 全选
      setAllSelected(k) {
        function P(q) {
          q.forEach((f) => {
            var K;
            !((f == null ? void 0 : f.children) instanceof Array && ((K = f == null ? void 0 : f.children) != null && K.length)) ? S.nodeCheckedMap.get(f.value) || (S.nodeCheckedMap.set(f.value, !0), m.value.push(f.value)) : P(f.children);
          });
        }
        P(k);
        const V = m.value.map(
          (q) => Me(s, q)
        ).filter(Boolean);
        m.path = V, l && l(m.value, V), U({});
      },
      // 取消全选
      setCancelAllSelected(k) {
        function P(q) {
          q.forEach((f) => {
            var K;
            if (!((f == null ? void 0 : f.children) instanceof Array && ((K = f == null ? void 0 : f.children) != null && K.length))) {
              if (S.nodeCheckedMap.get(f.value) === !0) {
                S.nodeCheckedMap.set(f.value, !1);
                const W = m.value.findIndex(
                  (Z) => Z === f.value
                );
                W > -1 && m.value.splice(W, 1);
              }
            } else
              P(f.children);
          });
        }
        P(k);
        const V = m.value.map(
          (q) => Me(s, q)
        ).filter(Boolean);
        m.path = V, l && l(m.value, V), U({});
      },
      // 设置节点选中
      setNodeChecked: (k) => {
        const P = k.value, V = !(k.children instanceof Array && k.children.length > 0);
        if (h && m.value instanceof Array && V) {
          if (S.nodeCheckedMap.get(P)) {
            const f = m.value.findIndex(
              (ne) => It(ne, P)
            );
            f >= 0 && (m.value.splice(f, 1), S.nodeCheckedMap.set(P, !1));
          } else
            S.nodeCheckedMap.set(P, !0), m.value.push(P);
          const q = m.value.map((f) => Me(s, f)).filter(Boolean);
          m.path = q, l && l(Pt(m.value), m.path);
        }
        if (!h && V) {
          S.nodeCheckedMap.clear(), S.nodeCheckedMap.set(P, !0);
          const q = Me(s, P) ?? [];
          m.path = q, m.value = P, l && l(Pt(m.value), m.path);
        }
        U({});
      }
    }),
    [
      h,
      l,
      s,
      m,
      S.everyLevelOptions,
      S.nodeCheckedMap
    ]
  );
  return /* @__PURE__ */ Wr("div", { className: `cascader-check-list ${n ?? ""}`, children: S.everyLevelOptions.map((k, P) => {
    var V, q;
    return /* @__PURE__ */ pn(
      "div",
      {
        className: `cascader-check-list-group ${w[P] ?? ""}`,
        children: [
          /* @__PURE__ */ Wr(
            "div",
            {
              onClick: () => {
                var ne;
                ((ne = k == null ? void 0 : k.filter((K) => !K.children)) == null ? void 0 : ne.every(
                  (K) => S.nodeCheckedMap.get(K.value)
                )) ? oe.setCancelAllSelected(k) : oe.setAllSelected(k);
              },
              children: typeof C[P] == "function" && ((q = C == null ? void 0 : C[P]) == null ? void 0 : q.call(C, {
                isChecked: !((V = k == null ? void 0 : k.filter((f) => {
                  var ne;
                  return !((ne = f == null ? void 0 : f.children) != null && ne.length);
                })) != null && V.every(
                  (f) => S.nodeCheckedMap.get(f.value)
                ))
              }))
            }
          ),
          k.map((f, ne) => {
            var K;
            return /* @__PURE__ */ Wr(
              "div",
              {
                onClick: () => {
                  f.children instanceof Array && f.children.length > 0 && oe.setLevelOptions(
                    P + 1,
                    f.children
                  ), oe.setNodeChecked(f);
                },
                children: typeof f.node == "function" ? f.node({
                  isLeaf: !((f == null ? void 0 : f.children) instanceof Array && ((K = f == null ? void 0 : f.children) == null ? void 0 : K.length) > 0),
                  isChecked: S.nodeCheckedMap.get(
                    f.value
                  ) ?? !1,
                  getCheckedChildren: () => {
                    var W;
                    return ((W = f == null ? void 0 : f.children) == null ? void 0 : W.filter(
                      (Z) => S.nodeCheckedMap.get(
                        Z.value
                      )
                    )) ?? [];
                  },
                  children: f == null ? void 0 : f.children,
                  hasDescendantNodeChecked() {
                    var Z, de, pe, ye, ge;
                    if (!((f == null ? void 0 : f.children) instanceof Array && ((Z = f == null ? void 0 : f.children) == null ? void 0 : Z.length) > 0))
                      return !1;
                    if (h && ((de = m == null ? void 0 : m.path) != null && de.length)) {
                      const me = m.path.map(
                        (le) => {
                          const J = [];
                          let ie = s;
                          for (let ee = 0; ee < le.length; )
                            J.push(
                              ie[le[ee]].value
                            ), ie = ie[le[ee]].children, ee += 1;
                          return J;
                        }
                      );
                      return (pe = xn(
                        me
                      )) == null ? void 0 : pe.includes(f.value);
                    }
                    if (!h && (m != null && m.path)) {
                      const me = [];
                      let le = s;
                      for (let J = 0; J < m.path.length; )
                        me.push(
                          le[(ye = m.path) == null ? void 0 : ye[J]].value
                        ), le = le[(ge = m.path) == null ? void 0 : ge[J]].children, J += 1;
                      return me.includes(
                        f.value
                      );
                    }
                    return !1;
                  }
                }) : f.node
              },
              f.key ?? ne
            );
          })
        ]
      },
      P
    );
  }) });
}
function At(u, n) {
  return n.forEach((s) => {
    var l, h;
    u = ((l = u[s]) == null ? void 0 : l.children) ?? ((h = u[s]) == null ? void 0 : h.value);
  }), u;
}
function Me(u, n, s = [[], !1], l = 0) {
  var C, w;
  const [h] = s, E = u.length;
  for (let T = 0; T < E && !s[1]; ) {
    if (h[l] = T, It(u[T].value, n)) {
      s[1] = !0, s[0] = h.slice(0, l + 1);
      break;
    }
    (w = (C = u[T]) == null ? void 0 : C.children) != null && w.length && Me(
      u[T].children,
      n,
      s,
      l + 1
    ), T += 1;
  }
  return s[1] ? s[0] : void 0;
}
function qr(u, n) {
  const s = [n];
  let l = n;
  return u == null || u.forEach((h) => {
    var E, C, w, T, te;
    ((E = l == null ? void 0 : l[h]) == null ? void 0 : E.children) instanceof Array && ((w = (C = l == null ? void 0 : l[h]) == null ? void 0 : C.children) != null && w.length) && (s.push(
      (T = l == null ? void 0 : l[h]) == null ? void 0 : T.children
    ), l = (te = l == null ? void 0 : l[h]) == null ? void 0 : te.children);
  }), s;
}
export {
  In as CascaderCheckList
};
