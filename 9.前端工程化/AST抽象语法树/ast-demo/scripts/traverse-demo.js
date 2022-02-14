const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    // 匹配到name是n的改为x
    if (path.isIdentifier({ name: 'n' })) {
      path.node.name = 'x';
    }
  },
});

const generate = require('@babel/generator').default;

console.log('## code', generate(ast, {}).code);
