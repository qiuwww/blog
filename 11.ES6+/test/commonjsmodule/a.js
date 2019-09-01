// a.js
let b = require('./b.js') // 这里require的时候执行了b.js中的代码，之后require都是缓存

let { num, obj, changeValue } = b;

console.log("a.js-1", { num, obj }); // 1 1

changeValue();

console.log("a.js-2", { num, obj }); // 1 3， 也就是说明基础类型num是复制，obj的值是引用

num = 10;
obj.a = 12;

console.log("a.js-3", { num, obj }); // a.js - 3 { num: 1, obj: { a: 12 } } 拷贝的副本

// 输出结果，似乎输出结果都一样

// b.js - 1 { num: 1, obj: { a: 1 } }
// a.js - 1 { num: 1, obj: { a: 1 } }
// b.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 2 { num: 1, obj: { a: 3 } }
// a.js - 3 { num: 1, obj: { a: 12 } }
// b.js - 3 { num: 2, obj: { a: 12 } }