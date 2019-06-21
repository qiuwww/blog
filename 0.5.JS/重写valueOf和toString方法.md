# 重写 valueOf 和 toString 方法

## Object.prototype.valueOf()

1. 用 MDN 的话来说，valueOf() 方法返回指定对象的**原始值**。
2. JavaScript 调用 valueOf() 方法用来把对象转换成**原始类型的值**（数值、字符串和布尔值）。但是我们很少需要自己调用此函数，valueOf 方法一般都会被 JavaScript 自动调用。

## Object.prototype.toString()

1. toString() 方法返回一个表示该对象的**字符串**。
2. 每个对象都有一个 toString() 方法，当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用。

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

> var obj = {name: 'Coco'};
>
> var str = '123' + obj;
>
> console.log(str);  // 123[object Object]

**转换规则：**

1. 如果 toString 方法存在**并且返回原始类型**，返回 toString 的结果。
2. **如果 toString 方法不存在或者返回的不是原始类型，调用 valueOf 方法**，如果 valueOf 方法存在，**并且返回原始类型数据**，返回 valueOf 的结果。
3. 其他情况，抛出错误。

> var arr = [1, 2];
>
> var str = '123' + arr;
>
> console.log(str); // 1231,2

**测试代码**

```js
var obj = {
  toString: function() {
    console.log("调用了 obj.toString");
    return {};
  },
  valueOf: function() {
    console.log("调用了 obj.valueOf");
    return "110";
  }
};

console.log(obj);
// 调用了 obj.toString
// 调用了 obj.valueOf
// 110
```

```js
var obj = {
  toString: function() {
    console.log("调用了 obj.toString");
    return "110";
  },
  valueOf: function() {
    console.log("调用了 obj.valueOf");
    return {};
  }
};

console.log(obj);
// 调用了 obj.toString
// 证明确实是先调用toString， 再调用toValue
```

toString 方法需要存在并且返回原始类型，那么如果返回的不是一个原始类型，则会去继续寻找对象的 valueOf 方法。

如果这两个方法最终都不返回原始类型就会报错：// Uncaught TypeError: Cannot convert object to primitive value

### Number 类型转换

很多时候也会发生 Number 类型的转换（隐性转换）：

- 调用 Number() 函数，强制进行 Number 类型转换
- 调用 Math.sqrt() 这类参数需要 Number 类型的方法
- obj == 1 ，进行对比的时候
- obj + 1 , 进行运算的时候

与 String 类型转换相似，但是 Number 类型刚好反过来，先查询自身的 valueOf 方法，再查询自己 toString 方法。处理方式一致，都要检测返回的是不是原始值。

### Boolean 转换

什么时候会进行布尔转换呢：

- 布尔比较时
- if(obj) , while(obj) 等判断时

**简单来说，除了下述 6 个值转换结果为 false，其他全部为 true（包括空数组[]，空对象{}）**：

- undefined
- null
- -0
- 0 或+0
- NaN
- ”（空字符串）

### Function（对象）

控制输入函数名，最终打印的结果是函数调用了 valueOf 的方法，很关键。

函数转换是先调用 valueOf 方法，再调用 toString 方法；

### Array.reduce

`reduce()`  方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```js
// accumulator：累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
// currentValue： 数组中正在处理的元素。当前元素，同item。
// currentIndex： 数组中正在处理的当前元素的索引。
// array：array本身的引用。
// initialValue： 如果没有提供初始值，则将使用数组中的第一个元素。初始值可写可不写，不谢就会少迭代一次√
[0, 1, 2, 3, 4].reduce(function(
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
initialValue);
```

```js
[0, 1, 2, 3].reduce(function(sum, value) {
  console.log(1);
  return sum + value;
}, 4);
4: 1
10

[0, 1, 2, 3].reduce(function(sum, value) {
  console.log(1)
  return sum + value;
});
3: 1
6
```

### 应用

多层函数

```js
function add() {
  console.log("进入add");
  var args = Array.prototype.slice.call(arguments); // 获取参数
  var fn = function() {
    var arg_fn = Array.prototype.slice.call(arguments); // 获取参数
    console.log("调用fn");
    return add.apply(null, args.concat(arg_fn)); // 合并参数
  };
  fn.valueOf = function() {
    console.log("调用valueOf");
    return args.reduce(function(a, b) {
      // 参数求和
      return a + b;
    });
  };
  return fn;
}
// add(1)(2) // 3
// add(1, 2, 3)(10) // 16
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
