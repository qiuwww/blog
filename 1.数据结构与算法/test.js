/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  var newStr;
  function loop(s) {
    if (new Array(s.length).fill('-').join('') === s) {
      return true;
    }
    return wordDict.some((item) => {
      console.log(s, item);
      if (s.indexOf(item) > -1) {
        newStr = s.replace(item, '-');
        return loop(newStr);
      } else {
        return false;
      }
    });
  }
  return loop(s);
};

console.log(wordBreak('leetcode', ['leet', 'code']));
console.log(wordBreak('applepenapple', ['apple', 'pen']));
console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']));
console.log(wordBreak('aaaaaaa', ['aaaa', 'aaa']));
