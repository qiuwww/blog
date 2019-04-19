// new操作符具体干了什么？
// new共经历了四个过程。

// (1) 创建一个新对象；
// (2) 将构造函数的 作用域赋给新对象 （因此 this 就指向了这个新对象）；
// (3) 执行构造函数中的代码（为这个新对象添加属性）；
// (4) 返回新对象。

var fn = function() {
  this.a = 123;
  return this;
};
var fnObj = new fn();

// 1、创建了一个空对象obj
var obj = new Object();

// 2、设置原型链，设置生成的对象的原型等于构造函数的原型
obj._proto_ = fn.prototype;

// 3、让fn的this指向obj，并执行fn的函数体，这个时候绑定了this。这里call得到运行的结果
var result = fn.call(obj); // 我们将fn函数对象的this指针替换成obj

// 4、判断fn的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。
if (typeof result == "object") {
  fnObj = result; // 有返回值
} else {
  fnObj = obj; // 无返回值的时候
}
