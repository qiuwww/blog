---
title: 类与继承
date: 2017-2-8
tags:
  - JS
  - 类与继承
categories:
  - [JS]
  - [类与继承]
---

javascript 面向对象中继承实现：

1. 我们创建的每个**函数**都有一个 prototype（原型）属性，**这个属性是一个指针，指向一个对象**，而这个对象的**用途**是包含可以由**特定类型**的所有实例共享的属性和方法。
2. 类继承，（extends），创建一个类，让其 prototype 指向另一个**实例**；
3. **对象直接继承**，创建 Object.create， Object.assign（所有**可枚举属性**的值从一个或多个源对象复制到目标对象），不可以扩展原型上的属性

```js
function P() {}
P.prototype.alert = function() {
  alert(this.name);
};
var xm = new P();
Object.assign({}, xm);
```

### 继承的形式

查看 section5-es5 中创建对象与继承.html。

### Javascript 如何实现继承

```js
function Animal(name) {
  this.name = name;
  this.run = function() {
    /*实例方法*/
    console.log(this.name + '在运动');
  };
}
Animal.prototype.work = function() {
  console.log(this.name + '在工作');
};
```

#### 借用构造函数

使用 call 或 apply 方法，将**父对象的构造函数绑定在子对象上**。

```js
function Cat(name, color) {
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}
```

##### 借用构造函数继承的优缺点

没有原型，**则复用无从谈起**。所以我们需要**原型链+借用构造函数的模式**，这种模式称为**组合继承**。

#### 实例继承的优缺点

#### 组合继承，组合式继承 = 原型继承 + 借用构造函数继承，重要

```js
function Cat(name, color) {
  Animal.call(this, name);
  this.color = color;
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
```

##### 组合继承的优缺点

组合式继承是比较常用的一种继承方法，

其背后的思路是**使用原型链实现对原型属性和方法的继承**，

而通过**借用构造函数来实现对实例属性的继承**。这样，既通过在原型上定义方法实现了函数复用，又保证每个实例都有它自己的属性。

缺点：需要调用两次超类的构造函数。在调用子类构造函数的时候，会重写从父类实例继承的属性和方法。

#### 原型式继承

#### 寄生式继承

#### 寄生组合式继承，重要，最理想的继承方式

JS 的继承方式有很多种，**最理想的继承方式是寄生组合式继承**。

借助**构造函数来继承属性**，通过**原型链的混成形式来继承方法**。不必为了指定子类的原型而调用超类的构造函数。

**ES6 实现类的底层原理，需要实现静态方法与变量**。

```js
// 超类
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name + ' ' + this.gender + ' ' + this.age);
};

// 子类
function Female(name, gender, age) {
  Person.call(this, name); //第一次调用父类构造函数
  this.age = age;
  this.gender = gender;
}

// 传入超类与子类的构造函数
function inheritPrototype(Female, Person) {
  var protoType = Object.create(Person.prototype);
  protoType.constructor = Female;
  Female.prototype = protoType;
}
// 取代
// Female.prototype=new Person();
// Female.prototype.constrcutor=Female

inheritPrototype(Female, Person);
Female.prototype.sayAge = function() {
  console.log(this.name + ' ' + this.age);
};

var fm = new Female('skila', 'female', 19);

fm.sayName(); // skila female 19
fm.sayAge(); // skila 19
```

#### ES6 语法糖

extends：class ColorPoint extends Point {}

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

## 评价一下三种方法实现继承的优缺点,并改进

```js
function Shape() {}
function Rect() {}
// 方法1
Rect.prototype = new Shape();
// 方法2
Rect.prototype = Shape.prototype;
// 方法3
Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.area = function() {
  // do something
};
```

方法 1：

1. 优点：正确设置原型链实现继承
2. 优点：父类实例属性得到继承，原型链查找效率提高，也能为一些属性提供合理的默认值
3. 缺点：父类实例属性为引用类型时，**不恰当地修改会导致所有子类被修改**
4. 缺点：创建父类实例作为子类原型时，可能无法确定构造函数需要的合理参数，这样提供的参数继承给子类没有实际意义，当子类需要这些参数时应该在构造函数中进行初始化和设置
5. 总结：**继承应该是继承方法而不是属性**，为子类设置父类实例属性应该是通过在子类构造函数中调用父类构造函数进行初始化

方法 2：

1. 优点：正确设置原型链实现继承
2. 缺点：父类构造函数原型与子类相同。修改子类原型添加方法会修改父类

方法 3：

1. 优点：正确设置原型链且避免方法 1.2 中的缺点
2. 缺点：ES5 方法需要注意兼容性

改进：

1. 所有三种方法应该在子类构造函数中调用父类构造函数实现实例属性初始化

```js
function Rect() {
  Shape.call(this);
}
```

2. 用新创建的对象**替代子类默认原型**，设置`Rect.prototype.constructor = Rect;`保证一致性
3. 第三种方法的 polyfill：

```js
function create(obj) {
  if (Object.create) {
    return Object.create(obj);
  }

  function f() {}
  f.prototype = obj;
  return new f();
}
```
