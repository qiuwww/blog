// 问题：给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值;X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和;现在需要你找出数列a的所有区间中, X值最大的那个区间;如数列a为: 3 1 6 4 5 2; 则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;

/**
 * @abstract 思路 依次求取当前元素构成的最大值，双指针界定范围
 * @param {array} arr 目标数组
 */
function getMin(arr = []) {
  let len = arr.length;
  let p1,
    p2,
    res = 0,
    cur,
    index;

  for (let i = 0; i < len; i++) {
    p1 = i;
    p2 = i;
    cur = arr[i];
    while (p1 >= 0) {
      if (arr[p1 - 1] >= cur) {
        p1--;
      } else {
        break;
      }
    }
    while (p2 < len) {
      if (arr[p2 + 1] >= cur) {
        p2++;
      } else {
        break;
      }
    }
    if (res < comRange(arr, i, p1, p2)) {
      res = comRange(arr, i, p1, p2);
      index = i;
    }
  }
  return { res, index };
}

// 求这个范围内的乘积
function comRange(arr, i, p1, p2) {
  let s = sum(arr, p1, p2);
  return arr[i] * s;
}

// 范围内的和
function sum(arr, p1, p2) {
  var sum = 0;
  for (var i = p1; i <= p2; i++) {
    sum += arr[i];
  }
  return sum;
}

let arr1 = [3, 1, 6, 4, 5, 2];
let arr2 = [3, 1, 6, 4, 5, 2, 4, 5, 8];

console.log('arr1:', arr1, getMin(arr1));
console.log('arr2:', arr2, getMin(arr2));
