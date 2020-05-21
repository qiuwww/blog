---
title: 装饰者模式Decorator
tags:
  - JS
  - 设计模式
  - 装饰器
categories:
  - [JS, Decorator]
  - [设计模式, 装饰器]
---

[TOC]

## 装饰器

装饰模式和适配器模式都是  **包装模式** (Wrapper Pattern)，它们都是通过封装其他对象达到设计的目的的，但是它们的形态有很大区别。

1. **适配器模式**我们使用的场景比较多，比如连接不同数据库的情况，你需要包装现有的模块接口，从而使之适配数据库 —— 好比你手机使用转接口来适配插座那样；

2. **装饰模式**不一样，仅仅包装现有的模块，使之 “更加华丽” ，并不会影响原有接口的功能 —— 好比你给手机添加一个外壳罢了，并不影响手机原有的通话、充电等功能；

## 装饰器实例

```js
/**
 * @description @装饰器在业务中的应用，类修饰器（只有一个参数）
 * 用于修改类的行为，ES7的提案，需要babel编译。
 * 对于类的修改是在编译时发生的，而不是运行时。
 * 修饰器接受三个参数：目标函数target、属性名和该属性的描述对象，后两个可以省略。
 * target -> 指向类，如果是类型是 function，则指向 MyFunction.prototype
 * 高阶函数，dva，redux，antd的From组件，都是基于此方式。
 */

/**
 * 默认修改，无参数，给类的prototype添加静态属性isTestAble
 */
// 修饰类的参数就是实例对象，相当于在构造函数外套了一层
function addAttr(target) {
  // 这样添加的是静态方法，实例无法继承
  target.isTestAble = true;
}

@addAttr
class TargetClass {}

console.log('TargetClass.isTestAble', TargetClass.isTestAble); // true
const instantiate = new TargetClass();
console.log('instantiate.isTestAble', instantiate.isTestAble); // undefined

/**
 * @description 可以传递参数的装饰器，表示外层函数运行之后，内层作用于类上
 */
function setName(setName) {
  return function(target) {
    target.setName = setName;
  };
}

@setName('lilei')
class TargetClass2 {}

console.log('TargetClass2.setName', TargetClass2.setName);

/**
 * 方法的修饰
 */

// 属于修饰类的属性，比如debounce与throttle方法
// 不能修饰一般的函数，会存在函数提升，但是可以作为高阶函数使用
// 目标对象、参数名、属性描述
function readonly(target, name, descriptor) {
  console.log('descriptor', descriptor);
  descriptor.writable = false;
  return descriptor;
}

class Person {
  first = 'qiu';
  last = 'wei';

  @readonly
  getName() {
    return `${this.first} ${this.last}`;
  }
}
// 这里是实例方法，不是静态方法
const qiu = new Person();
console.log('new Person().getName()', qiu.getName());

// 装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰
// 如下的代码会报错，因为getName是只读的，不可写
// qiu.getName = () => {};
```
