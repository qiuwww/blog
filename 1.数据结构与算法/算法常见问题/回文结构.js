/**
 * @abstract 回文结构检测
 * @param {string} str 字符串
 */
function isPalindrome(str) {
  // 去掉非数字和字母
  str = str.replace(/[DW]/g, '').toLowerCase();
  return str === str.split('').reverse().join('');
}

console.log(isPalindrome('level')); // logs 'true'
console.log(isPalindrome('levels')); // logs 'false'
console.log(isPalindrome('A car, a man, a maraca')); // logs 'true'
