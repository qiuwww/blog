# async-await

[参考](https://www.cnblogs.com/lpggo/p/8127604.html)

1. async/await 是一种编写异步代码的新方法。之前异步代码的方案是回调和 promise。
2. async/await 是建立在 promise 的基础上。
3. async/await 像 promise 一样，也是非阻塞的。
4. async/await 让异步代码看起来、表现起来更像同步代码。这正是其威力所在。

## 返回结果是什么

```js
// 直接返回一个常量
async function testAsync() {
  return 'hello async';
}
let result = testAsync();
console.log(result);
// 这里返回的是一个promise的结果态
// VM64:5 Promise {<fulfilled>: "hello async"}

// 也是还可以继续执行的
result.then((res) => {
  console.log('await then');
});
// await then
// Promise {<fulfilled>: undefined}
```

```js
// 返回一个await的结果
async function testAsync() {
  return await 'hello async';
}
let result = testAsync();
console.log(result);
// 这里返回一个中间状态
// VM171:5 Promise {<pending>}

// 可以继续执行
result.then((res) => {
  console.log('await then');
});
// await then
// Promise {<fulfilled>: undefined}
```

### 结论

1. 上边的两种，一种是直接结果，一种是 await 的结果，返回的内容不同，但都是一个 promise。
2. 从结果中可以看到 **async 函数返回的是一个 promise 对象**，**如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象**。
3.

## await 做了什么处理

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上 await 是一个让出线程的标志。await 后面的函数会先执行一遍，然后就会跳出整个 async 函数来执行后面 js 栈（后面会详述）的代码。等本轮事件循环执行完了之后又会跳回到 async 函数中等待 await
后面表达式的返回值，如果返回值为非 promise 则继续执行 async 函数后面的代码，否则将返回的 promise 放入 promise 队列（Promise 的 Job Queue）。

## async/await 执行顺序

```js
async function testSometing() {
  console.log('2 执行testSometing');
  return 'testSometing';
}

async function testAsync() {
  console.log('6 执行testAsync');
  return Promise.resolve('hello async');
}

async function test() {
  console.log('1 test start...');
  // 关键点1，这里的函数是同步执行的，但是后续的结果还是在回调函数里边，需要等待整体的同步函数执行完成才可以执行的，这里很关键
  // await会让出线程就会区执行后面的，可以理解为await封装了当前的代码后边的内容等待执行
  // 这里衍生出了一个微任务，微任务一起同步执行
  const v1 = await testSometing();
  console.log('5 v1', v1);
  const v2 = await testAsync();
  console.log('8 v2', v2);
  console.log('9 v1, v2', v1, v2);
}

test();

var promise = new Promise((resolve) => {
  // 这里的打印是同步执行的
  console.log('3 promise start..');
  resolve('promise');
}); // 关键点2

promise.then((val) => console.log('7 promise', val));

console.log('4 test end...');

// 1 2 3 4 是同步执行的
// 4 5 6 7 8 9 是同一个堆栈的promise事件

// 1 test start...
// 2 执行testSometing
// 3 promise start..
// 4 test end...
// 5 v1 testSometing
// 6 执行testAsync
// 7 promise promise
// 8 v2 hello async
// 9 v1, v2 testSometing hello async
```

```js
async function testSometing() {
  console.log('2 执行testSometing');
  return 'testSometing';
}

async function testAsync() {
  console.log('6 执行testAsync');
  return Promise.resolve('hello async');
}

async function test() {
  console.log('1 test start...');
  // 关键点1，这里的函数是同步执行的，但是后续的结果还是在回调函数里边，需要等待整体的同步函数执行完成才可以执行的，这里很关键
  // await会让出线程就会区执行后面的，可以理解为await封装了当前的代码后边的内容等待执行
  // 这里衍生出了一个微任务，微任务一起同步执行
  try{
    const v1 = await testSometing();
    console.log('5 v1', v1);
    // 这里的error，不catch后续的就不会执行
    throw Error("err");
    const v2 = await testAsync();
    console.log('8 v2', v2);
    console.log('9 v1, v2', v1, v2);
   }catch(e) {
    console.log("catch", e);
  }
}

test();
// 如果不catch，这里的test end是不会执行的
console.log("test end");
```
