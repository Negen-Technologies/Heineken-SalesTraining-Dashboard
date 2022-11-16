module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");

// EXTERNAL MODULE: ./assets/antd-custom.less
var antd_custom = __webpack_require__("lACd");

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__("ufKq");

// EXTERNAL MODULE: ./store/Authentication/authactionTypes.js
var authactionTypes = __webpack_require__("cqk+");

// CONCATENATED MODULE: ./store/Authentication/authreducer.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const initialState = {
  token: null,
  error: null,
  loading: false,
  data: {}
};

const authStart = (state, action) => {
  return _objectSpread(_objectSpread({}, state), {}, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return _objectSpread(_objectSpread({}, state), {}, {
    token: action.token,
    data: action.data,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return _objectSpread(_objectSpread({}, state), {}, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  localStorage.clear();
  return _objectSpread(_objectSpread({}, state), {}, {
    token: null,
    error: null,
    data: {}
  });
};

const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case authactionTypes["c" /* AUTH_START */]:
      return authStart(state, action);

    case authactionTypes["d" /* AUTH_SUCCESS */]:
      return authSuccess(state, action);

    case authactionTypes["a" /* AUTH_FAIL */]:
      return authFail(state, action);

    case authactionTypes["b" /* AUTH_LOGOUT */]:
      return authLogout(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var authreducer = (auth_reducer);
// EXTERNAL MODULE: ./store/Avatar/avatar_actionTypes.js
var avatar_actionTypes = __webpack_require__("SIt4");

// CONCATENATED MODULE: ./store/Avatar/avatar_reducer.js
function avatar_reducer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function avatar_reducer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { avatar_reducer_ownKeys(Object(source), true).forEach(function (key) { avatar_reducer_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { avatar_reducer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function avatar_reducer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const avatar_reducer_initialState = {
  error: null,
  loading: false,
  data: []
};

const avatarStart = (state, action) => {
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    error: null,
    loading: true
  });
};

const avatarCreateSuccess = (state, action) => {
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    data: [...state.data, action.data],
    error: null,
    loading: false
  });
};

const avatarGetSuccess = (state, action) => {
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    data: action.data,
    error: null,
    loading: false
  });
};

const avatarEditSuccess = (state, action) => {
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    data: action.data,
    error: null,
    loading: false
  });
};

const avatarDeleteSuccess = (state, action) => {
  const newUsers = state.data.filter(user => {
    return user.id !== action.data.id;
  });
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    data: action.data,
    error: null,
    loading: false
  });
};

const avatarFail = (state, action) => {
  return avatar_reducer_objectSpread(avatar_reducer_objectSpread({}, state), {}, {
    error: action.error,
    loading: false
  });
};

const avatar_reducer = (state = avatar_reducer_initialState, action) => {
  switch (action.type) {
    case avatar_actionTypes["f" /* AVATAR_START */]:
      return avatarStart(state, action);

    case avatar_actionTypes["a" /* AVATAR_CREATE_SUCCESS */]:
      return avatarCreateSuccess(state, action);

    case avatar_actionTypes["e" /* AVATAR_GET_SUCCESS */]:
      return avatarGetSuccess(state, action);

    case avatar_actionTypes["c" /* AVATAR_EDIT_SUCCESS */]:
      return avatarEditSuccess(state, action);

    case avatar_actionTypes["b" /* AVATAR_DELETE_SUCCESS */]:
      return avatarDeleteSuccess(state, action);

    case avatar_actionTypes["d" /* AVATAR_FAIL */]:
      return avatarFail(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var Avatar_avatar_reducer = (avatar_reducer);
// CONCATENATED MODULE: ./store/rootReducer.js



const rootReducer = Object(external_redux_["combineReducers"])({
  auth: authreducer,
  avatar_reducer: Avatar_avatar_reducer
});
/* harmony default export */ var store_rootReducer = (rootReducer);
// CONCATENATED MODULE: ./store/store.js




const store_initialState = {};
const middleware = [external_redux_thunk_default.a];
const store = Object(external_redux_["createStore"])(store_rootReducer, store_initialState, Object(external_redux_devtools_extension_["composeWithDevTools"])(Object(external_redux_["applyMiddleware"])(...middleware)));
/* harmony default export */ var store_store = (store);
// CONCATENATED MODULE: ./pages/_app.js


function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_redux_["Provider"], {
    store: store_store,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _app_objectSpread({}, pageProps))
  });
}

const makeStore = () => store_store;

const wrapper = Object(external_next_redux_wrapper_["createWrapper"])(makeStore);
/* harmony default export */ var _app = __webpack_exports__["default"] = (wrapper.withRedux(MyApp));

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "SIt4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AVATAR_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AVATAR_CREATE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AVATAR_GET_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AVATAR_EDIT_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AVATAR_DELETE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AVATAR_FAIL; });
const AVATAR_START = "AVATAR_START";
const AVATAR_CREATE_SUCCESS = "AVATAR_CREATE_SUCCESS";
const AVATAR_GET_SUCCESS = "AVATAR_GET_SUCCESS";
const AVATAR_EDIT_SUCCESS = "AVATAR_EDIT_SUCCESS";
const AVATAR_DELETE_SUCCESS = "AVATAR_DELETE_SUCCESS";
const AVATAR_FAIL = "AVATAR_FAIL";

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "cqk+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AUTH_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AUTH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AUTH_LOGOUT; });
const AUTH_START = "AUTH_START";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAIL = "AUTH_FAIL";
const AUTH_LOGOUT = "AUTH_LOGOUT";

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "lACd":
/***/ (function(module, exports) {



/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ })

/******/ });