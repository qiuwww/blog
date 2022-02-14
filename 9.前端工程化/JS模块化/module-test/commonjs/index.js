// index.js
// node commonjs/index.js
let b = require('./exp.js'); // 这里require的时候执行了b.js中的代码，之后require都是缓存

let { num, obj, changeValue } = b;

console.log('require-1，打印引入的变量', { num, obj }); // 1 1

changeValue();

console.log('require-2，运行changeValue后的参数', { num, obj }); // 1 3， 也就是说明基础类型num是复制，obj的值是引用

// 这里可以改变引用类型，不可以改变原来包中的基本类型
num = 10;
obj.a = 12;

console.log('require-3，修改引用变量后的值', { num, obj }); // a.js - 3 { num: 1, obj: { a: 12 } } 拷贝的副本

// 输出结果，似乎输出结果都一样

// b.js - 1 { num: 1, obj: { a: 1 } }
// a.js - 1 { num: 1, obj: { a: 1 } }
// b.js - 2 { num: 2, obj: { a: 3 } }
// a.js - 2 { num: 1, obj: { a: 3 } }
// a.js - 3 { num: 1, obj: { a: 12 } }
// b.js - 3 { num: 2, obj: { a: 12 } }
