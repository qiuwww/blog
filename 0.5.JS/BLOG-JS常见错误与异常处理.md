---
title: JS常见错误与异常处理
date: 2018-6-6
tags:
  - JS
  - Error
  - 错误处理
categories:
  - [JS, 错误处理Error]
---

[TOC]

## 异常处理

[JS 常见错误](./imgs/JS常见错误.png)

1. 自定义异常抛出

```js
// 创建一个对象类型UserException
function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}

//重写toString方法，在抛出异常时能直接获取有用信息
UserException.prototype.toString = function () {
  return this.name + ': "' + this.message + '"';
};

// 创建一个对象实体并抛出它, 这里的关键是throw new
throw new UserException('Value too high');
```

2. 异常处理，使用 `try{}catch(e){}finally{}`语法

```js
function testTryCatch() {
  try {
    // 如果这里正确，后边不会执行catch的语句块，但是finally肯定会执行
    console.log(0); // 输出0
    throw 'try语句块出错信息'; // 抛出异常
  } catch (e) {
    // 如果try语句块出错，这里会执行，否则不会执行；这里一般用作错误处理
    console.log(1);
    console.log(e);
    return true; // 返回语句被暂停，直到finally执行完成
    console.log(2); // 不会执行的代码
  } finally {
    // 最终都会执行
    console.log(3);
    return false; // 覆盖try.catch的返回
    console.log(4); // 不会执行的代码
  }
  // "return false" is executed now
}
testTryCatch();
// 0
// 1
// try语句块出错信息
// 3
// false
```
