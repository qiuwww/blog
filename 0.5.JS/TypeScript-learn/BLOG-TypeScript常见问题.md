---
title: TypeScript
date: 2019-9-9
tags:
  - JS
  - TypeScript
categories:
  - [JS, TypeScript]
---

[TOC]

## typescript 你都用过哪些类型

1. number
2. string
3. boolean
4. interface
5. type
6. Array
7. object
8. any
9. enum
10. undefined
11. null
12. void
13. ...

## typescript 中 type 和 interface 的区别

[Typescript 中的 interface 和 type 到底有什么区别详解](https://www.jb51.net/article/163299.htm)

### 相同点

1. 都可以**描述一个对象或者函数**；

```ts
interface User {
 name: string
 age: number
}

interface SetUser {
 (name: string, age: number): void;
}

type User = {
 name: string
 age: number
};

type SetUser = (name: string, age: number): void;
```

2. 都**允许拓展**（extends）；

interface 可以拓展自 interface 或者 type，且这里用到的拓展关键字都是 extends。

```ts
// interface extends interface
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}

// interface extends type
type Name = {
  name: string;
};
interface User extends Name {
  age: number;
}
```

type 可以拓展接口 interface 和 type 类型的，且拓展关键字都是`&`。

```ts
// type extends type
type Name = {
  name: string;
};
type User = Name & { age: number };

// type extends interface
interface Name {
  name: string;
}
type User = Name & {
  age: number;
};
```

### 不同点

1. type 可以而 interface 不行：
   1. type 可以声明**基本类型别名**，联合类型，元组等类型；
      1. 基本类型别名，type Name = string；
   2. type 语句中还可以**使用 `typeof` 获取实例** 的类型进行赋值；
      1. 当你想获取一个变量的类型时，使用 typeof 如`let div = document.createElement('div'); type B = typeof div`；
2. interface 可以而 type 不行：
   1. interface 能够**声明合并**，这里区别于重写接口；

```ts
// 两个相同的接口会进行合并
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
// 默认合并了
let box: Box = { height: 5, width: 6, scale: 10 };
console.log(box);
```

### 什么时候推荐用 type 什么时候用 interface ？<https://pro.ant.design/zh-CN/docs/type-script>

1. 推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：
   1. 表达功能更强大，不局限于 object/class/function；
   2. 要扩展已有 type 需要创建新 type，不可以重名；
   3. 支持更复杂的类型操作。
2. 基本上所有用 interface 表达的类型都有其等价的 type 表达。在实践的过程中，我们也发现了一种类型只能用 interface 表达，无法用 type 表达，那就是往函数上挂载属性。

## 声明 window 上不存在的属性

解决: 根目录新建文件 => 类型定义文件(.d.ts\*) .d.ts

```ts
// interface 联合声明
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
  wx: string;
}
```

## 接口初始化必须赋值的问题，具体的内部的字段需要赋值

```ts
interface Detail {
  id: number;
  value: string;
}

// 这里在vue class中需要赋值
let detail = <Detail>{};

export default class AppointmentInformation extends Vue {
  // 这样子就不行
  detail: Detail = {};
  // 这样子是可以的
  detail = {} as Detail;
  // 这样的断言就不可以
  detail = <Detail>{};
  // 这里要注意断言的两种形式：
  // 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。
}
```

## 多个默认的参数类型的声明，这里的声明类型都是相同的

```ts
interface Obj {
  title: string;
  author: string;
  publishedAt: string;
}

interface Obj2 {
  [propName: string]: string;
}

const obj: Obj = {
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10',
};
```

## keyof 的用法 <https://www.typescriptlang.org/docs/handbook/2/keyof-types.html>

```ts
type RouteTypes = typeof screens;
type RouteTypeKeys = keyof RouteTypes;

type RootStackParamList = {
  [key in RouteTypeKeys]: RouteTypes[key]['initialparams'];
};
```

该操作符可以用于获取某种类型的所有键，其返回类型是联合类型：

```ts
interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // "name" | "age"
// 这个时候获取的是数组的方法key
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
// 这个时候获取到了value
type K3 = keyof { [x: string]: Person }; // string | number
```
