"use strict";

var _b = require("./b.js");

console.log("a.js-1", { num: _b.num, obj: _b.obj }); // a.js


(0, _b.changeValue)();

console.log("a.js-2", { num: _b.num, obj: _b.obj });

// num = 10; // src/a.js: "num" is read-only 这里只读，不能修改，如果需要修改就赋值给一个新值
var numcopy = _b.num;
numcopy = 10;

_b.obj.a = 12; // 还是可以改变的

console.log("a.js-3", { num: _b.num, obj: _b.obj });

// 这里直接node运行ES6，使用如下命令：node --experimental-modules a.mjs，js->mjs，但是似乎只是把ESM转为了Common模式

// 使用babel转译 babel a.js -o a.compiled.js

// 输出结果

// b.js - 1 { num: 1, obj: { a: 1 } }
// a.js - 1 { num: 1, obj: { a: 1 } }
// b.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 3 { num: 2, obj: { a: 12 } }
// b.js - 3 { num: 2, obj: { a: 12 } }