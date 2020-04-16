---
title: 函数式编程
date: 2018-3-6
tags:
  - 设计模式
  - 函数式编程
categories:
  - [设计模式, 函数式编程]
---

函数式编程（Functional programming）

[函数式编程](http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html)

与面向对象编程（Object-oriented programming）和过程式编程（Procedural programming）并列的编程范式。

## 什么是函数式编程

1. 与面向对象编程（Object-oriented programming）和过程式编程（Procedural programming）并列的**编程范式**。
2. 最主要的特征是，函数是[第一等公民](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch2.html)。
3. 强调将计算过程**分解成可复用的函数**，典型例子就是`map`方法和`reduce`方法组合而成  [MapReduce 算法](https://zh.wikipedia.org/wiki/MapReduce)。
4. 只有[纯的](https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0)、没有[副作用](https://zh.wikipedia.org/wiki/%E5%87%BD%E6%95%B0%E5%89%AF%E4%BD%9C%E7%94%A8)的函数，才是合格的函数。

## 合成与柯里化

函数式编程有两个**最基本的运算**：合成和柯里化。

### 合成（compose），多个函数合成一个，用于组合操作

如果一个值要经过**多个函数**，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"**函数的合成**"（compose）。

```js
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

var toUpperCase = function (x) {
  return x.toUpperCase();
};

var exclaim = function (x) {
  return x + '!';
};

var shout = compose(exclaim, toUpperCase);
console.log(shout('hello world')); // HELLO WORLD!
```

### 函数柯里化 Currying)，预置参数，转为有预定功能的函数

1. 通常也称**部分求值**，含义是给函数分步传递参数，**每次递参部分应用参数，并返回一个更具体的函数**，继续接受剩余参数
2. 期间会连续返回具体函数，直至返回最后结果。因此，函数柯里化是逐步传参，逐步缩小函数的适用范围，逐步求解的过程
3. 柯里化的作用：
   1. 延迟计算；
   2. 参数复用；
   3. 动态创建函数；

柯里化的缺点：

1. 函数柯里化会产生开销（函数嵌套，比普通函数占更多内存），但性能瓶颈首先来自其它原因（DOM 操作等）

```js
// 柯里化
function add(x) {
  return function (y) {
    return x + y;
  };
}
var inc = add(1);
var dev = add(-1);
inc(1); // 2
dev(1); // 0
```

#### 柯里化与偏函数

1. 柯里化是将一个多参数函数转换成多个单参数函数，也就是将一个 n 元函数转换成 n 个**一元函数**。

2. 偏函数是**固定一个函数的一个或者多个参数**，也就是将一个 n 元函数转换成一个 n - x 元函数。

也就是说偏函数包含柯里化函数，都属于高阶函数。
