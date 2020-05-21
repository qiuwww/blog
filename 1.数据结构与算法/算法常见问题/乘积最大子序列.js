// 给你一个整数数组 nums（包括正负值） ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字）。
// 这个时候要保存最大与最小值
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  if (!nums.length) return null;
  let [max, curMax, curMin] = [nums[0], nums[0], nums[0]];

  for (let i = 1; i < nums.length; i++) {
    // 这里如果中间有0怎么办？
    [curMax, curMin] = [curMax * nums[i], curMin * nums[i]];
    [curMax, curMin] = [Math.max(curMax, curMin, nums[i]), Math.min(curMax, curMin, nums[i])];
    if (max < curMax) max = curMax;
  }
  return max;
};

// test
maxProduct([2, 3, -2, 4]);
maxProduct([200, 0, 3, 400, 0, 2, 4]);
