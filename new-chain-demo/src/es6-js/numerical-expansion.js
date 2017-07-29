//numerical-expansion
cg("************numerical-expansion.js************")

{
/**
 * 1.ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。
 * 2.ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
 * 3.Number.isInteger()用来判断一个值是否为整数。需要注意的是，
 * 在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
 * 4.ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
 * 5.Math.trunc方法用于去除一个数的小数部分，返回整数部分。
 * 6.Math.cbrt方法用于计算一个数的立方根。
 * 7.Math.hypot方法返回所有参数的平方和的平方根。
 * 8.ES7新增了一个指数运算符（**），目前Babel转码器已经支持。
 */

	cg(90071992547409930);

	cg(Math.pow(2, 53)+1);//超出无法准确表示
	cg("9007199254740993 === 9007199254740992:",9007199254740993 === 9007199254740992);
	cg("Math.hypot(3, 4, 5):",Math.hypot(3, 4, 5));     // 7.0710678118654755
	// cg("2 ** 200",2**20); //还是不被识别
}

cg("************numerical-expansion.js end************")