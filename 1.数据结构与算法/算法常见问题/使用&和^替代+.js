/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSum = (a, b) => {
  const add = (a, b) => {
    return b === 0 ? a : add(a ^ b, (a & b) << 1);
  };
  return add(a, b);
};

// test

getSum(1, 2);
getSum(100, 29);
