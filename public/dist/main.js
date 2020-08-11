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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: getAPIKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAPIKey\", function() { return getAPIKey; });\nconst getAPIKey = () => 'LcSuBiQ7HBQpxC9RnrA1prc2Bk69x7r4';\r\n\r\n\n\n//# sourceURL=webpack:///./src/api.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'pubsub.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./src/api.js\");\n\r\n\r\n\r\nconst img = document.querySelector('img');\r\n\r\nconst timeoutPromise = (delay) => {\r\n\treturn new Promise((resolve, reject) => {\r\n\t\tsetTimeout(() => {\r\n\t\t\treject(\"Timeout!\");\r\n\t\t}, delay);\r\n\t});\r\n};\r\n\r\nconst fetchURL = async (url) => {\r\n  let response;\r\n\r\n  try {\r\n    response = await fetch(url, {mode: 'cors'});\r\n  } catch(error) {\r\n    response = await error;\r\n  }\r\n\r\n  return response;\r\n};\r\n\r\nconst getGIF = async (word) => {\r\n  const api = _api_js__WEBPACK_IMPORTED_MODULE_1__[\"getAPIKey\"]();\r\n  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${api}&s=${word}`;\r\n  let result;\r\n\r\n  try {\r\n    result = await Promise.race([\r\n      fetchURL(url),\r\n      timeoutPromise(3000)\r\n    ]);\r\n\r\n    result = await result.json();\r\n  } catch(error) {\r\n    result = await error;\r\n  }\r\n\r\n  return result;\r\n};\r\n\r\nconst showImg = (notice, url) => {\r\n  img.src = url;\r\n};\r\n\r\ngetGIF('cat')\r\n.then(result => {\r\n  const gifURL = result.data.images.original.url;\r\n  !(function webpackMissingModule() { var e = new Error(\"Cannot find module 'pubsub.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).publish('GIF downloaded', gifURL);\r\n})\r\n.catch(error => console.error(error));\r\n\r\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'pubsub.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).subscribe('GIF downloaded', showImg);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });