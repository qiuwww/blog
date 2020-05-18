---
title: 闭包(closure)
date: 2019-6-6
tag:
  - JS
  - 闭包(closure)
categories:
  - [JS, 闭包(closure)]
---

## 闭包定义

**有权访问别的函数作用域中变量的函数**，创建闭包的最常见的方式，就是在一个函数内部创建并返回另一个函数。

通过另一个函数访问这个函数的局部变量，利用闭包可以延长作用链域。

对于闭包(closure)，当外部函数返回之后，**内部函数依然可以访问外部函数的变量**，闭包会阻止垃圾回收外部函数的作用域的变量。

## 为什么是闭包

js 中没有块级作用域。

### 闭包的特征

1. 函数内再嵌套函数；
2. 内部函数**可以引用外层的参数和变量**
3. 参数和变量**不会被垃圾回收机制回收**

### 为什么要使用闭包

1. 使用闭包主要是**为了设计私有的方法和变量**。
2. 闭包的优点是可以**避免全局变量的污染**，**缺点是闭包会常驻内存，会增大内存使用量**，使用不当很容易造成内存泄露。
3. 在 js 中，函数即闭包，只有函数才会产生作用域的概念。
4. 函数执行过程就需要在**作用域链**中查找变量，**查找过程不能向下，所以就需要闭包来读取函数内部的变量**。闭包会让外层函数的变量一直存在于内存中。直到都不调用为止。
   1. 闭包演唱了函数的作用域链。

### 闭包作用域链通常包括三个部分

1. 函数本身作用域。
2. 闭包定义时的作用域。
3. 全局作用域。

## 闭包基本形式

```js
function f1() {
  var N = 0; // N是f1函数的局部变量
  function f2() {
    // f2是f1函数的内部函数，是闭包
    N += 1; // 内部函数f2中使用了外部函数f1中的变量N
    console.log(N);
  }
  return f2;
}

var result = f1();

result(); // 输出1
result(); // 输出2
result(); // 输出3
```

## 闭包的用途

1. 闭包的典型框架应该就是**jquery**了。
2. 闭包是 javascript 语言的一大特点，主要应用闭包场合主要是为了：**设计私有的方法和变量（模块设计，自执行闭包）。**
3. 这在做框架的时候体现更明显，**有些方法和属性只是运算逻辑过程中的使用的，不想让外部修改这些属性**，因此就可以设计一个闭包来只提供方法获取。
4. react的hooks，典型的闭包使用，每次重新渲染的时候，可以保持状态不被重置。

### 使用闭包定义私有变量

```js
function Product() {
  var name;
  this.setName = function (value) {
    name = value;
  };
  this.getName = function () {
    return name;
  };
}

var p = new Product();
p.setName('Fundebug');

console.log(p.name); // 输出undefined
console.log(p.getName()); // 输出Fundebug
```

通常，JavaScript 开发者使用**下划线作为私有变量的前缀**。但是实际上，这些变量依然可以被访问和修改，并非真正的私有变量。

## 闭包会产生的问题

- JavaScript 内存泄漏

### 如何解决闭包的问题

解决：能不用闭包就不用，及时释放。比如：

```js
f = null; // 让内部函数成为垃圾对象 -->回收闭包
```

## 常见问题

```js
// 都输出10
for (var i = 0; i < 10; ++i) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
// 方案1. 使用自执行函数，保存当前的i
for (var i = 0; i < 10; ++i) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 0);
  })(i);
}
// 方案2. 使用let，形成闭包，这样i变量只能在for循环内使用
for (let i = 0; i < 6; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}

// 方案3. 受用setTimeout的更多参数
// setTimeout(code, milliseconds, param1, param2, ...)
// setTimeout(function, milliseconds, param1, param2, ...)
for (var i = 0; i < 6; i++) {
  setTimeout(
    function (i) {
      console.log(i); //位置1
    },
    1000 * i,
    i,
  );
}
```
