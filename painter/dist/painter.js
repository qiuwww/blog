/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 201);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(31)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(13);
var IE8_DOM_DEFINE = __webpack_require__(47);
var toPrimitive = __webpack_require__(42);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(3);
var ctx = __webpack_require__(35);
var hide = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(53);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(54);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(50);
var enumBugKeys = __webpack_require__(28);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(4)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(60);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(108);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(106);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(83);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(83);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(18);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(13);
var dPs = __webpack_require__(64);
var enumBugKeys = __webpack_require__(28);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(39)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(62).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(18);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(25);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(19)(function () {
  return Object.defineProperty(__webpack_require__(39)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(40);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(51);
var hide = __webpack_require__(11);
var has = __webpack_require__(9);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(63);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(49);
var ITERATOR = __webpack_require__(4)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(27);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(61)(false);
var IE_PROTO = __webpack_require__(24)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 52 */,
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(66)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
var $Object = __webpack_require__(3).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(44);
var toAbsoluteIndex = __webpack_require__(67);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(41);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(4)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(13);
var getKeys = __webpack_require__(29);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(55);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(42);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(47);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(25);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(3);
var LIBRARY = __webpack_require__(40);
var wksExt = __webpack_require__(69);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(4);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Point = __webpack_require__(205);

var _Point2 = _interopRequireDefault(_Point);

var _Util = __webpack_require__(206);

var _Util2 = _interopRequireDefault(_Util);

var _ControlResize = __webpack_require__(204);

var _ControlResize2 = _interopRequireDefault(_ControlResize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Point = _Point2.default;
exports.Util = _Util2.default;
exports.ControlResize = _ControlResize2.default;

// Util的入口文件

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(10);
var core = __webpack_require__(3);
var fails = __webpack_require__(19);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(110);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(109);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(50);
var hiddenKeys = __webpack_require__(28).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(155);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Element2 = __webpack_require__(153);

var _Element3 = _interopRequireDefault(_Element2);

var _Util = __webpack_require__(73);

var _Config = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rect = function (_Element) {
    (0, _inherits3.default)(Rect, _Element);

    function Rect(start, end, config) {
        (0, _classCallCheck3.default)(this, Rect);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Rect.__proto__ || (0, _getPrototypeOf2.default)(Rect)).call(this, config));

        _this.start = start;
        _this.end = end;
        _this.minWidth = 20;
        _this.minHeight = 20;
        return _this;
    }

    (0, _createClass3.default)(Rect, [{
        key: 'draw',
        value: function draw(ctx) {
            ctx.save();
            var width = Math.abs(this.start.x - this.end.x);
            var height = Math.abs(this.start.y - this.end.y);
            var x = Math.min(this.start.x, this.end.x);
            var y = Math.min(this.start.y, this.end.y);
            if (this.config.fillStyle) {
                ctx.fillStyle = this.config.fillStyle;
                ctx.fillRect(x - 0.5, y - 0.5, width, height);
            }
            ctx.strokeStyle = this.config.strokeStyle;
            ctx.strokeRect(x - 0.5, y - 0.5, width, height);
            ctx.restore();
            if (this.selected) this.drawSelected(ctx);
        }
    }, {
        key: 'drawSelected',
        value: function drawSelected(ctx) {
            // 计算绘制拖拽的8个坐标点
            var points = this.getAllControlPoints();
            ctx.save();
            points.forEach(function (point) {
                ctx.beginPath();
                // ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                // ctx.fill();
                ctx.fillStyle = _Config.ControlColor;
                ctx.fillRect(parseInt(point.x, 10) - 3.5, parseInt(point.y, 10) - 3.5, 6, 6);
                ctx.rect(parseInt(point.x, 10) - 3.5, parseInt(point.y, 10) - 3.5, 6, 6);
                ctx.stroke();
            });
            ctx.restore();
        }
    }, {
        key: 'update',
        value: function update(start, end) {
            this.start = start || this.start;
            this.end = end || this.end;
        }
    }, {
        key: 'getPoints',
        value: function getPoints(start, end) {
            start = start || this.start;
            end = end || this.end;
            return _Util.Util.getMaxMin(start, end);
        }
    }, {
        key: 'getAllControlPoints',
        value: function getAllControlPoints(start, end) {
            var _getPoints = this.getPoints(start, end),
                minX = _getPoints.minX,
                minY = _getPoints.minY,
                maxX = _getPoints.maxX,
                maxY = _getPoints.maxY;

            var width = maxX - minX;
            var height = maxY - minY;
            var points = [];
            points.push({ x: minX, y: minY });
            points.push({ x: minX + width / 2, y: minY });
            points.push({ x: maxX, y: minY });
            points.push({ x: maxX, y: minY + height / 2 });
            points.push({ x: maxX, y: maxY });
            points.push({ x: minX + width / 2, y: maxY });
            points.push({ x: minX, y: maxY });
            points.push({ x: minX, y: minY + height / 2 });
            return points;
        }
    }, {
        key: 'setSelected',
        value: function setSelected(selected, point) {
            (0, _get3.default)(Rect.prototype.__proto__ || (0, _getPrototypeOf2.default)(Rect.prototype), 'setSelected', this).call(this, selected, point);
            if (!selected) {
                this.prevStart = null;
                this.prevEnd = null;
            } else {
                this.prevStart = this.start.clone();
                this.prevEnd = this.end.clone();
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(point) {
            var _getPoints2 = this.getPoints(),
                minX = _getPoints2.minX,
                minY = _getPoints2.minY,
                maxX = _getPoints2.maxX,
                maxY = _getPoints2.maxY;

            minX = minX - 5;
            minY = minY - 5;
            maxX = maxX + 5;
            maxY = maxY + 5;
            // 坐标在线段的两点之间的区域
            if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
                return true;
            }
            return false;
        }
    }, {
        key: 'selectedMoveHandler',
        value: function selectedMoveHandler(point) {
            var _this2 = this;

            // 是否在8个控制坐标点上 当前拖动区域为整个矩形框
            var points = this.getAllControlPoints(this.prevStart, this.prevEnd);
            var find = false;
            var index = -1;
            points.forEach(function (p, i) {
                if (Math.abs(_this2.selectedPoint.x - p.x) <= 5 && Math.abs(_this2.selectedPoint.y - p.y) <= 5) {
                    find = true;
                    index = i;
                    return false;
                }
            });
            if (!find) {
                var diffX = this.selectedPoint.x - point.x;
                var diffY = this.selectedPoint.y - point.y;
                this.start.x = this.prevStart.x - diffX;
                this.end.x = this.prevEnd.x - diffX;
                this.start.y = this.prevStart.y - diffY;
                this.end.y = this.prevEnd.y - diffY;
            } else {
                var resizeHandler = _Util.ControlResize[index];

                var _resizeHandler$call = resizeHandler.call(this, point),
                    minX = _resizeHandler$call.minX,
                    minY = _resizeHandler$call.minY,
                    maxX = _resizeHandler$call.maxX,
                    maxY = _resizeHandler$call.maxY;

                this.start = new _Util.Point(minX, minY);
                this.end = new _Util.Point(maxX, maxY);
            }
        }
    }]);
    return Rect;
}(_Element3.default);

exports.default = Rect;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
var $Object = __webpack_require__(3).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);
var $Object = __webpack_require__(3).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(127);
module.exports = __webpack_require__(3).Object.getPrototypeOf;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
module.exports = __webpack_require__(3).Object.setPrototypeOf;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
__webpack_require__(129);
__webpack_require__(131);
__webpack_require__(132);
module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
__webpack_require__(133);
module.exports = __webpack_require__(69).f('iterator');


/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(76);
var pIE = __webpack_require__(55);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(34);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(26)('meta');
var isObject = __webpack_require__(18);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(19)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(90).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(18);
var anObject = __webpack_require__(13);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(35)(Function.call, __webpack_require__(65).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(117);
var step = __webpack_require__(120);
var Iterators = __webpack_require__(21);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(10);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(41) });


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(16);
var $getOwnPropertyDescriptor = __webpack_require__(65).f;

__webpack_require__(77)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(27);
var $getPrototypeOf = __webpack_require__(49);

__webpack_require__(77)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(10);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(123).set });


