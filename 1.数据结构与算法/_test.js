var p = Promise.resolve().then((res) => {
  console.log('promise');
});

async function fn() {
  console.log(2);
  var res1 = await console.log(3);
  // 这里的4，仍旧作为异步进行处理了，res1，返回了一个微任务，这里相当于是then回调的内容
  console.log(4);
  var res2 = await p;
  console.log(5);
}
console.log(1);
setTimeout(() => {
  console.log('setTimeout');
}, 0);
fn();
console.log(6);
