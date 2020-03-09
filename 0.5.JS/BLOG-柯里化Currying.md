---
title: 柯里化Currying
date:
---

柯里化，即 Currying，可以是函数变得更加灵活。我们可以一次性传入多个参数调用它；也可以只传入一部分参数来调用它，让它返回一个函数去处理剩下的参数。

## 基本形式

```js
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

console.log(add(1)(1)); // 输出2

var add1 = add(1);
console.log(add1(1)); // 输出2

var add10 = add(10);
console.log(add10(1)); // 输出11

// add(1)(2)(3)(4);
// blog/0.5.JS/重写valueOf和toString方法.md
```
