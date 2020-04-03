/**
 * @abstract 最大平均值子数组，获取长度为k的子数组，均值最大
 * @param {*} arr 数组
 * @param {*} k 子数组长度
 * @description 每移动一次，计算一次平均值，如果大于当前的平均值就使用，否则就继续下一循环
 */
var getLargestAverageSubarray = (arr, k) => {
  if (Array.isArray(arr) && arr.length >= k) {
    // 负无穷开始
    var max = Number.NEGATIVE_INFINITY;
    var avg;
    var sum = 0;

    for (var i = 0, len = arr.length; i <= len - k; i++) {
      // 从i开始累加k个数的结果
      for (var j = 0; j < k; j++) {
        sum += arr[i + j];
      }
      avg = sum / k;
      if (avg >= max) {
        max = avg;
      } else {
        continue;
      }
      sum = 0;
    }
    return max;
  } else {
    return '参数有误';
  }
};

// 测试代码
var nums = [1, 12, -5, -6, 50, 3];
var k = 3;
var res = getLargestAverageSubarray(nums, k);
console.log('##', nums, k, res);
