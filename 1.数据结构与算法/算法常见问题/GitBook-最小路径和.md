---
title: 最小路径和
date: 2018-8-8
categories:
  - [算法, 最小路径和]
---

## 问题描述

给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

输入:
[
[1,3,1],
[1,5,1],
[4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。

## 解体思路

逐步求解。构架一个二维数组，对应的位置，**记录到达当前位置的最小值**。

[leetcode 解体思路](https://leetcode-cn.com/problems/minimum-path-sum/solution/zui-xiao-lu-jing-he-by-leetcode/)

### 1.暴力就是利用递归

暴力就是利用递归，对于每个元素我们考虑两条路径，向右走和向下走，在这两条路径中挑选路径权值和较小的一个。

`cost(i,j)=grid[i][j]+min(cost(i+1,j),cost(i,j+1))`

### 2.二维动态规划

我们新建一个额外的 dpdp 数组，与原矩阵大小相同。在这个矩阵中，dp(i, j)dp(i,j) 表示从坐标 (i, j)(i,j) 到右下角的最小路径权值。我们初始化右下角的 dpdp 值为对应的原矩阵值，然后去填整个矩阵，对于每个元素考虑移动到右边或者下面，因此获得最小路径和我们有如下递推公式：

`dp(i,j)=grid(i,j)+min(dp(i+1,j),dp(i,j+1))`

```js
var minPathSum = function (grid) {
  // 时间复杂度和空间复杂度都是 O (m * n);
  if (grid.length === 0) return 0;
  const dp = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // 实际上你也可以无差别全部填充为MAX_VALUE，对结果没影响,代码还会更少
  // 只是有点不专业而已
  for (let i = 0; i < rows + 1; i++) {
    dp[i] = [];
    // 初始化第一列
    // 这些路径不存在的，初始化为无穷大
    dp[i][0] = Number.MAX_VALUE;
    for (let j = 0; j < cols + 1; j++) {
      // 初始化第一行
      if (i === 0) {
        dp[i][j] = Number.MAX_VALUE;
      }
    }
  }

  // tricky
  dp[0][1] = 0;

  for (let i = 1; i < rows + 1; i++) {
    for (let j = 1; j < cols + 1; j++) {
      // state transition
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1];
    }
  }
  console.log('dp', dp);
  return dp[rows][cols];
};

// test
var grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
minPathSum(grid);
```

### 3.一维动态规划

在上个解法中，我们可以用一个一维数组来代替二维数组，dpdp 数组的大小和行大小相同。

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  var dp = new Array(grid.length);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (i != 0 && j != 0) {
        dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
      } else if (i == 0 && j != 0) {
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (i != 0 && j == 0) {
        dp[j] = dp[j] + grid[i][j];
      } else if (i == 0 && j == 0) {
        dp[j] = grid[i][j];
      }
    }
  }
  return dp[grid[0].length - 1];
};
```
