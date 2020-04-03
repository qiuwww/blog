/**
 * @abstract 初始化二维数组
 * @param {number} h 二维数组的行数
 * @param {number} w 二维数组 列数
 * @param {any} val 初始值
 */
const initialize2DArray = (h, w, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));
console.log(initialize2DArray(2, 3, '*')); // [[0,0], [0,0]]
