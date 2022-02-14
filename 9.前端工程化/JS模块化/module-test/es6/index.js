// a.js
// npx babel-node es6/index.js
import { changeValue, num, obj } from './exp.js';

console.log('import-1，打印引入的变量', { num, obj });

changeValue();

console.log('import.js-2，运行change之后的值', { num, obj });

// num = 10; // src/index.js: "num" is read-only 这里只读，不能修改，如果需要修改就赋值给一个新值
let numcopy = num; // num不可以修改
numcopy = 10;

obj.a = 12; // 还是可以改变的，共同指向

console.log('import.js-3，直接修改之后的值', { num, obj }); // a.js - 3 { num: 2, obj: { a: 12 } }，这里的num一直引用b中的值

// 这里直接node运行ES6，使用如下命令：node --experimental-modules a.mjs，js->mjs，但是似乎只是把ESM转为了Common模式

// 使用babel转译 babel a.js -o a.compiled.js && node lib

// 输出结果

// b.js - 1 { num: 1, obj: { a: 1 } }
// a.js - 1 { num: 1, obj: { a: 1 } }
// b.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 3 { num: 2, obj: { a: 12 } }
// b.js - 3 { num: 2, obj: { a: 12 } }
