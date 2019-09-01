// js代码review.js

数组copy：
bad：1.  单个元素取值->赋值
good: 2. var newArr = arr.slice();

字符串都是用单引号 ''
var str = 'this is a string';
等号||比较符号||加号，前后都留空格 = == === < > <= >= + ; , ()
var str2 = 'this is anthor string';
str == str2;
str === str2;

逗号后边留空格,函数括号后边留空格
function fn(arg1, arg2) {
	return
}

对象声明
var obj = {
	key1: 'value1',
	key2: 'value2'
}

类数组转数组：
var argArr = Array.prototype.slice.call(arguments);
原理就像是：-(-'20')

长字符串，分段相加：
var str = 'first line' +
	'second line' +
	'third';

函数表达式声明：
var fn1 = function fn2() {
	return 'fn1,fn2 undefined'
}

对比两种字符串拼接方式：

function add(len) {
	var date1 = new Date().getTime();
	var lis = '';
	new Array(len).fill(10).forEach(function (item,index) {
		lis += '<li>' + item + '</li>';
	});
	var str = '<ul>' + lis + '</ul>';
	// console.log(str);
	console.log("1", new Date().getTime() - date1);
}
add(100000);
// 确实下边这种方式快一点
function arr(len) {
	var date1 = new Date().getTime();
	var items = [];
	for(var i = len; i >= 0; i--){
		items.push('<li>' + i + '</li>');
	}
	var str = '<ul>' + items.join('') + '</ul>';
	// console.log(str);
	console.log("2", new Date().getTime() - date1);
}
arr(100000);

不要在一个代码块内声明一个函数（ 会提升整个函数），可以使用变量赋值形式(到这个地方才可以使用，别的地方时undefined)。

声明提升，但是赋值操作不会；var
function 声明会提升变量名及赋值，匿名函数不会

注释都在上边，区分单行注释与块注释

jquery 链式调用，按功能换行

代码块末尾添加空行

分号，最好在行尾都添加一个

函数命名使用驼峰式

不要使用保存this方式来传递上下文环境，使用bind
function outer(arg) {
	return function (){
		console.log(this)
	}.bind(this);
}
// 全局调用
outer()();

// 原型方法：
function People (name, age) {
	this.age = age;
	this.name = name;
}
// 添加原型方法
People.prototype.sayName = function (){
	alert(this.name);
	// 方便方法的链式操作
	return this;
}
People.prototype.sayAge = function (){
	alert(this.age);
	return this;
}
var  xiaoming = new People ("xiaoming", 20);
xiaoming.sayAge().sayName();

// html属性用双引号，字符串用单引号。


// 函数声明

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
  };

  // good， 默认参数
function handleThings(opts = {}) {
    // ...
  }
