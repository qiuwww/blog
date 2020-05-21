const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

delay(1000).then((_) => {
  console.log('executed');
});

const testFunc = async () => {
  console.log('testFunc start');
  await delay(/* 1s */ 1000);
  console.log('testFunc end');
};
testFunc();

console.time('test delay');
delay(1000).then((_) => {
  console.log('test');
  console.timeEnd('test delay');
});
