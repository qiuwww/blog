/**
 * @description 其实就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术。
 */

function curry(f) {
  // curry(f) 执行柯里化转换
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}

// 用法
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert(curriedSum(1)(2)); // 3

/**
 * @description 偏函数 偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。
 */

function add(a, b, c) {
  return a + b + c;
}
let partialAdd = partial(add, 1);

partialAdd(2, 3);
