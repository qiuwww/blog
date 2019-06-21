// 有两个数组a，b，大小都为n，数组元素的值任意，无序；

// 要求：

// 通过交换a，b中的元素，使数组a元素的和与数组b元素的和之间的差最小。8分钟写出代码！

var getRandomNum = function(start, end) {
  if (typeof start === "number" && typeof end === "number") {
    return Math.floor(Math.random() * (end - start)) + start + 1;
  } else {
    return;
  }
};

var getArr = function(len, start, end) {
  var arr = [];
  for (var i = len; i >= 0; i--) {
    arr.push(getRandomNum(start, end));
  }
  return arr;
};

// console.log(getArr(100, 2, 32));
var n = 5;
var start = 1;
var end = 100;

var arr1 = getArr(n, start, end);
var arr2 = getArr(n, start, end);

console.log(arr1);
console.log(arr2);

arr1 = arr1.sort(function(a, b) {
  return b - a;
});
arr2 = arr2.sort(function(a, b) {
  return b - a;
});

console.log(arr1);
console.log(arr2);

var total = function(arr) {
  return arr.reduce(function(sum, value) {
    return sum + value;
  }, 0);
};

console.log(total(arr1));
console.log(total(arr2));

var newArr1 = [];
var newArr2 = [];

// for (var i = arr1.length - 1; i >= 0; i--) {
// 	if(total(newArr1) >= total(newArr2)){

// 	}

// };

/**
 * @description 求数组的最大值
 * @return item
 */
// 方式一：添加原型方法，便于多次使用，但是修改prototype的属性不太好
Array.prototype.max = function() {
  return Math.max.apply(Math, this);
};
// 调用
[1, 2, 3].max();
// 方法二：直接调用方法
Math.max.apply(Math, [1, 2, 3]);
// 延伸为一个函数
function getArrayMax(arr = []) {
  return Math.max.apply(Math, arr);
}
getArrayMax([1, 2, 3]);

/**
 * @desc 数组深度展开
 * @param {array} arr 要展开的数组
 * @return {array} 展开的一维数组
 */

// 数组深度展开
const deepFlatten = (arr = []) =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3, 5], 4], 5]); // [1, 2, 3, 5, 4, 5]
