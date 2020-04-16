---
title: 从数组中找出三数之和为n
date: 2018-5-6
tags:
  - 数据结构与算法
  - 从数组中找出三数之和为n
categories:
  - [数据结构与算法, 从数组中找出三数之和为n]
---

## 问题描述

给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
[-1, 0, 1],
[-1, -1, 2]
]

## 问题分析

类似可以现推导二数之和为指定的值。思路如下：

1. 排序
2. 双指针，前后向中间寻找

所以三个数之和的问题也可以采用**排序+双指针的思路来做**，遍历排序后的数组，定义指针 l 和 r,分别从当前遍历元素的下一个元素和数组的最后一个元素往中间靠拢，计算结果跟目标对比。

最直观的方法，for 循环遍历三层嵌套，时间复杂度太高了。

## 二数之和代码实现

认为只存在一对。

```js
// arr为数组，Sum为和
var getSumNum = function (arr, Sum) {
  arr.sort(function (a, b) {
    return a - b;
  });
  console.log('arr:', arr);
  var i,
    j,
    n = arr.length;
  for (i = 0, j = n - 1; i < j; ) {
    if (arr[i] == arr[i - 1]) {
      continue;
    }
    if (arr[i] + arr[j] == Sum) return [arr[i], arr[j]];
    else if (arr[i] + arr[j] < Sum) i++;
    else j--;
  }
  return [-1, -1];
};
// test
var nums = [1, 2, 5, 6, 8, -3, -2];
console.log(getSumNum(nums, 7));
```

## 三数之和代码实现

```js
var threeSum = function (nums, sum) {
  let res = [],
    len = nums.length;
  if (len < 3) {
    return [];
  }
  // 从小到大排序
  nums.sort((a, b) => a - b);
  console.log('sort:', nums);
  // 遍历每一个元素，找到剩余的元素中的和为sum-arr[i]的两个项
  for (let i = 0; i < len; i++) {
    // 去重
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }

    // l为左下标，r为右下标
    let l = i + 1,
      r = len - 1,
      // 剩余的两个数之和
      sumTwo = sum - nums[i];
    console.log('sumTwo:', sumTwo, i, l, r);
    while (l < r) {
      // l和r都不能等于i
      if (l === i) {
        l++;
        continue;
      }
      if (r === i) {
        r--;
        continue;
      }

      if (nums[l] + nums[r] == sumTwo) {
        // 当次循环结束的标记
        res.push([nums[i], nums[l], nums[r]]);
        break;
        // 如果结果比较小
      } else if (nums[l] + nums[r] < sumTwo) {
        l++;
      } else {
        r--;
      }
    }
  }
  // 会有重复的
  // 可以从左边开始，l和r都大于i
  return res;
};

// 测试代码
var nums = [1, 2, 5, 6, 8, -3, -2];
console.log(threeSum(nums, 19));
console.log(threeSum(nums, 10));
console.log(threeSum(nums, 1));
console.log(threeSum(nums, 0));
console.log(threeSum(nums, 100));
```
