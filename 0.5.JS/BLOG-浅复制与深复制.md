---
title: 浅复制与深复制
date: 2017-7-13
tags:
  - JS
  - 浅复制与深复制
categories:
  - [JS, 浅复制与深复制]
top: 6
---

## 测试拷贝对象

```js
var obj1 = {
  a: {
    c: /a/,
    e: undefined,
    b: null,
    function() {
      console.log(this.c);
    },
  },
  b: function () {
    console.log(this.a);
  },
  c: [
    {
      a: 'c',
    },
    'a',
    3,
  ],
  d: /b/,
  e: 'asd',
  f: 123,
  g: false,
  h: null,
  i: Symbol('i'),
  j: new Map(),
  k: new Set(),
};
// 测试循环引用
obj1.l = obj1;
```

## 浅拷贝（shallowcopy）

浅复制是**复制引用**，复制后的引用都是**指向同一个对象的实例**，彼此之间的操作会互相影响。

## 深拷贝（deepcopy）

JavaScript **存储对象都是存地址的**，所以浅拷贝会导致 obj1 和 obj2 指向同一块内存地址。改变了其中一方的内容，都是在原来的内存上做修改会导致拷贝对象和源对象都发生改变，**而深拷贝是开辟一块新的内存地址**，将原对象的各个属性逐个复制进去。对拷贝对象和源对象各自的操作互不影响。

深复制不是简单的复制引用，**而是在堆中重新分配内存，并且把源对象实例的所有属性都进行新建复制，**以保证深复制的对象的引用图不包含任何原有对象或对象图上的任何对象，复制后的对象与原来的对象是**完全隔离**的。

## 对象拷贝，实现方案

### 1. JSON.parse(JSON.stringify(obj))，（假的深复制，无法处理 function），对 json 使用比较方便

**这里不能处理 function 类型、正则表达式类型的变量**。

会有如下的问题：

1. 非数组对象的属性不能保证以**特定的顺序**出现在序列化后的字符串中。
2. 布尔值、数字、字符串的包装对象在序列化过程中**会自动转换成对应的原始值(valueOf)**。
3. **undefined、任意的函数以及 symbol 值**，在序列化过程中**会被忽略**（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
4. 所有**以 symbol 为属性键的属性都会被完全忽略掉**，即便 replacer 参数中强制指定包含了它们。
5. **不可枚举的属性会被忽略**。
6. **循环引用情况下**，会报错。
7. new Date 情况下，转换结果不正确。

这种方法使用较为简单，**可以满足基本的深拷贝需求**，而且能够处理 JSON 格式能表示的所有数据类型，但是对于**正则表达式类型、函数类型等无法进行深拷贝**(而且会直接丢失相应的值)。

还有一点不好的地方是它**会抛弃对象的 constructor**。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成 Object。同时如果对象中存在循环引用的情况也无法正确处理。

### 2. Object.assign 方法（浅复制），属性拷贝，...运算表现一致

扩展一个空对象就有了；

Object.assign() 方法可以把任意多个的源对象自身的**可枚举属性\*\***拷贝\*\*给目标对象，然后返回目标对象。

```js
var x = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3],
};
var y = Object.assign({}, x);
console.log(y.b.f === x.b.f); // true
x?.c.push(4);
console.log(y?.c); // [1, 2, 3, 4]
// 这个时候看似，x对象与y对象不相等，但是 他们内部的元素的非引用类型还是会指向相同的位置，也就是说其实assign是一个浅复制。
```

### 3. Array 的 slice 和 concat 方法（浅复制）

不修改原数组，只会返回一个**浅复制**了原数组中的元素的一个新数组。**之所以把它放在深拷贝里，是因为它看起来像是深拷贝。而实际上它是浅拷贝**。相当一新增了一个指向变量，但是与原变量不同，指向的位置还是相同的。

```js
var a = [1, 2, { c: 3 }];
var b = a.slice();
console.log(b);
a[2]['c'] = 4;
console.log(b); // a[2]是一个指向
```

### 4. jquery 中的 clone 方法的浅复制是只复制元素，不复制相关事件，深复制，是复制事件

## 真正意义上的深拷贝（浅拷贝+递归，递归引用类型）

把深层的属性也拷贝一份。

**深层迭代**，注意区分 array 和 obj 对象的嵌套（深复制）。

1. 判断类型，进行**深层迭代，toString**；
2. 注意区分的类型：
   1. null: 直接赋值；
   2. 一般类型，string、number、boolean；
   3. function: `return new Function('return ' + obj.toString())();`
   4. object/array，**使用 for in 循环**，对象和数组，判断元素类型，如果是就递归调用 copy 函数；
   5. Date 对象,正则，以及函数；？？
   6. es6 中 Map 和 Set 的拷贝；？？
   7. 考虑 Symbol。？？
3. 避免递归爆栈；

