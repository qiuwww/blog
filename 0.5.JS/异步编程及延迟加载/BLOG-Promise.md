---
title: Promise内部实现的原理
date: 2018-6-6
tags:
  - JS
  - promise
categories:
  - [JS]
  - [异步操作, promise]
---

所谓的 promise 简单来说就是一个容器，里面保存着某些未来才结束的事件（通常是一个异步操作）的结果。

## Promise

promise 有 3 个状态，分别是 pending, fulfilled 和 rejected。

- 在 pending 状态，promise 可以切换到 fulfilled 或 rejected。
- 在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value。
- 在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason。

静态方法：

- Promise.resolve()
- Promise.reject()

then 方法：

- Promise.prototype.then(onFulfilled, onRejected)
- Promise.prototype.catch(onRejected)
- Promise.prototype.finally(onFinally)

## 代码实现

手动模拟实现 Promise 对象的方法

思路大致是这样的，用 2 个数组(doneList 和 failList)**分别存储成功时的回调函数队列和失败时的回调队列**。

- `state`: 当前执行状态，有`pending`、`resolved`、`rejected`3 种取值
- `done`: 向`doneList`中添加一个成功回调函数
- `fail`: 向`failList`中添加一个失败回调函数
- `then`: 分别向`doneList`和`failList`中添加回调函数
- `always`: 添加一个无论成功还是失败都会调用的回调函数
- `resolve`: 将状态更改为`resolved`,并触发绑定的所有成功的回调函数
- `reject`: 将状态更改为`rejected`,并触发绑定的所有失败的回调函数
- `when`: 参数是多个异步或者延迟函数，返回值是一个 Promise 兑现，当所有函数都执行成功的时候执行该对象的`resolve`方法，反之执行该对象的`reject`方法

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

    try {
      // 执行 new MyPromise() 内传入的方法
      fn(MyPromise.resolve, MyPromise.reject);
    } catch (error) {
      MyPromise.reject(this.value);
    }
  }
  // 静态resolve方法，MyPromise实例不可访问；
  // 支持类MyPromise访问，例：MyPromise.resolve('success').then(e=>e)
  static resolve(value) {
    // 由于静态方法内部的this指向 类 而不是 实例，所以用下面的方法访问实例对象
    const that = MyPromise.that;
    // 判断是否是MyPromise实例访问resolve
    const f = that instanceof MyPromise;
    // MyPromise实例对象访问resolve
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.RESOLVED;
      that.value = value;
      that.resolvedCallBacks.map((cb) => (that.value = cb(that.value)));
    }
    // MyPromise类访问resolve
    if (!f) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: obj.states.RESOLVED,
        value,
      });
    }
  }
  // 静态reject方法，MyPromise实例不可访问；
  //支持类MyPromise访问，例：MyPromise.reject('fail').then(e=>e)
  static reject(value) {
    const that = MyPromise.that;
    const f = that instanceof MyPromise;
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.REJECTED;
      that.value = value;
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

MyPromise.resolve('success')
  .then((e) => {
    console.log(e);
    return e + 1;
  })
  .then((res) => {
    console.log(res);
  });

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
})
  .then((res1) => {
    console.log(res1);
    return 2;
  })
  .then((res2) => console.log(res2));
```

## 如何设计 Promise.all()

|Promise.all(iterable)方法返回一个 [Promise]，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；

如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。

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
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      // 不是promise对象，就直接返回
      if (isPromise(arr[i])) {
        // 如果正确就把结果存到数组中，失败直接返回
        arr[i].then((data) => {
          // 成功的情况
          result[i] = data;
          if (result.length === arr.length) {
            // 所有的都返回了成功，就resolve
            resolve(result);
          }
        }, reject);
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

myPromiseAll([p1, p2, p3, p4, p5]).then(
  (values) => {
    console.log(values);
  },
  (reason) => {
    console.log(reason); // reject
  },
);
```
