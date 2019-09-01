function comp(n) {
  return (2 * n * 2 * n) / (2 * n - 1) / (2 * n + 1);
}
function getpai(side) {
  let res = 2;
  for (let i = 1; i <= side; i++) {
    res = comp(i) * res;
  }
  return res;
}
// console.log(getpai(10));
// console.log(getpai(100));
// console.log(getpai(10000000));
console.log(getpai(100000000));
console.log(getpai(100000010));
