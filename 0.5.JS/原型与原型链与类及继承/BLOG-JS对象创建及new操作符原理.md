---
title: JS的new操作符
date: 2017-3-6
tags:
  - JS
  - new操作符
categories:
  - [JS, 原型与原型链]
  - [JS, new操作符]
---

## 创建对象有几种方法

### 方式一：字面量

```js
var obj11 = {name: 'smyh'};
var obj12 = new Object(name: `smyh`); //内置对象（内置的构造函数）
```

上面的两种写法，效果是一样的。因为，第一种写法，`obj11`会指向`Object`。

- 第一种写法是：字面量的方式。
- 第二种写法是：内置的构造函数。

### 方式二：通过构造函数+new 操作符

```javascript
var M = function (name) {
  this.name = name;
};
var obj3 = new M('smyhvae');
```

### 方法三：Object.create

```javascript
var p = { name: 'smyhvae' };
var obj3 = Object.create(p); // 此方法创建的对象，是用原型链连接的，继承于p
```

第三种方法，很少有人能说出来。这种方式里，`obj3`是实例，p 是 obj3 的原型（name 是 p 原型里的属性），构造函数是`Objecet` 。

![img](http://img.smyhvae.com/20180306_1633.png)

## new 操作符具体干了什么

new 共经历了四个过程。

1. 创建一个新对象；
2. 将构造函数的**原型赋给新对象的**proto\*\*\*\*（因此 this 就指向了这个新对象）；
3. **执行构造函数中的代码**（为这个新对象添加属性）；
4. 返回这个新对象。

```js
var fn = function () {
  this.a = 123;
  return this;
};
var fnObj = new fn();

// 1、创建了一个空对象 obj
var obj = new Object();

// 2、设置原型链，设置生成的对象的原型等于构造函数的原型
obj._proto_ = fn.prototype;

// 3、让 fn 的 this 指向 新创建的对象obj，这个时候绑定了 this。这里 call 得到运行的结果
var result = fn.call(obj); // 我们将 fn 函数对象的 this 指针替换成 obj

// 并执行 fn 的函数体
fn();

// 4、判断 fn 的返回值类型，如果是值类型，返回 obj。如果是引用类型，就返回这个引用类型的对象。
if (typeof result == 'object') {
  fnObj = result; // 有返回值
} else {
  fnObj = obj; // 无返回值的时候
}
```

### 使用 new 与不使用 new 实例化对象的区别

使用 new 是创建一个新的对象，不使用 new，就是调用一般的函数。

```js
// 创建一个类
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
  console.log(this);
}
Person.prototype.say = function () {
  console.log(`my name is ${this.name}!`);
};

// test
// 第一种是构造函数式，即通过new运算符调用构造函数Function来创建函数
var person1 = new Person('xiaoming', 'male');
// 第二种不是实例化，只是调用函数把返回值赋给变量。
var person2 = Person('xiaohong', 'formale');

// 1. 调用之后的返回结果：
person1;
// Person {name: "xiaoming", sex: "male"}
person2;
// undefined
// 2. 调用方法
person1.say();
// my name is xiaoming!

person2.say();
// 报错：Cannot read property 'say' of undefined

// 3. 全局调用name，得到"xiaohong"
```

异同总结：

1. 使用 new 方法最终会返回当前创建的对象，不使用 new 方法，最终只会是一个函数调用，返回结果依据构造函数内的返回说明。
2. 使用 new 会创建一个对象（函数上下文执行环境在当前对象，this 指向当前对象），不使用 new 的时候，只是创建了几个全局变量（this 指向全局）。
3. 当使用 new 关键字来调用构造函数时，执行上下文从全局对象（window）变成一个空的上下文，这个上下文代表了新生成的实例。因此，this 关键字指向当前创建的实例。
4. 默认情况下，如果你的构造函数中没有返回任何内容，就会返回 this——当前的上下文。
