---
title: Promise异步编程
date: 2018-6-6
tags:
  - JS
  - Promise
  - 异步编程
categories:
  - [JS, 异步编程]
---

[TOC]

## Promise 是什么

1. 所谓的 promise 简单来说**就是一个容器（有执行优先级的队列，在宏任务之前）**，里面保存着**某些未来才结束的事件**（通常是一个异步操作）的结果。
2. Promise 可以认为是一个用来**传递异步消息**的对象。
3. **可以简单理解为发布订阅模式**（但是内部的机制肯定不是这么简单的）：
   1. `then/catch/finally -> on`，使用 then/catch 来订阅；
   2. `resolvedCallBacks/rejectedCallBacks` 存储事件；
   3. 调用 `resolve/reject` 来执行发布。
   4. **promise.then(onFulfilled, onRejected)，promise 简化了对 error 的处理，promise.then(onFulfilled).catch(onRejected)**；

### Promise 的特点

1. 状态改变**只受异步操作的结果影响**，不受外界影响；
2. **状态一旦改变就不能再变**，要么 Fullfilled，要么 Rejected，这里只能关注到当前一步，**then 方法会返回一个新的 promise 对象，将从新开始从 pending 到凝聚状态**；
   1. 也就是这里的每一个 then 返回的都是一个新的，如果后边出错就走 catch，不出错就走 then；
3. 缺点：
   1. **不能中断** promise，无法取消；
   2. **如果不设置回调，内部错误不能反应到外部**；

```js
// 每一步都会得到不同的promise对象，也就是一个then的执行过程中，会引起一个新的pending凝聚到指定的方向
// const promise1 = Promise.resolve('resolve');
const promise1 = Promise.reject('reject');
console.log('promise1: ', promise1);

const promise2 = promise1.then((res) => {
  console.log('then1 ', res);
  return 'promise1';
});
console.log('promise2: ', promise2);

// catch返回了一个新的promise对象，所以后续的then会接到参数，接续到后边
const promise3 = promise2.catch((e) => {
  // 这里出错了，向后执行过程中，错误处理了，后续会走到then2
  console.log('catch1 ', e);
  return e;
});
console.log('promise3: ', promise3);

const promise4 = promise3.then((res) => {
  console.log('then2 ', res);
  // 这里如果正常返回就会走到promise4，抛出错误就会走到promise5
  throw Error('then2');
  return 'promise3';
});
console.log('promise4: ', promise4);

const promise5 = promise4.catch((e) => {
  console.log('catch2 ', e);
  return 'promise4';
});

console.log('promise5: ', promise5);

// catch1  reject
// then2  reject
// catch2  Error: then2
```

### promise 内部实现

## Promise 对象的属性和方法

1. promise 对象实例 **有 3 个状态**，分别是 pending, fulfilled 和 rejected。
   1. 在 **pending** 状态，promise 可以转换（坍缩）到 fulfilled 或 rejected。
   2. 在 **fulfilled** 状态，**不能迁移到其它状态**，必须有个不可变的 value。
   3. 在 **rejected** 状态，**不能迁移到其它状态**，必须有个不可变的 reason。
2. **静态方法**：静态方法接受到的参数，**如果不是 Promise 实例，就转为 Promise 实例**；

   1. Promise.resolve()；**用来将对象转为 Promise 对象**，参考下边自定义的 resolve 方法；`Promise.resolve('foo') -> new Promise(resolve => resolve('foo'))`
   2. Promise.reject()；
   3. Promise.all()，用来将**多个 Promise 实例包装成一个新的 Promise 实例**。
      1. 都返回才返回；
      2. 一个出错就返回；
   4. Promise.race()，同样用来将**多个 Promise 实例包装成一个新的 Promise 实例**。
      1. **一个返回就返回**；
      2. **一个出错就出错**；

3. 处理函数注册方法 **then/catch** 方法：
   1. Promise.prototype.then(onFulfilled, onRejected)
   2. Promise.prototype.catch(onRejected)
   3. Promise.prototype.finally(onFinally)，不管如何都会执行。
   4. Promise.prototype.done(onFinally)，总是处于回调链的末端，保证抛出的任何错误，让外层捕获到。

