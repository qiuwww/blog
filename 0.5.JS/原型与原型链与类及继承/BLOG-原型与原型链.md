---
title: 原型与原型链及对象创建以及继承
date: 2020-2-5
tags:
  - JS
  - 原型
  - 原型链
  - 对象创建
categories:
  - [JS, 原型]
---

## JavaScript 原型有什么特点

### 原型

我们创建的**每个函数都有一个 prototype 属性**，这个属性是**一个指针**，指向一个对象。这个对象的**用途是**包含可以**由特定类型（该构造函数类型）的所有实例共享的方法和属性**。

prototype 属性不能列举。JavaScript 仅支持通过 prototype 属性进行继承属性和方法。

```js
function Rectangle(x, y) {
  this._length = x;
  this._breadth = y;
}

Rectangle.prototype.getDimensions = function () {
  return {
    length: this._length,
    breadth: this._breadth,
  };
};

var x = new Rectangle(3, 4);
var y = new Rectangle(4, 3);

console.log(x.getDimensions()); // { length: 3, breadth: 4 }
console.log(y.getDimensions()); // { length: 4, breadth: 3 }
```

### 使用原型最大的好处

将方法定义到**构造方法的 prototype 上**，这样的好处是，通过该构造函数生成的实例所拥有的方法都是**指向一个函数的索引**，这样可以**节省内存**。

- 原型的作用一：数据共享，节省空间
- 原型的作用二：继承

## 原型链｜介绍原型链

**原型链的基本原理**：任何一个**实例**，通过**原型链**，找到它上面的**原型**，该原型对象中的方法和属性，**可以被所有的原型实例共享**。

**层层向上直到一个对象的原型为 null**。根据定义，null 没有原型，**并作为这个原型链中的最后一个环节**。

原型可以起到继承的作用。原型里的方法都可以被不同的实例共享：

```js
//给Foo的原型添加 say 函数
Foo.prototype.say = function () {
  console.log('');
};
```

**原型链的关键**：在访问一个实例的时候，**如果实例本身没找到此方法或属性，就往原型上找**。如果还是找不到，继续往上一级的原型上找。

## 原型、构造函数、实例

![原型关系图](./imgs/原型关系图.png)

PS：任何一个函数，如果在前面加了`new`，那就是**构造函数的作用**。

### 原型、构造函数、实例，三者之间的关系

![原型实例关系](./imgs/原型实例关系.png)

1. 构造函数通过 `new` 生成实例。
2. 构造函数也是函数，构造函数的`prototype`指向原型。（所有的函数有`prototype`属性，但实例没有 `prototype`属性）。
3. 原型对象中有 `constructor`，指向该原型的构造函数。

上面的三行，代码演示：

```js
var Foo = function (name) {
  this.name = name;
};
var fn = new Foo('smyhvae');
```

上面的代码中，`Foo.prototype.constructor === Foo`的结果是`true`：

4. 实例的`__proto__`指向原型。也就是说，`Foo.__proto__ === M.prototype`。

声明：所有的**引用类型**（数组、对象、函数）都有`__proto__`这个属性。

`Foo.__proto__ === Function.prototype`的结果为 true，说明`Foo`这个普通的函数，是`Function`构造函数的一个实例。

### 构造函数检测，`instanceof`的原理

[instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符用于检测**构造函数的 prototype 属性**是否出现在**某个实例对象的原型链上**。

1. `instanceof`的**作用**：用于判断**实例**属于哪个**构造函数**。
2. `instanceof`的**原理**：判断实例对象的`__proto__`属性，和构造函数的`prototype`属性，是否为同一个引用（是否指向同一个地址）。

3. **注意 1**：虽然说，实例是由构造函数 new 出来的，但是实例的`__proto__`属性引用的是构造函数的`prototype`。也就是说，实例的`__proto__`属性与构造函数本身无关。
4. **注意 2**：在原型链上，原型的上面可能还会有原型，以此类推往上走，继续找`__proto__`属性。**这条链上如果能找到， instanceof 的返回结果也是 true**。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

// Object构造函数的prototype属性，出现在了auto的原型链上
console.log(auto instanceof Object);
// expected output: true

Car.prototype instanceof Object; // true，同上
```

### 分析一个问题，使用 constructor 判断实例是·哪个构造函数·的实例

**问题：**已知 A 继承了 B，B 继承了 C。怎么判断 a 是由 A**直接生成**的实例，还是 B 直接生成的实例呢？还是 C 直接生成的实例呢？

分析：这就要用到原型的`constructor`属性了。

1. `foo.__proto__.constructor === M`的结果为`true`，但是 `foo.__proto__.constructor === Object`的结果为`false`。
2. 所以，用 `consturctor`判断就比用 `instanceof`判断，更为严谨。

## prototype 和**proto**的区别

prototype 和**__proto__**都指向**构造函数的原型对象**，

1. 任意一个**函数（包括构造函数**）都有一个 prototype 属性，指向该函数的原型对象，
2. 同样任意一个**构造函数实例化的对象**，都有一个**proto**属性（**proto**并非标准属性，ECMA-262 第 5 版将该属性或指针称为[[Prototype]]，可通过 Object.getPrototypeOf()标准方法访问该属性）

