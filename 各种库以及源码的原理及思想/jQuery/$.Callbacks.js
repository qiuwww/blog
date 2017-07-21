// $.Callbacks.js
// http://www.2cto.com/kf/201503/385781.html 
1. 创建对象

// 默认方式创建callback
var callbacks = $.Callbacks();
 
// 4种形式的callback:once、unique、stopOnFalse、memory
var onceCallbacks = $.Callbacks('once');
var uniqueCallbacks = $.Callbacks('unique');
var stopOnFalseCallbacks = $.Callbacks('stopOnFalse');
var memoryCallbacks = $.Callbacks('memory');


每次调用$.Callbacks()方法，返回的都是不同的Callbacks对象。
即这是一个工厂方法，每次调用都会新建一个对象，对象之间是相互独立的。

2. 添加和删除回调函数

Callbacks对象其实就是一个函数队列，获得Callbacks对象之后 ，就可以向这个集合中增加或者删除函数。
add和remove功能相反，函数参数是相同的，empty()删除回调列表中的所有函数。

function fn1( value ) {
  console.log("fn1:" + value );
}
  
function fn2( value ) {
  console.log( "fn2:" + value );
}
 
 var callbacks = $.Callbacks();
 
 // 方式1:添加1个单独函数
  callbacks.add( fn1 );
  callbacks.add( fn2 );
 
// 方式2:添加多个函数
  callbacks.add(fn1,fn2);
 
// 方式3:添加函数数组
  callbacks.add([fn1,fn2]);
 
// 方式4 函数和数组混合
  callbacks.add(fn1, [fn2]);

可以看到add/remove可以支持多种类型的参数列表，我们可以根据需要自由选择。

关于add有几点需要说明：
1、同一个函数可以多次通过add()添加到Callbacks中，执行的时候该函数也会多次执行。
2、如果add()添加的是匿名函数，那么不能通过remove()删除。
3、如果函数fn1通过add()添加了多次，那么remove()之后，这多次添加都会被删除。
4、remove一个不存在的函数没有任何效果。

3. 触发回调函数

fire()和fireWith()还有一个重要区别，
fireWith能够改变函数执行上下文，而fire上下文固定是Callbacks对象。

function fn(a) {
    console.log(this); 
    console.log("a="+a); 
}
 
var callbacks = $.Callbacks();
callbacks.add(fn);
 
callbacks.fire(1);//a=1,this就是callbacks对象
 
var me = {"name":"aty","age":26};
callbacks.fireWith(me,[2]);//a=2,this是me

4. Callbacks对象的状态判断

判断Calllbacks对象的状态相关API有has()、disabled()、locked()、fired()。

disabled()和locked()判断Callbacks对象是否处于disabled状态或是locked状态。
可以通过disable()、locke()改变Callbacks对象的状态。
这个地方有点奇怪，一旦将Callbacks禁用或者锁定，那么就无法再恢复。

5. 创建Callbcks对象时的4种类型

