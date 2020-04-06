// npx babel-node babel-plugin-generate.js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const code = 'class Example {}';
const ast = parse(code);

console.log('ast', ast);

//
const output = generate(
  ast,
  {
    /* options */
  },
  code,
);

console.log('generate output', output);


// const a = 'var a = 1;';
// const b = 'var b = 2;';
// const astA = parse(a, { sourceFilename: 'a.js' });
// const astB = parse(b, { sourceFilename: 'b.js' });
// const ast = {
//   type: 'Program',
//   body: [].concat(astA.program.body, astB.program.body)
// };

// const { code, map } = generate(ast, { sourceMaps: true }, {
//   'a.js': a,
//   'b.js': b
// });

// // Sourcemap will point to both a.js and b.js where appropriate.
