function test1() {
  console.log('test1');
  setInterval(() => {
    console.log('setInterval');
  }, 3000);
  // js耗时计算
  console.time('reduce');
  console.log(
    new Array(40000000).fill(0).reduce((pre, nex, index) => {
      return pre + index;
    }, 0),
  );
  console.timeEnd('reduce');
}

function test2() {
  setTimeout(() => {
    console.log('setTimeout1');
  }, 0);
  let p = new Promise((resolve, reject) => {
    console.log('Promise1');
    resolve();
  });
  p.then(() => {
    // 这里是没有延时的微任务的后续
    console.log('Promise2');
  });
}

function test3() {
  console.log('1');

  setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
      console.log('3');
    });
    new Promise(function(resolve) {
      console.log('4');
      resolve();
    }).then(function() {
      console.log('5');
    });
  });
  process.nextTick(function() {
    console.log('6');
  });
  new Promise(function(resolve) {
    console.log('7');
    resolve();
  }).then(function() {
    console.log('8');
  });

  setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
      console.log('10');
    });
    new Promise(function(resolve) {
      console.log('11');
      resolve();
    }).then(function() {
      console.log('12');
    });
  });
}

function test4() {
  console.log('click'); // 直接输出
  Promise.resolve().then(_ => console.log('promise')); // 注册微任务
  setTimeout(_ => console.log('timeout')); // 注册宏任务
  requestAnimationFrame(_ => console.log('animationFrame')); // 注册宏任务
}

// test1();
// test2();
// test3(); // 1 7 6 8 2 4 3 5 9 11 10 12
test4();
