function Foo() {
	// 注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);} // 整体提升

//答案：
// 对象的静态方法，这里Foo.getName整体看作一个变量
Foo.getName();//2
// 函数声明提升，之后顺序执行被最后赋值的覆盖
getName();//4
// 此处实际上是将外层作用域内的getName函数修改了。也就是函数内部的变量，溢出为全局变量，
// 从而覆盖了原来的全局函数表达式getName，如果不运行Foo()，就不会覆盖4
Foo().getName();//1
// 直接调用getName函数，相当于 window.getName() ，
// 因为这个变量已经被Foo函数执行时修改了(区别于第二问的结果)，遂结果与第三问相同，为1
getName();//1
// 这里Foo.getName整体看作一个变量，点（.）的优先级高于new操作；new (Foo.getName)();
new Foo.getName();//2
// 首先看new运算符优先级括号高于（.），实际执行为(new Foo()).getName()；
// 自身没有getName方法，找到原型上的静态方法，所以是3
new Foo().getName();//3
// new ((new Foo()).getName)(); // (new Foo()).getName = function () { alert (3);};
new new Foo().getName();//3




// 如果改变Foo函数内的getName函数声明
function Foo() {
    var getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);} // 整体提升

// 答案：
Foo.getName();// 2
getName();// 4
Foo().getName();// 4 函数返回的this 等价于 window，故而结果为 最后一个赋值的函数表达式var getName = function () { alert (4);};
getName();// 4
new Foo.getName();//2
new Foo().getName();//3
new new Foo().getName();//3




function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
//undefined, 1, ,?
var b = fun(0).fun(1).fun(2).fun(3);//undefined,?,?,?
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);//undefined,?,?,?