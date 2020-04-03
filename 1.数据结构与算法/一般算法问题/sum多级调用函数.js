/**
 * 函数求和，参数不固定
 */
function sum(...args) {
  console.log('args', args);
  // 这里的三个点...是扩展运算符，该运算符将一个数组，变为参数序列。
  if (args.length == 1) {
    // 判断参数个数的形式是否为1个，即第二种形式
    var cache = [...args][0]; // 将第一个参数的值暂存在cache中
    var add = function(y) {
      console.log('y', y);
      // 创建一个方法用于实现第二个条件，最后并返回这个方法
      cache += y;
      return add;
    };
    return add;
  } else {
    // 这里就是参数的第一种形式
    var res = 0; // 这里最好先声明要输出的变量，并给其赋值，不然值定义而不赋值会输出NaN，因为js将undefined+number两个数据类型相加结果为NaN
    for (var i = 0; i < [...args].length; i++) {
      res += [...args][i]; //参数累加
    }
    console.log(res); // 输出最后的累加结果
    return res;
  }
}
console.log('sum(2, 3, 4)##:', sum(2, 3, 4)); // 9
// @ts-ignore
console.log('sum(2)(3)(4)(5)##:', sum(2)(3)(4)(5)); // 5//9//14
