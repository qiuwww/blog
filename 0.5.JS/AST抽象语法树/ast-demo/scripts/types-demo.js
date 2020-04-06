const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  },
});
