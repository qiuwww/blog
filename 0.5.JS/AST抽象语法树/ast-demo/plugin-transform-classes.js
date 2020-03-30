// node plugin-transform-classes.js
// 文件：plugin-transform-classes.js
const babel = require('babel-core');
const types = require('babel-types');

// 类
let code = `
class Person {
    constructor(name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}`;

// 将类转化 ES5 构造函数插件
let ClassPlugin = {
  visitor: {
    ClassDeclaration(path) {
      let node = path.node;
      let classList = node.body.body;

      // 将取到的类名转换成标识符 { type: 'Identifier', name: 'Person' }
      let className = types.identifier(node.id.name);
      let body = types.blockStatement([]);
      let func = types.functionDeclaration(className, [], body, false, false);
      path.replaceWith(func);

      // 用于存储多个原型方法
      let es5Func = [];

      // 获取 class 中的代码体
      classList.forEach((item, index) => {
        // 函数的代码体
        let body = classList[index].body;

        // 获取参数
        let params = item.params.length ? item.params.map(val => val.name) : [];

        // 转化参数为标识符
        params = types.identifier(params);

        // 判断是否是 constructor，如果构造函数那就生成新的函数替换
        if (item.kind === 'constructor') {
          // 生成一个构造函数树结构
          func = types.functionDeclaration(className, [params], body, false, false);
        } else {
          // 其他情况是原型方法
          let proto = types.memberExpression(className, types.identifier('prototype'));

          // 左侧层层定义标识符 Person.prototype.getName
          let left = types.memberExpression(proto, types.identifier(item.key.name));

          // 右侧定义匿名函数
          let right = types.functionExpression(null, [params], body, false, false);

          // 将左侧和右侧进行合并并存入数组
          es5Func.push(types.assignmentExpression('=', left, right));
        }
      });

      // 如果没有原型方法，直接替换
      if (es5Func.length === 0) {
        path.replaceWith(func);
      } else {
        es5Func.push(func);
        // 替换 n 个节点
        path.replaceWithMultiple(es5Func);
      }
    },
  },
};

// 生成转换后的代码块
const result = babel.transform(code, {
  plugins: [ClassPlugin],
});

console.log(result.code);

// Person.prototype.getName = function () {
//     return this.name;
// }
// function Person(name) {
//     this.name = name;
// }

// 上面这个插件的实现要比 plugin-transform-arrow-functions 复杂一些，归根结底还是将要互相转换的 ES6 和 ES5 语法树做对比，找到他们的不同，并使用 babel-types 提供的 API 对语法树对应的节点属性进行修改并替换语法树
