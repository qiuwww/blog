---
title: ES6+标准
date: 2016-4-19
tags:
  - ES6+标准
  - JS
categories:
  - [JS, ES6+标准]
---

[TOC]

## 常用语法

1. 声明
   1. let
   2. const
   3. import
   4. export
2. 变量解构
   1. 数组解构
   2. 对象解构
   3. 字符串解构`const [a, b, c] = '123'; => const [...sp] = '123';`
   4. 函数参数解构
3. 字符串的扩展
   1. includes
   2. startWith
   3. repeat，`x.repeat(3) => 'xxx'`
   4. 字符串模版
4. 正则扩展
5. 数值扩展
   1. isNaN
6. 数组扩展
   1. from
   2. of
   3. find
   4. includes
   5. values/keys/entries
7. 函数扩展
   1. rest 参数
   2. 默认值
   3. 箭头函数
   4. ::函数绑定
8. 对象扩展
9. Symble
10. Proxy 和 Refect
11. ArrayBuffer
12. Set/Map
13. for...of
14. Generator
15. Promise
16. await...async
17. Class
18. 修饰器
19. ESM

## 2022.3.1-再看 ES6+

[https://es6.ruanyifeng.com/#docs/intro](https://es6.ruanyifeng.com/#docs/intro)

1. ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等；
2. 目前，各大浏览器对 ES6 的支持可以[查看](https://kangax.github.io/compat-table/es6/)；
3. [命令行转码](https://es6.ruanyifeng.com/#docs/intro#%E5%91%BD%E4%BB%A4%E8%A1%8C%E8%BD%AC%E7%A0%81)；
4. [浏览器环境直接使用高版本的 es6](https://es6.ruanyifeng.com/#docs/intro#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83)；
5. 暂时性死区：只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
   1. ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
6. 如果真的想将对象冻结，应该使用 Object.freeze 方法。
   1. 而不是用 const；
7. ES5 只有两种声明变量的方法：var 命令和 function 命令。ES6 除了添加 let 和 const 命令，后面章节还会提到，另外两种声明变量的方法：import 命令和 class 命令。所以，**ES6 一共有 6 种声明变量的方法**。
8. 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一，window/global。
   1. ES6 为了改变这一点，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；
   2. **另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性**。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
9. 默认值生效的条件是，对象的属性值严格等于 undefined。
   1. 也就是没赋值，或者赋值为 undefined；
10. ES6 为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被 for...of 循环遍历；
11. String.raw()：ES6 还为原生的 String 对象，提供了一个 raw()方法。**该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串**，往往用于模板字符串的处理方法。
12. 字符串实例方法：includes(), startsWith(), endsWith(), indexOf()；
    1. repeat()；
       1. 'na'.repeat(2.9)
13. ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。**padStart()用于头部补全，padEnd()用于尾部补全**。
    1. 'x'.padStart(4, 'ab') // 'abax'
    2. 'x'.padEnd(5, 'ab') // 'xabab'
14. 正则的扩展：
    1. ES6 对正则表达式添加了 u 修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF 的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
    2. 除了 u 修饰符，ES6 还为正则表达式添加了 y 修饰符，叫做“粘连”（sticky）修饰符。
    3. 与 y 修饰符相匹配，ES6 的正则实例对象多了 sticky 属性，表示是否设置了 y 修饰符。
    4. JavaScript 语言的正则表达式，只支持先行断言（lookahead）和先行否定断言（negative lookahead），不支持后行断言（lookbehind）和后行否定断言（negative lookbehind）。ES2018 引入后行断言，V8 引擎 4.9 版（Chrome 62）已经支持。
       1. “先行断言”指的是，x 只有在 y 前面才匹配，必须写成`/x(?=y)/`。
          1. `/\d+(?=%)/.exec('100% of US presidents have been male') // ["100"]`
       2. 后行断言：“后行断言”正好与“先行断言”相反，x 只有在 y 后面才匹配，必须写成`/(?<=y)x/`
          1. `/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill') // ["100"]`
15. 数值扩展：
    1. ES2021，允许 JavaScript 的数值使用下划线（\_）作为分隔符`let budget = 1_000_000_000_000; budget === 10 ** 12 // true`。
    2. Math.trunc(): Math.trunc 方法用于去除一个数的小数部分，返回整数部分。
    3. Math.sign(): Math.sign 方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
16. 函数扩展：
    1. 箭头函数：不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
    2. 尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
       1. 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
       2. “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。
    3. 函数调用自身，称为递归。**如果尾调用自身，就称为尾递归**。
       1. 即在函数参数变化的过程中顺便计算；
17. object：
    1. super 关键字：我们知道，this 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 super，指向当前对象的原型对象。
    2. Object.assign()方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
18. 指数运算符：`2 ** 3 // 8`
    1. 因此 ES2020 引入了“链判断运算符”（optional chaining operator）**?.**
    2. ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。
19. WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
20. Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。
    1. Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
    2. Promise.allSettled() ：有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。
21. Iterator（遍历器）的概念：
    1. JavaScript 原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6 又添加了 Map 和 Set。
    2. 原生具备 Iterator 接口的数据结构如下。
       1. Array
       2. Map
       3. Set
       4. String
       5. TypedArray
       6. 函数的 arguments 对象
       7. NodeList 对象
    3. yield*：yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
22. Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
    1. 语法上，首先可以把它理解成，Generator **函数是一个状态机**，封装了多个内部状态。
    2. 形式上，Generator 函数是一个普通函数，但是有两个特征。
       1. 一是，function 关键字与函数名之间有一个星号；
       2. 二是，**函数体内部使用 yield 表达式**，定义不同的内部状态（yield 在英语里的意思就是“产出”）。
    3. ES6 诞生以前，异步编程的方法，大概有下面四种，Generator 函数将 JavaScript 异步编程带入了一个全新的阶段。
       1. 回调函数
       2. 事件监听
       3. 发布/订阅
       4. Promise 对象
23. 一个有趣的问题是，为什么 Node 约定，**回调函数的第一个参数，必须是错误对象 err（如果没有错误，该参数就是 null）**？
    1. 原因是执行分成两段，第一段(读取文件)执行完以后，任务所在的上下文环境就已经结束了。在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段(执行回调)。
24. 协程：传统的编程语言，早有异步编程的解决方案（其实是**多任务的解决方案**）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。
    1. Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。
       1. Thunk 函数是自动执行 Generator 函数的一种方法。
       2. co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。
25. ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
    1. async 函数是什么？一句话，它就是 Generator 函数的语法糖。
    2. co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。
    3. **async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数**。
    4. [异步处理方法的比较](https://es6.ruanyifeng.com/#docs/async#%E4%B8%8E%E5%85%B6%E4%BB%96%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86%E6%96%B9%E6%B3%95%E7%9A%84%E6%AF%94%E8%BE%83)。
26. Class 的基本语法：
    1. constructor()方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor()方法，如果没有显式定义，一个空的 constructor()方法会被默认添加。
       1. constructor()方法**默认返回实例对象（即 this）**，完全可以指定返回另外一个对象。
       2. 属性表达式：类的属性名，可以采用表达式。
       3. 取值函数（getter）和存值函数（setter）：与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
       4. 静态方法：类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
       5. super 关键字：
          1. 第一种情况，**super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super 函数。**
             1. 不执行呢？
                1. 不执行就会提示错误；
                2. react 的继承是默认执行了一下 super 的；
       6. 类的 prototype 属性和**proto**属性：
          1. 大多数浏览器的 ES5 实现之中，每一个对象都有**proto**属性，指向对应的构造函数的 prototype 属性。Class 作为构造函数的语法糖，同时有 prototype 属性和**proto**属性，因此同时存在两条继承链。
             1. 子类的**proto**属性，表示构造函数的继承，总是指向父类。
             2. 子类 prototype 属性的**proto**属性，表示方法的继承，总是指向父类的 prototype 属性。
    2. 模块对比：<https://es6.ruanyifeng.com/#docs/module#%E6%A6%82%E8%BF%B0>
       1. ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。
       2. ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
    3. ES2020 提案 引入 import()函数，支持动态加载模块。
       1. 为动态加载。

### 代码示例

#### for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc

for (var j = 0; j < 3; j++) {
  var j = 'abc';
  console.log(j);
}
// abc

// 如下代码会进入死循环，后边的k++，是和里边一体的，外层k一直不会增加，一直执行打印
for (let k = 0; k < 3; ) {
  let k = 'abc';
  console.log(k);
  k++;
}

// babel编译结果
('use strict');
// 这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域（同一个作用域不可使用 let 重复声明同一个变量）
for (var i = 0; i < 3; i++) {
  var _i = 'abc';
  console.log(_i);
}

for (var j = 0; j < 3; j++) {
  // 这里的j被覆盖了
  var j = 'abc';
  console.log(j);
}
```

#### 对象冻结

```js
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
};
```

#### 如果变量名与属性名不一致，必须写成下面这样

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz; // "aaa"
```

#### 因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题

```js
// 正确的写法
let x;
({ x } = { x: 1 });
```

#### 字符串的解构

```js
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
const [a, b, c, d, e] = 'hello';
let { length: len } = 'hello';
```

#### 函数参数解构

```js
[
  [1, 2],
  [3, 4],
].map(([a, b]) => a + b);
```

#### 参数变量是默认声明的，所以不能用 let 或 const 再次声明

```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

#### 函数的 length 属性

```js
(function (a) {}.length(
  // 1
  function (a = 5) {},
).length); // 0
```

#### super.foo 引用了原型对象 proto 的 foo 属性

```js
const proto = {
  foo: 'hello',
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  },
};

Object.setPrototypeOf(obj, proto);
obj.find(); // "hello"
// 上面代码中，对象obj.find()方法之中，通过super.foo引用了原型对象proto的foo属性。
```

#### 解构赋值必须是最后一个参数，否则会报错

```js
let { ...x, y, z } = someObject; // 句法错误
let { x, ...y, ...z } = someObject; // 句法错误
```

#### 由于数组是特殊的对象，所以对象的扩展运算符也可以用于数组，对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中

```js
let foo = { ...['a', 'b', 'c'] };
foo;
// {0: "a", 1: "b", 2: "c"}
```

#### Object.assign，如果只有一个参数，Object.assign()会直接返回该参数

```js
const obj = { a: 1 };
Object.assign(obj) === obj; // true
Object.assign({}, obj) === obj; // false

Object.assign(obj, undefined) === obj; // true
Object.assign(obj, null) === obj; // true
```

### 浅拷贝

```js
const obj1 = { a: { b: 1 }, c: 2 };
const obj2 = Object.assign({}, obj1);

obj1.a.b = 2;
obj1.c = 3;
obj2; // {a: {b: 2} c: 3}
obj1; // {a: {b: 2} c: 3}
```

#### Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程

```js
var obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      return Reflect.set(target, propKey, value, receiver);
    },
  },
);
```

#### 子类的 super 必须被执行

```js
class A {}

class B extends A {
  constructor() {
    // 这里必须被运行一次，否则会提示错误：VM338:4 Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    // => VM338：4 未捕获的 ReferenceError：必须在访问“this”或从派生构造函数返回之前调用派生类中的超级构造函数
    super();
  }
}

const b = new B();
console.log('b', b);
```
