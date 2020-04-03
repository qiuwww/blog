---
title: 函数柯里化与偏函数
date: 2018-8-8
tags:
  - JS
  - 高阶函数
categories:
  - JS
---

## 函数柯里化 Currying)

- 柯里化：

  - 通常也称部分求值，含义是给函数分步传递参数，**每次递参部分应用参数，并返回一个更具体的函数**，继续接受剩余参数
  - 期间会连续返回具体函数，直至返回最后结果。因此，函数柯里化是逐步传参，逐步缩小函数的适用范围，逐步求解的过程
  - 柯里化的作用：延迟计算；参数复用；动态创建函数

- 柯里化的缺点：
  - 函数柯里化会产生开销（函数嵌套，比普通函数占更多内存），但性能瓶颈首先来自其它原因（DOM 操作等）

```js
// 柯里化
function add(x) {
  return function(y) {
    return x + y;
  };
}
var inc = add(1);
var dev = add(-1);
inc(1); // 2
dev(1); // 0
```

## 偏函数，逆柯里化

```js
// 偏函数，逆柯里化
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
```
