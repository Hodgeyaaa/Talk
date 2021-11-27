(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"talk","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"talk","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"talk","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"talk","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"talk","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!**************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/store/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! ../vuex.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    count: 2,
    scrollPadding: 0,
    group: [] },



  mutations: {
    risePadding: function risePadding(state) {
      state.scrollPadding = 250;
    },
    reducePadding: function reducePadding(state) {
      state.scrollPadding = 0;
    },
    addGroup: function addGroup(state, e) {
      state.group.push(e);
    },
    reduceGroup: function reduceGroup(state, e) {

    } },

  actions: {
    delayAdd: function delayAdd(context) {
      setTimeout(function () {
        context.commit("add");
      }, 1000);
    } } });exports.default = _default;

/***/ }),
/* 12 */
/*!*******************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/vuex.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(this, function () {'use strict';

  function applyMixin(Vue) {
    var version = Number(Vue.version.split('.')[0]);

    if (version >= 2) {
      Vue.mixin({ beforeCreate: vuexInit });
    } else {
      // override init and inject vuex init procedure
      // for 1.x backwards compatibility.
      var _init = Vue.prototype._init;
      Vue.prototype._init = function (options) {
        if (options === void 0) options = {};

        options.init = options.init ?
        [vuexInit].concat(options.init) :
        vuexInit;
        _init.call(this, options);
      };
    }

    /**
       * Vuex init hook, injected into each instances init hooks list.
       */

    function vuexInit() {
      var options = this.$options;
      // store injection
      if (options.store) {
        this.$store = typeof options.store === 'function' ?
        options.store() :
        options.store;
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    }
  }

  var target = typeof window !== 'undefined' ?
  window :
  typeof global !== 'undefined' ?
  global :
  {};
  var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  function devtoolPlugin(store) {
    if (!devtoolHook) {return;}

    store._devtoolHook = devtoolHook;

    devtoolHook.emit('vuex:init', store);

    devtoolHook.on('vuex:travel-to-state', function (targetState) {
      store.replaceState(targetState);
    });

    store.subscribe(function (mutation, state) {
      devtoolHook.emit('vuex:mutation', mutation, state);
    }, { prepend: true });

    store.subscribeAction(function (action, state) {
      devtoolHook.emit('vuex:action', action, state);
    }, { prepend: true });
  }

  /**
     * Get the first item that pass the test
     * by second argument function
     *
     * @param {Array} list
     * @param {Function} f
     * @return {*}
     */
  function find(list, f) {
    return list.filter(f)[0];
  }

  /**
     * Deep copy the given object considering circular structure.
     * This function caches all nested objects and its copies.
     * If it detects circular structure, use cached copy to avoid infinite loop.
     *
     * @param {*} obj
     * @param {Array<Object>} cache
     * @return {*}
     */
  function deepCopy(obj, cache) {
    if (cache === void 0) cache = [];

    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // if obj is hit, it is in circular structure
    var hit = find(cache, function (c) {return c.original === obj;});
    if (hit) {
      return hit.copy;
    }

    var copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy: copy });


    Object.keys(obj).forEach(function (key) {
      copy[key] = deepCopy(obj[key], cache);
    });

    return copy;
  }

  /**
     * forEach for object
     */
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function (key) {return fn(obj[key], key);});
  }

  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  function isPromise(val) {
    return val && typeof val.then === 'function';
  }

  function assert(condition, msg) {
    if (!condition) {throw new Error("[vuex] " + msg);}
  }

  function partial(fn, arg) {
    return function () {
      return fn(arg);
    };
  }

  // Base data struct for store's module, package with some attribute and method
  var Module = function Module(rawModule, runtime) {
    this.runtime = runtime;
    // Store some children item
    this._children = Object.create(null);
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule;
    var rawState = rawModule.state;

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
  };

  var prototypeAccessors = { namespaced: { configurable: true } };

  prototypeAccessors.namespaced.get = function () {
    return !!this._rawModule.namespaced;
  };

  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };

  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };

  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };

  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };

  Module.prototype.update = function update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };

  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };

  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };

  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };

  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };

  Object.defineProperties(Module.prototype, prototypeAccessors);

  var ModuleCollection = function ModuleCollection(rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false);
  };

  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function (module, key) {
      return module.getChild(key);
    }, this.root);
  };

  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function (namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '');
    }, '');
  };

  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };

  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1 = this;
    if (runtime === void 0) runtime = true;

    {
      assertRawModule(path, rawModule);
    }

    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function (rawChildModule, key) {
        this$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };

  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);

    if (!child) {
      {
        console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered");

      }
      return;
    }

    if (!child.runtime) {
      return;
    }

    parent.removeChild(key);
  };

  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];

    if (parent) {
      return parent.hasChild(key);
    }

    return false;
  };

  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }

    // update target module
    targetModule.update(newModule);

    // update nested modules
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed');

          }
          return;
        }
        update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]);

      }
    }
  }

  var functionAssert = {
    assert: function assert(value) {return typeof value === 'function';},
    expected: 'function' };


  var objectAssert = {
    assert: function assert(value) {return typeof value === 'function' ||
      typeof value === 'object' && typeof value.handler === 'function';},
    expected: 'function or object with "handler" function' };


  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert };


  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function (key) {
      if (!rawModule[key]) {return;}

      var assertOptions = assertTypes[key];

      forEachValue(rawModule[key], function (value, type) {
        assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected));

      });
    });
  }

  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
    if (path.length > 0) {
      buf += " in module \"" + path.join('.') + "\"";
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }

  var Vue; // bind on install

  var Store = function Store(options) {
    var this$1 = this;
    if (options === void 0) options = {};

    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
    }

    {
      assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
      assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store, "store must be called with the new operator.");
    }

    var plugins = options.plugins;if (plugins === void 0) plugins = [];
    var strict = options.strict;if (strict === void 0) strict = false;

    // store internal state
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._watcherVM = new Vue();
    this._makeLocalGettersCache = Object.create(null);

    // bind commit and dispatch to self
    var store = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options);
    };

    // strict mode
    this.strict = strict;

    var state = this._modules.root.state;

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root);

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state);

    // apply plugins
    plugins.forEach(function (plugin) {return plugin(this$1);});

    var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
    if (useDevtools) {
      devtoolPlugin(this);
    }
  };

  var prototypeAccessors$1 = { state: { configurable: true } };

  prototypeAccessors$1.state.get = function () {
    return this._vm._data.$$state;
  };

  prototypeAccessors$1.state.set = function (v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };

  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1 = this;

    // check object-style commit
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

    var mutation = { type: type, payload: payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function () {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });

    this._subscribers.
    slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) {return sub(mutation, this$1.state);});

    if (

    options && options.silent)
    {
      console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools');

    }
  };

  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1 = this;

    // check object-style dispatch
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

    var action = { type: type, payload: payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }

    try {
      this._actionSubscribers.
      slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) {return sub.before;}).
      forEach(function (sub) {return sub.before(action, this$1.state);});
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }

    var result = entry.length > 1 ?
    Promise.all(entry.map(function (handler) {return handler(payload);})) :
    entry[0](payload);

    return new Promise(function (resolve, reject) {
      result.then(function (res) {
        try {
          this$1._actionSubscribers.
          filter(function (sub) {return sub.after;}).
          forEach(function (sub) {return sub.after(action, this$1.state);});
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res);
      }, function (error) {
        try {
          this$1._actionSubscribers.
          filter(function (sub) {return sub.error;}).
          forEach(function (sub) {return sub.error(action, this$1.state, error);});
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };

  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };

  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === 'function' ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };

  Store.prototype.watch = function watch(getter, cb, options) {
    var this$1 = this;

    {
      assert(typeof getter === 'function', "store.watch only accepts a function.");
    }
    return this._watcherVM.$watch(function () {return getter(this$1.state, this$1.getters);}, cb, options);
  };

  Store.prototype.replaceState = function replaceState(state) {
    var this$1 = this;

    this._withCommit(function () {
      this$1._vm._data.$$state = state;
    });
  };

  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0) options = {};

    if (typeof path === 'string') {path = [path];}

    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, 'cannot register the root module by using registerModule.');
    }

    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    // reset store to update getters...
    resetStoreVM(this, this.state);
  };

  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1 = this;

    if (typeof path === 'string') {path = [path];}

    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }

    this._modules.unregister(path);
    this._withCommit(function () {
      var parentState = getNestedState(this$1.state, path.slice(0, -1));
      Vue.delete(parentState, path[path.length - 1]);
    });
    resetStore(this);
  };

  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === 'string') {path = [path];}

    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }

    return this._modules.isRegistered(path);
  };

  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };

  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };

  Object.defineProperties(Store.prototype, prototypeAccessors$1);

  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ?
      subs.unshift(fn) :
      subs.push(fn);
    }
    return function () {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }

  function resetStore(store, hot) {
    store._actions = Object.create(null);
    store._mutations = Object.create(null);
    store._wrappedGetters = Object.create(null);
    store._modulesNamespaceMap = Object.create(null);
    var state = store.state;
    // init all modules
    installModule(store, state, [], store._modules.root, true);
    // reset vm
    resetStoreVM(store, state, hot);
  }

  function resetStoreVM(store, state, hot) {
    var oldVm = store._vm;

    // bind store public getters
    store.getters = {};
    // reset local getters cache
    store._makeLocalGettersCache = Object.create(null);
    var wrappedGetters = store._wrappedGetters;
    var computed = {};
    forEachValue(wrappedGetters, function (fn, key) {
      // use computed to leverage its lazy-caching mechanism
      // direct inline function use will lead to closure preserving oldVm.
      // using partial to return function with only arguments preserved in closure environment.
      computed[key] = partial(fn, store);
      Object.defineProperty(store.getters, key, {
        get: function get() {return store._vm[key];},
        enumerable: true // for local getters
      });
    });

    // use a Vue instance to store the state tree
    // suppress warnings just in case the user has added
    // some funky global mixins
    var silent = Vue.config.silent;
    Vue.config.silent = true;
    store._vm = new Vue({
      data: {
        $$state: state },

      computed: computed });

    Vue.config.silent = silent;

    // enable strict mode for new vm
    if (store.strict) {
      enableStrictMode(store);
    }

    if (oldVm) {
      if (hot) {
        // dispatch changes in all subscribed watchers
        // to force getter re-evaluation for hot reloading.
        store._withCommit(function () {
          oldVm._data.$$state = null;
        });
      }
      Vue.nextTick(function () {return oldVm.$destroy();});
    }
  }

  function installModule(store, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store._modules.getNamespace(path);

    // register in namespace map
    if (module.namespaced) {
      if (store._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join('/'));
      }
      store._modulesNamespaceMap[namespace] = module;
    }

    // set state
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store._withCommit(function () {
        {
          if (moduleName in parentState) {
            console.warn(
            "[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + path.join('.') + "\"");

          }
        }
        Vue.set(parentState, moduleName, module.state);
      });
    }

    var local = module.context = makeLocalContext(store, namespace, path);

    module.forEachMutation(function (mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store, namespacedType, mutation, local);
    });

    module.forEachAction(function (action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store, type, handler, local);
    });

    module.forEachGetter(function (getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store, namespacedType, getter, local);
    });

    module.forEachChild(function (child, key) {
      installModule(store, rootState, path.concat(key), child, hot);
    });
  }

  /**
     * make localized dispatch, commit, getters and state
     * if there is no namespace, just use root ones
     */
  function makeLocalContext(store, namespace, path) {
    var noNamespace = namespace === '';

    var local = {
      dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;

        if (!options || !options.root) {
          type = namespace + type;
          if (!store._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }

        return store.dispatch(type, payload);
      },

      commit: noNamespace ? store.commit : function (_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;

        if (!options || !options.root) {
          type = namespace + type;
          if (!store._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }

        store.commit(type, payload, options);
      } };


    // getters and state object must be gotten lazily
    // because they will be changed by vm update
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ?
        function () {return store.getters;} :
        function () {return makeLocalGetters(store, namespace);} },

      state: {
        get: function get() {return getNestedState(store.state, path);} } });



    return local;
  }

  function makeLocalGetters(store, namespace) {
    if (!store._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store.getters).forEach(function (type) {
        // skip if the target getter is not match this namespace
        if (type.slice(0, splitPos) !== namespace) {return;}

        // extract local getter type
        var localType = type.slice(splitPos);

        // Add a port to the getters proxy.
        // Define as getter property because
        // we do not want to evaluate the getters in this time.
        Object.defineProperty(gettersProxy, localType, {
          get: function get() {return store.getters[type];},
          enumerable: true });

      });
      store._makeLocalGettersCache[namespace] = gettersProxy;
    }

    return store._makeLocalGettersCache[namespace];
  }

  function registerMutation(store, type, handler, local) {
    var entry = store._mutations[type] || (store._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store, local.state, payload);
    });
  }

  function registerAction(store, type, handler, local) {
    var entry = store._actions[type] || (store._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res = handler.call(store, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getters,
        rootState: store.state },
      payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store._devtoolHook) {
        return res.catch(function (err) {
          store._devtoolHook.emit('vuex:error', err);
          throw err;
        });
      } else {
        return res;
      }
    });
  }

  function registerGetter(store, type, rawGetter, local) {
    if (store._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store._wrappedGetters[type] = function wrappedGetter(store) {
      return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
      );
    };
  }

  function enableStrictMode(store) {
    store._vm.$watch(function () {return this._data.$$state;}, function () {
      {
        assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, sync: true });
  }

  function getNestedState(state, path) {
    return path.reduce(function (state, key) {return state[key];}, state);
  }

  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }

    {
      assert(typeof type === 'string', "expects string as the type, but found " + typeof type + ".");
    }

    return { type: type, payload: payload, options: options };
  }

  function install(_Vue) {
    if (Vue && _Vue === Vue) {
      {
        console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.');

      }
      return;
    }
    Vue = _Vue;
    applyMixin(Vue);
  }

  /**
     * Reduce the code which written in Vue.js for getting the state.
     * @param {String} [namespace] - Module's namespace
     * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
     * @param {Object}
     */
  var mapState = normalizeNamespace(function (namespace, states) {
    var res = {};
    if (!isValidMap(states)) {
      console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(states).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedState() {
        var state = this.$store.state;
        var getters = this.$store.getters;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapState', namespace);
          if (!module) {
            return;
          }
          state = module.context.state;
          getters = module.context.getters;
        }
        return typeof val === 'function' ?
        val.call(this, state, getters) :
        state[val];
      };
      // mark vuex getter for devtools
      res[key].vuex = true;
    });
    return res;
  });

  /**
       * Reduce the code which written in Vue.js for committing the mutation
       * @param {String} [namespace] - Module's namespace
       * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
       * @return {Object}
       */
  var mapMutations = normalizeNamespace(function (namespace, mutations) {
    var res = {};
    if (!isValidMap(mutations)) {
      console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(mutations).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedMutation() {
        var args = [],len = arguments.length;
        while (len--) {args[len] = arguments[len];}

        // Get the commit method from store
        var commit = this.$store.commit;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
          if (!module) {
            return;
          }
          commit = module.context.commit;
        }
        return typeof val === 'function' ?
        val.apply(this, [commit].concat(args)) :
        commit.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });

  /**
       * Reduce the code which written in Vue.js for getting the getters
       * @param {String} [namespace] - Module's namespace
       * @param {Object|Array} getters
       * @return {Object}
       */
  var mapGetters = normalizeNamespace(function (namespace, getters) {
    var res = {};
    if (!isValidMap(getters)) {
      console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(getters).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      // The namespace has been mutated by normalizeNamespace
      val = namespace + val;
      res[key] = function mappedGetter() {
        if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
          return;
        }
        if (!(val in this.$store.getters)) {
          console.error("[vuex] unknown getter: " + val);
          return;
        }
        return this.$store.getters[val];
      };
      // mark vuex getter for devtools
      res[key].vuex = true;
    });
    return res;
  });

  /**
       * Reduce the code which written in Vue.js for dispatch the action
       * @param {String} [namespace] - Module's namespace
       * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
       * @return {Object}
       */
  var mapActions = normalizeNamespace(function (namespace, actions) {
    var res = {};
    if (!isValidMap(actions)) {
      console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    }
    normalizeMap(actions).forEach(function (ref) {
      var key = ref.key;
      var val = ref.val;

      res[key] = function mappedAction() {
        var args = [],len = arguments.length;
        while (len--) {args[len] = arguments[len];}

        // get dispatch function from store
        var dispatch = this.$store.dispatch;
        if (namespace) {
          var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
          if (!module) {
            return;
          }
          dispatch = module.context.dispatch;
        }
        return typeof val === 'function' ?
        val.apply(this, [dispatch].concat(args)) :
        dispatch.apply(this.$store, [val].concat(args));
      };
    });
    return res;
  });

  /**
       * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
       * @param {String} namespace
       * @return {Object}
       */
  var createNamespacedHelpers = function createNamespacedHelpers(namespace) {return {
      mapState: mapState.bind(null, namespace),
      mapGetters: mapGetters.bind(null, namespace),
      mapMutations: mapMutations.bind(null, namespace),
      mapActions: mapActions.bind(null, namespace) };
  };

  /**
      * Normalize the map
      * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
      * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
      * @param {Array|Object} map
      * @return {Object}
      */
  function normalizeMap(map) {
    if (!isValidMap(map)) {
      return [];
    }
    return Array.isArray(map) ?
    map.map(function (key) {return { key: key, val: key };}) :
    Object.keys(map).map(function (key) {return { key: key, val: map[key] };});
  }

  /**
     * Validate whether given map is valid or not
     * @param {*} map
     * @return {Boolean}
     */
  function isValidMap(map) {
    return Array.isArray(map) || isObject(map);
  }

  /**
     * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
     * @param {Function} fn
     * @return {Function}
     */
  function normalizeNamespace(fn) {
    return function (namespace, map) {
      if (typeof namespace !== 'string') {
        map = namespace;
        namespace = '';
      } else if (namespace.charAt(namespace.length - 1) !== '/') {
        namespace += '/';
      }
      return fn(namespace, map);
    };
  }

  /**
     * Search a special module from store by namespace. if module not exist, print error message.
     * @param {Object} store
     * @param {String} helper
     * @param {String} namespace
     * @return {Object}
     */
  function getModuleByNamespace(store, helper, namespace) {
    var module = store._modulesNamespaceMap[namespace];
    if (!module) {
      console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
    }
    return module;
  }

  // Credits: borrowed code from fcomb/redux-logger

  function createLogger(ref) {
    if (ref === void 0) ref = {};
    var collapsed = ref.collapsed;if (collapsed === void 0) collapsed = true;
    var filter = ref.filter;if (filter === void 0) filter = function filter(mutation, stateBefore, stateAfter) {return true;};
    var transformer = ref.transformer;if (transformer === void 0) transformer = function transformer(state) {return state;};
    var mutationTransformer = ref.mutationTransformer;if (mutationTransformer === void 0) mutationTransformer = function mutationTransformer(mut) {return mut;};
    var actionFilter = ref.actionFilter;if (actionFilter === void 0) actionFilter = function actionFilter(action, state) {return true;};
    var actionTransformer = ref.actionTransformer;if (actionTransformer === void 0) actionTransformer = function actionTransformer(act) {return act;};
    var logMutations = ref.logMutations;if (logMutations === void 0) logMutations = true;
    var logActions = ref.logActions;if (logActions === void 0) logActions = true;
    var logger = ref.logger;if (logger === void 0) logger = console;

    return function (store) {
      var prevState = deepCopy(store.state);

      if (typeof logger === 'undefined') {
        return;
      }

      if (logMutations) {
        store.subscribe(function (mutation, state) {
          var nextState = deepCopy(state);

          if (filter(mutation, prevState, nextState)) {
            var formattedTime = getFormattedTime();
            var formattedMutation = mutationTransformer(mutation);
            var message = "mutation " + mutation.type + formattedTime;

            startMessage(logger, message, collapsed);
            logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
            logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
            logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
            endMessage(logger);
          }

          prevState = nextState;
        });
      }

      if (logActions) {
        store.subscribeAction(function (action, state) {
          if (actionFilter(action, state)) {
            var formattedTime = getFormattedTime();
            var formattedAction = actionTransformer(action);
            var message = "action " + action.type + formattedTime;

            startMessage(logger, message, collapsed);
            logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
            endMessage(logger);
          }
        });
      }
    };
  }

  function startMessage(logger, message, collapsed) {
    var startMessage = collapsed ?
    logger.groupCollapsed :
    logger.group;

    // render
    try {
      startMessage.call(logger, message);
    } catch (e) {
      logger.log(message);
    }
  }

  function endMessage(logger) {
    try {
      logger.groupEnd();
    } catch (e) {
      logger.log('—— log end ——');
    }
  }

  function getFormattedTime() {
    var time = new Date();
    return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
  }

  function repeat(str, times) {
    return new Array(times + 1).join(str);
  }

  function pad(num, maxLength) {
    return repeat('0', maxLength - num.toString().length) + num;
  }

  var index_cjs = {
    Store: Store,
    install: install,
    version: '3.6.2',
    mapState: mapState,
    mapMutations: mapMutations,
    mapGetters: mapGetters,
    mapActions: mapActions,
    createNamespacedHelpers: createNamespacedHelpers,
    createLogger: createLogger };


  return index_cjs;

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../迅雷下载/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),
/* 13 */
/*!********************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/utils/request_api.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.myRequest = void 0;var BASE_URL = 'http://127.0.0.1:3000';
var myRequest = function myRequest(options) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: function success(res) {
        // if(res.data.status !== 0) {
        // 	uni.showToast({
        // 		title: '获取数据失败！',
        // 	})
        // }
        resolve(res);
      },
      fail: function fail(err) {
        uni.showToast({
          title: '请求失败' });

        reject(err);
      } });

  });
};exports.myRequest = myRequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/*!*******************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/commons/js/datas.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  friends: function friends() {
    var userArr = [
    { id: 1,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy1.png */ 21),
      tip: 9,
      name: '麦岑福',
      sex: '男',
      email: 'bbcdef@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 2,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
      tip: 2,
      name: 'Jhon',
      sex: '男',
      email: 'aacdef@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 3,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy3.png */ 23),
      tip: 0,
      name: 'Peter',
      sex: '男',
      email: 'abddef@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 4,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/girl1.png */ 24),
      tip: 11,
      name: 'Mary',
      sex: '女',
      email: 'abceef@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 5,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy4.png */ 25),
      tip: 0,
      name: 'peiqi',
      sex: '男',
      email: 'PQ@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 6,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy5.png */ 26),
      tip: 9,
      name: '李庄',
      sex: '男',
      email: 'LiZ@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 7,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
      tip: 2,
      name: '张苏格',
      sex: '男',
      email: 'shu@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 8,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy4.png */ 25),
      tip: 0,
      name: '刘大壮',
      sex: '男',
      email: 'LDZ@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 9,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy3.png */ 23),
      tip: 11,
      name: '王五',
      sex: '男',
      email: 'WW@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 10,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/girl4.png */ 27),
      tip: 0,
      name: '韩梅梅',
      sex: '女',
      email: 'PQ@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' },

    { id: 11,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy6.png */ 28),
      tip: 0,
      name: '李雷',
      sex: '男',
      email: 'LiLei@163.com',
      password: 123456,
      telephone: 17322096481,
      createTime: new Date() - 1000 * 60 * 60 * 60 * 24 * 7,
      autograph: '格式单窗口是从哪开始了',
      time: new Date(),
      news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？' }];


    return userArr;
  },
  // 群表
  groups: function groups() {
    var groups = [
    {
      groupId: 1,
      id: 1, //数据id
      groupName: '1号群',
      groupMember: [
      {
        userId: 1 },

      {
        userId: 2 },

      {
        userId: 3 },

      {
        userId: 4 },

      {
        userId: 5 },

      {
        userId: 6 },

      {
        userId: 7 }],





      tip: 0,
      time: new Date() - 1000 * 60 * 4,
      news: '大家好' }];


    return groups;
  },
  // 好友表
  myFriends: function myFriends() {
    var myFriendsArr = [
    { id: 1,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy1.png */ 21),
      tip: 9,
      name: '麦岑福',
      nick: '大麦子',
      email: 'bbcdef@163.com',
      time: new Date(),
      news: 'have not heard from sb. since; have had no news of sb. or sth.' },

    { id: 2,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
      tip: 2,
      name: 'Jhon',
      nick: '二爷',
      email: 'aacdef@163.com',
      time: new Date(),
      news: 'have not heard from sb. since; have had no news of sb. or sth.' },

    { id: 3,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy3.png */ 23),
      tip: 0,
      name: 'Peter',
      nick: '老皮',
      email: 'abddef@163.com',
      time: new Date(),
      news: 'have not heard from sb. since; have had no news of sb. or sth.' },

    { id: 4,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/girl2.png */ 29),
      tip: 11,
      name: 'Mary',
      nick: '小美',
      email: 'abceef@163.com',
      time: new Date(),
      news: 'have not heard from sb. since; have had no news of sb. or sth.' },

    { id: 5,
      imgurl: __webpack_require__(/*! @/static/images/public/Head/boy4.png */ 25),
      tip: 0,
      name: 'peiqi',
      nick: '佩奇',
      email: 'PQ@163.com',
      time: new Date(),
      news: 'have not heard from sb. since; have had no news of sb. or sth.' }];


    return myFriendsArr;
  },

  // 判断好友表
  isFriend: function isFriend() {
    var isFriend = [
    {
      userid: 1,
      friend: 1 },

    {
      userid: 2,
      friend: 2 },

    {
      userid: 3,
      friend: 3 },

    {
      userid: 4,
      friend: 4 }];



    return isFriend;
  },
  // 用户之间聊天信息
  message: function message() {
    var msg = [
    {
      userId: 1,
      chatMessage: [
      {
        friendId: 2,
        news: [
        {
          id: 'b',
          userId: 1,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/hodgeHead.png */ 30),
          message: {
            voice: '',
            time: 3 },

          types: 2,
          time: new Date() - 2000,
          tip: 0 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3d%2Fa5%2F42%2F3da542de95a5ab09941a42ff4256951d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636110666&t=1baac9efceeb2aa768031c214194ad5a',
          types: 1,
          time: new Date() - 1000,
          tip: 1 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: {
            name: '广东工贸职业技术学院',
            address: '广东省广州市兴华街道广州大道北1098号',
            longitude: 120.363172,
            latitude: 30.312212 },

          types: 3,
          time: new Date() - 1000 * 60 * 4,
          tip: 2 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1712%2F144-1G209191R5.jpg&refer=http%3A%2F%2Fuploads.5068.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636110666&t=06676d908824115a463002f40c4552e8',
          types: 1,
          time: new Date() - 1000 * 23,
          tip: 3 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: '雷，我们也好久没见了，我有好多话想跟你说',
          types: 0,
          time: new Date() - 1000 * 50,
          tip: 4 },

        {
          id: 'b',
          userId: 1,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/hodgeHead.png */ 30),
          message: '雷，我们也好久没见了，我有好多话想跟你说',
          types: 0,
          time: new Date() - 1000 * 60 * 4,
          tip: 5 },

        {
          id: 'b',
          userId: 1,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/hodgeHead.png */ 30),
          message: '雷，我们也好久没见了，我有好多话想跟你说',
          types: 0,
          time: new Date() - 1000 * 60 * 30,
          tip: 6 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: {
            voice: '',
            time: 3 },

          types: 2,
          time: new Date() - 1000 * 60 * 60 * 24 * 2,
          tip: 7 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: '雷，我们也好久没见了，我有好多话想跟你说',
          types: 0,
          time: new Date() - 1000 * 60 * 60 * 24 * 3,
          tip: 8 },

        {
          id: 'b',
          userId: 1,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/hodgeHead.png */ 30),
          message: '梅，我们也好久没见了，我有好多话想跟你说',
          types: 0,
          time: new Date() - 1000 * 60 * 60 * 24 * 4,
          tip: 9 },

        {
          id: 'b',
          userId: 1,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/hodgeHead.png */ 30),
          message: '梅，你怎么了？',
          types: 0,
          time: new Date() - 1000 * 60 * 60 * 24 * 4,
          tip: 10 },

        {
          id: 'a',
          userId: 2,
          imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
          message: '雷.....',
          types: 0,
          time: new Date() - 1000 * 60 * 60 * 24 * 4,
          tip: 11 }] }] }];






    return msg;
  },
  //群聊天信息
  groupMessage: function groupMessage() {
    var groupMsg = [
    {
      groupId: 1,
      news: [
      {
        id: 'a',
        userId: '1',
        imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy1.png */ 21),
        message: '梅，我们也好久没见了，我有好多话想跟你说',
        types: 0,
        time: new Date() - 1000 * 60 * 60 * 24 * 4,
        tip: 1 //消息编号
      },
      {
        id: 'a',
        userId: '2',
        imgUrl: __webpack_require__(/*! @/static/images/public/Head/boy2.png */ 22),
        message: '大家好',
        types: 0,
        time: new Date() - 1000 * 60 * 60 * 24 * 5,
        tip: 2 }] }];




    return groupMsg;
  } };exports.default = _default;

