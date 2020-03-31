---
title: bind,apply,call的使用
date: 2017-2-2
tags:
  - 作用域
  - bind
  - apply
  - call
---

## apply，改变函数的作用域，使用数组传递参数

`fun.apply(thisArg, [argsArray])`

apply() **方法调用一个具有给定 this 值的函数**，以及作为一个数组（或类似数组对象）提供的参数。

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

## call，与 apply 的调用方式略有差异，相当于执行了 bind

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

## bind，返回一个函数，函数的上下文是给定的参数，参数是一个数组

`function.bind(thisArg[, arg1[, arg2[, ...]]])`

bind()方法**创建一个新的函数**，在调用时设置 this 关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

```js
// function.bind(thisArg[, arg1[, arg2[, ...]]])
var module = {
  x: 42,
  getX: function() {
    return this.x;
  },
};

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

### bind 函数的实现原理

通过 apply 实现。

```js
Function.prototype.bind = function(context) {
  // 调用Array的方法来切割伪数组对象arguments
  // 由此获此bing()方法传进来的第二个及以后的参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    return this.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};
```

### 手写 Function.bind 函数

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError("'this' is not function");
    }
    // bind's default arguments, array without first element
    // first part arguments for the function
    var aBindArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this; // the function will be binding
    var fNOP = function() {};
    var fBound = function() {
      // target this will be binding
      var oThis = this instanceof fNOP ? this : oThis || this;
      // last part arguments for the function
      var aCallArgs = Array.prototype.slice.call(arguments);
      // complete arguments for the function
      var aFuncArgs = aBindArgs.concat(aCallArgs);
      return fToBind.apply(oThis, aFuncArgs);
    };
    // fBound extends fToBind
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// 调用
var add = function(a, b, c) {
  return a + b + c;
};
var newAdd = add.bind(null, 1, 2);
var result = newAdd(3);
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
  getX: function() {
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
