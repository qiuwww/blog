---
title: 工厂模式
date: 2019-3-6
tags:
  - 设计模式
  - 工厂模式
categories:
  - [设计模式, 工厂模式]
---

工厂模式是为了**解决多个类似对象声明的问题**，也就是为了解决实列化对象产生重复的问题。

## 代码实现

```js
function CreatePerson(name, age, sex) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sex = sex;
  obj.sayName = function() {
    return this.name;
  };
  return obj;
}
var p1 = new CreatePerson('longen', '28', '男');
var p2 = new CreatePerson('tugenhua', '27', '女');
```

## 优缺点

优点：

工厂模式的好处就是为系统结构提供灵活的动态扩展机制.减速少工作量,方便维护，工厂类一个用处就是尽量解耦合。

1. 工厂方法封装了对象创建的细节,将对象创建代码和其他部分脱离,减少相干性.
2. 有利于同类对象创建的统一管理和控制
3. 你所关心的仅仅是工厂方法返回的接口方法,不必关心实现细节

缺点：

增加新的产品等级结构很复杂，需要修改抽象工厂和所有的具体工厂类，对“开闭原则”的支持呈现倾斜性。
