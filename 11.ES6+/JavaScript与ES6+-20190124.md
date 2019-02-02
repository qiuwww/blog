# JavaScript与ES6(ES2015)+

[TOC]

[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
[ES6+](http://es6.ruanyifeng.com/)

- JavaScript ( JS ) 是一种具有函数优先的轻量级解释型或即时编译型的编程语言。
- JavaScript 是一种基于原型编程、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如函数式编程）风格。
- ECMAScript 是 JavaScript 的标准，JavaScript 是 ECMAScript 标准的实现。
- ECMAScript 仅仅是一个描述，定义了脚本语言的所有属性、方法和对象。其他语言可以实现 ECMAScript 来作为功能的基准，JavaScript 就是这样。别的实现还有ActionScript、JScript等。

## JavaScript组成

- JavaScript 的核心 ECMAScript 描述了该语言的语法和基本对象；
- DOM 描述了处理网页内容的方法和接口；
- BOM 描述了与浏览器进行交互的方法和接口。

## ES6+

[历史版本与兼容性](https://zh.wikipedia.org/wiki/ECMAScript)

### 使用

- [编译工具](https://www.babeljs.cn/) ES6+ -> ES5-，[在线编译工具](https://www.babeljs.cn/repl)

``` js
const a = 123;
let add = (a, b) => a + b;

// promise
let promise = () => {
  return new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve(123);
  });
}

promise().then(function() {
  console.log('resolved.');
});
console.log('Hi!');

let func = async () => {
  let res = await promise();
  console.log(res);
}
console.log(func());

// class
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

- .babelrc文件

# 常用语法

#### const/let

- 函数作用域、全局作用域、块作用域({})；
- [不存在变量提升的问题](http://es6.ruanyifeng.com/#docs/let#%E4%B8%8D%E5%AD%98%E5%9C%A8%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87)；
- [ES6 声明变量的六种方法](http://es6.ruanyifeng.com/#docs/let#ES6-%E5%A3%B0%E6%98%8E%E5%8F%98%E9%87%8F%E7%9A%84%E5%85%AD%E7%A7%8D%E6%96%B9%E6%B3%95)

#### 变量的解构赋值

- 数组的解构赋值；
- 对象的解构赋值；
- 函数参数的解构赋值；
  多参数函数调用，最好使用JSON类型传递参数，便于增删
- [用途](http://es6.ruanyifeng.com/#docs/destructuring#%E7%94%A8%E9%80%94)

#### 字符串的扩展

- [includes()](http://es6.ruanyifeng.com/#docs/string#includes-startsWith-endsWith)
  替代`String.indexOf(str)`来判断字符串的关系
- [模板字符串](http://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

#### 正则的扩展

RegExp.prototype

[mdn正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

- 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
  - 正则表达式 RegExp 的 exec(->match) 和 test 方法。

``` js
const reg = /quick\s(brown).+?(jumps)/ig;
const str = 'The Quick Brown Fox Jumps Over The Lazy Dog';
reg.exec(str);
str.match(reg);
```

#### 数值的扩展

Number.prototype

这里的数值类型是包装类型。`123.toFixed(2) -> .Number(123).toFixed(2)`

- Number.isFinite()
- Number.isNaN()，同全局isNaN()方法
- Number.parseInt()
- Number.parseFloat()

#### 函数的扩展

- [默认参数](http://es6.ruanyifeng.com/#docs/function)
- 箭头函数
  - [使用注意点](http://es6.ruanyifeng.com/#docs/function#%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E7%82%B9)
  - [js中this指向的问题](https://zhuanlan.zhihu.com/p/42145138)，注意区分箭头函数与一般函数。
- rest(...)参数

#### 数组的扩展

Array.prototype

- 操作方法：push -> pop、unshift -> shift
- 遍历方法：forEach、some、every、filter、reduce
- from，数组生成方法，类似数组的对象（array-like object）和可遍历（iterable）的对象
- of，将一组值，转换为数组
- find、findIndex、includes
- fill
- 数组实例的 entries()，keys() 和 values()
- 数组实例的 flat()，flatMap()
- splice、concat、slice、indexOf
- let...of

#### 对象的扩展

Object.prototype

- 简洁表示法
- for...in循环出的是key，for...of循环出的是value
- Object.keys()，Object.values()，Object.entries()
- super 关键字，指向当前对象的原型对象。
- 扩展运算符（...）
- Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

#### Symbol

表示独一无二的值

- Symbol
- undefined
- null
- 布尔值（Boolean）
- 字符串（String）
- 数值（Number）
- 对象（Object）

#### Set 和 Map 数据结构

Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

数组去重

``` js
let arr = [1, 3, 2, 1];
[...new Set(arr)]
```

Map。本质上是键值对的集合（Hash 结构），任意变量都可以作为key。Set.prototype

[操作方法](http://es6.ruanyifeng.com/#docs/set-map#%E5%AE%9E%E4%BE%8B%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%93%8D%E4%BD%9C%E6%96%B9%E6%B3%95)

#### Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

代理方法执行。改变函数执行的上下文环境context。

类比于：

- bind
- apply、call

#### Reflect

#### Promise 对象

[Promise 对象](http://es6.ruanyifeng.com/#docs/promise)

Promise 是异步编程的一种解决方案。

- 对象的状态不受外界影响。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）

- then，两个参数，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
- catch，.then(null, rejection)，then的别名
- finally，最后状态如何，都会执行的操作
- all、race
- resolve、reject

``` js
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
preloadImage('https://www.babeljs.cn/images/logo.svg').then(res => {
  console.log(res);
}).catch(err => {
  
});
```

#### Iterator 和 for...of 循环

遍历器

#### Generator 函数的语法

Generator 函数是 ES6 提供的一种异步编程解决方案。

类比async。

- *...yield
- next

#### async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

- async...await
- await之后的操作，都属于这里的回调内。

[对比js中的异步操作](ES2017 标准引入了 async 函数，使得异步操作变得更加方便。)

- 回调函数
- Promise
- Generator
- async

#### Class 的基本语法

JavaScript 语言中，生成实例对象的传统方法是通过构造函数。

ES6 的class可以看作只是一个**语法糖**，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

- 静态方法，加上static关键字。
  - 该方法不会被实例继承，而是直接通**过类来调用**，这就称为“静态方法”。
  - 父类的静态方法，可以被子类继承。

``` js
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

- 静态属性，静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

#### Class 的继承

- extends
- [super](http://es6.ruanyifeng.com/#docs/class-extends#super-%E5%85%B3%E9%94%AE%E5%AD%97) 关键字，ES6 要求，子类的构造函数必须执行一次super函数。

#### Decorator，@

函数，修饰

- 类的修饰
- 类的方法的修饰

修饰器只能用于类和类的方法，不能用于函数，因为存在函数提升。

#### Module

加载过来包的缓存

- export，默认导出default
- import，默认引入
- as，别名

[注意区别于Commonjs的模块处理。](http://es6.ruanyifeng.com/#docs/module-loader#ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)

#### 编程风格

- ESLint 的使用，eslint-config-airbnb
