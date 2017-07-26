

/**
 * 箭头函数需要关注有参数和无参数的情况；
 * 单个的return与多条语句操作的情况；
 * 最主要的是关注this的指向问题
 */

let odds = evens.map(v => v + 1);

odds([1,2,3,5]);


/**
 * this的问题
 */
普通函数中的this:

// 1. this总是代表它的直接调用者, 例如 obj.func ,那么func中的this就是obj;
// 2. 在默认情况(非严格模式下,未使用 'use strict'),没找到直接调用者,则this指的是 window;
// 3. 在严格模式下,没有直接调用者的函数中的this是 undefined;
// 4. 使用call,apply,bind(ES5新增)绑定的,this指的是 绑定的对象;



箭头函数中的this

1. 默认指向在定义它时,它所处的对象,而不是执行时的对象

var obj = {
	say: function () {
	  	setTimeout(() => {
	    	console.log(this)
	  	});
	}
}
obj.say(); // obj,处在当前obj对象之下

var obj = {
	say: function () {
	  	setTimeout(function(){
	    	console.log(this)
	  	});
	}
}
obj.say(); // window对象，因为匿名函数执行在全局


2. 多层箭头函数嵌套  

  // 多层箭头函数嵌套，指向所处的对象，强调定义的位置	
  var obj = {
    say: function () {
      var f1 = () => {
        console.log(this); // obj
        setTimeout(() => {
          console.log(this); // obj
        })
      }
      f1();
    }
  }
  obj.say()

  // 非连续多层嵌套函数
  var obj = {
    say: function () {
      var f1 = function () {
        console.log(this);    // window, f1调用时,没有宿主对象,默认是window
        setTimeout(() => {
          console.log(this); // window
        })
      };
      f1();
    }
  }
  obj.say()


  // 多个this的形式
  var obj = {
  	name: 'outer',
    say: function () {
      var f1 = () => {
        console.log("f1: ", this); // f1:  Object {name: "outer", objInner: Object}
        setTimeout(() => {
          console.log("setTimeout-1: ", this); // setTimeout-1:  Object {name: "outer", objInner: Object}
        })
      }
      f1();
    },
    objInner: {
    	name: 'inner',
    	sayThis: function () {
	    	var f2 = () => {
	    		console.log("f2: ", this);// f2:  Object {name: "inner"}
	    		setTimeout(() => {
	    			console.log("setTimeout-2: ", this);// setTimeout-2:  Object {name: "inner"}
	    		})
	    	}  
	    	f2();  		
    	}    	
    }
  }
  obj.say();
  obj.objInner.sayThis()
  // 返回结果，也就是说，这里的this指向只在新对象出现的时候才会有区分
  f1:  Object {name: "outer", objInner: Object}
  f2:  Object {name: "inner"}

  setTimeout-1:  Object {name: "outer", objInner: Object}
  setTimeout-2:  Object {name: "inner"}




箭头函数中的this说明：

1. 生来局部
	箭头函数 => 所改变的并非把 this 局部化，而是完全不把 this 绑定到里面去；
	虽然 => 箭头函数没有一个自己的 this，但当你在内部使用了 this，
	常规的局部作用域准则就起作用了，它会指向最近一层作用域内的 this。

	变成一个局部变量，依次向上查找；

function foo() {
   return () => {
      return () => {
         return () => {
            console.log("id:", this.id);
         };
      };
   };
}

foo.call( { id: 42 } )()()();
// id: 42

// 这些接连内嵌的函数们都没有声明它们自己的 this，所以 this.id 的引用会简单地顺着作用域链查找，
// 一直查到 foo() 函数，它是第一处能找到一个确切存在的 this 的地方。

// 说白了跟其它局部变量的常规处理是一致的！


2. 不仅仅是this

	箭头函数里并不按常规支持 var self = this 或者 .bind(this) 这样的糖果。
	事实上 =>箭头函数并不绑定 this，arguments，super(ES6)，抑或 new.target(ES6)。
	这是真的，对于上述的四个（未来可能有更多）地方，箭头函数不会绑定那些局部变量，
	所有涉及它们的引用，都会沿袭向上查找外层作用域链的方案来处理。






//  保存当前函数的上下文环境，以便后边使用
var context = this;



/**
 * 测试默认参数
 */
function fn(x, y = 'world'){
    console.log(`${x} ${y}`);
} 
fn('hello');// hello world
fn('hello', 'qiu');// hello qiu
fn('hello', '');// hello 

/**
 * rest求和函数,参数不定
 */
function add(...args){
    let sum = 0;
    if(Array.isArray(args)){
        for(let val of args){
            sum += val;
        }
    } 
    return sum;
}
add(1,2,3,3,3,3,3,3,3,3,5,3);

// 参数数组替代
使用rest来替代arguments，会语法更简单一些


ES5替代方法
let arguments = [1,2,3];
Array.prototype.slice.call(arguments) -> (...arguments)
function testArguments(a, b, c){
    console.log('arguments: ', arguments);//  类数组 
    console.log('Array.prototype.slice.call(arguments): ', Array.prototype.slice.call(arguments));// [1, 2, 3]
    console.log('...arguments: ', ...arguments);//  1 2 3
}
testArguments(1,2,3);

Math.max.apply(null, [1,2,3]) -> Math.max(...[1,2,3]);

new Date(...[2017, 12, 12]) -> new (Date.bind.apply(Date, [null, 2017, 12, 12]))
// Fri Jan 12 2018 00:00:00 GMT+0800 (中国标准时间)



// 尾递归
// 注意stack overflow

// 阶乘计算：

/**
 * 这个时候需要保存n个调用记录，复杂度为O(n);
 */

function factorial(n){
  if(n === 1){
    return 1;
  }
  return n * factorial(n - 1);
}
factorial(10);


function endFactorial(m, total){
  if(m === 1){
    return total;
  }
  return endFactorial(m -1, m * total);
}
endFactorial(10, 1);




