# 实现 Promises 的 A+规范

[参考文档](https://mp.weixin.qq.com/s/Yrwe2x6HukfqJZM6HkmRcw)

## Promise 状态定义

promise 有 3 个状态，分别是 pending, fulfilled 和 rejected。

- 在 pending 状态，promise 可以切换到 fulfilled 或 rejected。
- 在 fulfilled 状态，不能迁移到其它状态，必须有个不可变的 value。
- 在 rejected 状态，不能迁移到其它状态，必须有个不可变的 reason。

### 代码实现状态

```js
// 定义状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 定义构造函数
function Promise() {
  this.state = PENDING;
  this.result = null;
  // 记录callback的序列
  this.callbacks = [];
}

// 定义状态改变函数
const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result;
};
```

## Then 方法实现

onFulfilled 和 onRejected 如果是函数，必须最多执行一次。
onFulfilled 的参数是 value，onRejected 函数的参数是 reason。

then 方法可以被调用很多次，每次注册一组 onFulfilled 和 onRejected 的 callback。它们如果被调用，必须按照注册顺序调用。

对象添加 callbacks 属性，记录 callback 序列。

### 代码实现原型方法 then

then 方法必须返回 promise。

```js
Promise.prototype.then = function(onFulfilled, onRejected) {};
```

在 then 方法里，return new Promise(f)，满足 then 必须 return promise 的要求。
当 state 处于 pending 状态，就储存进 callbacks 列表里。
当 state 不是 pending 状态，就扔给 handleCallback 去处理。

我们不是在 JS 引擎层面实现 Promises，而是使用 JS 去实现 JS Promises。**在 JS 里无法主动控制自身 execution context stack**。可以通过 setTimeout/nextTick 等 API 间接实现，此处选用了 setTimeout。

## 完整代码

```js
const isFunction = obj => typeof obj === "function";
const isObject = obj => !!(obj && typeof obj === "object");
const isThenable = obj => (isFunction(obj) || isObject(obj)) && "then" in obj;
const isPromise = promise => promise instanceof Promise;

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(f) {
  this.result = null;
  this.state = PENDING;
  this.callbacks = [];

  // 这里尖头函数的this指向定义的位置
  let onFulfilled = value => transition(this, FULFILLED, value);
  let onRejected = reason => transition(this, REJECTED, reason);

  let ignore = false;
  let resolve = value => {
    if (ignore) return;
    ignore = true;
    resolvePromise(this, value, onFulfilled, onRejected);
  };
  let reject = reason => {
    if (ignore) return;
    ignore = true;
    onRejected(reason);
  };

  try {
    f(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject };

    if (this.state === PENDING) {
      this.callbacks.push(callback);
    } else {
      setTimeout(() => handleCallback(callback, this.state, this.result), 0);
    }
  });
};

const handleCallback = (callback, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback;
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
    } else if (state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error);
  }
};

const handleCallbacks = (callbacks, state, result) => {
  while (callbacks.length) handleCallback(callbacks.shift(), state, result);
};

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result;
  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0);
};

const resolvePromise = (promise, result, resolve, reject) => {
  if (result === promise) {
    let reason = new TypeError("Can not fufill promise with itself");
    return reject(reason);
  }

  if (isPromise(result)) {
    return result.then(resolve, reject);
  }

  if (isThenable(result)) {
    try {
      let then = result.then;
      if (isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject);
      }
    } catch (error) {
      return reject(error);
    }
  }

  resolve(result);
};

module.exports = Promise;
```

### 测试运行

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("FULFILLED");
  }, 1000);
});
```
