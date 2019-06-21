# note.md

## await

> await 是个**运算符，用于组成表达式**，await 表达式的运算结果取决于它**等**的东西。
> 如果它等到的不是一个 Promise 对象，那 await 表达式的**运算结果就是它等到的东西**。
> 如果它等到的是一个 Promise 对象，await 就忙起来了，**它会阻塞后面的代码**，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

generator 函数的自动执行。

## async...await 能干什么

### 作个简单的比较

上面已经说明了 async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

现在举例，用 setTimeout 模拟耗时的异步操作，先来看看不用 async/await 会怎么写

```js
function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => resolve("long_time_value"), 1000);
  });
}
takeLongTime().then(v => {
  console.log("got", v);
});
```

如果改用 async/await 呢，会是这样

```js
function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => resolve("long_time_value"), 1000);
  });
}
async function test() {
  const v = await takeLongTime();
  console.log(v);
}
test();
```

眼尖的同学已经发现 takeLongTime() 没有申明为 async。实际上，takeLongTime() 本身就是返回的 Promise 对象，加不加 async 结果都一样。

### async/await 的优势在于处理 then 链

单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。

## 特点

1. async 用来申明**里面包裹的内容可以进行同步的方式执行**，await 则是进行执行顺序控制，每次执行一个 await，程序都会暂停等待 await 返回值，然后再执行之后的 await。
2. await 后面调用的函数需要返回一个 promise，另外这个函数是一个普通的函数即可，而不是 generator。
3. await 只能用在 async 函数之中，用在普通函数中会报错。
4. await 命令后面的 Promise 对象，运行结果可能是 rejected，所以**最好把 await 命令放在 try...catch 代码块中。**

其实，async / await 的用法和 co 差不多，await 和 yield 都是表示暂停，外面包裹一层 async 或者 co 来表示里面的代码可以采用同步的方式进行处理。
不过 async / await 里面的 await 后面跟着的函数不需要额外处理，co 是需要将它写成一个 generator 的。

## 这样的话，在一个顺序执行的语句块内，同步的代码必须放到前面，不依赖异步返回的结果需要前置。

## promise 对象的操作

promise的pending状态可以转为fulfill（成功状态）和reject（拒绝状态），

这个时候如果继续返回拿到的res对象，就可以继续处理pending，也就是then是可以连续操作，同样catch的时候，拿到的是reject的返回，如果继续返回e，就可以继续catch操作，与then操作一致，不过then方法不能再处理。
