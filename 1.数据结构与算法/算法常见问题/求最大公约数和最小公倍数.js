// 计算A，B两个数的最大公约数和最小公倍数；

// test
// 辗转相除法
var minDiv = function (a, b) {
  if (a < b) {
    [a, b] = [b, a];
  }
  while (a % b !== 0) {
    [a, b] = [b, a % b];
  }
  return b;
};

// 短除法
// 两个数相乘，除以最大公约数就是最小公倍数
var maxMul = function (a, b) {
  return (a * b) / minDiv(a, b);
};

console.log(minDiv(1971, 2263), maxMul(1971, 2263));
console.log(minDiv(2262, 4370), maxMul(2262, 4370));
console.log(minDiv(12, 16), maxMul(12, 16));
