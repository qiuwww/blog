new Promise((resolve, reject) => {
  console.log("Initial");
  resolve();
})
  .then(() => {
    throw new Error("Something failed");
    console.log("Do this");
  })
  .catch(err => {
    console.log("catch 1");
    // 如果这里抛出错误，下一个catch会再次捕获
    throw new Error("Something failed");
  })
  // 这里即便前面发生了错误也是还会执行的
  .then(() => {
    console.log("Do this whatever happened before");
  })
  // 但是这里不会执行了
  .catch(() => {
    console.log("catch 2");
  });
