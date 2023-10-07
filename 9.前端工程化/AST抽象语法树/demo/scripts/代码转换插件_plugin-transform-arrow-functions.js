// node plugin-transform-arrow-functions.js
const babel = require('babel-core');
const types = require('babel-types');

// 箭头函数代码块
let sumCode = `
const sum = (a, b) => {
    return a + b;
}`;
let minusCode = `const minus = (a, b) => a - b;`;

// 转化 ES5 插件，自定义转化插件
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
