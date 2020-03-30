---
title: delay函数
date: 2020-3-27
---

```js
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

delay(1000).then(_ => {
  console.log('executed');
});

const testFunc = async () => {
  console.log('testFunc start');
  await delay(/* 1s */ 1000);
  console.log('testFunc end');
};
testFunc();

console.time('test delay');
delay(1000).then(_ => {
  console.log('test');
  console.timeEnd('test delay');
});
```

内部涉及到的原理：

- Promise.then内的代码属于微任务的代码，在同步代码执行完成的时候，需要依次执行完
- 内部嵌套setTimeout，属于宏任务，需要依次执行完成
