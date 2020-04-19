---
title: ES2020
date: 2020-4-19
tags:
  - ES2020
  - JS
  - ES6+
categories:
  - [JS, ES6+]
---

## ECMAScript 2020 新特性

1. String.prototype.**[matchAll](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)**，matchAll() 方法返回一个**包含所有匹配正则表达式的结果及分组捕获组的迭代器**。
2. import()
3. [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
4. Promise.allSettled
5. [globalThis](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
6. for-in，它最常用的地方应该是用于调试，可以更方便的去检查对象属性
7. [Optional chaining](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)，可选链，非常实用
8. [Nullish coalescing Operator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
9. [import.meta](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import.meta)，import.meta 是一个给 JavaScript 模块暴露特定上下文的**元数据属性的对象**。它包含了这个模块的信息，比如说这个模块的 URL。
10. `export \* as ns from “mod”`，包的引用转发

## 使用举例

### matchAll

```js
let regexp = /t(e)(st(\d?))/g;
let str = 'test1test2';
let res = str.matchAll(regexp);
console.log('res:', res);
let array = [...res];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// expected output: Array ["test2", "e", "st2", "2"]
```

### 动态 import

在您希望按照一定的条件或者按需加载模块的时候，动态 import() 是非常有用的。

这样就可以按需加载了，可以进行判断然后加载模块。

```js
var promise = import('module-name'); // 这是一个处于第三阶段的提案。
if (b) {
  promise = import('module-name2'); // 条件判断加载，webpack很早就实现了
}
```

### 可选链操作符 Optional chaining(?.)

1. obj?.prop
2. obj?.[expr]
3. arr?.[index]
4. func?.(args)

可选链操作符?.能够去读取一个被连接对象的深层次的属性的值而无需明确校验链条上每一个引用的有效性。

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```

### Nullish coalescing Operator，空值合并运算符（??）

空值合并运算符（??）是一个**逻辑运算符**。**当左侧操作数为 null 或 undefined 时，其返回右侧的操作数**。否则返回左侧的操作数。

与逻辑或（`||`）操作符不同，逻辑或会在左操作数为 假值 时返回右侧操作数。也就是说，如果你使用 `||` 来为某些变量设置默认的值时，你可能会遇到意料之外的行为。比如为**假值（例如，'' 或 0）**时。

```js
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0

console.log(0 || 11);
console.log(0 ?? 11);
```
