// 每一步都会得到不同的promise对象，也就是一个then的执行过程中，会引起一个新的pending凝聚到指定的方向
// const promise1 = Promise.resolve('resolve');
const promise1 = Promise.reject('reject');
console.log('promise1: ', promise1);

const promise2 = promise1.then((res) => {
  console.log('then1 ', res);
  return 'promise1';
});
console.log('promise2: ', promise2);

// catch返回了一个新的promise对象，所以后续的then会接到参数，接续到后边
const promise3 = promise2.catch((e) => {
  // 这里出错了，向后执行过程中，错误处理了，后续会走到then2
  console.log('catch1 ', e);
  return e;
});
console.log('promise3: ', promise3);

const promise4 = promise3.then((res) => {
  console.log('then2 ', res);
  // 这里如果正常返回就会走到promise4，抛出错误就会走到promise5
  throw Error('then2');
  return 'promise3';
});
console.log('promise4: ', promise4);

const promise5 = promise4.catch((e) => {
  console.log('catch2 ', e);
  return 'promise4';
});

console.log('promise5: ', promise5);
