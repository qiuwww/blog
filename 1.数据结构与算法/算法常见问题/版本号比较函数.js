const compare = (str1, str2) => {
  const regExp = /(\d+).(\d+).(\d+)/;
  const res1 = regExp.exec(str1);
  const res2 = regExp.exec(str2);
  let i = 1;
  while (i < 4) {
    if (parseInt(res1[i]) < parseInt(res2[i])) {
      return false;
    } else if (parseInt(res1[i]) > parseInt(res2[i])) {
      return true;
    }
    i++;
  }
  return true;
};
// 比较前面的版本号，是不是大于后边的版本号
console.log(compare('1.10.1', '1.8.2'));
console.log(compare('1.1.1', '1.8.2'));
console.log(compare('2.10.1', '2.8.2'));
