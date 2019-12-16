// 模拟new关键字创建对象

// 当代码 new Foo(...) 执行时，会发生以下事情：

// 1. 一个继承自 Foo.prototype 的新对象被创建。
// 2. 使用指定的参数调用构造函数 Foo ，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
// 3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。

// 构造函数返回值有如下三种情况：
// 1、返回一个对象
// 2、没有 return，即返回 undefined
// 3、返回undefined 以外的基本类型

function Car1(color) {
  this.color = color;
  return this;
}
function Car2(color) {
  this.color = color;
  return {};
}
function Car3(color) {
  this.color = color;
  // 默认返回这个对象
}

console.log("new Car1('blue')", new Car1('blue'));
console.log("new Car2('blue')", new Car2('blue'));
console.log("new Car3('blue')", new Car3('blue'));


// 第二版
function create() {
  // 创建一个空的对象
  var obj = new Object();
  // 获得构造函数，arguments中去除第一个参数
  // 输入的第一个参数是构造函数
  // arguments，这里arguments第一个被移除了
  var InputConstructor = [].shift.call(arguments);
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = InputConstructor.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  // 把arguments参数传给InputConstructor
  var ret = InputConstructor.apply(obj, arguments);
  // 优先返回构造函数返回的对象
  return typeof ret === 'object' ? ret : obj;
}

var car1 = create(Car1, 'black');

console.log('create(Car, "black")', car1);

// new Car1('blue') Car1 { color: 'blue' }
// new Car2('blue') {}
// new Car3('blue') Car3 { color: 'blue' }

// create(Car, "black") Car1 { color: 'black' }
