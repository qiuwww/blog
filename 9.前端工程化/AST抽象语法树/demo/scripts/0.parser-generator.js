/**
 * 将一段js代码解析为parse的ast，然后遍历这个ast后修改其中的节点信息，然后打印出来
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

// 这里的code也可以是读取的本地文件，如
const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

console.log('## ast:', ast);

traverse(ast, {
  // path是一个对象，它表示两个节点之间的关联，我们可以通过path.node来访问其节点属性、通过path.parentPath访问其父路径等等。
  enter(path) {
    // 匹配到name是n的改为x
    if (path.node.type === 'Identifier') {
      // 在找到目标节点后我们可以使用@babel/traverse提供的增删查改API来进行修改。
      if (path.node.name === 'n') {
        path.node.name = 'x';
      }
    }
  },
});

console.log('## code res:', generate(ast, {}).code);
