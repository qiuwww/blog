// 源文件中的所有 import 和 export 都会转换为对应的辅助函数。

// 1. import 对应 __webpack_require__
// 2. export 对应 __webpack_exports__['default'] 直接赋值和 __webpack_require__.d。

// 整理一下整个流程：

// 1. 定义 __webpack_require__ 及其辅助函数
// 2. 使用 __webpack_require__ 引入入口模块
// 3. __webpack_require__ 函数载入模块，将模块放到模块缓存
// 4. 调用模块
//   1. 同样使用 __webpack_require__ 读取依赖（回到第 3 步）
//   2. 运行模块内部功能
//   3. 使用 __webpack_exports__['default'] 直接赋值和 __webpack_require__.d 输出
// 5. 运行结束

// release.bundle.js
// 1. 整个bundle.js为一个(function(modules){})(modules)的自执行
(function (modules) {
  // 2. module缓存，缓存id-module，其中module对象为{i, l, exports}
  var installedModules = {};
  // 模块加载策略，__webpack_require__用来缓存和导出逻辑，我们得知在整个 IIFE 运行过程中，加载已缓存的模块时，都会直接返回installedModules[moduleId].exports，
  // 换句话说，相同的模块只有在第一次引用的时候才会执行模块本身。
  function __webpack_require__(moduleId) {
    // 3. 如果该id已经缓存，则直接返回module.exports
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 4. 否则创建module对象{i, l, exports}
    var module = (installedModules[moduleId] = {
      i: moduleId, // module id
      l: false, // 是否loaded
      exports: {}, // exports
    });
    // 5. 执行module函数，modules为最外层自执行函数的实参
    // 执行模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 修改module标识为loaded，标识模块已经载入
    module.l = true;
    // 返回module的exports属性
    return module.exports;
  }

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key),
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = '';
  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/index.js': function (module, exports, __webpack_require__) {
    'use strict';
    console.log(1);
  },
});
//sourceMap文件地址，访问data:appli……可以看到该包对应的sourceMap信息。
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZX……
