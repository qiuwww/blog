/**
 * @abstract 二分法查找js代码实现
 * @param {array} srcArray 要搜索的数组
 * @param {number} des 要搜索的目标元素
 * @description 1. 排序之后，2. 从中间开始检索，每次对半调整索引
 */
function BinarySearch(srcArray, des) {
  // 应该先排一下序
  if (!Array.isArray(srcArray)) {
    return '第一个参数请传入数组';
  }
  srcArray = srcArray.sort(function(a, b) {
    return a - b;
  });
  console.log('排序之后的数组：', srcArray);

  var low = 0;
  var high = srcArray.length - 1;

  while (low <= high) {
    // 这里需要考虑middle为非整型的时候的问题, 这里其实向上取整与向下取整差别不大，查找的次数随机
    var middle = Math.floor((low + high) / 2);
    console.log('srcArray[middle]:', middle, srcArray[middle]);
    if (des == srcArray[middle]) {
      return middle;
    } else if (des < srcArray[middle]) {
      high = middle - 1; // 这里是为了移动中间值，每次移动一半
    } else {
      low = middle + 1;
    }
  }
  return -1;
}

var testArr = [1, 2, 5, 6, 4, 10, 20, 0, 8, 9];
console.log(BinarySearch(testArr, 8));
console.log(BinarySearch(testArr, 1));
