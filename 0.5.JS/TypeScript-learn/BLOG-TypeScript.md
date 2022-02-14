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
      1. 当你想获取一个变量的类型时，使用 typeof `let div = document.createElement('div'); type B = typeof div`；
2. interface 可以而 type 不行：
   1. interface 能够**声明合并**；

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

## 声明 window 上不存在的属性

解决: s 根目录新建文件:类型定义文件(.d.ts\*) .d.ts

```ts
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

## type 与 interface 区别

```ts
// 在基础类型之上更进一步，或者声明一个新的类型
type C = A & B;
// 接口一般用来声明对象数据，可以继承，组合
interface C extends A, B {}
```

### 接口合并

1. 分别声明；

```ts
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
let box: Box = { height: 5, width: 6, scale: 10 };
```

2. 合并两个已声明的接口，这里是接口的继承，😂；

```ts
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
square.penWidth = 5.0;
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

## keyof 的用法

```ts
type RouteTypes = typeof screens;
type RouteTypeKeys = keyof RouteTypes;

type RootStackParamList = {
  [key in RouteTypeKeys]: RouteTypes[key]['initialparams'];
};
```
