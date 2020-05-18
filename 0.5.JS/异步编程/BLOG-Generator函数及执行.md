---
title: Generator函数及执行
date: 2017-7-7
tags:
  - 异步编程
  - JS
  - Generator
categories:
  - [JS]
  - [异步编程, Generator]
---

[TOC]

## Generator 函数是什么

1. ES6 提供的一种**异步编程解决方案**，**语法行为与传统函数完全不同**。
2. 语法上可以理解为一个**状态机**，封装了很多状态。
3. 执行 generator 函数会**返回一个遍历器对象（代表 Generator 函数的内部指针）**，可以依次遍历函数内部的每个状态。
4. **生成器对象**是由一个 generator function 返回的，并且它**符合可迭代协议和迭代器协议 Iterator**。
   1. for...of 循环可以自动遍历 Generater 函数，且不需要使用 next 方法；
5. generator 函数是**分段执行**的，
   1. yield 语句是**暂停执行**的标记，
      1. 遇到 yield 就暂停执行，也就是后边的都可以认为是当前函数的回调；
      2. yield 后的参数就是 generator 函数的状态；
      3. 没有执行到的部分的代码，不会执行；如`yield ajaxGet()`；
      4. 注意 yield 与 return**有相同和不同点**，具有类比性：
         1. yield 可以有多个，return 只能有一个；
         2. yield 可以**返回多个值**，return**只能返回一个值**；
         3. yield 可以暂停函数执行，return 不具备记忆功能；
   2. 而 next 方法可以**恢复执行**，调用一次执行一次，不会一次执行完。
      1. 每次执行结果是一个对象，包含两个属性`{value: '1', done: false}`。
   3. throw 方法，用来抛出错误；
   4. return 方法，可以返回给定的值，并且**终结函数的遍历**`g.return(1)`；

```js
function* idMaker() {
  let index = 0;
  while (index < 20) yield index++;
  return 100;
}

let gen = idMaker(); // "Generator { }"
// 通过调用遍历器的next方法使得指针移向下一个状态。
console.log(gen.next().value);
// 0
console.log(gen.next().value);
// 1
console.log(gen.next().value);
// 2
// ...

// 使用for...of遍历
let gen2 = idMaker();
console.log('idMaker():', gen2);
for (let value of gen2) {
  if (value > 10) {
    break;
  }
  console.log(value);
}
```

### Generator 函数执行方式

1. next 步进调用；
2. for...of 循环输出，可迭代对象；
3. Async/Await；
4. co；
5. thunk 函数；

## Generator 函数的应用

### 状态机

```js
var clock = function* (_) {
  while (true) {
    var res1 = yield _;
    console.log('Tick:', res1);
    var res2 = yield _;
    console.log('Tock:', res2);
  }
};

var gen = clock();
console.log('gen', gen);
//  这里会执行四次
gen.next(1);
gen.next(2);
gen.next(3);
gen.next(4);
gen.next(5);
```

### 协程

ES 是单线程的只能有一个调用栈；

引入协程后可以**使每个任务保持自己的调用栈**。

### 异步代码同步化表达

利用其函数可暂停的原理。

### 控制流管理

dva 的调用方式。

### 给对象部署 Iterator 接口，使其可遍历

### 作为数据结构

可以看作使数组结构，可以使用数组来模拟 Generator 的用法。

## async...await

1. **所谓异步**，就是将函数执行切分为两部分：
   1. 先执行第一段，转而执行其他任务；
   2. 等做完了其他任务，再回头来执行第二段。
2. **async 函数就是 generator 函数的语法糖**，执行器，es7。
3. async/await 函数的实现，就是**将 Generator 函数和自动执行器**，包装在一个函数里。
4. async 函数，就是将 generator 函数的\*换成 async，将 yield 替换成 await。
5. 更广的适用性，**await 后边参数**可以是
   1. **Promise 对象**；
   2. **原始类型的值**（这个时候相当于同步操作）；
   3. 会阻塞后边的代码执行；
6. 返回值是 promise，要比 Generator 的 Iterator 对象方便操作。
   1. async 函数完全可以看作是一个由多个异步操作包装成的 Promise 对象，**await 命令就是内部的 then 命令的语法糖**，所以 await 之后的都是微任务了（异步）。
7. async 函数的错误处理，这里的 await 也可能是 rejected，所以需要处理错误的时候，做好还是使用`try()catch{}`方法包裹。

```js
// 分析如下的代码过程
var p = Promise.resolve().then((res) => {
  console.log('promise');
});

async function fn() {
  console.log(2);
  var res1 = await console.log(3);
  // 这里的4，仍旧作为异步进行处理了，res1，返回了一个微任务，这里相当于是then回调的内容
  console.log(4);
  var res2 = await p;
  console.log(5);
}
console.log(1);
fn();
console.log(6);

// 1
// 2
// 3

// 6

// promise
// 4
// 5
```

### await 的实现原理

```js
async function fn(args) {
  // ...
}

// 等价于如下的代码

// spawn就是一个自执行函数
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```
