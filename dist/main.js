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

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nmodule.exports = \"guowuhou\";\n\n//# sourceURL=webpack:///./src/a.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected character '@' (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> @import './a.css';\\n| \\n| body{\");\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logo192_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logo192.png */ \"./src/logo192.png\");\n/* harmony import */ var _logo192_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_logo192_png__WEBPACK_IMPORTED_MODULE_0__);\nlet str = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\n__webpack_require__(/*! ./index.css */ \"./src/index.css\");\n__webpack_require__(/*! ./index.less */ \"./src/index.less\");\n\n//发送ajax请求\nlet xhr = new XMLHttpRequest();\n//http://localhost:8080 webpack-dev-serve的服务 \nxhr.open('GET','/api/user',true);\nxhr.onload = function(){\n    console.log(xhr.response)\n};\nxhr.send();\n\nlet url = \"\";\nif(DEV === 'dev'){\n    url = 'http://localhost:3000';\n}else{\n    url = 'http://www.baidu.com';\n};\nconsole.log(url);\nconsole.log(DEV);\n\n//webpack打包图片\n//file-loader默认会在内部生成一张图片到build目录下，并把生成的名字返回回来\n //把图片引入，返回的结果是一个新的图片地址\nconsole.log(_logo192_png__WEBPACK_IMPORTED_MODULE_0___default.a);\nlet image = new Image();\nimage.src = _logo192_png__WEBPACK_IMPORTED_MODULE_0___default.a;\ndocument.body.appendChild(image);\n\n// import $ from 'jquery';\n// console.log($);\n\n// import $ from 'expose-loader?$!jquery'; //这种写法是吧jq暴露到全局\nconsole.log($);//这个$在webpack.base.js中plugins配置了全局插件，可以拿到\n\n//1,expose-loader  //暴露到windows全局的loader，内联loader\n//2,providePlugin  //全局的如：console.log($)\n//3,在html中引入cdn  //不打包\n//loader有4种 。pre 前面执行 normal普通的 内联loader post后置loader\n\n\n\n// function fn1(){\n//     console.log(\"hello world\");\n// }\n// fn1();\nlet fn1 = ()=>{\n    console.log('gwhtestss')\n};\nfn1();\n\n// class A{\n//     a = 1;\n// };\n// let a = new A();\n// console.log(a.a);\nconsole.log(str);\n//在packjson文件中\"scripts\"这里配置了\"build\": \"webpack\" 就可以执行npm run build 打包命令,生成打包的文件\n//在packjson文件中\"scripts\"这里配置了\"dev\": \"webpack\" 就可以启动服务本地服务 执行npm run dev 打包命令，不会自动生成打包的文件\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.less":
/*!************************!*\
  !*** ./src/index.less ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:4)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> body{\\n|     div{\\n|         border: 1px solid #dadada;\");\n\n//# sourceURL=webpack:///./src/index.less?");

/***/ }),

/***/ "./src/logo192.png":
/*!*************************!*\
  !*** ./src/logo192.png ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected character '�' (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n(Source code omitted for this binary file)\");\n\n//# sourceURL=webpack:///./src/logo192.png?");

/***/ })

/******/ });