/***/ }),
/* 21 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy1.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAGwCAYAAADITjAqAAAgAElEQVR4Xu2dCdxN5fbHl6iIRBQhTUQi85A5LmWIEEK6Iko3RSIyVITkImN1TQ0IZQopt25FRKjMIsmceSiilP/nt+//dV+vc85+9jl777OfZ//W53M+de/77OdZ67t2Z5397PWsle7cuXPnhEICJEACJEACmhFIxwCmmceoLgmQAAmQgEWAAYw3AgmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA+QAAmQAAloSYABTEu3UWkSIAESIAEGMN4DJEACJEACWhJgANPSbVSaBEiABEiAAYz3AAmQAAmQgJYEGMC0dBuVJgESIAESYADjPUACJEACJKAlAQYwLd1GpUmABEiABBjAeA9oSeDAgQOya9cu2b9/v5w4cUKOHz8uR44ckUOHDsnu3bvlu+++ky1btsS0rVatWnLLLbdI7ty5JWfOnJI9e3a56qqr5Morr5QsWbJI5syZrX+/+uqrJWPGjFpyotIkYDIBBjCTvWuIbX/99Zd8//338tNPP8mmTZtk0aJF8vHHH/tqXb169aRs2bJy0003SZ48eSRXrlySI0cOBjdfvcDFSOBCAgxgvCMCS+DXX3+V1atXy5w5c+TVV18NrJ4pwe22226zAly+fPmsAHfJJZcEVmcqRgImEGAAM8GLhtmA7cEVK1bIhAkTZO7cudpa1717dylevLjcfPPNVlDDVmWGDBm0tYeKk0DQCDCABc0jIdbnxx9/lKVLl8pDDz1kLIUnn3xSSpUqJQULFrTev+FJjUICJBAfAQaw+LjxKhcJnDp1SubNmycPPPCAi7PqMdXdd98tjRo1kkKFCkn+/PmtLch06dLpoTy1JIEkE2AAS7IDwr48kjPGjRsnQ4cODTsKy/72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"

/***/ }),
/* 22 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy2.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAGwCAYAAADITjAqAAAgAElEQVR4Xu2dCbxW0/rHV/+LQiRTJZxwb2VIp0K3Im6TSA6RVCTUPaeSBkPDX0pokhuu1CmFZkMarqLQdaVJ6uQiCqlEZc7QZOj/+e173/6vt73fvdbea++99n5/z+fzfnLvWXsN32ef83vXWs96Vql9+/btEzQSIAESIAESiBmBUhSwmHmM3SUBEiABErAIUMD4IpAACZAACcSSAAUslm5jp0mABEiABChgfAdIgARIgARiSYACFku3sdMkQAIkQAIUML4DJEACJEACsSRAAYul29hpEiABEiABChjfARIgARIggVgSoIDF0m3sNAmQAAmQAAWM7wAJkAAJkEAsCVDAYuk2dpoESIAESIACxneABEiABEgglgQoYLF0GztNAiRAAiRAAeM7QAIkQAIkEEsCFLBYuo2dJgESIAESoIDxHSABEiABEoglAQpYLN3GTpMACZAACVDA+A6QAAmQAAnEkgAFLJZuY6dJgARIgAQoYHwHSIAESIAEYkmAAhZLt7HTJEACJEACFDC+AyRAAiRAArEkQAGLpdvYaRIgARIgAQoY3wESIAESIIFYEqCAxdJt7DQJkAAJkAAFjO8ACZAACZBALAlQwGLpNnaaBEiABEiAAsZ3gARIgARIIJYEKGCxdBs7TQIkQAIkQAHjO0ACJEACJBBLAhSwWLqNnSYBEiABEqCA8R0gARIgARKIJQEKWCzdxk6TAAmQAAlQwPgOkAAJkAAJxJIABSyWbmOnSYAESIAEKGB8B0iABEiABGJJgAIWS7ex0yRAAiRAAhQwvgMkQAIkQAKxJEABi6Xb2GkSIAESIAEKGN8BEiABEiCBWBKggMXSbew0CZAACZAABYzvAAmQAAmQQCwJUMBi6TZ2mgRIgARIgALGd4AESIAESCCWBChgsXQbO00CJEACJEAB4ztAAiRAAiQQSwIUsFi6jZ0mARIgARKggPEdIAESIAESiCUBClgs3cZOkwAJkAAJUMD4DpAACZAACcSSAAUslm5jp0mABEiABChgfAdIgARIgARiSYACFku3sdMkQAIkQAIUML4DJEACJEACsSRAAYul29hpEiABEiABChjfARIgARIggVgSoIDF0m3sNAmQAAmQAAWM7wAJkAAJkEAsCVDAYuk2dlqGwI4d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"

/***/ }),
/* 23 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy3.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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IipbtWrlffBvtdVW3h7SGmusEbTrxOv//PPP3th0mF9je+ONN7zxxV0U0ZjH8cc9TtqzI4CA2XGqWmv48OFmyJAhMbREE/UJHH/88Wb06NHOgtEsQx/smj3GdRZq11139Y4J6M911103MzaLFy/2xnb77bcbfYlLulx99dVGyQIoECgRQMBieBcQsBgglmnif/7nf8zhhx+eTOMJtqoPdtmupLZKc5Rk2Wuvvcwuu+xievbsaVZZZZUku1rStiIANTb9fP3116n0qU7OO+88c8opp6TWHx3lnwACFoOPELAYINZrwlXxkmCdeuqpRuee0iybbrqp9+Gu1E1JFaXG0pGFNGZblcYgrjoUTYGACCBgMbwHCFgMEOs04ap4nXvuuWbo0KHxwgjYmq7yuf766wM+5V9d4e+nn356qjOucladcMIJ5sILL/Q3mBo1QQABi8HNRCHGAPHfTbi45/XSSy+Z3Xff3TcgIz5K1VtSkMN1111ndtttt8hd5mHWVX8QV155penXr1/ksdGA+wQQsBh8iIDFANEYozNe1157bTyNpdTKgAEDzOWXXx5rbxKg1VZbzWtz+eWXN59//nmokHPtH2o2G7aEnXVpOVP34q244opm4cKF3t8VlRjnfhkzsbBeLdZzCFgM/uQesOgQt9hiC6MrR/J2HYhGpqtRFPpe94qUhx56yDu/ZXstSnRC/2pBZ6hUbMVAe1ZnnHFG4O7POussb7/Ltkh0JVZpFt29t/fee3uXcurMnMpGG23kCSah9ml6Iru+ELAY2JNKKjrEOXPmBL66Pnqv/2mhJFJaMtPfJVAqpT/j7CvttiQsq6++eqBude4szEHjQJ3EUFlffF588cWyLemYQadOnZYInGa1a621FuIWA/e8NIGAxeAJfUA0bdo0hpZqswnNEIJ8249CSRnM9YVDwqS/69CtRMt2RhOl76yeffnll81mm20WqHtXBMxvUDoEXv9ANVns/ai583sELCZfRc3vFpMZzjWjb9Banou7lBOquA4S29i67bbbGi1xaXlLpdolmqXbnBctWrTkFue4Zn5aclT2DmXrr5uGS3bJJpW6t0WXlkknTpwY2wysdKt03T4rpQTTft8RRxyR6BcKBMzmDXajDgIWk58mT55sFMJMsSegDzYt/0S5CiVroao7Wo1H0XE6VhFX0exQPxK0Bx54IPU9t6Dj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haMrka6Wmjt06GBeffXVssPVvpPqhl3CtGVoexZMonvKKafYNks9xwggYBk4TKlt9A/r3HPPte5d6YYkCsstt5z1M2Eq6r6lOELq05yZhBln0Gf89ggVOKFZZ9wf3Or3kksuMQraqFTiWL778MMPvYPn5cqll15qBgwYsORXfjNBifrEiRONRD/uoqMDWp6uNAus399JJ51UUzc/xM077+0hYBl46Oabb/aSuNoWbawHzcBt23a5enGE1BdNwMSpWs5B/V4CoC8lmg3FUa677jqjD+BqtxDr2MTDDz8cWTgVhFEpY3u59Fl+IqbxK1vHBRdcEMvsVMIlIdcKhG2EpGw48sgjvWcoxSSAgKXs1zfffNNstNFG1r2edtppXpRimqVaiLatHba37Nq2l5d6NjNUzUAUZFM6ixdkViZhkHDZfFBHCZevz/OKK64wf/3rX8tiruRL29mQRFZCoplTixYtrF2p9iXO+jIkJmHKn//8Z3P33XeHeZRnHCCAgKXspGuuucY7s2VT9t13X3PLLbfYVI21TrUMD7YdFeEMWKWxKrReAQ+2MwHNRHTwttI+mZYJJVxq16YksURXLarvk08+MU2bNq1oWrW7yOo/JNuVjLcaC0UOao846MWV5QzMKluIjR+pE50AAhadoXULysZt+w1U//BmzZoVa5i8taHGeLf3hv3Wq36KLGAanwSnR48eZt68eUGwRq6rD37thdq+R7Ydak+pTZs2ZavPmDHDyyJfrWh5VftkcYiOrc229ZQN/7/+679sq1PPIQIIWIrOuv76671IMpuS9TXo1TKR+9kfR1CBXx95+b04aZm3ftLfuO3TvpqWDJPMeFEu+77GMXLkSPP3v//dakhaYtUXH9vZpFWjZSqJhw7e2yyva6a8wgorhO2K53JMAAFLyTkfffSRWWeddax6051gErusi76R20Z71bW1lgSsNG59YOu8mGbNtkuLfv5VSLpmPgMHDox9xlWu7912281otlW/6OyhlvWCFPGQmCk4JK5ZmXhsu+22XkSmZqA2+5Gy+bPPPjOrrrpqEPOp6wgBBCwlR+lApZac/Ioi2fSPv2XLln5VE/+97QdEfUNqUcDqMtAeonyoHy0b68PfT9Tkd12gqf0hHRYWwyDBH3G8DIp41GyrXBk3bpw55phjQnVT2t8Tjy+++MJbfvXjocCPVVZZxZtx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SMgOOuggq8szQ3fEg84S0If6RRddZBYuXGi23357T7AUSWh7S0IeBm675M7+Vx68lY4NCFg6nH17ef/99816663nW69aBS0BaelHQrb55ptHaouHIZA3Ajbnv2Qz+19581xy9iBgybEN3PL3339vdKnlrbfeGvjZ+g8oFVWzZs28kOc111zT6OyM/ls/jRo1yv1yUWQANFA4AtXuISsN9oQTTjAXXnhh4cbOgMoTQMBy+GbYhgpHMV0Cp8PRun9MMzcKBPJM4KWXXjJbbLGFr4lKPrz//vv71qNCMQggYDn1o9L8pBGcseOOO3o58Ag5zumLgFkegauvvtocc8wxvjSef/5506ZNG996VCgGAQQsx35Ulm9tuCddskrKmvS4aL84BHr37m3Gjx/vOyD2v3wRFaoCApZzd86bN89Mnz7dnHjiiYlayuV/ieKl8QgEfv31Vy99lN/1LloOP/vssyP0xKOuEUDAHPHYM88842UgGD16dCIWb7rppubxxx83K620UiLt0ygEwhKwvf/r9ttvN926dQvbDc85SAABc8hpP/30k3fgWSJmc0tu0KGddtpp5pxzzgn6GPUhkCiBY4891iqzhq4q0hcxSu0QQMAc9LUOPj/44ING6aSmTp0a2wh0h5Labdu2bWxt0hAEohBQphrd3OC3fKiZ14033mgaN24cpTuedYwAAuaYw+qa+8svv5g333zTvPrqq57w6J6mqEXXbtx0001Rm+F5CMRCQMuC++yzj29b119/fcV0Wb4PU8FZAgiYs65b2vBPP/3Uu2l39uzZRtfE696xe+65J/AIFbKsqC8KBLImoNB5vY9+5eWXX+aGBj9IBfw9AlZAp9YdkpZgvvnmG+/HNlWVDjnrHBrpqAr+cuR8eN99951R9o0PPvigqqVaNdAMbNlll835iDAvbgIIWNxEc9yebTSXhrDXXnt54fsUCGRF4JZbbrHKqnHDDTeYAw88MCsz6TdDAghYhvDT7vqHH37wMpA/9NBDVl0rIlGRiRQIZEFAF2pee+21vl1rD3iTTTbxrUeF4hFAwIrn06ojeuKJJ0yHDh2sRz1z5sxUUlpZG0TFmiCwePFis9FGG3nXv1QrSn49YcIE07Bhw5rgwiB/SwABq7E34v/+7//M4MGDzahRo6xGrgsPtR+24oorWtWnEgTiIKCQeF0L5FdI3utHqNi/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"

/***/ }),
/* 24 */
/*!***********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/girl1.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAGwCAYAAADITjAqAAAgAElEQVR4Xu2dCbQVxbWGt4YXcIjA03ANohBRQHwog0MUR4aIGiYRUcABARUVZxmMyhQVRQYVFRQUFIcoKODEjIqCODCoKGCQQYyABLiYuEDzHm/9rZdcruecru6u7q6q/mutu0g81VW7vl33/qeqd+3aa9euXbuEhQRIgARIgAQsI7AXBcwyj9FcEiABEiABjwAFjBOBBEiABEjASgIUMCvdRqNJgARIgAQoYJwDJEACJEACVhKggFnpNhpNAiRAAiRAAeMcIAESIAESsJIABcxKt9FoEiABEiABChjnAAmQAAmQgJUEKGBWuo1GkwAJkAAJUMA4B0iABEiABKwkQAGz0m00mgRIgARIgALGOUACJEACJGAlAQqYlW6j0SRAAiRAAhQwzgESIAESIAErCVDArHQbjSYBEiABEqCAcQ6QAAmQAAlYSYACZqXbaDQJkAAJkAAFjHOABEiABEjASgIUMCvdRqNJgARIgAQoYJwDJEACJEACVhKggFnpNhpNAiRAAiRAAeMcIAESIAESsJIABcxKt9FoEiABEiABChjnAAmQAAmQgJUEKGBWuo1GkwAJkAAJUMA4B0iABEiABKwkQAGz0m00mgRIgARIgALGOUACJEACJGAlAQqYlW6j0SRAAiRAAhQwzgESIAESIAErCVDArHQbjSYBEiABEqCAcQ6QAAmQAAlYSYACZqXbaDQJkAAJkAAFjHOABEiABEjASgIUMCvdRqNJgARIgAQoYJwDJEACJEACVhKggFnpNhpNAiRAAiRAAeMcIAESIAESsJIABcxKt9FoEiABEiABChjnAAmQAAmQgJUEKGBWuo1GkwAJkAAJUMA4B0iABEiABKwkQAGz0m00mgRIgARIgALGOUACJEACJGAlAQqYlW6j0SRAAiRAAhQwzgESIAESIAErCVDArHQbjSYBEiABEqCAcQ6QAAmQAAlYSYACZqXbaDQJkAAJkAAFjHOABEiABEjASgIUMCvdRqNJgARIgAQoYJwDJEACJEACVhKggFnpNhpNAiRAAiRAAeMcIAESIAESsJIABcxKt9FoEiABEiABChjnAAmQAAmQgJUEKGBWuo1GkwAJkAAJUMA4B0iABEiABKwkQAGz0m00mgRIgARIgALGOUACJEACJGAl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"

/***/ }),
/* 25 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy4.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAGwCAYAAADITjAqAAAgAElEQVR4Xu2dCdxN1frHH65C3TLPklkiriEiRKaUKFGG3NINKVTGJFSUFE3InAZJGgwlKhWuqUSJUsYb4SqzyNDN//Pb9x7/1+u8Z689nH3W2vv3fD7nQ71rr/Ws79re31l7P+t5Mp0+ffq00EiABEiABEjAMAKZKGCGrRjdJQESIAESsAhQwHgjkAAJkAAJGEmAAmbkstFpEiABEiABChjvARIgARIgASMJUMCMXDY6TQIkQAIkQAHjPUACJEACJGAkAQqYkctGp0mABEiABChgvAdIgARIgASMJEABM3LZ6DQJkAAJkAAFjPcACZAACZCAkQQoYEYuG50mARIgARKggPEeIAESIAESMJIABczIZaPTJEACJEACFDDeAyRAAiRAAkYSoIAZuWx0mgRIgARIgALGe4AESIAESMBIAhQwI5eNTpMACZAACVDAeA+QAAmQAAkYSYACZuSy0WkSIAESIAEKGO8BEiABEiABIwlQwIxcNjpNAiRAAiRAAeM9QAIkQAIkYCQBCpiRy0anSYAESIAEKGC8B0iABEiABIwkQAEzctnoNAmQAAmQAAWM9wAJkAAJkICRBChgRi4bnSYBEiABEqCA8R4gARIgARIwkgAFzMhlo9MkQAIkQAIUMN4DJEACJEACRhKggBm5bHSaBEiABEiAAsZ7gARIgARIwEgCFDAjl41OkwAJkAAJUMB4D5AACZAACRhJgAJm5LLRaRIgARIgAQoY7wESIAESIAEjCVDAjFw2Ok0CJEACJEAB4z1AAiRAAiRgJAEKmJHLRqdJgARIgAQoYLwHSIAESIAEjCRAATNy2eg0CZAACZAABYz3AAmQAAmQgJEEKGBGLhudJgESIAESoIDxHiABEiABEjCSAAXMyGWj0yRAAiRAAhQw3gMkQAIkQAJGEqCAGblsdJoESIAESIACxnuABEiABEjASAIUMCOXjU6TAAmQAAlQwHgPkAAJkAAJGEmAAmbkstFpEiABEiABChjvARIgARIgASMJUMCMXDY6TQIkQAIkQAHjPUACJEACJGAkAQqYkctGp0mABEiABChgvAdIgARIgASMJEABM3LZ6DQJkAAJkAAFjPcACZAACZCAkQQoYEYuG50mARIgARKggPEeIAESIAESMJIABczI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"

/***/ }),
/* 26 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy5.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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YyMRkeCdccYZka6hc7oINGvWzLz00kvWTg8fPjzSCoD1wHT0jgAC5l1IM3Po22+/NZdddllQNdy2KWVa78poECiPgBJ7jjzyyEi1E19++eWM9h4SiXQRQMDSFe8yvR03bpzp3LmzNY2rrrrKDB061Lo/HdNNYN68eaZx48bWELRx/vHHHze//e1vra+hY/oIIGDpi/l2HuvF+R/+8AdrEueee6555JFHrPvTEQIiEPX96v/8z/+Y7t27Aw8CZRJAwFL+cKggq7LF9MvCprVs2dLMnDnTpit9ILAdgbvuustcc8011mTmzp1rTjjhBOv+dEwXAQQsXfHezlsdF2+bhNGoUSOj/jVr1kw5NdzPhkCUA1EPP/xw869//cvst99+2dySaz0lgIB5Glgbt5T+fsghh9h0DfrMnj07OD6DBoFsCOggTD1HH3zwgdUwgwcPjjRrsxqUTl4QQMC8CGN0JzZv3mz+/ve/m5tvvtnq4l69epl//vOfVn3pBIEwAlFrJs6ZM8c0b948bFh+njICCFjKAl7krmZTep9l01SNXvt4qlatatOdPhCwIqAEjWHDhln1VZ3N+fPns3xtRSs9nRCw9MR6q6eqMq/NpZ988omV9+PHjzeqqECLj4CW0V577TWjDNDVq1ebVatWmTVr1hhV8td/60+V6KpcubLZfffdTbVq1YI/q1SpEhwOqo/eSdq+v4zP8v8/ktLcly5datatWxd81q5da9avXx/UxNR/yycVhZb4yF6dUKAvQfpzzz33DMRINRM1hk0bMGCAue6662y60iclBBCwlAS6uJs6CVf7uGzaBRdcYLRHjJYdgTfeeMOoWK0+OiDU9stD2F0LtaUhk7O/wnyx+bn2k2lTNA0CIoCApew5WLhwoTniiCOsvNY3Z717qFevnlV/Om1L4IUXXjBTpkwJPrYJC5kwHD16tLn44oszuTSjaxYtWhSktmt2le924403RjolId/2cb/8EkDA8su74He7/fbbzU033WRlh5I2lLxBsyegX+4SrKlTpxrNFvLR8l3SS3uzCplQwSwsH0+VG/dAwNyIUyxWLlmyxBx22GFWY7Vo0cI899xzVn3T3umrr74KDv6UcGnGmu923333BXUs89U+/vhjU7t27Xzdbrv7XHvttWbgwIEFuz83Tg4BBCw5sci5JXfffbe5+uqrre7Dni8rTEbvtv70pz9FKlRrN7Jdr7POOivSqdl2o4b3irIZOXy06D0efPBB06VLl+gXcoVXBBAwr8JZtjNRNi2z58v+oTj99NODmVemTZmGOoV411133frR/6tUqZLZcccdjUp9/fjjj8Gn6O8bN240P//8c3BdIWciuve0adMCO3fZZZfA5ooVK279u/7fTjvtZDZs2BDY/sMPPwTvzfR3zeKySWShpFmmT5xf1yFgfsWzTG/0or9r166h3taoUSOYVey7776hfelgzA477BAJg8SpSZMmwblr+iWsv6e16UuV9he++OKLwSeqoOmLw6mnnppWfPhNFmI6ngHtObKtX5jvhADXI3D88cebV155pVw3tBG8VatWwadp06Zmt912c93tnNivA1VVsX7QoEFW4/fu3dv079/fqi+d/CTADMzPuG7jlW3ZHmZf0R+Ghx9+2GivXMmmTcZFolXIjL3oHhX+iih7zMhILHy8CmkBAlZI+nm4tyo6KGPMZs8Os6/MAqKUeVXpVwWNhg0bBsKlJULbpndaixcvDj56Z6QxlC1aoUIF2yES3e/dd98NfNOzqE3I8q28smTK6jz66KOtEmPYF5bo0OfcOAQs54gLe4PJkyeb9u3bhxrB7CsUUewddK5av379gnJSJb9g6F2ZjhLp1q2bOf/882O/d64HVJKG0t21vCrhKtnkm/zSMmBpjVlYriPkx/gImB9xLNUL1aM788wzrfYmMfvK74Nwxx13mBtuuMHqporhE088YdU3CZ2eeuop06FDBytTlEk5ffr07WZkUWZhPLtWqL3shIB5GdZfnNI3/NatW4d6yOwrFFGsHaJmLhbdfMuWLbHakYvB2rRpY2bMmBF56G+++cZUr159m+uizMJUoJrM2cjYnb8AAXM+hGU7oOUnVfsOa3yDDSMU38+16XnSpEnBgFpGO+aYY8yKFSuCWXLYe8p//OMfpk+fPvEZE/NIqhRflEGoL0V6D6j9bTYp8pqJqdBx8RZlFsbG+5iD6chwCJgjgYpqpm25H2ZfUclm3n/ChAlbj6WRcOk4laJmez6bZjdKEklaUxJL8aNdSs4WbWadEr+//vWvGc3C+BKWtCciP/YgYPnhnPe7lPyFUpYB/MPPX2iK7xm75pprzODBg7e5eZ06dUKr1h933HHm5Zdfzp/Rlncq7pvKTI0aNWqbKy+//HJz//33h472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"

/***/ }),
/* 27 */
/*!***********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/girl4.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 28 */
/*!**********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/boy6.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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hUw3zp0713Tt2rUmHqGbcQggYHFo5XwtofQ5A6b6pQicc8453gnHaYruP/fcc9NU0fZejk7JDW0lKkbALHLjggULzKqrrmqRRZhSVQJHHnmk0Sgqi6LpxfXWWy/zaUUybmThnWrXgYBZ5t899tjDPPTQQ5ZZhTlVIpCleAW5bL/99ubxxx/PBBX5DjPBWPlKEDDLXMyxKpY5pGLmnHzyyea///u/c+vVoEGDjJ7hNIWgjTT06nUvAmaZvwnksMwhFTFHe71uuOEG8x//8R+59+iUU04xF154YaJ2+vTpYzR1SNBGIny1uwkBs8zlBHJY5pASzPnXf/1Xc/3113t7sEaNGpVqbUnCdeqpp3r7vIpcX1V748aNi0Vvm222Mffddx/iFYtavS9GwCz0PymlLHRKQSZJvP7nf/5nqXx/CraQGGgPVtSikdbgwYNL3VfYt29fc//990c12bvuhRdeMJtuummse7i4vgQQMAt9P3ToUKOsHJR6EVCmCYlVu5GSRmWK+pOYKWpV/92lSxdP8NZff/2lPjbQixvYseeee3piveaaa9pgPjZYTgABs9BBZOSw0Ck5muRPGVY1C4vESKctRC3KuqFgEAoEwgggYGGESvj97NmzTc+ePUtoub5NSkR+/vOfG+UF1DRWUUUh7doMrNFTVYsyaXzta1+L1b1p06aZ3r17x7qHi+tHAAGz0OeLFy82yy+/vIWWVdOkxnUnTc9pKq+InH///u//brbaaiuzySabGEXg9erVq5KQH374YbPbbrtF7puiEPv372922GEHo+AOBaNQINBIAAGz9JkgM31xjmmVjV0WKIGtPkWImdr79re/bXbffXdPzPSzCkVbQ7Q5/6abbkqcO1Ej1UMOOcR885vfrPRotQr+LrIPCFiRtGO0xX6wGLBSXBonH6B/vIiyt+vfcaICk5i48cYbe0eIHHTQQWbbbbdNUkVp9zzxxBPmzjvv9I5hefXVVzO146STTjK77rqrN1plv1imaJ2rDAGz1GXsB8vfMWlSKulwxUsvvdRcddVVqfZpRe2lovMkZAcffLBZbbXVot5W6HXz5883d9xxhydckyZNyr1tHQXzy1/+0uy4445eJCalfgQQMIt9zn6w/JzTbtqwXavz5s3zhOuyyy6LFVmXVU804tBUmoRs5513zqraVPU88sgjnnDddtttpTCRsCtq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itsEEDC3/Wdee+01bzSmP0imFx13JuYXQkBrX9q837lz50Lao5H8CCBg+bEtvOY33njDEzN9XnnlFXP33XcXbgMNQsBmApo6HD9+vOnatavNZmJbRAIIWERQLl62ePFiL0u6phqLOAzTRUbYXC8Cs2bN8tKsUapBAAGrhh/b9uLjjz82a6yxRg16Shch0JoAm5ar93QgYNXz6TI90nlVafcJ1QATXawwAcSrms5FwKrp16V6pcMXdZAiBQJZEPDPMnMhQ4eyzWvbSbdu3bLoOnVYRgABs8wheZiDgOVBtX2d6667rjn44IO9gxI1AlamCxUXNw37fdl55529kwyCo3kd8KnUVrbmRyRcvvhnv8gWEbAiaZfUlr48t9xyy5Jar1ez+oJX2q92JywrG4Z8okwYyoqhf9sqbIrWU8b5lVZaqaUj1Z9NN93U6Ew7GwsnLtvolWxsQsCy4Wh1LbNnzzY9e/a02sYqGKeRio6oSbre6AubpuYkbg888ID58MMPc0Xjnxn3wgsvtGznzDPPNOedd15bO2SzzpazsShsvl+/fjaahk0pCSBgKQG6cDtTiMV4Kcvcek888YR3uGmroqz0q6yySujIzV+vUj1aB/LXQvUzmDfxqquuMscff3zT5lSHhHT55ZdvC9LWw1H33HNP8+CDDxbzENBKoQQQsEJxl9MYApY/d33Ja89dqyKBeP/9942ukzDps9xyy7W8/oQTTjA6bLFZURaJdgeeakqy3RRmq0YPPfRQc9tttzX99XHHHWfWXntt73fnnHNO02uGDRvmZbiwsWhESyCHjZ5JZxMClo6fM3d36tTJGVtdNFRrX7/73e+amn7IIYeY22+/fZnfbbPNNmb77bfvELQNNtig45o111yz6fShpinfeeedXBBp+nOzzTaLVPeSJUuWuU4BEwcccECk+4u+iDD6ookX0x4CVgzn0lvZY489jP6IKfkQUGJYfYE3FgmXBCxKUcCEBE0jnaSjryjttLrms88+M3vvvbd3xEpYOeWUU8yoUaOWuszmERjrYGEedfP3CJibfott9Y033mj69+8f+z5uiEZA53HNmTNnmYs1paYv9qzKWWedZXr37m022mgjs+GGG6aqVmt2wY8COaKGwzcbcSpd2bhx41LZlNfNOrhSSXwp1SKAgFXLny17Qyh9/o5uFsQxduxY7+TkvIrW1JQm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"

/***/ }),
/* 29 */
/*!***********************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/girl2.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAAGwCAYAAADITjAqAAAgAElEQVR4Xu2dCdhNVfvGHxEJIWOGVAgpJGSmQQOZQmSIKJVK4jMUkZRSCqWUeUxIGZPyEUrm6TM0SISvwRCZksr/unff6/86znnPHtYe1t73c13nMrxr/D373ffZaz/rWenOnDlzRmgkQAIkQAIkoBmBdBQwzTzG4ZIACZAACRgEKGC8EEiABEiABLQkQAHT0m0cNAmQAAmQAAWM1wAJkAAJkICWBChgWrqNgyYBEiABEqCA8RogARIgARLQkgAFTEu3cdAkQAIkQAIUMF4DJEACJEACWhKggGnpNg6aBEiABEiAAsZrgARIgARIQEsCFDAt3cZBkwAJkAAJUMB4DZAACZAACWhJgAKmpds4aBIgARIgAQoYrwESIAESIAEtCVDAtHQbB00CJEACJEAB4zVAAiRAAiSgJQEKmJZu46BJgARIgAQoYLwGSIAESIAEtCRAAdPSbRw0CZAACZAABYzXAAmQAAmQgJYEKGBauo2DJgESIAESoIDxGiABEiABEtCSAAVMS7dx0CRAAiRAAhQwXgMkQAIkQAJaEqCAaek2DpoESIAESIACxmuABEiABEhASwIUMC3dxkGTAAmQAAlQwHgNkAAJkAAJaEmAAqal2zhoEiABEiABChivARIgARIgAS0JUMC0dBsHTQIkQAIkQAHjNUACJEACJKAlAQqYlm7joEmABEiABChgvAZIgARIgAS0JEAB09JtHDQJkAAJkAAFjNcACZAACZCAlgQoYFq6jYMmARIgARKggPEaIAESIAES0JIABUxLt3HQJEACJEACFDBeAyRAAiRAAloSoIBp6TYOmgRIgARIgALGa4AESIAESEBLAhQwLd3GQZMACZAACVDAeA2QAAmQAAloSYACpqXbOGgSIAESIAEKGK8BEiABEiABLQlQwLR0GwdNAiRAAiRAAeM1QAIkQAIkoCUBCpiWbuOgSYAESIAEKGC8BkiABEiABLQkQAHT0m0cNAmQAAmQAAWM1wAJkAAJkICWBChgWrqNgyYBEiABEqCA8RogARIgARLQkgAFTEu3cdAkQAIkQAIUMF4DJEACJEACWhKggGnpNg6aBEiABEiAAsZrgARIgARIQEsCFDAt3cZBkwAJkAAJUMB4DZAACZAACWhJgAKmpds4aBIg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BKJGgAIWNY9zviRAAiQQEgIUsJA4ktMgARIggagRoIBFzeOcLwmQAAmEhAAFLCSO5DRIgARIIGoEKGBR8zjnSwIkQAIhIUABC4kjOQ0SIAESiBoBCljUPM75kgAJkEBICFDAQuJIToMESIAEokaAAhY1j3O+JEACJBASAhSwkDiS0yABEiCBqBGggEXN45wvCZAACYSEAAUsJI7kNEiABEggagQoYFHzOOdLAiRAAiEhQAELiSM5DRIgARKIGgEKWNQ8zvmSAAmQQEgIUMBC4khOgwRIgASiRoACFjWPc74kQAIkEBICFLCQOJLTIAESIIGoEaCARc3jnC8JkAAJhIQABSwkjuQ0SIAESCBqBChgUfM450sCJEACISFAAQuJIzkNEiABEogaAQpY1DzO+ZIACZBASAhQwELiSE6DBEiABKJGgAIWNY9zviRAAiQQEgIUsJA4ktMgARIggagRoIBFzeOcLwmQAAmEhAAFLCSO5DRIgARIIGoEKGBR8zjnSwIkQAIhIUABC4kjOQ0SIAESiBoBCljUPM75kgAJkEBICFDAQuJIToMESIAEokaAAhY1j3O+JEACJBASAhSwkDiS0yABEiCBqBGggEXN45wvCZAACYSEAAUsJI7kNEiABEggagQoYFHzOOdLAiRAAiEhQAELiSM5DRIgARKIGgEKWNQ8zvmSAAmQQEgIUMBC4khOgwRIgASiRoACFjWPc74kQAIkEBICFLCQOJLTIAESIIGoEaCARc3jnC8JkAAJhIQABSwkjuQ0SIAESCBqBChgUfM450sCJEACISFAAQuJIzkNEiABEogaAQpY1DzO+ZIACZBASAhQwELiSE6DBEiABKJGgAIWNY9zviRAAiQQEgIUsJA4ktMgARIggagRoIBFzeOcLwmQAAmEhAAFLCSO5DRIgARIIGoEKGBR8zjnSwIkQAIhIUABC4kjOQ0SIAESiBoBCljUPM75kgAJkEBICFDAQuJIToMESIAEokaAAhY1j3O+JEACJBASAhSwkDiS0yABEiCBqBGggEXN45wvCZAACYSEAAUsJI7kNEiABEggagQoYFHzOOdLAiRAAiEhQAELiSM5DRIgARKIGgEKWNQ8zvmSAAmQQEgIUMBC4khOgwRIgASiRoACFjWPc74kQAIkEBICFLCQOJLTIAESIIGoEaCARc3jnC8JkAAJhITA/wEzjs93nkAxRQAAAABJRU5ErkJggg=="

/***/ }),
/* 30 */
/*!***************************************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/static/images/public/Head/hodgeHead.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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LGZdt912m2jTpk3SXbF9EqghQAHjy1BIApyR6XM7LqI888wzOevSh5QtKRKggCmCYrV8EsAe2dy5c8V9990nli9fns9BJjQqpIM699xzebYrIb5sVk6AAiZnxBoFIICoxRUrVoiRI0eKefPmFWDE0YbYuHFj50Byr169OOOKhpBPaSRAAdMIk03lg8CHH37oJJt9+OGHxQcffJCPQWkYxbBhw5wEyt/73vc0tMYmSCA+AQpYfIZsIacEMCt76qmnxCOPPCLmz5+f01GqDWvx4sXiJz/5iVpl1iKBlAhQwFICzW7sJfDVV1+JN954w0lThTusilQw67riiivEYYcdVqRhc6yWEKCAWeIommkGgbfeeku88MILAimS8l5mz54tzjnnHO515d3RFo+PAmax82h6dgTeffddsWjRImdPKG8F5+TOO+880apVq7wNjePJGQEKWM4cyuGkS2Dz5s1i1apVAntEY8aMSbdzzb3hKAH2uVq0aKG5ZTZHAskQoIAlw5WtFpAAohfdJUbkX7SlPProo+KUU04RTZs2tcVk2kkCDgEKGF8EEtBMYNeuXWLdunUCl2wiivGJJ57Q3EP85jp16iSuvvpqcdJJJ4kGDRrEb5AtkEAGBChgGUBnl8Uh8I9//MO5n2z16tXOQem77rors8GfddZZomvXruLoo48WzZs3F/vss09mtrBjEtBBgAKmgyLbIAFFAl988YXYuHGjeO+998TKlSvFHXfcofhktGo///nPBRLtNmvWzLne5Fvf+la0hvgUCRhIgAJmoFNoUnEI4LD0pk2bnIwfWHKsqqoSSDT80ksviS1btoQC0blzZ+e81kEHHSTatm0rjjrqKLH//vuHaoOVScAmAhQwm7xFWwtFYPv27QI/27ZtE19++WXNT+3atZ3lv3r16om9995b7LXXXs5PrVq1CsWHgyUBChjfARIgARIgASsJUMCsdBuNJgESIAESoIDxHSABEiABErCSAAXMSrfRaBIgARIgAQoY3wESIAESIAErCVDArHQbjSYBEiABEqCA8R0gARIgARKwkgAFzEq30WgSIAESIAEKGN8BEiABEiABKwlQwKx0G40mARIgARKggPEdIAESIAESsJIABcxKt9FoEiABEiABChjfARIgARIgASsJUMCsdBuNJgESIAESoIDxHSABEiABErCSAAXMSrfRaBIgARIgAQoY3wESIAESIAErCVDArHQbjSYBEiABEqCA8R0gARIgARKwkgAFzEq30WgSIAESIAEKGN8BEiABEiABKwlQwKx0G40mARIgARKggPEdIAESIAESsJIABcxKt9FoEiABEiABChjfARIgARIgASsJUMCsdBuNJgESIAESoIDxHSABEiABErCSAAXMSrfRaBIgARIgAQoY3wESIAESIAErCVDArHQbjSYBEiABEqCA8R0gARIgARKwkgAFzEq30WgSIAESIAEKGN8BEiABEiABKwlQwKx0G40mARIgARKggPEdIAESIAESsJIABcxKt9FoEiABEiABChjfARIgARIgASsJUMCsdBuNJgESIAESoIDxHSABEiABErCSAAXMSrfRaBIgARIgAQoY3wESIAESIAErCVDArHQbjSYBEiABEqCA8R0gARIgARKwkgAFzEq30WgSIAESIAEKGN8BEiABEiABKwlQwKx0G40mARIgARKggPEdIAESIAESsJIABcxKt9FoEiABEiABChjfARIgARIgASsJUMCsdBuNJgESIAESoIDxHSABEiABErCSAAXMSrfRaBIgARIgAQoY3wESIAESIAErCVDArHQbjSYBEiABEqCA8R0gARIgARKwkgAFzEq30WgSIAESIAEKGN8BEiABEiABKwlQwKx0G40mARIgARKggPEdIAESIAESsJLA/wEzFMLgah7cBAAAAABJRU5ErkJggg=="

/***/ }),
/* 31 */
/*!*************************************************!*\
  !*** D:/DW/HB/uni_workspace/talk/utils/fall.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  formatDate: function formatDate(date) {
    var old = new Date(date);
    var now = new Date();
    var h = old.getHours();
    var m = old.getMinutes();
    var Y = old.getFullYear();
    var M = old.getMonth() + 1;
    var D = old.getDate();

    var nh = now.getHours();
    var nm = now.getMinutes();
    var nY = now.getFullYear();
    var nM = now.getMonth() + 1;
    var nD = now.getDate();

    if (Y === nY && M === nM && D === nD) {
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return h + ':' + m;
    }
    if (Y === nY && M === nM && D + 1 === nD) {
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return '昨天' + h + ':' + m;
    } else
    {
      M = M < 10 ? '0' + M : M;
      D = D < 10 ? '0' + D : D;
      return Y + '-' + M + '-' + D;
    }
  },
  // 时间间隔
  time_interval: function time_interval(old, now) {
    old = new Date(old);
    now = new Date(now);
    // console.log("old:" + old + "now:" + now)
    var n_old = old.getTime();
    var n_now = now.getTime();
    if (n_old > n_now + 1000 * 60 * 2) {
      return now;
    } else {
      return '';
    }
  },
  // 聊天记录时间
  formatDate_chat: function formatDate_chat(date) {
    var old = new Date(date);
    var now = new Date();
    var h = old.getHours();
    var m = old.getMinutes();
    var Y = old.getFullYear();
    var M = old.getMonth() + 1;
    var D = old.getDate();

    var nh = now.getHours();
    var nm = now.getMinutes();
    var nY = now.getFullYear();
    var nM = now.getMonth() + 1;
    var nD = now.getDate();

    if (Y === nY && M === nM && D === nD) {
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return h + ':' + m;
    }
    if (Y === nY && M === nM && D + 1 === nD) {
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return '昨天' + h + ':' + m;
    }
    //今年内
    else if (Y === nY) {
        M = M < 10 ? '0' + M : M;
        D = D < 10 ? '0' + D : D;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return M + '月' + D + '日 ' + h + ':' + m;
      } else
      {
        M = M < 10 ? '0' + M : M;
        D = D < 10 ? '0' + D : D;
        return Y + '年' + M + '月' + D + '日';
      }
  } };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map