---
title: getter与setter方法
date: 2020-2-2
tags:
  - JS
  - getter
  - setter
  - 对象属性
categories:
  - [JS, 对象属性]
---

js 中一共有两种属性，一种**数据属性**，一种**访问器属性**。

语法形式：

`{set prop(val) { . . . }}`
`{set [expression](val) { . . . }}`

`{get prop() { ... } }`
`{get [expression]() { ... } }`

## 访问器属性的定义

### Object.defineProperty()来定义

```js
// Object.defineProperty(obj, prop, descriptor);
// obj 要在其上定义属性的对象。
// prop 要定义或修改的属性的名称。
// descriptor 将被定义或修改的属性描述符。

var variable = 0;

var obj = {};

Object.defineProperty(obj, 'a', {
  get: function () {
    console.log('调用get获取参数');
    return variable;
  },
  set: function (value) {
    console.log('调用set设置中间变量');
    variable = value;
  },
});

console.log(obj.a);
obj.a = 2;
console.log(obj.a);
```

### 初始化对象定义 setter 和 getter，类似计算属性

```js
// 这会为language对象 创建一个伪属性latest，它会返回log数组的最后一个元素。
const language = {
  log: ['ZH', 'DE'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  },
  set current(name) {
    this.log.push(name);
  },
};
// getter
console.log(language.latest); // DE

// setter
language.current = 'EN';
console.log(language.log); // ["ZH", "DE", "EN"]
```

## 用途

1. 缓存在当前对象上的不变属性，可以使用这个，会缓存变量，比如获取 url 中的参数，或者缓存当前对象依附的 dom 节点等；
