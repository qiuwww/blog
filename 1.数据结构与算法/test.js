const quickSort = function (arr) {
  console.log('排序的数组：', arr);
  const len = arr.length;
  // 这里很关键，设置结束的条件
  if (len <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(len / 2); // "基准"（pivot）的索引
  // 这里也很关键，直接操作原数组，最好是复制一份；
  // 移除标记元素，最后要加到左右的中间，这里得到是一个值，不是一个数组
  const pivot = arr[pivotIndex]; // 取出pivot
  const left = []; // 左侧的数组
  const right = []; // 右侧的数组
  console.log('当前选取的分界元素： ', pivotIndex, pivot);
  // 剩余的元素分成两组
  for (let i = 0; i < len; i++) {
    if (i === pivotIndex) {
      continue;
    } else if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 无限循环，多次切分
  // var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
  // arrayObject.concat(arrayX,arrayX,......,arrayX)
  return quickSort(left).concat([pivot], quickSort(right)); // 递归调用
};
let arr = [5, 6, 9, 7, 1, 3, 2, 5, 8, 6, 5];
console.log(arr, quickSort(arr));
