const isPalindrome = (str) => {
  return str === str.split('').reverse().join('');
};

const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let year = 2000; year <= 2999; year++) {
  for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= months[month - 1]; day++) {
      if (
        isPalindrome(
          `${('0000' + year).slice(-4)}${('00' + month).slice(-2)}${('00' + day).slice(-2)}`,
        )
      ) {
        console.log(
          'year-month-day: ',
          `${('0000' + year).slice(-4)}-${('00' + month).slice(-2)}${('00' + day).slice(-2)}`,
        );
      }

      // if (isPalindrome(`${year}${month}${day}`)) {
      //   console.log('year-month-day: ', `${year}${month}${day}`);
      // }
    }
  }
}
