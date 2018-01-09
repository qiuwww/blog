// test.js 这里需要改写toString  或者 toValue
var num =1;
function count(n){
	this.num*=n;
	console.log(typeof arguments.callee);
	return arguments.callee.bind(this);//最后一次迭代返回一个没有参数的函数		
}
console.dir(count(2)(2)(3)(4)(2)(3)(4)(2)(2)(3)(4));

