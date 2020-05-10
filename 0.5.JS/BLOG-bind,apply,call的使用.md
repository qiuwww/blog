---
title: bind,apply,call的使用
date: 2017-2-2
tags:
  - 作用域
  - bind
  - apply
  - call
---

bind 与 call 的参数类型是一样的，都是散列值。
apply 是使用数组作为参数。

## apply，改变函数的作用域，使用数组传递参数

`fun.apply(thisArg, [argsArray])`

apply() **方法调用一个具有给定 this 值的函数**，以及作为一个**数组（或类似数组对象）**提供的参数。

```js
// func.apply(thisArg, [argsArray])
// thisArg: 在 fun 函数运行时指定的 this 值。
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.log(max);
// expected output: 7
var min = Math.min.apply(null, numbers);
console.log(min);
// expected output: 2
```

## call，与 apply 的调用参数略有差异

`fun.call(thisArg, [, arg1[, arg2[, ...]]])`

call() 方法使用一个指定的 this 值和**单独给出的一个或多个参数来调用一个函数**。

该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 **call() 方法接受的是一个参数列表**，而 **apply() 方法接受的是一个包含多个参数的数组**。

```js
// fun.call(thisArg, arg1, arg2, ...);
// thisArg: 在 fun 函数运行时指定的 this 值。
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
var arr = [5, 6, 2, 3, 7];
Math.max.call(null, ...arr);
```

## bind，返回一个函数，函数的上下文是给定的参数，参数是一个散列值，参数与 call 一致

`function.bind(thisArg[, arg1[, arg2[, ...]]])`

[bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)()方法**创建一个新的函数**，在调用时设置 this 关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

```js
// function.bind(thisArg[, arg1[, arg2[, ...]]])
var module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);
```

### bind 函数的实现原理，使用 apply 实现 bind

通过 apply 实现，完整实现。

```js
// 添加原型链方法
// 官方 Polyfill
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind)
  (function () {
    var slice = Array.prototype.slice;
    Function.prototype.bind = function () {
      // 这里拿到bind方法传入的参数，一般第一个参数是绑定到的上下文
      // this指向当前调用的函数
      var thatFunc = this,
        thatArg = arguments[0];
      // 这里是绑定的时候传递的参数
      var args = slice.call(arguments, 1);
      // 类型判断处理
      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError(
          'Function.prototype.bind - ' + 'what is trying to be bound is not callable',
        );
      }
      return function () {
        // 这里是调用生成的bind方法的参数arguments
        // 合并了参数列表
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();

// 调用1
var func = function () {
  console.log(this);
  console.log(arguments);
};
var context = { a: 1 };
var newFunc = func.bind(context, 123);
newFunc(345);

// 调用2
var add = function (a, b, c) {
  return a + b + c;
};
var newAdd = add.bind(null, 1, 2);
var result = newAdd(3);
```

简单实现：

```js
// 2. 自定义函数实现，简单实现
// 绑定函数到对象上
Function.prototype.bind2 = function () {
  console.log('arguments1', arguments);
  var self = this;
  var context = arguments[0];
  // 这里是绑定的时候传递的参数
  return function () {
    console.log(context, arguments);
    // 这里的arguments，指向当前函数的调用
    return self.apply(context, arguments);
  };
};
var add = function (args) {
  console.log('arguments, this:', arguments, this);
  return this.a;
};
var newAdd = add.bind2({ a: 1 });
newAdd(3);
```

## call、apply、bind 的区别

apply、call，这里只是改变了函数执行的上下文环境，参数的传递形式不同。

`fun.apply(thisArg, [argsArray])`
`fun.call(thisArg, [, arg1[, arg2[, ...]]])`
`function.bind(thisArg, [, arg1[, arg2[, ...]]])`

apply 和 call 的区别是 call 方法接受的是**若干个参数列表**，而 apply **接收的是一个包含多个参数的数组**。

bind() 方法**创建一个新的函数**，在 bind() 被调用时，这个**新函数的 this 被指定为 bind() 的第一个参数**，而其余参数将作为新函数的参数，供调用时使用。

```js
this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

function list() {
  return Array.prototype.slice.call(arguments);
}
// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);
```
