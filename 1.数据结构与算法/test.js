var str = '012345BZ16';

var solve = (str) => {
  let i = 0,
    curStr = '',
    max = 0;
  while (i < str.length) {
    if (/[G-Z]/.test(str.charAt(i))) {
      curStr = '';
    } else {
      curStr += str.charAt(i);
      max = max > parseInt(curStr, 16) ? max : parseInt(curStr, 16);
    }
    i++;
  }
  return max;
};

console.log(solve(str));
