---
title: 二分法查找js代码实现
date: 2018-6-8
categories:
  - [算法, 二分法查找]
---

## 描述问题

二分法查找针对的是一个有序的数据集合,每次通过与区间的中间元素对比,将待查找的区间缩小为之前的一半,直到找到要查找的元素,或者区间被缩小为 0。

## 代码实现

```js
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
  // 1. 先排序
  srcArray = srcArray.sort(function (a, b) {
    return a - b;
  });
  console.log('排序之后的数组：', srcArray);

  var low = 0;
  var high = srcArray.length - 1;
  // 2. 循环遍历区间
  while (low <= high) {
    // 这里需要考虑middle为非整型的时候的问题, 这里其实向上取整与向下取整差别不大，查找的次数随机
    var middle = (low + high) >> 1;
    console.log('srcArray[middle]:', middle, srcArray[middle]);
    // 3. 对比目标值所在的区间，不断的调整区间的范围
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
```

## 时间复杂度计算

时间复杂度无非就是 while 循环的次数！

总共有 n 个元素，渐渐跟下去就是 n,n/2,n/4,….n/2^k，其中 k 就是循环的次数，n,n/2,n/4 那部分是剩余将要操作的元素数目。

由于你 n/2^k 取整后>=1

即令 n/2^k=1

可得 k=log2n,（是以 2 为底，n 的对数）

所以时间复杂度可以表示 O()=O(logn)

## 使用条件

1. 二分查找依赖顺序表结构

二分查找不能依赖如链表的的其他结构,主要原因是二分查找算法需要按照下标随机访问元素,链表随机访问的时间复杂度是 O(n),使用链表存储,二分查找的时间复杂度就会变得很高

2. 二分查找针对的有序数组

二分查找对数据要求必须是**有序的**,如果数据没有序,则需要先排序

3. 数据量太小或数据量太大也不适合二分查找

## 用途

1. 如何在 100 万个整数中快速找某个整数
2. 如何快速定位 IP 对应的省份地址
