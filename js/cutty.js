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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = __webpack_require__(1);

var jQuery = __webpack_require__(2);

var picturefill = __webpack_require__(3);

var MODULE_NAME = 'Cutty';

var Cutty = function () {
  function Cutty(config) {
    this.config = _objectSpread({
      debug: false,
      mediaqueries: {
        small: 'only screen and (min-width: 0px)',
        medium: 'only screen and (min-width: 640px)',
        large: 'only screen and (min-width: 992px)',
        xlarge: 'only screen and (min-width: 1440px)',
        xxlarge: 'only screen and (min-width: 1920px)',
        landscape: 'only screen and (orientation: landscape)',
        portrait: 'only screen and (orientation: portrait)',
        retina: 'only screen and (-webkit-min-device-pixel-ratio: 2), ' + 'only screen and (min--moz-device-pixel-ratio: 2), ' + 'only screen and (-o-min-device-pixel-ratio: 2/1), ' + 'only screen and (min-device-pixel-ratio: 2), ' + 'only screen and (min-resolution: 192dpi), ' + 'only screen and (min-resolution: 2dppx)'
      }
    }, config);
    this.flags = {
      init: false,
      console: !!console
    };
    this.currentValues = [];
    this.events = [];
  }

  var _proto = Cutty.prototype;

  _proto.init = function init() {
    if (this.flags.init) {
      return this;
    }

    this.log(MODULE_NAME + '.init()');
    this.flags.init = true;
    var self = this;
    jQuery(window).on('resize.cutty', _.throttle(function () {
      return self.update();
    }, 60));
    self.update();
    return this;
  };

  _proto.destroy = function destroy() {
    if (!this.flags.init) {
      return;
    }

    this.log(MODULE_NAME + '.destroy()');
  };

  _proto.log = function log(msg) {
    if (this.config.debug && this.flags.console) {
      console.debug(msg);
    }
  };

  _proto.on = function on(name, callback) {
    this.events.push({
      name: name,
      callback: callback
    });
    return this;
  };

  _proto.update = function update() {
    this.log(MODULE_NAME + '.update()');
    var mediaqueries = this.config.mediaqueries;
    var nextValues = Object.keys(mediaqueries).filter(function (name) {
      return picturefill._.matchesMedia(mediaqueries[name]);
    });

    if (_.isEqual(this.currentValues, nextValues)) {
      return;
    }

    var previousValues = [].concat(this.currentValues);
    this.currentValues = nextValues;
    this.events.filter(function (e) {
      return e.name === 'update';
    }).forEach(function (e) {
      return e.callback(nextValues, previousValues);
    });
  };

  _proto.parseSrcset = function parseSrcset(srcset) {
    return srcset.split(',').map(function (candidate) {
      var parts = candidate.replace(/\s+/g, ' ').trim().split(' ');
      var url = parts[0];
      var names = parts.slice(1);
      return {
        url: url,
        names: names
      };
    });
  };

  _proto.pickBestCandidate = function pickBestCandidate(candidates, mqNames) {
    if (!candidates.length) {
      return {};
    }

    var matched = candidates.map(function (candidate) {
      return _objectSpread(_objectSpread({}, candidate), {}, {
        count: _.intersection(candidate.names, mqNames).length
      });
    }).filter(function (candidate) {
      return candidate.count;
    });

    if (!matched.length) {
      return candidates[0];
    }

    var sorted = _.sortBy(matched, ['count']);

    return sorted[sorted.length - 1];
  };

  return Cutty;
}();

(window.NB = window.NB || {})[MODULE_NAME] = Cutty;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = picturefill;

/***/ })
/******/ ]);