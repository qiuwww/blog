---
title: 执行环境和作用域链(scope chain)
date: 2017-6-6
tag:
  - JS
  - 执行环境
  - 作用域链
categories:
  - [JS, 执行环境]
  - [JS, 作用域链]
top: 3
---

## 执行环境

执行环境（execution context），执行环境定义了**变量或者函数**有权访问的其他数据，决定了他们各自的行为。每个执行环境都有一个与之关联的**变量对象**，所有定义的函数和变量都在这里。

全局变量是一个**最外围的执行环境**。在 web 中这个执行环境就是 window。

### 执行环境分类

- 全局执行环境(全局作用域)
- 函数局部执行环境(局部作用域)

**每个函数都有自己的执行环境**，当执行流进入一个函数的时候，函数的**执行环境**就会被推入到一个环境栈中。而在函数执行的时候，栈将环境弹出，把控制权交给之前的执行环境，es 的程序执行流正是这个机制控制的。

## 作用域链

代码在一个环境中执行的过程中，会创建变量对象的作用域链(scope chain)。

能够访问的执行环境就是函数或者变量的**作用域**。

**作用域链**的作用是：是**保证对执行环境有权访问的所有变量和函数的有序访问**。

## JS 作用域

**存储和访问变量**，是任何一种编程语言最基本的功能之一，变量存在哪里？程序需要时如何找到它？这些问题**需要一套良好的规则来规范，这套规则，就称为作用域**。

**作用域是创建的时候决定的，作用域链是在执行的时候关联起来的。**

JS 有如下的**作用域类型**：

- 全局作用域 window 或者 global；
- 函数作用域（**常用闭包来构造块作用域**）；（**当代码在一个环境中执行时**，会创建**变量对象的一个作用域链**（scope chain）。），**函数作用域在函数创建的时候创建**，全局作用域就是在创建全局对象的时候创建。
- let 声明的**块作用域**（ES6）。可以使用**自执行语句**来模拟块级作用域。

## 词法作用域和 this 的区别

this 的绑定和函数声明的位置没有任何关系，**只取决于函数的调用方式**。

词法作用域：属于**静态作用域**，当我们一开始在**编辑代码的时候就已经确定的**。
动态作用域：js 中的一般函数的作用域是可以修改的，与最初定义的位置没有关系，调用的时候确定，可以通过 apply，call，bind 来修改函数的作用于。

箭头函数没有 this，所以不能修改作用域，看起来像是词法作用域。

## ES6 中 let 块作用域是怎么实现的

有了块级作用域，我们就不需要 **IIFE（立即调用函数表达式）**啦！IIFE 是一个在定义时就会立即执行的 JavaScript 函数。以前没有块级作用域，我们都是使用 IIFE 来模拟块级作用域。

应该是通过自治性函数实现的。

```js
// ES6
if (true) {
  let a = 1;
  console.log(a);
}
console.log(a);

// 转为ES5
('use strict');

if (true) {
  var _a = 1;
  console.log(_a);
}
console.log(a); // error a is not defined
```

## 调用堆栈

## 变量提升

声明变量的主要方式有： `var let const function`。

- 所有的声明都会提升到作用域的最顶上去。
- let 不存在变量提升
- 同一个变量只会声明一次，其他的会被忽略掉或者覆盖掉。
- 函数声明的优先级高于变量申明的优先级，并且函数声明和函数定义的部分一起被提升（函数整体提升）。

```js
console.log('1:', a);
console.log('2:', a());
// 声明提升，赋值不提升
var a = function () {
  console.log('3:', 'a');
};
// 函数整体提升到最顶端，包括声明和赋值
function a() {
  console.log('4:', 'function');
}
console.log('5:', a);
console.log('6:', a());

// 执行结果
// 1: ƒ a() {
//   console.log('4:', 'function');
// }
// 4: function
// 2: undefined
// 5: ƒ () {
//   console.log('3:', 'a');
// }
// 3: a
// 6: undefined
```

## 代码作用域与调用分析

### 代码分析 1，var 与 const 声明的全局变量

var 声明全局作用域及函数作用域的变量；
const let 声明**块级作用域的变量**，永远不会默认绑定到 window 上；

```js
var a = 1;
if (a) {
  let b = 1;
}
var obj = {
  // 这里会报错，obj未定义
  a: 2,
  A: function () {
    console.log(this.a);
  },
};

console.log('a', a); // 1
// console.log('b', b); // 未定义报错
const A = obj.A;
console.log('A()', A()); // 1
console.log('obj.A()', obj.A()); // 2
```

```js
const a = 1; // 这个时候a不会绑定到window上，所以是undefined
if (a) {
  let b = 1;
}
var obj = {
  // 这里会报错，obj未定义
  a: 2,
  A: function () {
    console.log(this.a);
  },
};

console.log('a', a); // 1
// console.log('b', b); // 未定义报错
const A = obj.A; // 这里主要考察变量的作用域，谁调用this就指向谁
console.log('A()', A()); // undefined，这个时候a并没有绑定到window上
console.log('obj.A()', obj.A()); // 2
```

直观的测试：

```js
var a = 1;
window.a; // 1

const b = 2; // 直观的解释就是，const创建块级作用域，不会将声明的变量绑定到window上，也就是根本就不是一个全局变量
window.b; // undefined
```