/***/ }),
/* 129 */
/***/ (function(module, exports) {



/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(10);
var redefine = __webpack_require__(51);
var META = __webpack_require__(121).KEY;
var $fails = __webpack_require__(19);
var shared = __webpack_require__(31);
var setToStringTag = __webpack_require__(30);
var uid = __webpack_require__(26);
var wks = __webpack_require__(4);
var wksExt = __webpack_require__(69);
var wksDefine = __webpack_require__(68);
var enumKeys = __webpack_require__(118);
var isArray = __webpack_require__(119);
var anObject = __webpack_require__(13);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(42);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(41);
var gOPNExt = __webpack_require__(122);
var $GOPD = __webpack_require__(65);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(29);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(90).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(55).f = $propertyIsEnumerable;
  __webpack_require__(76).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(40)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('asyncIterator');


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68)('observable');


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(124);
var global = __webpack_require__(6);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(21);
var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.ControlColor = '#00FFFF';

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Element = function () {
    function Element(config) {
        (0, _classCallCheck3.default)(this, Element);

        this.config = config || {};
        this.selected = false;
        this.selectedPoint = null;
    }

    (0, _createClass3.default)(Element, [{
        key: "setSelected",
        value: function setSelected(selected, point) {
            this.selected = selected;
            this.selectedPoint = point;
        }
    }, {
        key: "getSelected",
        value: function getSelected() {
            return this.selected;
        }
    }, {
        key: "selectedMoveHandler",
        value: function selectedMoveHandler(point) {}
    }, {
        key: "isValid",
        value: function isValid() {
            // 需要检查是否有小 比如过大或者过小
        }
    }, {
        key: "isSelected",
        value: function isSelected(point) {}
    }, {
        key: "setConfig",
        value: function setConfig(config) {
            this.config = config;
        }
    }]);
    return Element;
}();

exports.default = Element;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(155);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Element2 = __webpack_require__(153);

var _Element3 = _interopRequireDefault(_Element2);

var _Util = __webpack_require__(73);

var _Config = __webpack_require__(152);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = function (_Element) {
    (0, _inherits3.default)(Line, _Element);

    function Line(start, end, config) {
        (0, _classCallCheck3.default)(this, Line);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Line.__proto__ || (0, _getPrototypeOf2.default)(Line)).call(this, config));

        _this.start = start;
        _this.end = end;
        return _this;
    }

    (0, _createClass3.default)(Line, [{
        key: 'draw',
        value: function draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.end.x, this.end.y);
            ctx.strokeStyle = this.config.strokeStyle;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.restore();
            if (this.selected) this.drawSelected(ctx);
        }
    }, {
        key: 'drawSelected',
        value: function drawSelected(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = _Config.ControlColor;
            ctx.fillRect(parseInt(this.start.x, 10) - 3.5, parseInt(this.start.y, 10) - 3.5, 6, 6);
            ctx.rect(parseInt(this.start.x, 10) - 3.5, parseInt(this.start.y, 10) - 3.5, 6, 6);
            ctx.stroke();
            ctx.beginPath();

            var _getPoints = this.getPoints(),
                minX = _getPoints.minX,
                minY = _getPoints.minY,
                maxX = _getPoints.maxX,
                maxY = _getPoints.maxY;

            var centerX = (minX + maxX) / 2;
            var centerY = (minY + maxY) / 2;
            ctx.beginPath();
            ctx.fillStyle = _Config.ControlColor;
            ctx.fillRect(parseInt(centerX, 10) - 3.5, parseInt(centerY, 10) - 3.5, 6, 6);
            ctx.rect(parseInt(centerX, 10) - 3.5, parseInt(centerY, 10) - 3.5, 6, 6);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle = _Config.ControlColor;
            ctx.fillRect(parseInt(this.end.x, 10) - 3.5, parseInt(this.end.y, 10) - 3.5, 6, 6);
            ctx.rect(parseInt(this.end.x, 10) - 3.5, parseInt(this.end.y, 10) - 3.5, 6, 6);
            ctx.stroke();
            ctx.restore();
        }
    }, {
        key: 'update',
        value: function update(start, end) {
            this.start = start || this.start;
            this.end = end || this.end;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(point) {
            var _getPoints2 = this.getPoints(),
                minX = _getPoints2.minX,
                minY = _getPoints2.minY,
                maxX = _getPoints2.maxX,
                maxY = _getPoints2.maxY;

            minX = minX - 5;
            minY = minY - 5;
            maxX = maxX + 5;
            maxY = maxY + 5;
            // 坐标在线段的两点之间的区域
            if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
                // 坐标和两点之间组成的三角形的高线在检查范围内
                // 还有极端情况  点在线段上面
                var c = _Util.Util.distance(this.start, this.end);
                var a = _Util.Util.distance(this.start, point);
                var b = _Util.Util.distance(this.end, point);
                var p = (a + b + c) / 2;
                var h = 2 * Math.sqrt(p * (p - a) * (p - b) * (p - c)) / c;
                if (h <= 5) {
                    return true;
                }
                return false;
            }
            return false;
        }
    }, {
        key: 'setSelected',
        value: function setSelected(selected, point) {
            (0, _get3.default)(Line.prototype.__proto__ || (0, _getPrototypeOf2.default)(Line.prototype), 'setSelected', this).call(this, selected, point);
            if (!selected) {
                this.prevStart = null;
                this.prevEnd = null;
            } else {
                this.prevStart = this.start.clone();
                this.prevEnd = this.end.clone();
            }
        }
    }, {
        key: 'getPoints',
        value: function getPoints() {
            return _Util.Util.getMaxMin(this.start, this.end);
        }
    }, {
        key: 'selectedMoveHandler',
        value: function selectedMoveHandler(point) {
            // 如果point在两端控制点上则进行线段坐标更改 否则进行线段平移
            if (Math.abs(this.selectedPoint.x - this.prevStart.x) <= 5 && Math.abs(this.selectedPoint.y - this.prevStart.y) <= 5) {
                this.start = point;
            } else if (Math.abs(this.selectedPoint.x - this.prevEnd.x) <= 5 && Math.abs(this.selectedPoint.y - this.prevEnd.y) <= 5) {
                this.end = point;
            } else {
                var diffX = this.selectedPoint.x - point.x;
                var diffY = this.selectedPoint.y - point.y;
                this.start.x = this.prevStart.x - diffX;
                this.end.x = this.prevEnd.x - diffX;
                this.start.y = this.prevStart.y - diffY;
                this.end.y = this.prevEnd.y - diffY;
            }
        }
    }]);
    return Line;
}(_Element3.default);

