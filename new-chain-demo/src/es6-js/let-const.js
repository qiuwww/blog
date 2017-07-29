
(function(){
cg("*****************let-const.js***************");	
//var 
var b=[];
for(var j=0;j<10;j++){
	b[j] = j;
}
console.log("var",b[7]);
//let
let a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log("let",i);
  };
}
a[6](); 

/**
 * 不存在变量提升，“暂时性死区”（temporal dead zone，简称 TDZ）；
 * 只在最近的{}内有效,块级作用域；
 * “暂时性死区”也意味着typeof不再是一个百分之百安全的操作。有可能会返回 ReferenceError
 */
console.log("typeof x",typeof x); // ReferenceError,这里编译之后不会报错，会提示undefined
let x;
   
//函数参数默认值
let bar = (x=2,y=x)=>{return [x,y]}

cg(bar());

/**
 * 块级作用域的有点：
 * 1.避免变量覆盖，内层变量可能会覆盖外层变量；
 * 2.避免for循环内变量，邪路为全局变量；
 * 3.实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。
 */
cg(1);

/**
 * ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用。
 * 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。
 */
// ES5严格模式
'use strict';
if (true) {
  function f() {}
}
// 报错
// ES6严格模式
'use strict';
if (true) {
  function f() {}
}
// 不报错
/**
 * 本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。
 */


/**
 * const
 * const声明一个只读的常量。一旦声明，常量的值就不能改变。
 * const一旦声明变量，就必须立即初始化，不能留到以后赋值。
 * 对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。
 * const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，
 * 所以将一个对象声明为常量必须非常小心。
 */

// 如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
// foo.prop = 123;//Can't add property prop, object is not extensible
// 下面是一个将对象彻底冻结的函数。
let constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

/**
 * ES6一共有6种声明变量的方法：
 * 1.var
 * 2.function
 * 3.let
 * 4.const
 * 5.import
 * 6.class
 */

/**
 * 顶层对象，在浏览器环境指的是window对象，在Node指的是global对象。
 * 顶层对象的属性与全局变量挂钩，被认为是JavaScript语言最大的设计败笔之一。
 */
//从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
window.g = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
cg("window.g",window.g) // 1

let k = 1;
cg("window.k",window.k) // undefined

/**
 * 在 web浏览器   node   web worker中都取到全局变量
 */
// 方法一
var g = (typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
cg("g",g);
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
cg("getGlobal()",getGlobal())

cg("*****************let-const.js结束***************");
})();//似乎加一个大括号就好啊，O(∩_∩)O~
