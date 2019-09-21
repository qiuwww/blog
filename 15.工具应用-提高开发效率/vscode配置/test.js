function aa() {
  console.log(12222);
  console.log(12222);
  console.log(12222);
  console.log(12222);
  // 控制折叠，但是只能使用region关键字
  // #region
  console.log(12222);
  console.log(12222);
}

function aa2() {
  console.log(12222);

  console.log(12222);
  console.log(12222);
  console.log(12222);
  // #endregion
  console.log(12222);
  console.log(12222);
}

// 转换await函数

function testPromise() {
  return fetch("https://www.baidu.com")
    .then(res => {})
    .catch(err => {});
}