### then/catch 方法

1. **每次 then 都会返回一个新的 promise 对象**，**不是原来的 promise 对象**；
2. 每次返回 this，状态变为一个新的 promise 的 pending，因此可以**采用链式调用**；
3. 所以 then 之后的**状态还要重新确认**，**重新回到 pending**，等待当前回调的执行结果（确认是 Fullfilled 还是 Rejected），**结果通过 return 传递**到后边的管道；
4. `catch -> then(null, rejection)`，发生错误时候的回调。
5. promise 对象的错误，具有“冒泡”的特性，会一直向后传递，知道被捕获为止。

## 代码实现 Promise 对象

手动模拟实现 Promise 对象的方法。

思路大致是这样的，用 2 个数组(doneList 和 failList)**分别存储成功时的回调函数队列和失败时的回调队列**。

1. `state`: 当前执行状态，有`pending`、`resolved`、`rejected`3 种取值；
2. `done`: 向`doneList`中**添加**一个成功回调函数；
3. `fail`: 向`failList`中**添加**一个失败回调函数；
4. `then`: 分别向`doneList`和`failList`中添加回调函数；
5. `always`: 添加一个无论成功还是失败都会调用的回调函数；
6. `resolve`: 将状态更改为`resolved`，**并触发绑定的所有成功的回调函数**；
7. `reject`: 将状态更改为`rejected`，并触发绑定的所有失败的回调函数；
8. `when`: 参数是多个异步或者延迟函数，返回值是一个 Promise 兑现，当所有函数都执行成功的时候执行该对象的`resolve`方法，反之执行该对象的`reject`方法

**如下的模拟是很有问题的**：

1. 这里只是模拟了函数的执行接口，对于 promise.then 定义的**微任务**，执行的顺序不对；
2. 对于 promise 的每一个 then 定义的回调处理也是不太对的，**原本 then 应该重新从 pending 转到凝聚态**；

```js
// 极简版Promise 满足的使用方式

// 生成实例对象的方式：new MyPromise()
// 通过类直接调用静态方法：MyPromise.resolve()，目前静态方法仅支持resolve & reject

class MyPromise {
  // 创建MyPromise实例需要传入的参数fn
  // fn = (resolve, reject) => {}
  constructor(fn) {
    // 定义Promise 三种状态
    this.states = {
      PENDING: 'PENDING',
      RESOLVED: 'RESOLVED',
      REJECTED: 'REJECTED',
    };
    // 执行过程中，定义传递到then的value
    this.value = null;
    // 定义当前Promise运行状态，初始化为pending
    this.state = this.states.PENDING;
    // 定义Promise失败状态的回调函数集合

    this.resolvedCallBacks = [];
    // 定义Promise成功状态的回调函数集合
    this.rejectedCallBacks = [];
    // 为静态方法定义其内部使用的指向实例的that
    MyPromise.that = this;
    // new 方法调用的时候，会走到constructor，这个时候会调用fn函数
    // 也就是向实例传递了resolve和reject方法
    try {
      // 执行 new MyPromise() 内传入的方法
      fn(MyPromise.resolve, MyPromise.reject);
    } catch (error) {
      // 出错就直接reject
      MyPromise.reject(this.value);
    }
  }
  // 静态resolve方法，MyPromise实例不可访问（但是前面通过contructor传入）；
  // 支持类MyPromise访问，例：MyPromise.resolve('success').then(e=>e)
  static resolve(value) {
    // 由于静态方法内部的this指向 类 而不是 实例，所以用下面的方法访问实例对象
    // that指向当前的类的实例，如constructor中的this
    const that = MyPromise.that;
    // 判断是否是MyPromise实例访问resolve
    const f = that instanceof MyPromise;
    // MyPromise实例对象访问resolve
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.RESOLVED;
      that.value = value;
      // resolve的时候执行所有resolvedCallBacks注册的事件，中间状态保存在value中，可以继续传递
      that.resolvedCallBacks.map((cb) => (that.value = cb(that.value)));
    }
    // MyPromise类访问resolve，这个时候还是要创建一个类
    if (!f) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: obj.states.RESOLVED,
        value,
      });
    }
  }
  // reject与resolve基本一致
  // 静态reject方法，MyPromise实例不可访问；
  //支持类MyPromise访问，例：MyPromise.reject('fail').then(e=>e)
  static reject(value) {
    const that = MyPromise.that;
    const f = that instanceof MyPromise;
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.REJECTED;
      that.value = value;
      // 这里如果出错，错误得到处理还是会向后执行rejectedCallBacks的回调的
      that.rejectedCallBacks.map((cb) => (that.value = cb(that.value)));
    }
    if (!f) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: obj.states.REJECTED,
        value,
      });
    }
  }
  // 事件注册方法，复合方法，同时注册resolve事件和reject事件
  // 定义在MyPromise原型上的then方法
  then(onFulfilled, onRejected) {
    const { PENDING, RESOLVED, REJECTED } = this.states;
    const f = typeof onFulfilled == 'function' ? onFulfilled : (c) => c;
    const r =
      typeof onRejected == 'function'
        ? onRejected
        : (c) => {
            throw c;
          };
    // 三种情形
    switch (this.state) {
      case PENDING:
        // ‘PENDING’状态下向回调函数集合添加callback
        this.resolvedCallBacks.push(f);
        this.rejectedCallBacks.push(r);
        break;
      case RESOLVED:
        // 将回调函数的返回值赋值给 实例的 value，满足链式调用then方法时传递value
        this.value = f(this.value);
        break;
      case REJECTED:
        // 同上
        this.value = r(this.value);
        break;
      default:
        break;
    }
    // 满足链式调用then，返回MyPromise实例对象
    return this;
  }
}

// 先then注册，后resolve直接触发
MyPromise.resolve('success')
  .then((e) => {
    console.log('MyPromise.resolve 1:', e);
    return e + 1;
  })
  .then((res) => {
    console.log('MyPromise.resolve 2:', res);
  });

// new 方法生成实例然后执行
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
})
  .then((res) => {
    console.log('new MyPromise 1: ', res);
    return 2;
  })
  .then((res2) => console.log('new MyPromise 2: ', res2));
```

