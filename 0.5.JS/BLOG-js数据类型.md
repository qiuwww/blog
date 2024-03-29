---
title: JS数据类型
date: 2017-3-23
tags:
  - JS
  - 数据类型
  - JS数据类型判断
  - 基本类型和引用类型
categories:
  - [JS, 数据类型]
  - [JS, JS数据类型判断]
---

[TOC]

## 数据类型

js 的`基本数据类型`：

- Undefined
- Null
- Boolean
- Number
- String
- [Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)(ES6) Symbol 的用途: 用来创建第一无二的 key，`Symbol(1) 与 Symbol(1)`是不相等的。

- Object，js 的`复杂数据类型（引用类型）`：Object，包括大部分的引用类型（除了 Global 和 Math）。

## 基本类型和引用类型之间的区别

1. 基本类型：栈内存中存储；
2. 引用类型：堆内存中存储，引用放在栈中；
3. 基本数据类型：参数赋值的时候，**传数值**；
4. 引用数据类型：参数赋值的时候，**传地址**（修改的同一片内存空间）。

## JS 的引用类型

**引用类型描述的是一类对象所具有的属性和方法**。

引用类型的**值**是一个**引用类型**的实例。

大多数的引用类型的值**都是 Object 类型的实例**。

## 基本包装类型（隐式转换）

三个`特殊的引用类型`，Number、String、Boolean。

与一般的引用类型相似，但同时具有与各自基本类型相应的特殊行为。

每当读取一个基本类型的时候，后台就会对应的创建一个基本包装类型的对象，**从而调用一些方法来操作这些数据**。

```js
2.toString(); // Uncaught SyntaxError: Invalid or unexpected token
Number(2).toString(); // "2"
```

## JS 引用类型的分类

1. **内置对象**，global，object、Array，...
2. **宿主对象**：console、document/process
   1. 由 JS 的运行环境提供的对象，目前来讲主要指由**浏览器提供的对象**。
   2. 比如 BOM DOM。比如`console`、`document`。
   3. node 提供的 process
3. **自定义对象**：由开发人员自己创建的对象

### 介绍 JS 有哪些内置对象

ECMA-262，`内置对象的定义`：“由 ECMAScript 实现提供的、不依赖于宿主环境的对象，这些对象在 ECMAScript 程序执行之前就已经存在了”。

- 数据**封装类对象**：Object、Array、Boolean、Number、String
- 其他对象：Function、Arguments、Date、RegExp、Error
- **ES6 新增对象**：Symbol、Map、Set、Promises、Proxy、Reflect

### 单体内置对象，Global 和 Math

#### Global（Window）

Global(window)在 ES 中在某种意义上作为一个终极的“兜底儿对象”，也就是说，不属于任何**其他对象**的属性和方法，最终都属于 Global。

常见的 Global 的方法和属性：

方法：

- isNaN()
- isFinite()
- parseInt()
- parseFloat()
- encodeURI()，**主要用于对整个 URI 编码**，不会对属于 URI 的非标字符编码，如冒号和斜杠；
- encodeURI**Component**()，组件部分编码，主要用于对 **URI 的部分进行编码**，对任何非标准字符进行编码；
- eval()，eval 就像是 ES 的一个完整的解析器，接受一个参数，即需要执行的 ES**字符串**。

属性：

包括一些常用的值，以及所有的原生引用类型（内置对象）的构造函数。

- undefined
- NaN
- Infinity
- Object、Array、Function、Boolean、String、Date、Error、RegExp、TypeError...

web 浏览器的 window 对象就是对 Global 的扩展。

#### Math

与直接编写的 js 计算相比，Math 提供的方法会快很多。

常用属性和方法

- Math.E
- Math.PI
- Math.LN10
- min()/max()，Math.max(3,4,5)
- floor()/ceil()/round()
- random()
- abs()
- log()
- pow()
- sqrt()

## typeof 的返回结果

typeof 操作符返回一个**字符串**，表示未经计算的操作数的类型。

字符串的值有：

- "string"
- "number"
- "boolean"
- "object"(null 和 object)
- "undefined"
- "function"
- "symbol"

## instanceof

用于检测**构造函数的 prototype 属性**是否出现在**某个实例对象的原型链**上。

