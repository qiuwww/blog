// 状态机.js
// 运行一次状态改变一次

// 两种状态
// 如果要实现多次状态反转就需要使用多个变量来控制 00 01 10 11
var ticking = true;
var clock = function() {
  if (ticking) {
    console.log("tick!");
  } else {
    console.log("tock!");
  }
  ticking = !ticking;
};

clock();
clock();
clock();
clock();

// 使用generator来实现
// 很容易实现多次状态的反转

var clock = function*(_) {
  while (true) {
    yield _;
    console.log("tick!");
    yield _;
    console.log("tock!");
    yield _;
    console.log("three");
  }
};

var generatorClock = clock();
// 必须多一次运行
generatorClock.next();
generatorClock.next();
generatorClock.next();
generatorClock.next();
generatorClock.next();
generatorClock.next();
generatorClock.next();
