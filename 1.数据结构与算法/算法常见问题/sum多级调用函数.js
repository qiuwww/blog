/**
 * 函数求和，参数不固定
 */
function add() {
  // console.log('进入add');
  // 第一次循环的结果
  var args1 = Array.prototype.slice.call(arguments); // 获取参数
  // 迭代函数
  var fn = function () {
    // 后续的参数
    var args2 = Array.prototype.slice.call(arguments); // 获取参数
    // console.log('调用fn');
    // 这里是累加参数，最终计算的时候 args1 => [1, 2, 3, 4,...]
    return add.apply(null, args1.concat(args2)); // 合并参数
  };

  // 最后不调用函数了，就认为是结束了，返回真实值
  // 这里没有使用到闭包，中间状态都存在了args1上
  fn.toString = function () {
    // console.log('调用valueOf');
    return args1.reduce(function (a, b) {
      // 参数求和
      return a + b;
    }, 0);
  };
  return fn;
}

console.log('sum(2, 3, 4)##:', add(2, 3, 4)); // 9
// @ts-ignore
console.log('sum(2)(3)(4)(5)##:', add(2)(3)(4)(5)); // 5//9//14
