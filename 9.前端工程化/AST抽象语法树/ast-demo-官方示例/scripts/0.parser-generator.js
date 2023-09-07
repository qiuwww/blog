const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;

const code = 'class Example { render() { return <span>asd</span>}}';
const ast = parse(code, {
  sourceType: 'module',
  // 例如添加"jsx"这个plugins后就可以解析jsx代码，不添加上边的代码就会报错
  plugins: ['jsx'],
});

console.log('ast', ast);

const output = generate(ast, {}).code;

console.log('generator output', output);
