---
title: JS中this指向的问题
date: 2017-06-06
tags:
  - JS
  - this指向
categories:
  - [JS]
---

[TOC]

1. this 是一个一般函数的一个属性；
2. this 指向一个对象；
   1. 调用函数的对象；
   2. 匿名函数是 global；
3. 箭头函数没有this和arguments
   1. 箭头函数内调用this，会查找**外层函数所处的对象**；
   2. 如果没有找到，this就指向window；
   3. 使用::来修改this，函数绑定到对象上。
4. 可以通过apply、call、bind来修改函数的this指向；

## 普通函数中的 this

在普通函数调用的时候，确认 this 的指向，即 this 对象在运行时是基于**函数的执行环境绑定的**：

1. this 总是代表**它的直接调用者**, 例如 obj.func ,那么 func 中的 this 就是 obj;
2. 在**默认情况(非严格模式下**,未使用 'use strict')，**没找到直接调用者（匿名函数）**,则 this 指的是 window，非对象的函数调用，this 都会指向 window；
3. 在**严格模式**下,没有直接调用者的函数中的 this 是 undefined
4. 使用 call,apply,bind(ES5 新增)绑定的，this 指的是绑定的对象;
5. 在全局函数中，this 等于 window；

## 箭头函数中的 this，指向定义的时候所处的对象

定义的时候，已经确认了 this 的指向。

1. 默认指向在**定义**它时，**它所处的对象**,而不是执行时的对象，因为**没法更改执行上下文环境**。直观感受，就是查看**当前箭头函数的外层函数依附的对象**。
2. 通过 :: 语法是可以修改指向的。

### 举例

```js
var a = 2;

function outer() {
  var a = 3;
  (() => {
    console.log(a);
    console.log(this);
  })();
}
// 结果 打印
// a: 3;
// this: window
var a = 2;

function outer() {
  var a = 3;
  (function inner() {
    // 全局作用域调用，this仍然指向window
    (() => {
      console.log(a);
      console.log(this);
    })();
  })();
}

var obj = {
  say: function () {
    setTimeout(() => {
      console.log(this);
    });
  },
};
obj.say(); // obj,处在当前obj对象之下

var obj = {
  say: function () {
    setTimeout(function () {
      console.log(this);
    });
  },
};
obj.say(); // window对象，因为匿名函数执行在全局

// 2. 多层箭头函数嵌套

// 多层箭头函数嵌套，指向所处的对象，强调定义的位置
var obj = {
  say: function () {
    var f1 = () => {
      console.log(this); // obj
      setTimeout(() => {
        console.log(this); // obj
      });
    };
    f1();
  },
};
obj.say();

// 非连续多层嵌套函数
var obj = {
  say: function () {
    var f1 = function () {
      console.log(this); // window, f1调用时,没有宿主对象,默认是window
      setTimeout(() => {
        console.log(this); // window
      });
    };
    f1();
  },
};
obj.say();

// 多个this的形式
var obj = {
  name: 'outer',
  say: function () {
    var f1 = () => {
      // 定义的时候，所处的对象是obj，所以这个this就指向obj
      console.log('f1: ', this); // f1:  Object {name: "outer", objInner: Object}
      setTimeout(() => {
        // 定义的时候也是在obj下
        console.log('setTimeout-1: ', this); // setTimeout-1:  Object {name: "outer", objInner: Object}
      });
    };
    f1();
  },

  objInner: {
    name: 'inner',
    sayThis: function () {
      var f2 = () => {
        console.log('f2: ', this); // f2:  Object {name: "inner"}
        setTimeout(() => {
          console.log('setTimeout-2: ', this); // setTimeout-2:  Object {name: "inner"}
        });
      };
      f2();
    },
  },
};

obj.say();
obj.objInner.sayThis();
// 返回结果，也就是说，这里的this指向只在新对象出现的时候才会有区分
// f1: Object {
//  name: "outer",
//  objInner: Object
// }
// f2: Object {
//  name: "inner"
// }

// setTimeout - 1: Object {
//  name: "outer",
//  objInner: Object
// }
// setTimeout - 2: Object {
//  name: "inner"
// }
```

### 箭头函数中的 this 说明

1. 生来局部

箭头函数 => 所改变的**并非把 this 局部化**，而是**完全不把 this 绑定到里面去**；

虽然 => 箭头函数没有一个自己的 this，但当你在内部使用了 this，常规的局部作用域准则就起作用了，它会**指向最近一层作用域内的 this**。

变成一个局部变量，依次向上查找，跟其它局部变量的常规处理是一致的！

```js
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}

foo.call({
  id: 42,
})()()();
// id: 42
```

2. 不仅仅是 this

箭头函数里并不按常规支持 `var self = this` 或者 `.bind(this)` 这样的语法糖。

事实上 =>箭头函数并不绑定 this，arguments，super(ES6)，抑或 new.target(ES6)。

这是真的，对于上述的四个（未来可能有更多）地方，**箭头函数不会绑定那些局部变量**，

所有涉及它们的引用，**都会沿袭向上查找外层作用域链的方案来处理**。

### rest 语法

```js
/**
 * rest求和函数,参数不定
 */
function add(...args) {
  let sum = 0;
  if (Array.isArray(args)) {
    for (let val of args) {
      sum += val;
    }
  }
  return sum;
}
add(1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5, 3);
```
