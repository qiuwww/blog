# note.md

## awite
> await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。

> 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
> 如果它等到的是一个 Promise 对象，await 就忙起来了，**它会阻塞后面的代码**，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。


## async...await能干什么

### 作个简单的比较

上面已经说明了 async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

现在举例，用 setTimeout 模拟耗时的异步操作，先来看看不用 async/await 会怎么写 
```
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
```
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

> 眼尖的同学已经发现 takeLongTime() 没有申明为 async。实际上，takeLongTime() 本身就是返回的 Promise 对象，加不加 async 结果都一样。

### async/await 的优势在于处理 then 链

> 单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。

## 特点
1. async用来申明里面包裹的内容可以进行同步的方式执行，await则是进行执行顺序控制，每次执行一个await，程序都会暂停等待await返回值，然后再执行之后的await。
2. await后面调用的函数需要返回一个promise，另外这个函数是一个普通的函数即可，而不是generator。
3. await只能用在async函数之中，用在普通函数中会报错。
4. await命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。

其实，async / await的用法和co差不多，await和yield都是表示暂停，外面包裹一层async 或者 co来表示里面的代码可以采用同步的方式进行处理。
不过async / await里面的await后面跟着的函数不需要额外处理，co是需要将它写成一个generator的。