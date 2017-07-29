// deconstruction-assignment-of-variables.js
cg("*****deconstruction-assignment-of-variables.js****");
{
/**
 * 数组的解构
 * 如果解构不成功，变量的值就等于undefined。
 * 解构赋值允许指定默认值。
 */
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
cg("b",b)
cg("[foo, [[bar], baz]]",[foo, [[bar], baz]])
let [x = 1, y = x] = [1, 2]; // x=1; y=2

/**
 * 对象解构 
 * 注意区分模式与值
 */
let { foo2, bar2 } = { foo2: "aaa", bar2: "bbb" };
cg("foo2",foo2) // "aaa"
bar2 // "bbb"
var {x2:y2 = 3} = {x: 5};
cg("y2",y2) // 5
/**
 * 字符串的结构赋值
 * 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
 */
/**
 * 数值和布尔值的解构
 * 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
 * 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
 */

let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s2} = true;
s2 === Boolean.prototype.toString // true

/**
 * 函数参数的解构赋值
 */

/**
 * ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
 * （1）变量声明语句中，不能带有圆括号。
 * （2）函数参数中，模式不能带有圆括号。
 * （3）赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
 */

/**
 * 变量的解构赋值用途很多。
 *（1）交换变量的值
 *（2）从函数返回多个值
 *（3）函数参数的定义，解构赋值可以方便地将一组参数与变量名对应起来。
 *（4）提取JSON数据
 *（5）函数参数的默认值 config
 *（6）遍历Map结构
 *（7）输入模块的指定方法
 * 
 */
{
// [x, y] = [y, x];
// 返回一个数组

function example() {
  return [1, 2, 3];
}
// var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
// var { foo, bar } = example();


// 参数是一组有次序的值
// function f([x, y, z]) { ... }
// f([1, 2, 3]);

// 参数是一组无次序的值
// function f({x, y, z}) { ... }
// f({z: 3, y: 2, x: 1});

}
}
cg("*****deconstruction-assignment-of-variables.js end****");