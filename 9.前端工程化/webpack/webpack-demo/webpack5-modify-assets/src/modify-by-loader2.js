console.log('modify-by-loader2 code!');

var str = 'str';

const typeA = typeof str; // 触发钩子

const add = (a, b) => {
  // debugger;
  console.log('add function!');
  return a + b;
};

add(1, 2);

console.log(1);
console.log(2);
console.log(3);
