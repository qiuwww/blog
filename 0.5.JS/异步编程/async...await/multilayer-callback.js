// multilayer-callback.js
/**
 * 假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。
 * 我们仍然用 setTimeout 来模拟异步操作：
 */

/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 200), n);
  });
}

function step1(n) {
  console.log(`step1 with ${n}`);
  return takeLongTime(n);
}

function step2(m, n) {
  console.log(`step2 with ${m} and ${n}`);
  return takeLongTime(m + n);
}

function step3(k, m, n) {
  console.log(`step3 with ${k}, ${m} and ${n}`);
  return takeLongTime(k + m + n);
}

// 现在用 Promise 方式来实现这三个步骤的处理

function doItPromise() {
  console.time("doIt");
  const time1 = 300;
  step1(time1)
    .then(time2 => {
      return step2(time1, time2)
        .then(time3 => [time1, time2, time3]);
    })
    .then(times => {
      const [time1, time2, time3] = times;
      return step3(time1, time2, time3);
    })
    .then(result => {
      console.log(`result is ${result}`);
      console.timeEnd("doIt");
    });
}

// doItPromise();

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms

// 输出结果 result 是 step3() 的参数 700 + 200 = 900。
// doIt() 顺序执行了三个步骤，一共用了 300 + 500 + 700 = 1500 毫秒，
// 和 console.time()/console.timeEnd() 计算的结果一致。

// 如果用 async/await 来实现呢，会是这样

async function doItAsync() {
  console.time("doIt");
  const time1 = 300;
  const time2 = await step1(time1);
  const time3 = await step2(time1, time2);
  const result = await step3(time1, time2, time3);
  console.log(`result is ${result}`);
  console.timeEnd("doIt");
}

// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 800 = 300 + 500
// step3 with 1800 = 300 + 500 + 1000
// result is 2000
// doIt: 2907.387ms


console.log('Async处理方式：');

doItAsync();

// 结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样

setTimeout(function () {
  console.log('Promise处理方式：');
  doItPromise();

}, 5000);

// 这三个请求同步或者异步的方式，后者基本不需要改变。
// 区别主要是写法，本质上没有什么区别。
