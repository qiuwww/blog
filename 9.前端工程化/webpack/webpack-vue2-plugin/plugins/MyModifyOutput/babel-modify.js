const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const types = require('@babel/types');

const generate = require('@babel/generator').default;

const fs = require('fs');

function modify(code) {
  fs.writeFile(__dirname + '/mid/code-in.js', code, (err) => {
    console.log('err', err);
  });

  const ast = parser.parse(code);

  // 这里解析得到的结果不是目标文件内容
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
          console.log('######', path.node);
        }
        // path.node = types.stringLiteral('hello world');
      }

      if (types.isIdentifier({ name: 'add' })) {
        // console.log('isIdentifier', path);
      }
    },

    Program(path) {
      const { node } = path;
    },
  });

  fs.writeFileSync(__dirname + '/mid/code-out.js', generate(ast, {}).code);
  fs.writeFileSync(__dirname + '/mid/code-out.json', JSON.stringify(ast));

  return generate(ast, {}).code;
}

module.exports = modify;
