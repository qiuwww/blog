const parser = require('@babel/parser');
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

// 这里仍旧修改的是assets，但是对内部进行了二次ast转换，找到目标代码，进行了修改
module.exports = function (code) {
  const ast = parser.parse(code);

  // fs.writeFileSync(__dirname + '/input.json', JSON.stringify(ast));
  // fs.writeFileSync(__dirname + '/input.js', code);

  traverse(ast, {
    // path是一个对象，它表示两个节点之间的关联，我们可以通过path.node来访问其节点属性、通过path.parentPath访问其父路径等等。
    enter(path) {
      // 匹配到name是n的改为x
      if (
        path.node.type === 'StringLiteral' &&
        path.node.value.includes(
          '# sourceURL=webpack://webpack5-modify-assets/./src/modify-by-plugin.js?',
        )
      ) {
        // 在找到目标节点后我们可以使用@babel/traverse提供的增删查改API来进行修改。
        // if (path.node.name === 'n') {
        //   path.node.name = 'x';
        // }
        const subAst = parser.parse(path.node.value);

        // fs.writeFileSync(__dirname + '/input2.json', JSON.stringify(subAst));
        // fs.writeFileSync(__dirname + '/input2.js', path.node.value);

        traverse(subAst, {
          enter(path) {
            if (path.node.type === 'NumericLiteral' && path.node.value === 9527) {
              // 替换数值类型9527为9528
              path.node.value = 9528;
            }

            if (path.node.type === 'StringLiteral' && path.node.value === 'heiheihei') {
              path.node.value = 'heiheihei heiheihei';
            }
            // if (path.node.type === 'DebuggerStatement') {
            //   // 删掉debugger语句
            //   path.node = types.noop();
            // }
          },

          // 直接删除了debugger
          DebuggerStatement(path) {
            // 当遇到debugger语句时，将其从AST中删除
            path.remove();
          },
        });

        path.node.value = generate(subAst, {}).code;

        //         const newASTNode = types.callExpression(types.identifier('console.log'), [
        //   types.stringLiteral('add by plugin-modify-2!'),
        // ]); // 创建新的 AST 节点
        // path.node.value =
      }
    },
  });

  return generate(ast, {}).code;
};
