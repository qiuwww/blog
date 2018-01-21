

/**
 * 求数组平均值
 */
// 针对数据的函数，需要检测参数

const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2

/**
 * 大写每个单词的首字母
 * 使用replace（）匹配每个单词的第一个字符
 */

const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
// capitalizeEveryWord('hello world!') -> 'Hello World!'


/**
 * 计数数组中值的出现次数
 */

const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3




/**
 * 斐波那契数组
 * 创建一个特定长度的空数组，初始化前两个值（0和1）。
 * 使用Array.reduce（）向数组中添加值，后面的一个数等于前面两个数相加之和（前两个除外）。
 */

const fibonacci = n =>
  Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
// fibonacci(5) -> [0,1,1,2,3]


/**
 * 从数组中获取最大值
 * 使用Math.max（）与spread运算符（...）结合得到数组中的最大值。
 */

const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10

/**
 * 从数组中获取最小值
 * 使用Math.min（）与spread运算符（...）结合得到数组中的最小值。
 */

const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1

/**
 * 用range初始化数组
 * 使用Array（end-start）创建所需长度的数组，使用map（）来填充范围中的所需值，可以省略start使用默认值0。
 */


const initializeArrayRange = (end, start = 0) =>
  Array.apply(null, Array(end - start)).map((v, i) => i + start);
// initializeArrayRange(5) -> [0,1,2,3,4]

