---
title: 重写 valueOf 和 toString 方法
date: 2018-4-6
tags:
  - JS
  - 重写 valueOf 和 toString 方法
categories:
  - [JS, 编码技巧]
---

## Object.prototype.valueOf()，返回对象的原始值

1. 用 MDN 的话来说，[valueOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)() 方法返回指定对象的**原始值**。
2. JavaScript 调用 valueOf() 方法用来把对象转换成**原始类型的值**（数值、字符串和布尔值）。但是我们很少需要自己调用此函数，valueOf 方法一般都会被 JavaScript 自动调用。

## Object.prototype.toString()，对象方法

1. [toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)() 方法返回一个表示该对象的**字符串**。
2. 每个对象都有一个 toString() 方法，**当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用**。

### 类型检测

```js
// Object.prototype.toString.call(instance);
// Object.prototype.toString.call(instance).slice(8, -1);
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```

## 原始值类型

1. Object
2. Symbol
3. Number
4. String
5. Boolean
6. Undefined
7. Null

## 类型转换

### String 类型转换

在某个操作或者运算需要字符串而该对象又不是字符串的时候，会触发该对象的 String 转换，会将非字符串的类型尝试自动转为 String 类型。（隐性转换）

```js
var obj = { name: 'Coco' };
var str = '123' + obj;
// 默认对象返回[object Object]
console.log(str); // 123[object Object]
```

**转换规则：**

string 转换，先调用 toString，不是原始值就调用 valueOf。

1. 如果 toString 方法存在**并且返回原始类型**，返回 toString 的结果。
2. **如果 toString 方法不存在或者返回的不是原始类型，就会调用 valueOf 方法**，如果 valueOf 方法存在，**并且返回原始类型数据**，返回 valueOf 的结果。
3. 其他情况，抛出错误。

```js
var arr = [1, 2];
var str = '123' + arr;
console.log(str); // 1231,2
```

**测试调用顺序的代码：**

toString 方法需要存在并且返回原始类型，那么如果返回的不是一个原始类型，则会去继续寻找对象的 valueOf 方法。

```js
var obj = {
  toString: function() {
    console.log('调用了 obj.toString');
    return {};
  },
  valueOf: function() {
    console.log('调用了 obj.valueOf');
    return '110';
  },
};

console.log(obj);
// 调用了 obj.toString
// 调用了 obj.valueOf
// 110
```

```js
var obj = {
  toString: function() {
    console.log('调用了 obj.toString');
    return '110';
  },
  valueOf: function() {
    console.log('调用了 obj.valueOf');
    return {};
  },
};

console.log(obj);
// 调用了 obj.toString
// 证明确实是先调用toString， 再调用toValue
```

如果这两个方法最终都不返回原始类型就会报错：// Uncaught TypeError: Cannot convert object to primitive value

### Number 类型转换

很多时候也会发生 Number 类型的转换（隐性转换）：

- 调用 Number() 函数，强制进行 Number 类型转换
- 调用 Math.sqrt() 这类参数需要 Number 类型的方法
- obj == 1 ，进行对比的时候
- obj + 1 , 进行运算的时候

**与 String 类型转换相似，但是 Number 类型刚好反过来，先查询自身的 valueOf 方法，再查询自己 toString 方法**。处理方式一致，都要检测返回的是不是原始值。

### Boolean 转换

什么时候会进行布尔转换呢：

- 布尔比较时
- if(obj) , while(obj) 等判断时

- undefined
- null
- -0
- 0 或+0
- NaN
- ""（空字符串）

**简单来说，除了下述 6 个值转换结果为 false，其他全部为 true（包括空数组[]，空对象{}）**：

### Function（对象）

控制输入函数名，最终打印的结果是函数调用了 valueOf 的方法，很关键。

函数转换是**先调用 valueOf 方法，再调用 toString 方法**；

## 应用

多层函数，累加计算。

```js
function add() {
  // console.log('进入add');
  var args = Array.prototype.slice.call(arguments); // 获取参数
  var fn = function() {
    var arg_fn = Array.prototype.slice.call(arguments); // 获取参数
    // console.log('调用fn');
    return add.apply(null, args.concat(arg_fn)); // 合并参数
  };
  // 最后不调用函数了，就认为是结束了，返回真实值
  fn.valueOf = function() {
    // console.log('调用valueOf');
    return args.reduce(function(a, b) {
      // 参数求和
      return a + b;
    });
  };
  return fn;
}
// 并没有调用呀？
add(1)(2); // 3
add(1, 2, 3)(10); // 16
add(1)(2)(3)(4)(5); // 15

add(1)(2)(3);
// 输出如下：
// 进入add
// 调用fn
// 进入add
// 调用fn
// 进入add
// 调用valueOf
// 6

// 只有最后一次调用才真正调用到 valueOf，而之前的操作都是合并参数，递归调用本身，由于最后一次调用返回的是一个 fn 函数，所以最终调用了函数的 fn.valueOf，并且利用了 reduce 方法对所有参数求和。
```

### 对于改写的函数

这里有个规律，如果只改写 valueOf() 或是 toString() 其中一个，**会优先调用被改写了的方法**，而如果两个同时改写，则会像 Number 类型转换规则一样，优先查询 valueOf() 方法，在 valueOf() 方法返回的是非原始类型的情况下再查询 toString() 方法。

## 用途

### 在 JavaScript 中， (a ==1 && a== 2 && a==3) 是否有可能为 true

利用松散相等运算符 == 的原理，自定义 toString 和 valueOf 返回对应值。

```js
const a = {
  i: 1,
  toString: function() {
    return a.i++;
  },
};
// 这里调用对象a与1进行比较，默认回调用对象a的toString方法
if (a == 1 && a == 2 && a == 3) {
  console.log('Hello World!');
}
// Hello World!
```

**松散相等的运算符 "=="**，默认触发类型转换

### parseInt(0.0000004)

重写 parseInt 方法，上边是错误的调用方式，正确的方式如下：`parseInt("0.0000004", 10)`

### ![]==[] // true，引用类型肯定不相等啊

引用类型，在堆内从中指向的位置不一样就不相同
计算步骤，先计算![]，结果为 false；（对象[]默认转换为 true，取反就是 false）
[]对象需要默认转换，调用 toString 方法得到的是“”
结果就是 false == “”，结果为真
![] === [] // 返回的结果是 false

### ['x','y'] == 'x,y' // true，默认调用了 toString 方法

默认调用 toString 方法（对象先调用 toString），返回“x,y”;
如果**调用 valueOf 方法，返回原始值** ["x", "y"]

### alert({name:'mofei'}) // "[object Object]"

默认调用 toString 方法。
