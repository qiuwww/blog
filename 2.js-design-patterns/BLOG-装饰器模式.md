---
title: 装饰器模式
date: 2022-1-12
tags:
  - 装饰器模式
categories:
  - [装饰器模式]
---

装饰器模式（Decorator Pattern）允许**向一个现有的对象添加新的功能**，**同时又不改变其结构**。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

装饰器（Decorator）是 ES7 中的一个新语法，正如其字面意思而言，它可以对**类、方法、属性进行修饰**，从而进行一些相关功能定制。

## 代码实现，对比使用与不使用的写法区别

```js
// 不使用Decorator：

const log = (srcFun) => {
  if (typeof srcFun !== 'function') {
    throw new Error(`the param must be a function`);
  }
  return (...arguments) => {
    console.info(`${srcFun.name} invoke with ${arguments.join(',')}`);
    srcFun(...arguments);
  };
};

const plus = (a, b) => a + b;

const logPlus = log(plus);

logPlus(1, 2); // this will log : plus invoke with 1,2
```

```js
// 使用Decorator

const log = (target, name, descriptor) => {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };
  return descriptor;
};

class Math {
  @log // Decorator
  plus(a, b) {
    return a + b;
  }
}
const math = new Math();

math.add(1, 2); // this will log: Calling plus with 1,2
```

## 原理

### 方法装饰器

```js
// decorator 外部可以包装一个函数，函数可以带参数
function Decorator(type) {
  /**
   * 装饰器函数
   * @param {Object} target 被装饰器的类的原型
   * @param {string} name 被装饰的类、属性、方法的名字
   * @param {Object} descriptor 被装饰的类、属性、方法的descriptor
   */
  return (target, name, descriptor) => {
    console.log('Decorator', target, name, descriptor);
    // 以此可以获取实例化的时候此属性的默认值
    let v = descriptor.initializer && descriptor.initializer.call(this);

    // 返回一个新的描述对象作为被修饰对象的descriptor，或者直接修改 descriptor 也可以
    return {
      enumerable: true,
      configurable: true,
      get() {
        return v + type;
      },
      set(c) {
        v = c;
      },
    };
  };
}

// USE
class Fudao {
  @Decorator('string')
  title = '企鹅辅导';
}
```

## 优缺点

## 参考文章

1. [浅谈 JS 中的装饰器模式](https://imweb.io/topic/5b1403bbd4c96b9b1b4c4e9e)
