1.实现 destructuringArray 方法，达到如下效果
// destructuringArray( [1,[2,4],3], "[a,[b],c]" );
// result
// { a:1, b:2, c:3 }

### 2.需要通过 threshold 参数控制调用函数频率

const yourFunction = function(func, threshold) {
// 请实现
}
const triggerSearch = yourFunction((val) => {
const {
onSearch
} = this.props
onSearch(val)
}, 300)
triggerSearch(searchText)

### 组合求和

#### 组合求和-题目

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

给定 nums = [2, 7, 11, 15], target = 9。因为 nums[0] + nums[1] = 2 + 7 = 9。所以返回 [0, 1]

#### 组合求和-实现

使用 hashMap，对撞取得结果，以当前值为键，对结果取余作为值，对比后边的 key 与前面的 value，得到结果。

```js
let nums = [2, 7, 11, 15];
let target = 9;

let twoSum = (nums, target) => {
  let hashMap = new Map();
  let res = [];
  if (!Array.isArray(nums) || typeof +target !== 'number') {
    alert('参数不正确');
    return;
  }
  let hasRes = nums.some(item => {
    // 遍历一次需要做的事情
    hashMap.set(item, target - item);
    res = [item, hashMap.get(item)];
    return item === hashMap.get(target - item) && target - item !== item;
  });
  console.log(hasRes && res);
  console.log(hashMap);
  return hasRes && res;
};
twoSum(nums, target);
twoSum(nums, 22);
twoSum(nums, 220);
```

### 无重复字符的最长子串

#### 无重复字符的最长子串-原题

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
输入: “abcabcbb”。输出: 3 。解释: 因为无重复字符的最长子串是 “abc”，所以其长度为 3。
输入: “bbbbb”。输出: 1。解释: 因为无重复字符的最长子串是 “b”，所以其长度为 1。

#### 无重复字符的最长子串-实现

双指针来实现

```js
let str = 'aaabbbccccdfghh';

let lengthOfLongestSubstring = s => {
  if (typeof s !== 'string' && s.length > 0) {
    console.log('参数应该是字符串');
    return;
  }
  const len = s.length;
  let hashMap = new Map();
  let start = 0;
  let end = 1;
  while (end < len) {
    // 第二个指针一直向后移动
    if (s[end] === s[end - 1]) {
      // 如果没有重复
      start = end;
    } else {
      hashMap.set(start, end - start + 1);
    }
    end += 1;
  }
  console.log(hashMap);
  return Math.max.apply(null, [...hashMap.values()]);
};
console.log(lengthOfLongestSubstring(str));
```

### 盛最多水的容器

### 问题

[盛最多水的容器](https://i.loli.net/2019/01/13/5c3aa62c788cf.png)

### 解答

求和，双指针

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  if (height.length === 1 || height.length === 0) {
    return 0;
  }

  const len = height.length;
  let start = 0;
  let end = len - 1;
  let max = 0;

  while (start < end) {
    max = Math.max(max, Math.min(height[start], height[end]) * (end - start));
    console.log(start, end, max);
    if (height[start] <= height[end]) {
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
```

**栈和队列的区别?**

- 栈的插入和删除操作都是在一端进行的，而队列的操作却是在两端进行的。
- 队列先进先出，栈先进后出。
- 栈只允许在表尾一端进行插入和删除，而队列只允许在表尾一端进行插入，在表头一端进行删除

**栈和堆的区别？**

- 栈区（stack）— 由编译器自动分配释放 ，存放函数的参数值，局部变量的值等。
- 堆区（heap） — 一般由程序员分配释放， 若程序员不释放，程序结束时可能由 OS 回收。
- 堆（数据结构）：堆可以被看成是一棵树，如：堆排序；
- 栈（数据结构）：一种先进后出的数据结构

**快速 排序的思想并实现一个快排？**

"快速排序"的思想很简单，整个排序过程只需要三步：

- （1）在数据集之中，找一个基准点
- （2）建立两个数组，分别存储左边和右边的数组
- （3）利用递归进行下次比较

```js
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; //如果数组只有一个数，就直接返回；
  }

  var num = Math.floor(arr.length / 2); //找到中间数的索引值，如果是浮点数，则向下取整

  var numValue = arr.splice(num, 1); //找到中间数的值
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < numValue) {
      left.push(arr[i]); //基准点的左边的数传到左边数组
    } else {
      right.push(arr[i]); //基准点的右边的数传到右边数组
    }
  }

  return quickSort(left).concat([numValue], quickSort(right)); //递归不断重复比较
}

alert(quickSort([32, 45, 37, 16, 2, 87])); //弹出“2,16,32,37,45,87”
```

### 几种排序算法

### 递归(很重要)

### 其他常见的前端算法

**XML 和 JSON 的区别？**

- 数据体积方面

  - JSON 相对于 XML 来讲，数据的体积小，传递的速度更快些。

- 数据交互方面

  - JSON 与 JavaScript 的交互更加方便，更容易解析处理，更好的数据交互

- 数据描述方面

  - JSON 对数据的描述性比 XML 较差

- 传输速度方面

  - JSON 的速度要远远快于 XML

**JSON 的了解？**

- JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式
- 它是基于 JavaScript 的一个子集。数据格式简单, 易于读写, 占用带宽小

- JSON 字符串转换为 JSON 对象:

```js
var obj = eval('(' + str + ')');
var obj = str.parseJSON();
var obj = JSON.parse(str);
```

- JSON 对象转换为 JSON 字符串：

```js
var last = obj.toJSONString();
var last = JSON.stringify(obj);
```

3，判断一个字符串中出现次数最多的字符，统计这个次数
分隔组成一个对象，找到最大的值

```js
var str = 'abcdabcdefgdddddd';
var resObj = {};
str.split('').forEach(item => {
  if (resObj[item]) {
    resObj[item] += 1;
  } else {
    resObj[item] = 1;
  }
});
var max = 0;
for (var key in resObj) {
  if (resObj[key] >= max) {
    max = resObj[key];
  }
}

console.log(max);
```

## 找到数组中唯一不重复的元素

要求，空间复杂度为 O(1)，时间复杂度为 O(n)

```js
var arr = [2, 13, , 4, 5, 2, 13, 4];
arr.reduce((cur, next) => {
  return cur ^ next;
}, 0);
```
