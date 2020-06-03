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
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}

type Name = {
  name: string;
};
type User = Name & { age: number };
```

### 不同点

1. type 可以而 interface 不行：
   1. type 可以声明**基本类型别名**，联合类型，元组等类型；
   2. type 语句中还可以**使用 `typeof` 获取实例** 的类型进行赋值；
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
