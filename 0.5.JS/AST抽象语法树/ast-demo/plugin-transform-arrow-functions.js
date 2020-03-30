// node plugin-transform-arrow-functions.js
// 文件：plugin-transform-arrow-functions.js
const babel = require('babel-core');
const types = require('babel-types');

// 箭头函数代码块
let sumCode = `
const sum = (a, b) => {
    return a + b;
}`;
let minusCode = `const minus = (a, b) => a - b;`;

// 转化 ES5 插件
let ArrowPlugin = {
  // 访问者（访问者模式）
  visitor: {
    // path 是树的路径
    ArrowFunctionExpression(path) {
      // 获取树节点
      let node = path.node;

      // 获取参数和函数体
      let params = node.params;
      let body = node.body;

      // 判断函数体是否是代码块，不是代码块则添加 return 和 {}
      if (!types.isBlockStatement(body)) {
        let returnStatement = types.returnStatement(body);
        body = types.blockStatement([returnStatement]);
      }

      // 生成一个函数表达式树结构
      let func = types.functionExpression(null, params, body, false, false);

      // 用新的树结构替换掉旧的树结构
      path.replaceWith(func);
    },
  },
};

// 生成转换后的代码块
let sumResult = babel.transform(sumCode, {
  plugins: [ArrowPlugin],
});

let minusResult = babel.transform(minusCode, {
  plugins: [ArrowPlugin],
});

console.log(sumCode, ' ===> ', sumResult.code);
console.log(minusCode, ' ===> ', minusResult.code);

// let sum = function (a, b) {
//   return a + b;
// };
// let minus = function (a, b) {
//   return a - b;
// };

// 我们主要使用 babel-core 的 transform 方法将 AST 转化成代码块，第一个参数为转换前的代码块（字符串），第二个参数为配置项，其中 plugins 值为数组，存储修改 babal-core 转换的 AST 的插件（对象），使用 transform 方法将旧的 AST 处理成新的代码块后，返回值为一个对象，对象的 code 属性为转换后的代码块（字符串）。

// 内部修改通过 babel-types 模块提供的方法实现，API 可以到 https://github.com/babel/babe... 中查看。

// ArrowPlugin 就是传入 transform 方法的插件，必须含有 visitor 属性（固定），值同为对象，用于存储修改语法树的方法，方法名要严格按照 API，对应的方法会修改 AST 对应的节点。

// 在 types.functionExpression 方法中参数分别代表，函数名（匿名函数为 null）、函数参数（必填）、函数体（必填）、是否为 generator 函数（默认 false）、是否为 async 函数（默认 false），返回值为修改后的 AST，types.replaceWith 方法用于替换 AST，参数为新的 AST。
