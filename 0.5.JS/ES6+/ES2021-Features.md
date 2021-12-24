# ES2021-Features

## Logical Assignment Operators

```js
var x = 0,
  y = 1;
//"Or Or Equals"
// 如果x不存在，就把y赋值给x，x不存在，才会走到后边的赋值语句
x ||= y;
x || (x = y);

// "And And Equals"
x &&= y;
x && (x = y);

// "QQ Equals"
// 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
x ??= y;
x ?? (x = y);

0 ?? 4; // 0
'' ?? 4; // ""
NaN ?? 4; // NaN
NaN || 5; // 5

const updateID = (user) => {
  // We can do this
  if (!user.id) user.id = 1;

  // Or this
  user.id = user.id || 1;

  // Or use logical assignment operator.
  user.id ||= 1;
};
```

## Numeric Separators

```js
1_000_000_000; // Ah, so a billion
101_475_938.38; // And this is hundreds of millions

let fee = 123_00; // $123 (12300 cents, apparently)
let fee = 12_300; // $12,300 (woah, that fee!)
let amount = 12345_00; // 12,345 (1234500 cents, apparently)
let amount = 123_4500; // 123.45 (4-fixed financial)
let amount = 1_234_500; // 1,234,500
0.000_001; // 1 millionth
1e10_000; // 10^10000 -- granted, far less useful / in-range...
0xa0_b0_c0;
```

## Promise.any and AggregateError

```js
// 有什么用？
// 1. 从最快的服务器检索资源；
// 2. 显示第一张已加载的图片（来自MDN）
Promise.any([
  fetch('https://v8.dev/').then(() => 'home'),
  fetch('https://v8.dev/blog').then(() => 'blog'),
  fetch('https://v8.dev/docs').then(() => 'docs'),
])
  .then((first) => {
    // Any of the promises was fulfilled.
    console.log(first);
    // → 'home'
  })
  .catch((error) => {
    // All of the promises were rejected.
    console.log(error);
  });
```

## String.prototype.replaceAll

```js
// String.prototype.replaceAll(searchValue, replaceValue)

'x'.replace('', '_');
// → '_x'

'xxx'.replace(/(?:)/g, '_');
// → '_x_x_x_'

'xxx'.replaceAll('', '_');
// → '_x_x_x_'
```

## 参考

[ES2021 Features](https://h3manth.com/ES2021/)