## 如何设计 Promise.all()

1. Promise.all(**iterable**)方法返回一个 [Promise]，此实例在 iterable 参数内**所有的 promise 都“完成（resolved）”**或参数中不包含 promise 时回调完成（resolve）；

2. 如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

### Promise.all 实现原理

有失败，立马返回，否则全部执行完成后返回。

```js
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

const myPromiseAll = (arr) => {
  let result = [];
  // 返回一个新的promise对象
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      // 不是promise对象，就直接返回
      if (isPromise(arr[i])) {
        // 如果正确就把结果存到数组中，失败直接返回
        arr[i].then(
          (data) => {
            console.log('then:', data, result, arr);
            // 成功的情况
            result[i] = data;
            // 每次有任务返回的时候就判断是不是执行完成了
            if (result.length === arr.length) {
              // 所有的都返回了成功，就resolve
              resolve(result);
            }
          },
          (e) => {
            console.log('catch:', e);
            reject(e);
          },
        );
      } else {
        result[i] = arr[i];
      }
    }
  });
};

// let p1 = Promise.resolve(3);
// let p2 = 1337;
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });
// myPromiseAll([p1, p2, p3]).then(values => {
//   console.log(values); // [3, 1337, "foo"]
// });

let p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});
let p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});
let p5 = new Promise((resolve, reject) => {
  reject('reject');
});

// myPromiseAll([p1, p2, p3, p4, p5]).then(
myPromiseAll([p1, p2, p3, p4, p5]).then(
  (values) => {
    console.log('myPromiseAll resolve: ', values);
  },
  (reason) => {
    console.log('myPromiseAll reject: ', reason); // reject
  },
);
```

## Promise 不是简单的事件订阅与发布

```js
const EventEmitter = require('events');
console.log(1);

const myEmitter = new EventEmitter();
myEmitter.on('event', () => {
  console.log('触发事件');
});

var p1 = new Promise((res, rej) => {
  console.log('promise 1');
  res(1);
  console.log('promise 2');
});

console.log(2);
myEmitter.emit('event');

p1.then((res) => {
  console.log('promise 3');
});
myEmitter.emit('event');

console.log(3);
```

