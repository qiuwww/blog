---
title: 单例模式
date: 2017-3-9
tags:
  - 设计模式
  - 单例模式
categories:
  - [设计模式, 单例模式]
---

单例要求一个类有且只有一个实例。

## 代码实现与测试

```js
class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  // 构造一个广为人知的接口，供用户对该类进行实例化
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}
```

## 用途

需要单一的实例，多次操作之后不会有第二个。

- 有这样一个常见的需求，点击某个按钮的时候需要在页面弹出一个遮罩层。
