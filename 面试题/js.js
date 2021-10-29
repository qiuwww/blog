// 但放在运算符中的函数声明在执行阶段是找不到的

var x = 1;
if (function f() {}) {
  x += typeof f;
}
console.log(x);

// => "1undefined"

// 但是变量可以？？，好像确实可以
for (var i = 0; i < 10; i++) {
  console.log(typeof i);
}

var x = 1,
  y;
if ((y = x)) {
  console.log(y, typeof y);
}

// => 1 'number'