### 这里就要问了 promise 的微任务到底是什么

1. 微任务主要包括：
   1. **Promise.then**
   2. Object.observe
   3. MutaionObserver
   4. **process.nextTick**(Node.js 环境)
2. **promise 是 v8 自带，直接调用底层**。
3. setTimeout 是浏览器/node 环境或者 j2v8 等环境自己封装的 api，性能上不如 promise。
4. 机场也有 vip 通道，**任务分优先级**是很正常的。
5. microtask,**可以理解是在当前 task 执行结束后立即执行的任务**。也就是说，在当前 task 任务后，下一个 task 之前，在渲染之前。

## 为什么不依赖微任务模拟出的 Promise，也能符合 Promises/A+ 规范？

在具体的 host 里——比如浏览器中，**你必须将 Promise 映射到由 html 标准定义的调度机制上，那么就有微任务和宏任务的差别**，所以要么映射到微任务要么映射到宏任务。Node 的调度机制并不存在 html 那样的标准，但所设计的机制是类似的。从各个方面考虑，Promise 应该是具有更高优先级的，所以映射到微任务或类似的机制是更合适的。

1. **所以这里并没有规定 promise 一定是 microtask, 而 ECMAScript 的标准里只谈 Job**；
2. 规定了 Promise 是 microtask 的地方是 html 标准。
   1. 采用 微任务 实现的 浏览器端 Promise 只是 Promise 行为实现的一种方式，现阶段看，仅在浏览器上，或者说仅在 JS 引擎的某种具体实现中体现。

[参考文章地址](https://www.zhihu.com/question/422187172)

## 实现一个完美符合 Promise/A+规范的 Promise

[参考文章地址](https://github.com/forthealllight/blog/issues/4)

## Promise.then 返回一个 Promise 对象，这个与原来的 Promise 是否是一个？

```js
const promise1 = Promise.resolve(1);
const promise2 = promise1.then((result) => {
  console.log(result);
});

console.log('promise1、promise2:', promise1, promise2, promise1 === promise2);
const promise3 = promise2.then((result) => {
  throw Error('Error');
});

const promise4 = promise3
  .then(
    (result) => {
      console.log('result', result);
    },
    (e) => {
      console.log('e', e);
      return { e: e };
    },
  )
  .then((result2) => {
    console.log('result2', result2);
  })
  .catch((e2) => {
    console.log('e2', e2);
  });
```

这样可以看到**明显不是同一个**，虽然状态都是`[[PromiseState]]: "fulfilled"`， 但是`<fulfilled>:`的结果可能不同，这里的引用也绝对不是同一个。

## 用 promise，延迟函数 delay

```js
const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

delay(1000).then((_) => {
  console.log('executed');
});
```

## 通过添加监听 unhandledrejection 事件获取由于未处理 catch 的 promise

```js
// node
process.on('unhandledRejection', function (err, promise) {});

// browser
window.addEventListener('unhandledrejection', function (event) {});
```

## 测试代码

一个前提，每次then/catch之后，会返回一个新的promise，状态为pending，可以串行执行。除非抛出错误，才会走到后续的catch。

```js
var p1 = new Promise((resolve, reject) => {
  resolve('成功！');
  // or
  // reject(new Error("出错了！"));
});

p1.then(value => {
  console.log("then1", value); // 成功！
}, reason => {
  console.error("reason", reason); // 出错了！
})
.then(res => {
  console.log("then2", res);
  // 如下抛出错误就会走到catch，直接return就走到then，不return就传递undefined，然后继续走then
  // throw Error("1111");
  return 111111
})
.then(res => {
  console.log("then2.1", res);
})
.then(res => {
  console.log("then2.2", res);
})
.catch(e => {
  console.log("catch1", e.message);
  throw Error("2222");
})
.catch(e => {
  console.log("catch2", e.message);
  throw Error("3333");
})
.then(res => {
  console.log("then3", res);
}, res2 => {
  console.log("then4", res2);
});
```
