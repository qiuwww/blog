# 节流 throttle 与防抖 debounce

## 函数防抖 debounce

一定时间内有新的触发请求，就取消前一次的。

```js
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0;
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
```

## 函数节流 throttle

在一定时间内只允许触发一次

```js
function throttle(method, delay) {
  var timer = null;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      method.apply(context, args);
    }, delay);
  };
}
```

### 函数节流，节约使用，一定时间内只能用一次

调节强制执行一段时间内可以调用函数的最大次数，如“每 100 毫秒最多执行一次”。
**在正常情况下，我们可以在 10 秒钟内调用此函数 1000 次。如果您每 100 毫秒将其限制为仅一次，则最多只能执行该功能 100 次。**

### 函数去抖，如果在短时间内连续抖动，就会只执行最后一次

强制一个函数在一段时间内只被调用一次。如“一个函数 100 毫秒内只执行一次”。
也许一个函数在很集中的时间内被调用 1000 次，**超过 3 秒，然后停止调用**。如果我们在 100 毫秒内将其去抖动，该函数将**仅启动一次 3.1 秒**。函数去抖就是对于一定时间段的连续的函数调用，只让其执行一次。
