---
title: 观察者模式
date: 2019-5-6
tags:
  - 设计模式
  - 观察者模式
  - 发布-订阅模式
categories:
  - [设计模式, 观察者模式]
  - [设计模式, 发布-订阅模式]
---

## 观察者模式

本质上就是一个函数内执行其他一堆函数；可以随时添加和删除；

一个 subject(目标对象)对应(注册)多个 observer(观察者),当 subject 状态改变时，通知其的 observer 执行；

实现实例：

1. 自定义类来实现，可以参考设计模式上的内容；
2. jq 的内部类-\$.Callbacks();(工厂模式)来创建对象；
3. event 模块的 EventEmitter 对象的 on 与 emit 方法；

观察者模式：**定义了对象间一种一对多的依赖关系**，当目标对象 Subject 的状态发生改变时，所有依赖它的对象 Observer 都会得到通知。

模式特征：

- 一个目标者对象 Subject，拥有方法：添加 / 删除 / 通知 Observer；
- 多个观察者对象 Observer，拥有方法：接收 Subject 状态变更通知并处理；
- 目标对象 Subject 状态变更时，通知所有 Observer。
- Subject 添加一系列 Observer， Subject 负责维护与这些 Observer 之间的联系，“你对我有兴趣，我更新就会通知你”。

观察者模式里面使用的数据结构(不具备顺序 ，是一个 list)。

```js
// 主题，接收状态变化，触发每个观察者
// 目标
class Subject {
  constructor() {
    this.state = 0;
    // 记录要观察的对象列表
    this.observers = [];
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  attach(observer) {
    this.observers.push(observer);
  }
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}

// 观察者，等待被触发，一系列操作
class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}

// 测试代码
let s = new Subject();

let o1 = new Observer('o1', s);
let o2 = new Observer('o2', s);
let o3 = new Observer('o3', s);

s.setState(1);
s.setState(2);
s.setState(3);
```

### 观察者模式的优点与缺点

优点：目标者与观察者，功能耦合度降低，专注自身功能逻辑；观察者被动接收更新，时间上解耦，实时接收目标者更新状态。

缺点：观察者模式虽然实现了对象间依赖关系的低耦合，但却不能对事件通知进行细分管控，如 “筛选通知”，“指定主题事件通知” 。

## 发布-订阅模式

发布订阅模式: **发布订阅模式中统一由调度中心进行处理**，订阅者和发布者互不干扰。

```js
// 初始化类，每次使用进行实例化
class EventEmitter {
  constructor() {
    // 创建一个事件对象，用来保存订阅的事件及回调
    this.events = Object.create(null);
    // events: {
    // name1: [(func)fn1,(func)fn2,...],
    // name2: [(func)fn1,(func)fn2,...],
    // ....
    // ....
    // }
  }
  // 绑定事件
  on(name, fn) {
    // 没有该事件的订阅，就初始化处理函数数组为空
    if (!this.events[name]) {
      this.events[name] = [];
    }
    // 否则给回调中添加回调事件
    this.events[name].push(fn);
    // return 自身方便链式调用
    return this;
  }
  // 触发事件
  emit(name, ...args) {
    // 没有这个类型的事件，不执行
    if (!this.events[name]) {
      console.warn(`事件${name}不存在`);
      return this;
    }
    const fns = this.events[name];
    //执行该事件对应的函数数组, 并传入参数
    fns.forEach((fn) => fn.call(this, ...args));
    return this;
  }
  // 解绑事件
  off(name, fn) {
    if (!this.events[name]) {
      return this;
    }
    // 没有指定解绑事件就解绑所有
    if (!fn) {
      this.events[name] = null;
      return this;
    }
    // 否则找到该事件,解绑
    const index = this.events[name].indexOf(fn);
    this.events[name].splice(index, 1);
    return this;
  }
  // 单次绑定事件,执行完后解绑
  once(name, fn) {
    const only = () => {
      fn.apply(this, arguments);
      this.off(name, only);
    };
    this.on(name, only);
    return this;
  }
}

// 测试

const event = new EventEmitter();
// 绑定一个事件
event.on('some_event', function () {
  console.log('some_event 事件触发1');
});

event.on('some_event', function () {
  console.log('some_event 事件触发2');
});

event.on('666', function () {
  console.log('666 事件触发');
});

event.on('once', function () {
  console.log('once 事件触发');
});

event.emit('some_event');
event.emit('666');
event.emit('once');

event.off('666');
event.emit('666');
```

### 常用包，node/events/EventEmitter

```js
// event.js 文件
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

event.on('some_event', function () {
  console.log('some_event 事件触发');
});

setTimeout(function () {
  event.emit('some_event');
}, 1000);
```

## 观察者和发布-订阅的区别，各自用在哪里

![img](./观察者与发布订阅.webp)

[观察者模式和发布订阅模式的区别](https://www.jianshu.com/p/594f018b68e7)

观察者模式和发布订阅模式最大的区别就是**发布订阅模式有个事件调度中心**。

**观察者模式中观察者和目标直接进行交互**，而**发布订阅模式中统一由调度中心进行处理**，订阅者和发布者互不干扰。这样一方面实现了解耦，还有就是可以实现更细粒度的一些控制。

比如**发布者发布了很多消息，但是不想所有的订阅者都接收到**，就可以在调度中心做一些处理，类似于权限控制之类的。还可以做一些节流操作。

总的来说，**发布-订阅模式适合更复杂的场景**。

### 观察者模式的应用场景

- 网页事件绑定
- Promise
- jQuery callbacks
- nodejs 自定义事件

### 发布-订阅模式的应用场景

一个典型的观察者模式应用场景是用户在一个**网站订阅主题**。

多个用户(观察者，Observer)都可以订阅某个主题(Subject)，当主题内容更新时订阅该主题的用户都能收到通知。
