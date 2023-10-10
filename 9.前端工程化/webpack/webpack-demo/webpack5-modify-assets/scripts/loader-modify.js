const { getOptions } = require('loader-utils');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

module.exports = function loader(source) {
  const options = getOptions(this);
  // 获取options参数
  // console.log('\n\n##################modify-loader：', source, options);
  if (this.resourcePath.endsWith('src/index.js')) {
    // 直接修改js字符串代码
    return `${source} \n console.log("loader-modify add")`;
  }

  // !这个时间是比较合适的，因为代码还没被处理过，这里的代码就是直接的字符串
  if (this.resourcePath.endsWith('src/ast.js')) {
    const ast = parser.parse(source);
    traverse(ast, {
      // path是一个对象，它表示两个节点之间的关联，我们可以通过path.node来访问其节点属性、通过path.parentPath访问其父路径等等。
      enter(path) {
        if (path.node.type === 'Identifier') {
          // 在找到目标节点后我们可以使用@babel/traverse提供的增删查改API来进行修改。
          // 将定义的变量str替换为myStr
          if (path.node.name === 'str') {
            path.node.name = 'myStr';
          }
        }
      },

      ArrowFunctionExpression(path) {
        // 通过参数a，b进行判断
        if (path.node.params.map((item) => item.name).join('') === 'ab') {
          // 参数添加c
          path.node.params.push(types.identifier('c'));
          // body里边添加一条语句，打印a,b,c
          path.node.body.body.unshift(
            types.callExpression(types.identifier('console.log'), [
              types.stringLiteral('add by loader-modify: '),
              types.identifier('a'),
              types.identifier('b'),
              types.identifier('c'),
            ]),
          );
        }
      },

      // if() {
      //   expression.params.push(types.identifier('c'));
      // }
    });

    return generate(ast, {}).code;
  }

  // 在目标文件后边追加内容

  return source;
};
