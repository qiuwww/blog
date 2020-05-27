// 不使用 / 和 * 实现除法

// 1. 使用减法
// 2. 使用多叉树，最后就是一个满叉树的层级？
// 3. 二分法查找，每次倍二，然后判断一个范围，在这个范围内，继续使用二分法查找，就可以确定了。这其实就是一个禁止问题的计算，先抛掉余数，不断的进行除数进制计算。使用二进制也可以，三进制也可以。使用位运算。
// 4. 小学除法计算，按位计算，且分为字符串，然后借位操作，这样似乎不需要乘除

// https://leetcode-cn.com/problems/divide-two-integers/

// 减法处理
// 这样循环会超时
var divide1 = function (dividend, divisor) {
  let flag = true,
    res = 0;
  if (divisor < 0) {
    flag = !flag;
    divisor = -divisor;
  }
  if (dividend < 0) {
    flag = !flag;
    dividend = -dividend;
  }

  while (dividend >= divisor) {
    dividend = dividend - divisor;
    res++;
  }
  return flag ? res : -res;
};
console.log(divide1(1000, 3));
console.log(divide1(-2147483648, -1));

// 小学除法

// Number.MAX_SAFE_INTEGER
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide2 = function (dividend, divisor) {
  let flag = true,
    res = 0, i = 0, bit, cur, len;
  if (divisor < 0) {
    flag = !flag;
    divisor = -divisor;
  }
  if (dividend < 0) {
    flag = !flag;
    dividend = -dividend;
  }

  dividend = dividend.toString();


  while(divisor < dividend) {
    len = dividend.length;
    cur = dividend.charAt(i);


    while (cur >= divisor) {
      cur = cur - divisor;
      res+;
    }

    i++;

  }


  return flag ? res : -res;

};
