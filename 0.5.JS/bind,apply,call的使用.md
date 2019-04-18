# bind,apply,call的使用

## 接口规范

### bind

bind()方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。

```js
// function.bind(thisArg[, arg1[, arg2[, ...]]])
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```

### apply

apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

```js
// func.apply(thisArg, [argsArray])
// thisArg: 在 fun 函数运行时指定的 this 值。
var numbers = [5, 6, 2, 3, 7];
var max = Math.max.apply(null, numbers);
console.log(max);
// expected output: 7
var min = Math.min.apply(null, numbers);
console.log(min);
// expected output: 2
```

### call

call() 方法使用一个指定的 this 值和**单独给出的一个或多个参数来调用一个函数**。

> 该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，而 apply() 方法接受的是一个包含多个参数的数组。

```js
// fun.call(thisArg, arg1, arg2, ...);
// thisArg: 在 fun 函数运行时指定的 this 值。
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
var arr = [5, 6, 2, 3, 7];
Math.max.call(null, ...arr);
```

## bind函数的实现原理

```js
Function.prototype.bind = function (context) {  
  // 调用Array的方法来切割伪数组对象arguments  
  // 由此获此bing()方法传进来的第二个及以后的参数  
  var args = Array.prototype.slice.call(arguments, 1);  
  return function () {  
    return this.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};
```
