function comp(n) {
  return (2 * n * 2 * n) / (2 * n - 1) / (2 * n + 1);
}

/**
 * @abstract 割圆术计算圆周率
 * @param {number} side 边的个数
 */
function getpai(side) {
  let res = 2;
  for (let i = 1; i <= side; i++) {
    res = comp(i) * res;
  }
  return res;
}

console.log('10:', getpai(10));
console.log('100:', getpai(100));
console.log('10000000:', getpai(10000000));
console.log('100000000:', getpai(100000000));
