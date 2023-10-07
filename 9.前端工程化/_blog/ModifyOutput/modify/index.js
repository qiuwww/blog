const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const types = require('@babel/types');

const generate = require('@babel/generator').default;

const fs = require('fs');

function modify(code) {
  fs.writeFile('./plugins/ModifyOutput/res/code.js', code, (err) => {
    console.log('err', err);
  });

  const ast = parser.parse(code);

  traverse(ast, {
    // 这里的enter，表示对每个节点都调用
    enter(path) {
      // console.log('traverse path.node:', path.node);
      // if (types.isIdentifier(path.node, { name: 'n' })) {
      //   path.node.name = 'x';
      // }
      if (types.isStringLiteral(path.node)) {
        console.log('######', path.node.value);
        // 这里为什么不能替换？
        path.node = types.stringLiteral('hello world');
      }
    },
  });

  // console.log('ast', ast);

  fs.writeFile('./plugins/ModifyOutput/res/code.json', JSON.stringify(ast), (err) => {
    console.log('err', err);
  });

  return generate(ast, {}).code;
}

module.exports = modify;
