const parser = require('@babel/parser');
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

// 这里仍旧修改的是assets，但是对内部进行了二次ast转换，找到目标代码，进行了修改
module.exports = function (code) {
  // 拿到文件的code，转为ast结构
  const ast = parser.parse(code);
  fs.writeFileSync(__dirname + '/middle/input1.json', JSON.stringify(ast));
  fs.writeFileSync(__dirname + '/middle/input1.js', code);

  traverse(ast, {
    enter(path) {
      // 匹配到name是n的改为x
      // 这里匹配到目标source
      if (
        path.node.type === 'StringLiteral' &&
        path.node.value.includes(
          '# sourceURL=webpack://webpack5-modify-assets/./src/modify-by-plugin.js?',
        )
      ) {
        const subAst = parser.parse(path.node.value);
        fs.writeFileSync(__dirname + '/middle/input2.json', JSON.stringify(subAst));
        fs.writeFileSync(__dirname + '/middle/input2.js', path.node.value);

        traverse(subAst, {
          enter(path) {
            // 操作1，修改结果
            if (path.node.type === 'NumericLiteral' && path.node.value === 9527) {
              // 替换数值类型9527为9528
              path.node.value = 9528;
            }
            // 操作2，修改目标字符串
            if (path.node.type === 'StringLiteral' && path.node.value === 'heiheihei') {
              path.node.value = 'heiheihei heiheihei';
            }
          },

          // 修改3
          // 直接删除了debugger
          DebuggerStatement(path) {
            // 当遇到debugger语句时，将其从AST中删除
            path.remove();
          },
        });
        // 重新填入ast中的目标节点
        path.node.value = generate(subAst, {}).code;
      }
    },
  });
  // ast -> code
  return generate(ast, {}).code;
};
