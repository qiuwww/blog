---
title: 面积最大的计算
date: 2018-6-8
categories:
  - [算法, 面积最大的计算]
---

## 问题描述

![盛最多水的容器](../imgs/乘最多水的问题.png)

给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点  (i, ai) 。在坐标内画 n 条垂直线，垂直线 i  的两个端点分别为  (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与  x  轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且  n  的值至少为 2。

## 解题思路

求积，双指针。

## 代码实现

```js
/**
 * @param {number[]} heightArr
 * @return {number}
 */
var maxArea = function (heightArr) {
  const len = heightArr.length;
  if (len === 1 || len === 0) {
    return 0;
  }

  let start = 0;
  let end = len - 1;
  let max = 0;

  while (start < end) {
    max = Math.max(max, Math.min(heightArr[start], heightArr[end]) * (end - start));

    console.log(start, end, max);
    if (heightArr[start] <= heightArr[end]) {
      // 谁高谁留下
      start += 1;
    } else {
      end -= 1;
    }
  }
  return {
    max,
  };
};
console.log(maxArea([1, 3, 6, 4, 6, 8, 9, 4, 6, 7, 5]));
console.log(maxArea([1, 7, 6, 4, 6, 8, 9, 4, 1, 7, 5]));
```

## 参考

[盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
