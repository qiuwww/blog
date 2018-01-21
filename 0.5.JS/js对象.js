
// new 操作符具体干了什么？
// new共经历了四个过程。

var fn = function () { };
var fnObj = new fn();

// 1、创建了一个空对象
var obj = new object();

// 2、设置原型链
obj._proto_ = fn.prototype;

// 3、让fn的this指向obj，并执行fn的函数体
var result = fn.call(obj);

// 4、判断fn的返回值类型，如果是值类型，返回obj。如果是引用类型，就返回这个引用类型的对象。
if (typeof(result) == "object"){  
    fnObj = result;  
} else {  
    fnObj = obj;
}  