```js
var $ = (function () {
  'use strict';
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }
  for (var i = types.length; i--; ) {
    $['is' + types[i]] = (function (self) {
      return function (elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }
  return $;
})(); //类型判断

// 注意$别被重置了
// 迭代循环调用实现深层复制
function deepClone(target) {
  var result;
  // 1. 这里认为是基本类型可以直接复制
  if (target === null || typeof target !== 'object') {
    result = target;
    // 2. object的函数类型
  } else if ($.isFunction(target)) {
    // new Function ([arg1[, arg2[, ...argN]],] functionBody)
    // Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。
    result = new Function('return ' + target.toString())();
    // bind方法是不是也可以呀
    // return obj.bind(null)
    // 3. object & array
  } else if ($.isArray(target) || $.isObject(target)) {
    result = $.isArray(target) ? [] : {};
    // for...对于obj和arr都适用
    // 数组与对象的每一个类型都重新deepCopy
    var value;
    for (let key in target) {
      value = target[key];
      console.log('for in', key, value);
      if ($.isArray(value) || $.isObject(value)) {
        result[key] = deepClone(value);
      } else if ($.isFunction(value)) {
        result[key] = new Function('return ' + value.toString())();
      } else {
        result[key] = value;
      }
    }
    // 4. regexp等
  } else {
    result = target;
  }
  return result;
}

var obj1 = {
  a: {
    c: /a/,
    e: undefined,
    b: null,
    function() {
      console.log(this.c);
    },
  },
  b: function () {
    console.log(this.a);
  },
  c: [
    {
      a: 'c',
    },
    'a',
    3,
  ],
  d: /b/,
  e: 'asd',
  f: 123,
  g: false,
  h: null,
  i: Symbol('i'),
  j: new Map(),
  k: new Set(),
};
var obj2 = deepClone(obj1);
console.log('##obj2:', obj2);
console.log(obj2.c === obj1.c);
console.log(obj2.d === obj1.d);
console.log(obj2.c[2] === obj1.c[2]);
console.log(obj2.c[0] === obj1.c[0]);
```

## lodash 深拷贝实现原理

**位掩码技术**，是一种很棒的思想，可以写出更为简洁的代码，运行得也更快。对象的判断，需要特别注意 null，它的 typeof 值 也是 object。正则的 exec() 方法会返回一个结果数组或 null，其中就会有 index 和 input 属性。

cloneDeep 中囊括了各种类型的深拷贝方法，比如 node 中的 buffer，类型数组等。用了栈的思想，解决循环引用的问题。Map 和 Set 的添加元素方法比较类似，分别为 set 和 add。NaN 是不等于自身的。

```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;
const CLONE_SYMBOLS_FLAG = 4;

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

const PERMISSION_A = 1; // 0001
const PERMISSION_B = 2; // 0010
const PERMISSION_C = 4; // 0100
const PERMISSION_D = 8; // 1000

// 当一个用户同时拥有 权限A 和 权限C 时，就产生了一个新的权限
const mask = PERMISSION_A | PERMISSION_C; // 0101，十进制为 5

// 判断该用户是否有 权限C，可以取出 权限C 的位掩码
if (mask & PERMISSION_C) {
    ...
}

// 该用户没有 权限A，也没有 权限C
const mask2 = ~(PERMISSION_A | PERMISSION_C); // ~0101 => 1010

// 取出 与权限A 不同的部分
const mask3 = mask ^ PERMISSION_A; // 0101 ^ 0001 => 0100

function baseClone(value, bitmask, customizer, key, object, stack) {
  let result;
  // 根据位掩码，切分判断入口
  const isDeep = bitmask & CLONE_DEEP_FLAG;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG;

  // 自定义 clone 方法，用于 _.cloneWith
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }

  // 过滤出原始类型，直接返回
  if (!isObject(value)) {
    return value;
  }

  const isArr = Array.isArray(value);
  const tag = getTag(value);
  if (isArr) {
    // 处理数组
    result = initCloneArray(value);
    if (!isDeep) {
      // 浅拷贝数组
      return copyArray(value, result);
    }
  } else {
    // 处理对象
    const isFunc = typeof value == 'function';

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
          : copySymbols(value, Object.assign(result, value));
      }
    } else {
      if (isFunc || !cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // 用 “栈” 处理循环引用
  stack || (stack = new Stack());
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  // 处理 Map
  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  // 处理 Set
  if (tag == setTag) {
    value.forEach(subValue => {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    return result;
  }

  // 处理 typedArray
  if (isTypedArray(value)) {
    return result;
  }

  const keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : isFlat ? keysIn : keys;

  const props = isArr ? undefined : keysFunc(value);

  // 遍历赋值
  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });

  return result;
}
```

## 使用 MessageChannel 进行深拷贝

简单来说，MessageChannel 创建了一个通信的管道，**这个管道有两个端口**，每个端口都可以通过 postMessage 发送数据，而一个端口只要绑定了 onmessage 回调方法，就可以接收从另一个端口传过来的数据。

```js
function deepClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
}

// 注意该方法是异步的 // 可以处理 undefined 和循环引用对象
const test = async () => {
  const obj2 = await deepClone(obj1);
  obj1.f = 333333;
  console.log('change after', obj1, obj2);
};
test();
```

这里的问题：

1. 不支持复制函数；
2. 不支持 Symbol；

## 参考文章

1. [js 如何实现一个对象的深拷贝](https://juejin.cn/post/6844904170332356616)
