function getExpirationDate(year, month, day) {
  let flag = isLeapYear(year),
    nextMonthDay,
    days = [31, flag ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  month = (month | 0) + 1;
  if (month > 12) {
    year += 1;
    month = 1;
  }

  nextMonthDay = days[month - 1];

  day = day > nextMonthDay ? nextMonthDay : day;
  return [year, month, day];
}

function isLeapYear(year) {
  year = year | 0;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


getExpirationDate(2016, 12, 12);
getExpirationDate(2018, 11, 10);
getExpirationDate(2018, 12, 10);
getExpirationDate(2019, 1, 30);
getExpirationDate(2020, 5, 23);
