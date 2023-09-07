const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const types = require('@babel/types');

const generate = require('@babel/generator').default;

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (types.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  },
});

console.log('## code', generate(ast, {}).code);

// 1. 创建一个节点
console.log('types generate code ', generate(types.stringLiteral('hello world')).code);

// 2.
