---
title: Object.create与Object.assign
date: 2018-3-6
tags:
  - JS
  - Mixin
  - extend
  - Object.create
  - Object.assign
categories:
  - [JS, assign]
  - [JS, create]
---

## Object.create

[Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

`Object.create(proto[, propertiesObject])`

1. proto：新创建的对象的属性和方法通过原型链来引用 proto 上的属性和方法，不可 delete；
2. propertiesObject：新增的自身的属性和方法，可 delete；

## Object.assign，属性拷贝

[Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 是在 ES2015 引入的，且可用 polyfilled。要支持旧浏览器的话，可用使用 jQuery.extend() 或者 \_.assign()。

Object.assign() 方法用于将**所有可枚举属性的值从一个或多个源对象复制到目标对象**。它将返回目标对象。这里的拷贝对于引用类型还是保存的引用。也就是创建之后，新旧两个对象是没有更多关系了。

`Object.assign(target, ...sources)`

```js
const obj = { a: 1, say: () => {} };

const copy = Object.assign({}, obj);
console.log(copy);
delete copy.a;
delete copy.say;
console.log(copy); // {}
console.log(obj); // { a: 1, say: () => {} }

// 对比create
const copy2 = Object.create(obj);
console.log(copy2);
delete copy2.say;
console.log(copy2);
```

## 代码实现 extend || Mixin || assign

对象扩展，不是类扩展。

Mixin（混入）是一种通过**扩展收集功能的方式**，它本质上是将一个对象的**属性拷贝**到另一个对象上面去，不过你可以拷贝 任意多个对象的 任意个方法到一个新对象上去，这是 继承所不能实现的。它的出现主要就是为了解决代码复用问题。

很多开源库提供了 Mixin 的实现，如 Underscore 的 \_.extend 方法、 JQuery 的 extend 方法。

```js
function setMixin(target, mixin) {
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      target[arguments[i]] = mixin[arguments[i]];
    }
  } else {
    // 遍历原型链上的方法
    for (var methodName in mixin) {
      // hasOwnProperty指示对象自身属性中是否具有指定的属性
      if (!Object.hasOwnProperty(target.prototype, methodName)) {
        target[methodName] = mixin[methodName];
      }
    }
  }
}

var logMixin = {
  actionLog: function () {
    console.log('action...');
  },
  requestLog: function () {
    console.log('request...');
  },
};

var user = {
  title: 'user',
};
var good = {
  title: 'good',
};

setMixin(user, logMixin, 'actionLog');
setMixin(good, logMixin, 'requestLog');

console.log(user);
console.log(good);
```
