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
