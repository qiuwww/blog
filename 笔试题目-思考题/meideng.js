function getExpirationDate(year, month, day) {
  let flag = isLeapYear(year),
    monthDay,
    realDay;
  month = ~~month + 1;
  if (month > 12) {
    year += 1;
    month = 1;
  }
  monthDay = [31, flag ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  realDay = monthDay[month - 1];
  day = day > realDay ? realDay : day;
  return [year, month, day];
}
function isLeapYear(year) {
  year = ~~year;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
// 一个月之后到期，主要考虑2月29的问题
console.log(getExpirationDate(2016, 12, 12));
console.log(getExpirationDate(2018, 6, 11));
console.log(getExpirationDate(2019, 5, 23));

// 查看五年内的次数问题
let resMap = {},
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  year,
  flag,
  monthDay,
  res;

new Array(5).fill(2014).forEach((item, index) => {
  year = item + index;
  flag = isLeapYear(year);
  monthDay = [31, flag ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  months.forEach((month, _index) => {
    new Array(monthDay[_index]).fill(" ").forEach((__item, day) => {
      console.log(`当前的日期是：${year}年${month}月${day + 1}日`);
      res = getExpirationDate(year, month, day + 1);
      resMap[res] = ~~resMap[res] + 1;
      console.log(`到期的日期是：${res}`);
    });
  });
});
// console.log("resMap: ", resMap);
