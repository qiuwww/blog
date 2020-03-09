---
title: 闭包
date:
---

对于闭包(closure)，当外部函数返回之后，内部函数依然可以访问外部函数的变量。

## 基本形式

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

## 使用闭包定义私有变量

```js
function Product() {
  var name;

  this.setName = function(value) {
    name = value;
  };

  this.getName = function() {
    return name;
  };
}

var p = new Product();
p.setName('Fundebug');

console.log(p.name); // 输出undefined
console.log(p.getName()); // 输出Fundebug
```

通常，JavaScript 开发者使用下划线作为私有变量的前缀。但是实际上，这些变量依然可以被访问和修改，并非真正的私有变量。
