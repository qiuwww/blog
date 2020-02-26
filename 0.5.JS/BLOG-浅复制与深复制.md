---
title: 浅复制与深复制
date: 2019-7-13
tags:
  - JavaScript
---

[TOC]

## 浅拷贝（shallowcopy）

浅复制是**复制引用**，复制后的引用都是**指向同一个对象的实例**，彼此之间的操作会互相影响。

## 深拷贝（deepcopy）

JavaScript **存储对象都是存地址的**，所以浅拷贝会导致 obj1 和 obj2 指向同一块内存地址。改变了其中一方的内容，都是在原来的内存上做修改会导致拷贝对象和源对象都发生改变，**而深拷贝是开辟一块新的内存地址**，将原对象的各个属性逐个复制进去。对拷贝对象和源对象各自的操作互不影响。

深复制不是简单的复制引用，**而是在堆中重新分配内存，并且把源对象实例的所有属性都进行新建复制，**以保证深复制的对象的引用图不包含任何原有对象或对象图上的任何对象，复制后的对象与原来的对象是**完全隔离**的。

## 实现方案

### JSON.parse(JSON.stringify(obj))，（浅复制）

这里不能处理 function 类型的变量。会有如下的问题：

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- undefined、任意的函数以及 symbol 值，在序列化过程中**会被忽略**（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
- 所有**以 symbol 为属性键的属性都会被完全忽略掉**，即便 replacer 参数中强制指定包含了它们。
- 不可枚举的属性会被忽略。

这种方法使用较为简单，**可以满足基本的深拷贝需求**，而且能够处理 JSON 格式能表示的所有数据类型，但是对于**正则表达式类型、函数类型等无法进行深拷贝**(而且会直接丢失相应的值)。还有一点不好的地方是它**会抛弃对象的 constructor**。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成 Object。同时如果对象中存在循环引用的情况也无法正确处理。

### Object.assign 方法（浅复制）

扩展一个空对象就有了；Object.assign() 方法可以把任意多个的源对象自身的可枚举属性**拷贝**给目标对象，然后返回目标对象。

```js
var x = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
var y = Object.assign({}, x);
console.log(y.b.f === x.b.f); // true
// 这个时候看似，x对象与y对象不相等，但是 他们内部的元素的非引用类型还是会指向相同的位置，也就是说其实assign是一个浅复制。
```

### Array 的 slice 和 concat 方法（浅复制）

不修改原数组，只会返回一个**浅复制**了原数组中的元素的一个新数组。**之所以把它放在深拷贝里，是因为它看起来像是深拷贝。而实际上它是浅拷贝**。相当一新增了一个指向变量，但是与原变量不同，指向的位置还是相同的。

### jquery 中的 clone 方法的浅复制是只复制元素，不复制相关事件，深复制，是复制事件

### 深层迭代，注意区分 array 和 obj 对象的嵌套（深复制）

## 真正意义上的深拷贝

```js
var $ = (function() {
  'use strict';
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }

  for (var i = types.length; i--; ) {
    $['is' + types[i]] = (function(self) {
      return function(elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }
  return $;
})(); //类型判断

// 注意$别被重置了
// 迭代循环调用实现深层复制
function copy(obj, deep) {
  // null, 与非obj（o||a），非函数的时候直接返回
  // typeof [1,2,3] -> "object" ; [1, 2, 3].toString() -> "1,2,3"
  if (obj === null || (typeof obj !== 'object' && !$.isFunction(obj))) {
    return obj;
  }
  // 复制函数
  // 通过转为字符串的形式实现函数的copy
  if ($.isFunction(obj)) {
    // new Function ([arg1[, arg2[, ...argN]],] functionBody)
    // Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。
    return new Function('return ' + obj.toString())();
  } else {
    // 这里处理纯对象和数组的类型
    var name,
      target = $.isArray(obj) ? [] : {},
      value;
    // for...对于obj和arr都适用
    for (name in obj) {
      value = obj[name];
      if (value === obj) {
        continue;
      }
      if (deep) {
        // 如果内部的值还是一个对象或者数组
        if ($.isArray(value) || $.isObject(value)) {
          target[name] = copy(value, deep);
          // 如果是函数就直接复制一遍
        } else if ($.isFunction(value)) {
          target[name] = new Function('return ' + value.toString())();
        }
      } else {
        // 不是深复制就是复制引用啊，遍历都不需要吧
        target[name] = value;
      }
    }
    return target;
  }
}
```
