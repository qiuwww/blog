---
title: js代码技巧
date: 2019-06
tags:
  - js
---

## 三元操作符替代 if...else，如果条件多余三个，就使用 switch

当想写 if...else 语句时，使用三元操作符来代替。

```js
const x = 20;
let answer;
if (x > 10) {
  answer = 'is greater';
} else {
  answer = 'is lesser';
}
// 简写：
const answer = x > 10 ? 'is greater' : 'is lesser';
// 也可以嵌套 if 语句：
const big = x > 10 ? ' greater 10' : x;
```

但是多行的时候还是需要使用 if...else，并且三元嵌套给人容易让人迷惑，压缩文件会自动转换的。

## 短路求值简写方式

当给一个变量分配另一个值时，想确定源始值不是 null，undefined 或空值。可以写撰写一个多重条件的 if 语句。

```js
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
  let variable2 = variable1;
}
// 或者可以使用短路求值方法：
const variable2 = variable1 || 'new';
```

## 声明变量简写方法

```js
let x;
let y;
let z = 3;
// 简写方法：
let x,
  y,
  z = 3;
```

## 扩展运算符简写

扩展运算符有几种用例让 JavaScript 代码更加有效使用，可以用来代替某个数组函数。

```js
// joining arrays
const odd = [1, 3, 5];
const nums = [2, 4, 6].concat(odd);

// cloning arrays
const arr = [1, 2, 3, 4];
const arr2 = arr.slice();
// 简写：
// joining arrays
const odd = [1, 3, 5];
const nums = [2, 4, 6, ...odd];
```

## Array.find 简写

想从数组中查找某个值，则需要循环。在 ES6 中，find()函数能实现同样效果。

```js
const pets = [
  { type: 'Dog', name: 'Max' },
  { type: 'Cat', name: 'Karl' },
  { type: 'Dog', name: 'Tommy' },
];

function findDog(name) {
  for (let i = 0; i < pets.length; ++i) {
    if (pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i];
    }
  }
}
// 简写：
pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```

## 双重非位运算简写

有一个有效用例用于双重非运算操作符。可以用来代替 Math.floor()，其优势在于运行更快，可以阅读此文章了解更多位运算。

```js
Math.floor(4.9) === 4; //true
// 简写;
~~4.9 === 4; //true
```

## 对象与数组扩展

```js
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];

// 合并数组操作
const arr_1 = arr1.concat(arr2);
const arr_2 = [1, 2, 3, ...arr2];

// set 去重操作
const set1 = new Set(arr_1);
const arr_3 = [...set1];
[...new Set([1, 2, 3, ...[2, 3, 4]])];

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 1, d: 2 };

// 合并对象的操作
const obj_1 = { ...obj1, ...obj2 };
```

## 给所有 div 添加一个边框

`$$`函数是现代浏览器提供的一个命令行 API，它相当于 document.querySelectorAll，可以将当前页面中的 CSS 选择器作为参数传给该方法，然后它会返回匹配的所有元素。

所以，如果想在浏览器控制台外使用上面这段代码，可以将\$\$('_')替换为 document.querySelectorAll('_')。

```js
[].forEach.call(document.querySelectorAll('*'), function(ele) {
  ele.style.border = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16);
  ele.style.transform = 'skew(1deg, 1deg)';
});
```

### 随机颜色值

```js
(~~(Math.random() \* (1 << 24))).toString(16);
```

## 创建过去七天的数组

```js
[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));
```

## 生成长度为 11 的随机字母数字字符串

```js
Math.random()
  .toString(36)
  .substring(2);
// hg7znok52x
```

## 获取 URL 的查询参数

这个获取 URL 的查询参数代码，是我见过最精简的 QAQ

`?foo=bar&baz=bing => {foo: bar, baz: bing}`

```js
// 获取 URL 的查询参数
var q = {};
// 这里的 k、v 对应于匹配到的第一个和第二个参数
location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
console.log('query', q);
```

## 混淆数组

```js
// 随机更改数组元素顺序，混淆数组
let a = arr => arr.slice().sort(() => Math.random() - 0.5);
let b = a([1, 2, 3, 4, 5]);
console.log(b);
```

## 方便快捷创建特定大小的数组

```js
[...Array(3).keys()];
// [0, 1, 2]
[...Array(3).fill()];
// [undefined, undefined, undefined]
```

## 用字符串返回一个键盘图形

```js
// 这是一个很难看懂的简洁代码，但是运行后你会惊呆的，他竟然返回一个图形键盘
(_ =>
  [..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(
    x =>
      ((o += `/${(b = '_'.repeat(
        (w = x < y ? 2 : ' 667699'[((x = ['BS', 'TAB', 'CAPS', 'ENTER'][p++] || 'SHIFT'), p)]),
      ))}\\|`),
      (m += y + (x + '    ').slice(0, w) + y + y),
      (n += y + b + y + y),
      (l += ' __' + b))[73] && (k.push(l, m, n, o), (l = ''), (m = n = o = y)),
    (m = n = o = y = '|'),
    (p = l = k = []),
  ) &&
  k.join`
`)();
```

## 字符串转数组

```js
// [..."sdfsdf"]
// ["s", "d", "f", "s", "d", "f"]
```

## 浮点数取整

```js
// 浮点数取整
(Math.random() * 10000) >> 0;
(Math.random() * 100) >> 0;
```

## 使用可检索的变量名

```js
// 使用没有意义的变量名将会导致我们的程序难于理解，将会伤害我们的读者
// Bad: // What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
// Good: // Declare them as capitalized `const` globals.
const MILLISECONDS_IN_A_DAY = 86400000;
setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
```

## 使用说明性的变量(即有意义的变量名)

```js
// Bad
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
// Good:
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

## 保持函数功能的单一性这是软件工程中最重要的一条规则

```js
// 当函数需要做更多的事情时，它们将会更难进行编写、测试、理解和组合。
// 当你能将一个函数抽离出只完成一个动作，他们将能够很容易的进行重构并且你的代码将会更容易阅读。
// 如果你严格遵守本条规则，你将会领先于许多开发者。
// Bad:
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// Good:
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}
function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

## 使用默认变量替代短路运算或条件

```js
// Bad:
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  // ...
}
// Good:
function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
  // ...
}
```

## 函数参数 (理想情况下应不超过 2 个)限制函数参数数量很有必要

```js
// 这么做使得在测试函数时更加轻松。
// 过多的参数将导致难以采用有效的测试用例对函数的各个参数进行测试。
// 应避免三个以上参数的函数。通常情况下，参数超过三个意味着函数功能过于复杂，
// 这时需要重新优化你的函数。
// 当确实需要多个参数时，大多情况下可以考虑这些参数封装成一个对象。
// Bad:
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
// Good:
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}
// 这里注意，如果不传参数的时候，需要传一个空对象进来，不然会报错
createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
});
```

## 移除重复代码重复代码在 Bad Smell 中排在第一位

所以，竭尽你的全力去避免重复代码。因为它意味着当你需要修改一些逻辑时会有多个地方需要修改。

重复代码通常是因为两个或多个稍微不同的东西，它们共享大部分，但是它们的不同之处迫使你使用两个或更多独立的函数来处理大部分相同的东西。
