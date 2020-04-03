/**
 * @abstract 无重复字符的最长子串-实现，双指针来实现
 * @param {s} s 字符串
 */
// @ts-ignore
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
    // 重复就重置
    if (s[end] === s[end - 1]) {
      start = end;
    } else {
      // 如果没有重复
      // start位置的最长字串大小
      hashMap.set(start, end - start + 1);
    }
    end += 1;
  }
  console.log('hashMap:', hashMap);
  return Math.max.apply(null, [...hashMap.values()]);
};

let str = 'aaabbbccccdfghh';
console.log(str, '###', lengthOfLongestSubstring(str));
