/**
 * @abstract 给数组分块
 * @param {array} arr 需要分块的数组
 * @param {number} size 分组长度
 */
const chunk = (arr, size) =>
  // from，用于格式化array，接受一个数组和一个格式化函数
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );

console.log('chunk:', chunk([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 6));
