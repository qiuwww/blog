---
title: JS中变量提升与暂时性死区的概念
date: 2020-3-30
tags:
  - JS
  - 暂时性死区
  - 变量提升
  - 函数提升
categories:
  - [JS, 暂时性死区]
  - [JS, 变量提升]
  - [JS, 函数提升]
---

[TOC]

## JS 中变量提升与暂时性死区的概念

1. ES6 之前我们一般使用**var**来声明变量，提升简单来说就是把我们所写的类似于 `var a = 123;`这样的代码，**声明提升到它所在作用域的顶端去执**行，到我们代码所在的位置来赋值(声明提升，赋值不提升)。
2. 函数提升：**函数提升是整个代码块提升**到它所在的作用域的最开始执行(包括声明和赋值)。
3. 只要**块级作用域内存在 let/const 命令**，**它所声明的变量就“绑定”（binding）这个区域(最近的花括号{}内)**，不再受外部的影响(变量和声明都不会改变位置)。也就是不会变量提升嘛，这个就是暂时性死区。

## 变量提升 var & 函数提升 function

1. JavaScript 中，**函数 function 及变量 var 的声明都将被提升到函数的最顶部**。
2. JavaScript 中，变量可以**在使用后声明**，也就是**变量可以先使用再声明**。
3. JavaScript **初始化不会提升**，初始化赋值是不会提升的，哪里赋值哪里使用。
4. 同一个变量只会声明一次，**其他的会被忽略掉或者覆盖掉**。 5.**函数声明的优先级高于变量申明的优先级**，并且函数声明和函数定义的部分一起被提升（**函数整体提升**）。
5. 函数提升是整个代码块提升到它所在的作用域的**最开始执行**，**函数优先规则**。
   1. **函数声明在最前面，不管在哪里声明**，
   2. **var 要区分声明和赋值**，且函数声明不会被 var 覆盖，var 只能内外层覆盖；

查看用例 1：

```js
console.log(a); // f a
console.log(a()); // 'a'
console.log(b); // undefined
// console.log(b()); // TypeError

var a = 1;

function a() {
  console.log('a');
}

var b = function () {
  console.log(a);
  var a = 2;
};

console.log(a); // 1
// console.log(a()); // a 不是一个函数，a后边又被赋值了
console.log(b); // f
console.log(b()); // undefined
```

查看用例 2，对比 var 与 function:

```js
var a = 2;
console.log('1:', a); // 2
console.log('2:', a()); // VM295:5 Uncaught TypeError: a is not a function
function a() {
  console.log(1);
}
// 这个应该是这样，函数提升也不可能跑到调用前面，关键在于a被重新赋值了：
function a() {
  console.log(1);
}
var a = 2;
console.log('1:', a); // 2
console.log('2:', a()); // VM295:5 Uncaught TypeError: a is not a function
```

```js
console.log('1:', a); // f a
console.log('2:', a()); // 1
var a = 2;
function a() {
  console.log(1);
}
// 代码执行应该是如下：
var a;
function a() {
  console.log(1);
}
console.log('1:', a); // f a
console.log('2:', a()); // 1
a = 2;
```

```js
var a;
function a() {}
function b() {}
// 这里的赋值会覆盖
var b = 2;
console.log(a); // f a
console.log(b); // 2

// 应该是如下的，函数声明优先于一般声明：
function a() {}
function b() {}
// var 声明是不会覆盖的，function优先
var a;
var b;
// 这里的赋值会覆盖
b = 2;
// 这里
console.log(a); // f a
console.log(b); // 2
```

## 暂时性死区 let/const

1. ES6 明确规定，**如果区块中存在 let 和 const 命令**，这个区块对这些命令声明的变量，从一开始就形成了**封闭作用域**。**凡是在声明之前就使用这些变量，就会报错**。
2. 只要**块级作用域内存在 let 命令**，**它所声明的变量就“绑定”（binding）这个区域**，不再受外部的影响。
3. 总之，在代码块内，**使用 let 命令声明变量之前，该变量都是不可用的**。这在语法上，称为“**暂时性死区**”（temporal dead zone，简称 TDZ）。对应 var 声明就是**变量提升**。

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp; // 这里如果是var声明，就会被提升到代码块的顶端
}
```

## 代码分析

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

### 代码分析，全局作用域与函数作用域

```js
var name = 'World!';
(function () {
  var name;
  // 这个时候调用name，得到的是undefined
  console.log(name);
  if (typeof name === 'undefined') {
    name = 'Jack';
    console.log('Goodbye' + name); // 这里执行
  } else {
    console.log('hello' + name);
  }
  console.log(name);
})();
// Goodbye Jack
```
