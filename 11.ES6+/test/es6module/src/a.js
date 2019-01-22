// a.js
import {
  changeValue,
  num,
  obj
} from './b.js';

console.log("a.js-1", { num, obj });

changeValue();

console.log("a.js-2", { num, obj });

// num = 10; // src/a.js: "num" is read-only 这里只读，不能修改，如果需要修改就赋值给一个新值
let numcopy = num;
numcopy = 10;

obj.a = 12; // 还是可以改变的，共同指向

console.log("a.js-3", { num, obj }); // a.js - 3 { num: 2, obj: { a: 12 } }，这里的num一直引用b中的值

// 这里直接node运行ES6，使用如下命令：node --experimental-modules a.mjs，js->mjs，但是似乎只是把ESM转为了Common模式

// 使用babel转译 babel a.js -o a.compiled.js && node lib

// 输出结果

// b.js - 1 { num: 1, obj: { a: 1 } }
// a.js - 1 { num: 1, obj: { a: 1 } }
// b.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 3 { num: 2, obj: { a: 12 } }
// b.js - 3 { num: 2, obj: { a: 12 } }