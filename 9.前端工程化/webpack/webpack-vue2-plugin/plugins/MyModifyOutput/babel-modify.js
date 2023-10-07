const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const types = require('@babel/types');

const generate = require('@babel/generator').default;

const fs = require('fs');

function modify(code) {
  // fs.writeFile(__dirname + '/res/code.js', code, (err) => {
  //   console.log('err', err);
  // });

  const ast = parser.parse(code);

  traverse(ast, {
    // 这里的enter，表示对每个节点都调用
    enter(path) {
      // 替换一个变量的名字
      // console.log('traverse path.node:', path.node);
      // if (types.isIdentifier(path.node, { name: 'n' })) {
      //   path.node.name = 'x';
      // }
      if (types.isStringLiteral(path.node)) {
        if ('哈哈哈哈哈😄' === path.node.value) {
          // console.log('######', path.node);
          // 这里如何替换一个字符串？？？
        }
        // 这里为什么不能替换？
        // path.node = types.stringLiteral('hello world');
      }

      if (types.isStringLiteral(path.node)) {
        if ('哈哈哈哈哈😄' === path.node.value) {
          // path.arguments
          // console.log('######', path.parentPath.parentPath);
          // fs.writeFile(__dirname + '/res/code-sub.json', JSON.stringify(path.parentPath), (err) => {
          //   console.log('err', err);
          // });
          // path.parentPath.arguments.push(types.stringLiteral('hello world'));
        }
      }

      if (types.isIdentifier({ name: 'add' })) {
        // console.log('isIdentifier', path);
      }
    },

    Program(path) {
      const { node } = path;
      console.log('Program path', path.node);
    },
  });

  // fs.writeFile(__dirname + '/res/code.json', JSON.stringify(ast), (err) => {
  //   console.log('err', err);
  // });

  fs.writeFileSync(__dirname + '/middle/0.js', generate(ast, {}).code);
  fs.writeFileSync(__dirname + '/middle/0.json', JSON.stringify(ast));

  return generate(ast, {}).code;
}

module.exports = modify;
