---
title: JS常用语法技巧
date: 2016-6-6
tags:
  - JS
  - 常用语法技巧
categories:
  - [JS, 常用语法技巧]
---

## 数组去重

```js
const array = [1, 1, 2, 3, 5, 5, 1];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

## 短路求值

### &&

假设我们想要返回两个或多个选项中的一个，

- 使用 && 可以返回第一个 false。
- 如果所有操作数的值都是 true，将返回最后一个表达式的值。

```js
let one = 1,
  two = 2,
  three = 3;
console.log(one && two && three); // Result: 3
console.log(0 && null); // Result: 0
```

### ||

使用||可以返回第一个 true。如果所有操作数的值都是 false，将返回最后一个表达式的值。

```js
let one = 1,
  two = 2,
  three = 3;
console.log(one || two || three); // Result: 1
console.log(0 || null); // Result: null
```

## 转换成字符串

```js
const val = 1 + ''; // 这里加后边的原因是前边如果是算数运算，就不会出现拼接的问题
console.log(val); // Result: "1"
console.log(typeof val); // Result: "string"
```

## 转换成数字

```js
// 方式一
let int = '15';
int = +int;
console.log(int); // Result: 15
console.log(typeof int);
// Result: 'number';

console.log(+true); // Return: 1
console.log(+false); // Return: 0

// 方式二
// + 运算符会被解析成连接操作，而不是加法操作。对于这种情况，可以使用两个波浪号：~~。
const int = ~~'15';
console.log(int); // Result: 15
console.log(typeof int);
Result: 'number';
```

## 快速幂运算

```js
console.log(2 ** 3); // Result: 8
```

从 ES7 开始，可以使用 \*\* 进行幂运算，比使用 Math.power(2,3) 要快得多。

```js
// 以下表达式是等效的:
Math.pow(2, n);
2 << (n - 1); // 位左移运算符 << 来表示以 2 为底的幂运算
2 ** n;
```

## 快速取整 |，位运算

```js
console.log(23.9 | 0); // Result: 23
console.log(-23.9 | 0); // Result: -23
// 替代了原先的parseInt
console.log(parseInt(-23.9));
```

## 获取数组最后的元素

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```

## 格式化 JSON.stringify

```js
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
// Result:
// '{
//   "alpha": A,
//   "beta": B
// }'
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));

// JSON.stringify(value[, replacer [, space]])
// replacer: 如果该参数为null或者未提供，则对象所有的属性都会被序列化；
// space: 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为null）将没有空格。

// replacer

function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

var foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };
JSON.stringify(foo, replacer);

// JSON序列化结果为 {"week":45,"month":7}.

// 如果replacer是一个数组，数组的值代表将被序列化成JSON字符串的属性名。
JSON.stringify(foo, ['week', 'month']);

// space
JSON.stringify({ a: 2 }, null, ' '); // '{\n "a": 2\n}'
JSON.stringify({ uno: 1, dos: 2 }, null, '\t');
```

## eval，解析对象

```js
eval("{a:1,b:3,c:[],d:{hh:'sdfdf'}}");
// -> error: VM228:1 Uncaught SyntaxError: Unexpected identifier
//     at <anonymous>:1:42
eval('(' + "{a:1,b:3,c:[],d:{hh:'sdfdf'}}" + ')');
// -> {a: 1, b: 3, c: Array(0), d: {…}}
```