exports.default = Line;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(107);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Text = __webpack_require__(200);

var _Text2 = _interopRequireDefault(_Text);

var _Arrow = __webpack_require__(198);

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Line = __webpack_require__(154);

var _Line2 = _interopRequireDefault(_Line);

var _Rect = __webpack_require__(105);

var _Rect2 = _interopRequireDefault(_Rect);

var _Ellipse = __webpack_require__(199);

var _Ellipse2 = _interopRequireDefault(_Ellipse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Text = _Text2.default;
exports.Arrow = _Arrow2.default;
exports.Line = _Line2.default;
exports.Rect = _Rect2.default;
exports.Ellipse = _Ellipse2.default;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_VALUES = {
    emitDelay: 0,
    strictMode: false
};

/**
 * @typedef {object} EventEmitterListenerFunc
 * @property {boolean} once
 * @property {function} fn
 */

/**
 * @class EventEmitter
 *
 * @private
 * @property {Object.<string, EventEmitterListenerFunc[]>} _listeners
 * @property {string[]} events
 */

var EventEmitter = function () {

    /**
     * @constructor
     * @param {{}}      [opts]
     * @param {number}  [opts.emitDelay = 10] - Number in ms. Specifies whether emit will be sync or async. By default - 10ms. If 0 - fires sync
     * @param {boolean} [opts.strictMode = false] - is true, Emitter throws error on emit error with no listeners
     */
    function EventEmitter() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_VALUES;
        (0, _classCallCheck3.default)(this, EventEmitter);

        var emitDelay = void 0,
            strictMode = void 0;

        if (opts.hasOwnProperty('emitDelay')) {
            emitDelay = opts.emitDelay;
        } else {
            emitDelay = DEFAULT_VALUES.emitDelay;
        }
        this._emitDelay = emitDelay;

        if (opts.hasOwnProperty('strictMode')) {
            strictMode = opts.strictMode;
        } else {
            strictMode = DEFAULT_VALUES.strictMode;
        }
        this._strictMode = strictMode;

        this._listeners = {};
        this.events = [];
    }

    /**
     * @protected
     * @param {string} type
     * @param {function} listener
     * @param {boolean} [once = false]
     */


    (0, _createClass3.default)(EventEmitter, [{
        key: '_addListenner',
        value: function _addListenner(type, listener, once) {
            if (typeof listener !== 'function') {
                throw TypeError('listener must be a function');
            }

            if (this.events.indexOf(type) === -1) {
                this._listeners[type] = [{
                    once: once,
                    fn: listener
                }];
                this.events.push(type);
            } else {
                this._listeners[type].push({
                    once: once,
                    fn: listener
                });
            }
        }

        /**
         * Subscribes on event type specified function
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'on',
        value: function on(type, listener) {
            this._addListenner(type, listener, false);
        }

        /**
         * Subscribes on event type specified function to fire only once
         * @param {string} type
         * @param {function} listener
         */

    }, {
        key: 'once',
        value: function once(type, listener) {
            this._addListenner(type, listener, true);
        }

        /**
         * Removes event with specified type. If specified listenerFunc - deletes only one listener of specified type
         * @param {string} eventType
         * @param {function} [listenerFunc]
         */

    }, {
        key: 'off',
        value: function off(eventType, listenerFunc) {
            var typeIndex = this.events.indexOf(eventType);
            var hasType = eventType && typeIndex !== -1;

            if (hasType) {
                if (!listenerFunc) {
                    delete this._listeners[eventType];
                    this.events.splice(typeIndex, 1);
                } else {
                    var removedEvents = [];
                    var typeListeners = this._listeners[eventType];

                    typeListeners.forEach(
                    /**
                     * @param {EventEmitterListenerFunc} fn
                     * @param {number} idx
                     */
                    function (fn, idx) {
                        if (fn.fn === listenerFunc) {
                            removedEvents.unshift(idx);
                        }
                    });

                    removedEvents.forEach(function (idx) {
                        typeListeners.splice(idx, 1);
                    });

                    if (!typeListeners.length) {
                        this.events.splice(typeIndex, 1);
                        delete this._listeners[eventType];
                    }
                }
            }
        }

        /**
         * Applies arguments to specified event type
         * @param {string} eventType
         * @param {*[]} eventArguments
         * @protected
         */

    }, {
        key: '_applyEvents',
        value: function _applyEvents(eventType, eventArguments) {
            var typeListeners = this._listeners[eventType];

            if (!typeListeners || !typeListeners.length) {
                if (this._strictMode) {
                    throw 'No listeners specified for event: ' + eventType;
                } else {
                    return;
                }
            }

            var removableListeners = [];
            typeListeners.forEach(function (eeListener, idx) {
                eeListener.fn.apply(null, eventArguments);
                if (eeListener.once) {
                    removableListeners.unshift(idx);
                }
            });

            removableListeners.forEach(function (idx) {
                typeListeners.splice(idx, 1);
            });
        }

        /**
         * Emits event with specified type and params.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emit',
        value: function emit(type) {
            var _this = this;

            for (var _len = arguments.length, eventArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                eventArgs[_key - 1] = arguments[_key];
            }

            if (this._emitDelay) {
                setTimeout(function () {
                    _this._applyEvents.call(_this, type, eventArgs);
                }, this._emitDelay);
            } else {
                this._applyEvents(type, eventArgs);
            }
        }

        /**
         * Emits event with specified type and params synchronously.
         * @param {string} type
         * @param eventArgs
         */

    }, {
        key: 'emitSync',
        value: function emitSync(type) {
            for (var _len2 = arguments.length, eventArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                eventArgs[_key2 - 1] = arguments[_key2];
            }

            this._applyEvents(type, eventArgs);
        }

        /**
         * Destroys EventEmitter
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._listeners = {};
            this.events = [];
        }
    }]);
    return EventEmitter;
}();

module.exports = EventEmitter;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(208), __esModule: true };

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(214);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(315)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./Painter.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./Painter.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Line2 = __webpack_require__(154);

var _Line3 = _interopRequireDefault(_Line2);

var _Util = __webpack_require__(73);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arrow = function (_Line) {
    (0, _inherits3.default)(Arrow, _Line);

    function Arrow(start, end, config) {
        (0, _classCallCheck3.default)(this, Arrow);
        return (0, _possibleConstructorReturn3.default)(this, (Arrow.__proto__ || (0, _getPrototypeOf2.default)(Arrow)).call(this, start, end, config));
    }

    (0, _createClass3.default)(Arrow, [{
        key: 'draw',
        value: function draw(ctx) {
            _Util.Util.drawArrow(ctx, this.start.x, this.start.y, this.end.x, this.end.y, this.config.strokeStyle);
            if (this.selected) this.drawSelected(ctx);
        }
    }]);
    return Arrow;
}(_Line3.default);

exports.default = Arrow;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Rect2 = __webpack_require__(105);

var _Rect3 = _interopRequireDefault(_Rect2);

var _Util = __webpack_require__(73);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ellipse = function (_Rect) {
    (0, _inherits3.default)(Ellipse, _Rect);

    function Ellipse(start, end, config) {
        (0, _classCallCheck3.default)(this, Ellipse);
        return (0, _possibleConstructorReturn3.default)(this, (Ellipse.__proto__ || (0, _getPrototypeOf2.default)(Ellipse)).call(this, start, end, config));
    }

    (0, _createClass3.default)(Ellipse, [{
        key: 'draw',
        value: function draw(ctx) {
            var _getPoints = this.getPoints(),
                minX = _getPoints.minX,
                minY = _getPoints.minY,
                maxX = _getPoints.maxX,
                maxY = _getPoints.maxY;

            var width = maxX - minX;
            var height = maxY - minY;
            var a = width / 2;
            var b = height / 2;
            var x = (maxX + minX) / 2;
            var y = (maxY + minY) / 2;
            _Util.Util.drawEllipse(ctx, x, y, a, b, this.config.fillStyle, this.config.strokeStyle);
            if (this.selected) this.drawSelected(ctx);
        }
    }]);
    return Ellipse;
}(_Rect3.default);

exports.default = Ellipse;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Rect2 = __webpack_require__(105);

var _Rect3 = _interopRequireDefault(_Rect2);

var _Util = __webpack_require__(73);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    1. 文字自动换行
    2. 文字大小等样式
    3. 拖拽缩放的最大最小尺寸判断
    4. 编辑器从input到textarea支持多行
    5. 没有输入文字的时候将被清除
    6. 在拖拽完之后需要重新计算高度是否能否包含文字
*/
var Text = function (_Rect) {
    (0, _inherits3.default)(Text, _Rect);

    function Text(start, parent, config) {
        (0, _classCallCheck3.default)(this, Text);

        var padding = 5;
        var defaultWidth = 20;
        var defaultHeight = 24;
        var end = new _Util.Point(start.x + padding * 2 + defaultWidth, start.y + padding * 2 + defaultHeight);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).call(this, start, end, config));

        _this.parent = parent;
        _this.padding = padding;
        _this.text = ''; // 默认文字为空
        _this.type = 'text';
        _this.endEdit = _this.endEdit.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Text, [{
        key: 'draw',
        value: function draw(ctx) {
            var textWidth = 0;
            if (this.text) {
                ctx.save();
                ctx.font = this.config.font;
                textWidth = ctx.measureText(this.text).width;
                ctx.restore();
            }
            ctx.save();
            var endX = this.start.x + this.padding * 2 + textWidth;
            if (this.end.x < endX) {
                this.end.x = endX;
            }
            var fontHeight = _Util.Util.getFontHeight(this.config.font);
            var endY = this.start.y + this.padding * 2 + fontHeight;
            if (this.end.y < endY) {
                this.end.y = endY;
            }
            var width = Math.abs(this.start.x - this.end.x);
            var height = Math.abs(this.start.y - this.end.y);
            if (this.editMode || this.selected) {
                var x = Math.min(this.start.x, this.end.x);
                var y = Math.min(this.start.y, this.end.y);
                ctx.strokeRect(x - 0.5, y - 0.5, width, height);
            }
            if (!this.editMode) {
                // 需要计算当前字体大小的高度
                var _getPoints = this.getPoints(),
                    minX = _getPoints.minX,
                    minY = _getPoints.minY;
                // 多行文本时 每行文本之间的间隔
                // let fontMarginTop = 5;


                var textX = this.padding + minX;
                var textY = this.padding + minY + fontHeight;
                // let marginTop = (height - fontHeight) / 2;
                // let textY = minY + marginTop + fontHeight;
                ctx.font = this.config.font;
                ctx.fillStyle = this.config.color;
                ctx.fillText(this.text, textX, textY);
                ctx.restore();
            }
            if (this.selected) this.drawSelected(ctx);
        }
    }, {
        key: 'beginEdit',
        value: function beginEdit() {
            this.editMode = true;
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.className = 'text-editor';
            this.input.autofocus = true;
            this.input.value = this.text;
            this.input.addEventListener('blur', this.endEdit);
            this.input.addEventListener('input', this.onChange);

            var _getPoints2 = this.getPoints(),
                minX = _getPoints2.minX,
                minY = _getPoints2.minY,
                maxX = _getPoints2.maxX,
                maxY = _getPoints2.maxY;

            var style = this.input.style;
            style.top = minY + 5 + 'px';
            style.left = minX + 5 + 'px';
            style.width = maxX - minX - 10 + 'px';
            style.height = maxY - minY - 10 + 'px';
            style.lineHeight = maxY - minY - 10 + 'px';
            style.font = this.config.font;
            this.parent.frame.appendChild(this.input);
            this.parent.frame.lastElementChild.focus();
        }
    }, {
        key: 'endEdit',
        value: function endEdit() {
            this.editMode = false;
            this.text = this.input.value;
            this.input.removeEventListener('blur', this.endEdit);
            this.input.parentNode.removeChild(this.input);
            this.parent.redraw();
            if (this.text) {
                this.parent.switchSelectMode();
            }
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            this.text = this.input.value;
            this.parent.redraw();
            var width = Math.abs(this.start.x - this.end.x);
            this.input.style.width = width - 10 + 'px';
        }
    }, {
        key: 'hasText',
        value: function hasText() {
            return this.text ? true : false;
        }
    }]);
    return Text;
}(_Rect3.default);

exports.default = Text;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(192);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(38);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _Element = __webpack_require__(190);

var _Util = __webpack_require__(73);

var _EventEmitter = __webpack_require__(191);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

__webpack_require__(193);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Painter = function (_Event) {
    (0, _inherits3.default)(Painter, _Event);

    function Painter(id) {
        (0, _classCallCheck3.default)(this, Painter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Painter.__proto__ || (0, _getPrototypeOf2.default)(Painter)).call(this));

        _this.canvas = document.getElementById(id);
        _this.ctx = _this.canvas.getContext('2d');
        var parentNode = _this.canvas.parentNode;
        _this.frame = document.createElement('div');
        _this.frame.className = 'wrapper-canvas';
        parentNode.insertBefore(_this.frame, _this.canvas);
        _this.canvas.parentNode.removeChild(_this.canvas);
        _this.frame.appendChild(_this.canvas);
        _this.handlerMouseDown = _this.handlerMouseDown.bind(_this);
        _this.handlerMouseMove = _this.handlerMouseMove.bind(_this);
        _this.handlerMouseUp = _this.handlerMouseUp.bind(_this);
        _this.handlerClick = _this.handlerClick.bind(_this);
        _this.handlerDblClick = _this.handlerDblClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Painter, [{
        key: 'init',
        value: function init() {
            this.elements = [];
            this.handlerMode = {};
            this.lastMouseX = null;
            this.lastMouseY = null;
            this.modeName = null;
            this.config = {
                fillStyle: null,
                strokeStyle: null,
                font: 'normal normal 12px 宋体',
                color: '#000000'
            };
            this.dragging = false;
            // 最好拆分到各个类成员上面
            this.registerHandler('select', this.selectHandler());
            this.registerHandler('remove', this.removeHandler());
            this.registerHandler('line', this.lineHandler());
            this.registerHandler('arrow', this.arrowHandler());
            this.registerHandler('rect', this.rectHandler());
            this.registerHandler('text', this.textHandler());
            this.registerHandler('ellipse', this.ellipseHandler());
            this.bind();
        }
    }, {
        key: 'selectHandler',
        value: function selectHandler() {
            var _this2 = this;

            return {
                'down': function down(e) {
                    _this2.dragging = true;
                    _this2.selectElement(e);
                },
                'move': function move(e) {
                    // 当前鼠标是否正在选择元素的相关操作点上 委托回对应元素处理 返回一个状态位 表示是否需要更新画布
                    if (!_this2.selectedElement || !_this2.dragging) return;
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var point = new _Util.Point(x, y);
                    _this2.selectedElement.selectedMoveHandler(point);
                    _this2.redraw();
                },
                'up': function up() {
                    _this2.dragging = false;
                }
            };
        }
    }, {
        key: 'removeHandler',
        value: function removeHandler() {
            var _this3 = this;

            return {
                'down': function down(e) {
                    _this3.removeElement(e);
                }
            };
        }
    }, {
        key: 'lineHandler',
        value: function lineHandler() {
            var _this4 = this;

            return {
                'move': function move(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var movePoint = new _Util.Point(x, y);
                    var config = _this4.getConfig();
                    var line = new _Element.Line(_this4.mouseDownPoint, movePoint, config);
                    _this4.redraw();
                    line.draw(_this4.ctx);
                },
                'up': function up(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    _this4.mouseUpPoint = new _Util.Point(x, y);
                    var distance = _Util.Util.distance(_this4.mouseDownPoint, _this4.mouseUpPoint);
                    if (distance <= 40) {
                        _this4.redraw();
                        return;
                    }
                    var config = _this4.getConfig();
                    var line = new _Element.Line(_this4.mouseDownPoint, _this4.mouseUpPoint, config);
                    _this4.setSelected(line, _this4.mouseUpPoint);
                    _this4.redraw(line);
                }
            };
        }
    }, {
        key: 'arrowHandler',
        value: function arrowHandler() {
            var _this5 = this;

            return {
                'move': function move(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var movePoint = new _Util.Point(x, y);
                    var config = _this5.getConfig();
                    var arrow = new _Element.Arrow(_this5.mouseDownPoint, movePoint, config);
                    _this5.redraw();
                    arrow.draw(_this5.ctx);
                },
                'up': function up(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    _this5.mouseUpPoint = new _Util.Point(x, y);
                    var distance = _Util.Util.distance(_this5.mouseDownPoint, _this5.mouseUpPoint);
                    if (distance <= 40) {
                        _this5.redraw();
                        return;
                    }
                    var config = _this5.getConfig();
                    var arrow = new _Element.Arrow(_this5.mouseDownPoint, _this5.mouseUpPoint, config);
                    _this5.setSelected(arrow, _this5.mouseUpPoint);
                    _this5.redraw(arrow);
                }
            };
        }
    }, {
        key: 'rectHandler',
        value: function rectHandler() {
            var _this6 = this;

            return {
                'move': function move(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var movePoint = new _Util.Point(x, y);
                    var config = _this6.getConfig();
                    var rect = new _Element.Rect(_this6.mouseDownPoint, movePoint, config);
                    _this6.redraw();
                    rect.draw(_this6.ctx);
                },
                'up': function up(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    _this6.mouseUpPoint = new _Util.Point(x, y);
                    var distance = _Util.Util.distance(_this6.mouseDownPoint, _this6.mouseUpPoint);
                    if (distance <= 40) {
                        _this6.redraw();
                        return;
                    }
                    var config = _this6.getConfig();
                    var rect = new _Element.Rect(_this6.mouseDownPoint, _this6.mouseUpPoint, config);
                    _this6.setSelected(rect, _this6.mouseUpPoint);
                    _this6.redraw(rect);
                }
            };
        }
    }, {
        key: 'ellipseHandler',
        value: function ellipseHandler() {
            var _this7 = this;

            return {
                'move': function move(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var movePoint = new _Util.Point(x, y);
                    var config = _this7.getConfig();
                    var ellipse = new _Element.Ellipse(_this7.mouseDownPoint, movePoint, config);
                    _this7.redraw();
                    ellipse.draw(_this7.ctx);
                },
                'up': function up(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    _this7.mouseUpPoint = new _Util.Point(x, y);
                    var distance = _Util.Util.distance(_this7.mouseDownPoint, _this7.mouseUpPoint);
                    if (distance <= 40) {
                        _this7.redraw();
                        return;
                    }
                    var config = _this7.getConfig();
                    var ellipse = new _Element.Ellipse(_this7.mouseDownPoint, _this7.mouseUpPoint, config);
                    _this7.setSelected(ellipse, _this7.mouseUpPoint);
                    _this7.redraw(ellipse);
                }
            };
        }
    }, {
        key: 'textHandler',
        value: function textHandler() {
            var _this8 = this;

            return {
                'down': null,
                'click': function click(e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var point = new _Util.Point(x, y);
                    var config = _this8.getConfig();
                    var text = new _Element.Text(point, _this8, config);
                    _this8.setSelected(text, point, true);
                    text.beginEdit();
                    _this8.redraw(text);
                }
            };
        }
    }, {
        key: 'registerHandler',
        value: function registerHandler(name, handler) {
            var _this9 = this;

            if (!handler.down) {
                handler.down = function (e) {
                    var x = e.offsetX;
                    var y = e.offsetY;
                    _this9.mouseDownPoint = new _Util.Point(x, y);
                };
            }
            if (!handler.move) {
                handler.move = function () {};
            }
            if (!handler.up) {
                handler.up = function () {};
            }
            this.handlerMode[name] = handler;
        }
    }, {
        key: 'selectElement',
        value: function selectElement(e) {
            var x = e.offsetX;
            var y = e.offsetY;
            var point = new _Util.Point(x, y);
            // 查找最后画上去的一个元素
            var length = this.elements.length - 1;
            var find = false;
            for (var i = length; i >= 0; i--) {
                var element = this.elements[i];
                var flag = element.isSelected(point);
                if (flag && !find) {
                    element.setSelected(true, point);
                    this.selectedElement = element;
                    find = true;
                } else {
                    element.setSelected(false, null);
                }
            }
            if (find) {
                this.elements.filter(function (element) {
                    return !element.getSelected();
                }).forEach(function (element) {
                    element.setSelected(false, null);
                });
            } else {
                this.elements.forEach(function (element) {
                    element.setSelected(false, null);
                });
                this.selectedElement = null;
            }
            this.redraw();
        }
    }, {
        key: 'removeElement',
        value: function removeElement(e) {
            var _this10 = this;

            this.selectElement(e);
            if (this.selectedElement) {
                this.elements = this.elements.filter(function (element) {
                    return element !== _this10.selectedElement;
                });
                this.selectedElement = null;
                this.redraw();
            }
        }
    }, {
        key: 'setSelected',
        value: function setSelected(element, point, flag) {
            if (this.selectedElement) {
                this.selectedElement.setSelected(false, null);
            }
            element.setSelected(true, point);
            this.selectedElement = element;
            if (!flag) {
                this.switchSelectMode();
            }
        }
    }, {
        key: 'bind',
        value: function bind() {
            this.canvas.addEventListener('mousedown', this.handlerMouseDown);
            this.canvas.addEventListener('click', this.handlerClick);
            this.canvas.addEventListener('dblclick', this.handlerDblClick);
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            return (0, _assign2.default)({}, this.config);
        }
    }, {
        key: 'setConfig',
        value: function setConfig(config) {
            this.config = config;
            this.onSettingChange(config);
        }
    }, {
        key: 'setConfigValue',
        value: function setConfigValue(name, value) {
            this.config[name] = value;
            this.onSettingChange(this.config);
        }
    }, {
        key: 'getSelectedConfig',
        value: function getSelectedConfig() {
            if (this.selectedElement) {
                this.selectedElement.getConfig();
            }
            return this.getConfig();
        }
    }, {
        key: 'getModeName',
        value: function getModeName() {
            return this.modeName;
        }
    }, {
        key: 'setModeName',
        value: function setModeName(modeName) {
            this.modeName = modeName;
        }
    }, {
        key: 'handlerMouseDown',
        value: function handlerMouseDown(e) {
            var modeName = this.modeName;
            if (!modeName || !this.handlerMode[modeName]) return;
            this.handlerMode[modeName]['down'](e);
            // 通过选择的命令判断当前鼠标按下的模式
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
            document.addEventListener('mousemove', this.handlerMouseMove);
            document.addEventListener('mouseup', this.handlerMouseUp);
        }
    }, {
        key: 'handlerMouseMove',
        value: function handlerMouseMove(e) {
            // 外部处理:canvas外部的坐标不接受，需要保持最后一次在canvas里面的坐标供mouseup的时候使用
            var nodeName = e.target.nodeName.toLowerCase();
            if (nodeName !== 'canvas') return;
            var modeName = this.modeName;
            if (!modeName || !this.handlerMode[modeName]) return;
            this.lastMouseX = e.offsetX;
            this.lastMouseY = e.offsetY;
            this.handlerMode[modeName]['move'](e);
        }
    }, {
        key: 'handlerMouseUp',
        value: function handlerMouseUp(e) {
            var nodeName = e.target.nodeName.toLowerCase();
            var offsetX = e.offsetX,
                offsetY = e.offsetY;

            if (nodeName !== 'canvas') {
                offsetX = this.lastMouseX;
                offsetY = this.lastMouseY;
            }
            var modeName = this.modeName;
            if (!modeName || !this.handlerMode[modeName]) return;
            this.handlerMode[modeName]['up']({ offsetX: offsetX, offsetY: offsetY });
            document.removeEventListener('mousemove', this.handlerMouseMove);
            document.removeEventListener('mouseup', this.handlerMouseUp);
        }
    }, {
        key: 'handlerClick',
        value: function handlerClick(e) {
            var modeName = this.modeName;
            // 当前只处理文字元素
            if (modeName == 'text') {
                this.handlerMode[modeName]['click'](e);
            }
        }
    }, {
        key: 'handlerDblClick',
        value: function handlerDblClick(e) {
            this.selectElement(e);
            if (!this.selectedElement) return;
            var element = this.selectedElement;
            if (element.type !== 'text') return;
            element.beginEdit();
            this.redraw();
        }
    }, {
        key: 'redraw',
        value: function redraw(element) {
            var _this11 = this;

            if (element) this.elements.push(element);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            var elements = this.elements.filter(function (elem) {
                if (elem.type && elem.type === 'text' && !elem.editMode && !elem.hasText()) {
                    return false;
                }
                return true;
            });
            elements.forEach(function (elem) {
                elem.draw(_this11.ctx);
            });
            this.elements = elements;
        }
    }, {
        key: 'onSettingChange',
        value: function onSettingChange(config) {
            if (!this.selectedElement) return;
            this.selectedElement.setConfig(config);
            this.redraw();
        }
    }, {
        key: 'switchSelectMode',
        value: function switchSelectMode() {
            this.setModeName('select');
            // 需要告知外界当前模式发生了变化
            this.emit('switchMode', 'select');
        }
    }]);
    return Painter;
}(_EventEmitter2.default);

window.Painter = Painter;

/***/ }),
/* 202 */,
/* 203 */,
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ControlResize = {
    "0": function _(point) {
        var _getPoints = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints.minX,
            minY = _getPoints.minY,
            maxX = _getPoints.maxX,
            maxY = _getPoints.maxY;

        var diffX = this.selectedPoint.x - point.x;
        var diffY = this.selectedPoint.y - point.y;
        minX = minX - diffX;
        minY = minY - diffY;
        // if (minX > (maxX - this.minWidth)) minX = maxX - this.minWidth;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "1": function _(point) {
        var _getPoints2 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints2.minX,
            minY = _getPoints2.minY,
            maxX = _getPoints2.maxX,
            maxY = _getPoints2.maxY;

        var diffY = this.selectedPoint.y - point.y;
        minY = minY - diffY;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "2": function _(point) {
        var _getPoints3 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints3.minX,
            minY = _getPoints3.minY,
            maxX = _getPoints3.maxX,
            maxY = _getPoints3.maxY;

        var diffX = this.selectedPoint.x - point.x;
        var diffY = this.selectedPoint.y - point.y;
        maxX = maxX - diffX;
        minY = minY - diffY;
        // if (minY > (maxY - this.minHeight)) minY = maxY - this.minHeight;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "3": function _(point) {
        var _getPoints4 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints4.minX,
            minY = _getPoints4.minY,
            maxX = _getPoints4.maxX,
            maxY = _getPoints4.maxY;

        var diffX = this.selectedPoint.x - point.x;
        maxX = maxX - diffX;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "4": function _(point) {
        var _getPoints5 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints5.minX,
            minY = _getPoints5.minY,
            maxX = _getPoints5.maxX,
            maxY = _getPoints5.maxY;

        var diffX = this.selectedPoint.x - point.x;
        var diffY = this.selectedPoint.y - point.y;
        maxX = maxX - diffX;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "5": function _(point) {
        var _getPoints6 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints6.minX,
            minY = _getPoints6.minY,
            maxX = _getPoints6.maxX,
            maxY = _getPoints6.maxY;

        var diffY = this.selectedPoint.y - point.y;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "6": function _(point) {
        var _getPoints7 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints7.minX,
            minY = _getPoints7.minY,
            maxX = _getPoints7.maxX,
            maxY = _getPoints7.maxY;

        var diffX = this.selectedPoint.x - point.x;
        var diffY = this.selectedPoint.y - point.y;
        minX = minX - diffX;
        maxY = maxY - diffY;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    },
    "7": function _(point) {
        var _getPoints8 = this.getPoints(this.prevStart, this.prevEnd),
            minX = _getPoints8.minX,
            minY = _getPoints8.minY,
            maxX = _getPoints8.maxX,
            maxY = _getPoints8.maxY;

        var diffX = this.selectedPoint.x - point.x;
        minX = minX - diffX;
        // if (minX > (maxX - this.minWidth)) minX = maxX - this.minWidth;
        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    }
};

exports.default = ControlResize;

/**
 * 控制缩放的过程中的点的位置（负责计算）
 */

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Point = function () {
    function Point(x, y) {
        (0, _classCallCheck3.default)(this, Point);

        this.x = x;
        this.y = y;
    }

    (0, _createClass3.default)(Point, [{
        key: "clone",
        value: function clone() {
            return new Point(this.x, this.y);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "x:" + this.x + ";y:" + this.y;
        }
    }]);
    return Point;
}();
/**
 * 定义基本的点
 * clone:
 * toString(): 重写了toSting方法，为了什么？
 */


exports.default = Point;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Util = {
    // 取距离，point1 与 point2 的距离
    distance: function distance(point1, point2) {
        var a = Math.abs(point1.x - point2.x);
        var b = Math.abs(point1.y - point2.y);
        return Math.sqrt(a * a + b * b);
    },
    getMaxMin: function getMaxMin(start, end) {
        return {
            minX: Math.min(start.x, end.x),
            maxX: Math.max(start.x, end.x),
            minY: Math.min(start.y, end.y),
            maxY: Math.max(start.y, end.y)
        };
    },
    drawEllipse: function drawEllipse(ctx, x, y, a, b, fillStyle, strokeStyle) {
        ctx.save();
        // 选择a、b中的较大者作为arc方法的半径参数
        var r = a > b ? a : b;
        var ratioX = a / r; // 横轴缩放比率
        var ratioY = b / r; // 纵轴缩放比率
        ctx.scale(ratioX, ratioY); // 进行缩放（均匀压缩）
        ctx.beginPath();
        // 从椭圆的左端点开始逆时针绘制
        ctx.moveTo((x + a) / ratioX, y / ratioY);
        ctx.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        ctx.closePath();
        if (strokeStyle) ctx.strokeStyle = strokeStyle;
        ctx.stroke();
        ctx.restore();
    },
    drawArrow: function drawArrow(ctx, fromX, fromY, toX, toY, color, theta, headlen, width) {
        theta = typeof theta !== 'undefined' ? theta : 30;
        headlen = typeof headlen !== 'undefined' ? headlen : 10;
        width = typeof width !== 'undefined' ? width : 1;
        color = typeof color !== 'color' ? color : '#000';
        // 计算各角度和对应的P2,P3坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        ctx.save();
        ctx.beginPath();
        var arrowX = fromX - topX,
            arrowY = fromY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
    },
    fontHeightCache: {},
    fontWidthCache: {},
    getFontHeight: function getFontHeight(font) {
        if (this.fontHeightCache[font]) return this.fontHeightCache[font];
        var div = document.createElement('div');
        div.style.height = '1px';
        div.style.width = '10000px';
        div.style.font = font;
        div.style.overflow = 'hidden';
        div.innerHTML = '字体高度';
        document.body.appendChild(div);
        this.fontHeightCache[font] = div.scrollHeight;
        div.parentNode.removeChild(div);
        return this.fontHeightCache[font];
    },
    getFontWidth: function getFontWidth(font) {
        // 当前先采用默认无值
    }
};

exports.default = Util;

/***/ }),
/* 207 */,
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(211);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 209 */,
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(29);
var gOPS = __webpack_require__(76);
var pIE = __webpack_require__(55);
var toObject = __webpack_require__(27);
var IObject = __webpack_require__(54);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(19)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(10);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(210) });


/***/ }),
/* 212 */,
/* 213 */,
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(215)(undefined);
// imports


// module
exports.push([module.i, ".wrapper-canvas{\r\n    position:relative;\r\n}\r\n.text-editor{\r\n    position:absolute;\r\n    border:none;\r\n    background:transparent;\r\n    outline:none;\r\n    padding:0;\r\n}", ""]);

// exports


/***/ }),
/* 215 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(316);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 316 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);