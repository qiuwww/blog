# JavaScript Break 和 Continue

break 语句“跳出”循环。

continue 语句“跳过”循环中的一个迭代。

continue 语句（不论有无标签引用）只能用于跳过一个迭代。

break 语句，如果没有标签引用，只能用于跳出一个循环或一个 switch。

如果有标签引用，则 break 语句可用于**跳出任意代码块**。

```js
// break跳出任意代码块
// 代码块
block: {
  var a = 1;
  a++;
  console.log("a", a);
  // 可以删除测试
  break block;
  a++;
  console.log("a", a);
}
```

## 在 switch 中

```js
switch (new Date().getDay()) {
  case 0:
    day = "星期天";
    break;
  case 1:
    day = "星期一";
    break;
  case 2:
    day = "星期二";
    break;
  case 3:
    day = "星期三";
    break;
  case 4:
    day = "星期四";
    break;
  case 5:
    day = "星期五";
    break;
  case 6:
    day = "星期六";
  default:
    console.log("计算错误");
}
```

## for 循环中

```js
for (let i = 0; i < 10; i++) {
  if (i === 6) {
    console.log(`break 语句“跳出”循环，种植循环。`);
    break;
  }
  if (i === 3) {
    console.log(`continue 语句“跳过”循环中的一个迭代，后续迭代还会执行`);
    continue;
  }
  console.log("i", i);
}
```

## forEach

对比于 for 循环，有 forEach、some、every、map、filter、

首先说一下 forEach 有的也叫**增强 for 循环**，foreach 其实是 for 循环的一个特殊简化版。

foreach 适用于**循环次数未知**，或者计算**循环次数比较麻烦情况下使用效率更高**，但是更为复杂的一些循环还是需要用到**for 循环效率更高**。

```js
new Array(10).fill("").forEach((item, index) => {
  // 这里的break与continue都是非法语句，不能使用
  // if(index === 3){
  //   break;
  // }
  // if(index === 6){
  //   continue;
  // }
  // 这里的return是可以终止当前一次的后续执行，相当于continue
  if (index === 7) {
    return;
  }
  console.log(item, index);
});
```

如果需要终止遍历，实现 break 的作用，可以使用 every 来遍历，需要终端就返回 false，继续循环就返回 true。

对应的可以使用 some。

```js
new Array(10).fill("").every((item, index) => {
  if (index === 6) {
    console.log("这里every循环终止");
    return false;
  }
  console.log(item, index);
  return true;
});
```

```js
new Array(10).fill("").some((item, index) => {
  if (index === 6) {
    console.log("这里every循环终止");
    return true;
  }
  console.log(item, index);
  return false;
});
```

## for of 与 for in

for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。

break 与 continue 的使用基本与 for 循环一致。

### 二者的区别

for...in 语句以**任意顺序**迭代对象的**可枚举属性**。
for...of 语句**遍历**可迭代对象定义**要迭代的数据**。

```js
const array = ["a", "b", "c", "d", "e", "f"];
const obj = { a: "a", b: "b", c: "c" };
for (const value of array) {
  if (value === "e") {
    console.log("break 终止循环");
    break;
  }
  if (value === "b") {
    console.log("continue 跳出当前次循环");
    continue;
  }
  console.log(value);
}

for (const key in array) {
  if (key === 1) {
    console.log("break 不能停止循环");
    break;
  }
  if (key === 3) {
    console.log("continue 不能跳出当前次循环");
    continue;
  }
  console.log(key, array[key]);
}

for (const key in obj) {
  console.log(key);
}
```

## while

```js
let i = 0;
while (i < 10) {
  // i++;
  ++i;
  if (i === 3) {
    console.log("continue 跳出本次循环");
    continue;
  }
  if (i === 6) {
    console.log("break 终止循环");
    break;
  }
  console.log("数字是: ", i);
}
```
