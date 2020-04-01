---
title: js内存泄露
date: 2018-3-6
tags:
  - js
  - 内存
---

## 介绍 js 的垃圾回收机制

内存泄露是指一块被分配的内存**既不能使用，又不能回收**，直到浏览器进程结束。

## 内存泄露的几种情况

### IE 内存泄露 & 添加原生事件不移除为什么会内存泄露

当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，**在 IE 中不会作出恰当处理**，此时要先手工移除事件，不然会存在内存泄露。

#### 如何解决事件绑定的时候的内存泄漏

- 移除之前，先移除事件
- 采用事件委托

### IE 浏览器中相互引用的元素

对于纯粹的 ECMAScript 对象而言，只要没有其他对象引用对象 a、b，也就是说它们只是相互之间的引用，那么仍然会被垃圾收集系统识别并处理。

但是，在 Internet Explorer 中，**如果循环引用中的任何对象是 DOM 节点或者 ActiveX 对象，垃圾收集系统则不会发现它们之间的循环关系与系统中的其他对象是隔离的并释放它们**。最终它们将被保留在内存中，直到浏览器关闭。

#### 解决

不用的时候，主动置为空

### 闭包

闭包可以维持函数内局部变量，使其得不到释放。

常用的解决方法就是在 JavaScript 代码段运行完之时将形成循环引用的 JavaScript 对象手动设置为空，切断引用。

```js
function Cars() {
  this.name = 'Benz';
  this.color = ['white', 'black'];
}
Cars.prototype.sayColor = function() {
  var outer = this;
  return function() {
    return outer.color;
  };
};

var instance = new Cars();
console.log(instance.sayColor()());
// 优化
function Cars() {
  this.name = 'Benz';
  this.color = ['white', 'black'];
}
Cars.prototype.sayColor = function() {
  var outerColor = this.color; //保存一个副本到变量中
  return function() {
    return outerColor; //应用这个副本
  };
  outColor = null; //释放内存
};

var instance = new Cars();
console.log(instance.sayColor()());
```

### 被遗忘的计时器或回调函数

空循环

### 自动类型装箱转换

```js
var s=”lalala”;
alert(s.length);
// s本身是一个string而非object，它没有length属性，所以当访问length时，JS引擎会自动创建一个临时String对象封装s，而这个对象一定会泄露。

// 这个bug匪夷所思，所幸解决起来相当容易，记得所有值类型做.运算之前先显式转换一下：
var s="lalala";
alert(new String(s).length);
```
