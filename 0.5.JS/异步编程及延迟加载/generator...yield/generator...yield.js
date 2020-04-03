// 生成器函数
// Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。

var fs = require('fs');

// 首先通过promise对其进行封装，实现数据成功的监听
var readFile = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function*() {
  try {
    var f1 = yield readFile('./async...await/movies/千与千寻.jpg');
    // 这里拿不到f1的结果，只能得到函数当前的执行状态，这里最开始的时候我的控制流程写错了
    console.log(1);
    console.log('f1.toString()', f1.toString().length);
    var f2 = yield readFile('./async...await/movies/盗梦空间.jpg');
    console.log(2);
    console.log('f2.toString()', f2.toString().length);
  } catch (e) {
    console.log('外部捕获：', e);
  }
};

// 那么我们如何控制代码的执行流程呢, 这个函数的控制流程也很麻烦啊，回调嵌套
var g = gen();

g.next().value.then(function(data) {
  g.next(data).value.then(function(data) {
    g.next(data);
  });
});
/**
 * 解释
 */
/**
 * 这段的具体解释就是，我们通过promise封装的对象实现了对于异步操作数据返回的监听，
 * 当数据返回的时候，我们就通过next()执行下一步的操作，
 * 同时把上步操作的值带入到下一个阶段的执行流程之中。
 */

// 写成async函数，就是下面这样。

var asyncReadFile = async function() {
  var f1 = await readFile('./async...await/movies/千与千寻.jpg');
  var f2 = await readFile('./async...await/movies/盗梦空间.jpg');
  console.log('async-f1:', f1.toString().length);
  console.log('async-f2:', f2.toString().length);
};

setTimeout(function() {
  asyncReadFile();
}, 5000);

// async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

// async函数对 Generator 函数的改进，体现在以下四点。

// 内置执行器。
// async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样，只要一行。
// var result = asyncReadFile();
// 上面的代码调用了asyncReadFile函数，然后它就会自动执行，输出最后结果。
// 这完全不像 Generator 函数，需要调用next方法

// 更好的语义。async和await，比起星号和yield，语义更清楚了。
// async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// 更广的适用性。yield命令后面只能是 Thunk 函数或 Promise 对象，
// 而async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，
// 但这时等同于同步操作）。
// 返回值是 Promise。
// async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。
// 你可以用then方法指定下一步的操作。

// generator函数的调用
function* helloWorldGenerator() {
  yield console.log('hello');
  yield console.log('world');
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next();
hw.next();
hw.next();
