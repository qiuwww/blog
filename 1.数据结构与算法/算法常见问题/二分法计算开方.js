var mySqrt = function (x, deg) {
  if (x === 1) {
    return 1;
  }
  let left, right;
  if (x < 1) {
    left = x / 2;
    right = 1;
  } else {
    left = 1;
    right = x > 4 ? x / 2 : x;
  }

  let mid = (left + right) / 2,
    prod;
  // 按照精度拆分
  const toDeg = (num) => +Number(num).toFixed(3);
  while (mid < right && mid > left) {
    prod = mid * mid;
    if (Math.abs(prod - x) < deg) {
      console.log('##$$$res', mid);
      return mid;
    } else if (prod < x) {
      left = mid;
      mid = toDeg((right + mid) / 2);
    } else if (prod > x) {
      right = mid;
      mid = toDeg((left + mid) / 2);
      console.log('##$$$', mid);
    }
  }
  // while (left + 1 < right) {
  //   let mid = left + ((right - left) >> 1);
  //   if (mid === x / mid) {
  //     return mid;
  //   } else if (mid < x / mid) {
  //     left = mid;
  //   } else {
  //     right = mid;
  //   }
  // }
  // return right > x / right ? left : right;
};

// console.log(mySqrt(1, 0.01), Math.sqrt(1));
// console.log(mySqrt(2, 0.01), Math.sqrt(2));
console.log(mySqrt(3, 0.01), Math.sqrt(3));
console.log(mySqrt(300, 0.001), Math.sqrt(300));