`object instanceof constructor`

检测 constructor.prototype 是否存在于参数 object 的原型链上。

## null 与 undefined 与{}的区别

### undefined

一个**没有被赋值的变量的类型是 undefined**。如果方法或者是语句中操作的**变量没有被赋值，则会返回 undefined**

**undefined 是全局对象的一个属性**。它是一个 JavaScript 的 **原始数据类型** 。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined。

### null

typeof null 的返回结果是"object"。

没有原型属性。

值 null **特指**对象的值**未设置**。它是 JavaScript 基本类型 之一。

**值 null 是一个字面量**，它不像 undefined 是全局对象的一个属性。**null 是表示缺少的标识**，指示变量**未指向任何对象**。

把 null 作为尚**未创建的对象**，也许更好理解。在 APIs 中，null 常在返回类型是对象，但没关联值的地方使用。

**null 不可以添加属性值，取值和调用方法将报错**。

### {}

一个对象，但是没有任何属性。Object 的实例。

### 对比

#### 直观理解

在声明对象的时候，`var a = {}` 与 `var a = null` 有什么区别？

家徒四壁`{}`和无家可归`null`的区别。

- {}：我是**一个一无所有的对象**
- null：这里**本该有个对象**，但是没有
- undefined：这里不该有任何值

#### 方法调用

{} 是一个空对象， 可以调用 Object 对象的方法;

**null 不可以添加属性值，取值和调用方法将报错**；

```js
var a = {}; // 声明我是一个对象字面量，里面值是空的
var a = null; // 只是声明了一个变量 a，但是啥类型都没给说明，这个要用它需要后面再赋值，如果不填就是 undefined
var a; // undefined
var a = ''; // 声明一个字符串，但是很明显可以再变成一个别的类型，谁让 js 是弱类型，这样就会导致性能不好；
```

开发中用哪种，这个是随你自己，最好在定义的时候初始化赋一个值，至少给它一个类型，告诉它是数字还是 string 还是 object。

```js
var o = Object.create(null); // {}，但是原型并不指向object，显示没有任何属性和方法
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的**proto**。也就是新对象继承于给出的对象。
// 对比：Object.create({})
```

## JS 的类型判断方法

1. typeof：返回值
   1. number
   2. boolean
   3. string
   4. symbol
   5. object
   6. undefined
   7. function

```js
typeof null; // object 无效
typeof[] ; // object 无效
typeofnew Function(); // function 有效
typeofnew Date(); // object 无效
typeofnew RegExp(); // object 无效
```

2. instanceof：instanceof 是用来判断 A 是否为 B 的实例；
3. constructor：通过构造函数字段来判断，name 等；
4. toString 返回：默认返回当前对象的 [[Class]] 。这是一个内部属性，**其格式为 [object Xxx]** ，其中 Xxx 就是对象的类型。
   1. 对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。
   2. 而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```js
Object.prototype.toString.call(''); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(newFunction()); // [object Function]
Object.prototype.toString.call(newDate()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(newRegExp()); // [object RegExp]
Object.prototype.toString.call(newError()); // [object Error]
Object.prototype.toString.call(document); // [object HTMLDocument]
Object.prototype.toString.call(window); //[object global] window 是全局对象 global 的引用
```

这里的原因是，各种类型都会重写 toString 方法，所以会得到不同的结果，这里只能将 Object 的 toString 方法来调用，才会展示出来`[object xxx]`，这样也就是说可以在 Object 的原型上添加一个方法来读取这个值。

5. 自定义读取构造函数的 name，还是借用的 constructor 属性，与 3 一致；

```js
Object.prototype.logType = function () {
  console.log('$$$$$$', this.constructor.name);
};

// 测试代码
({}.logType());
[].logType();
/sss/.logType();
(() => {}).logType();
(123).logType();
```

6. 特殊方法：
   1. isNaN；
   2. Array.isArray；
   3. null === null // true

### 类型判断函数

```js
var $ = (function () {
  'use strict';
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }

  for (var i = types.length; i--; ) {
    $['is' + types[i]] = (function (self) {
      return function (elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }
  return $;
})(); //类型判断

$.isArray([]);
$.isArray({});
$.isObject({});
$.isUndefined(undefined);
```
