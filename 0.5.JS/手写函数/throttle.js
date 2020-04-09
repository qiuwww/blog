// 节流函数

function throttle(func, wait) {
  var timeId = null,
    canRun = true;
  return function () {
    var context = this;
    var args = arguments;
    if (!canRun) {
      return;
    }
    // 执行过程中屏蔽别的请求
    canRun = false;
    timeId = setTimeout(function () {
      func.apply(context, args);
      canRun = true;
    }, wait);
  };
}
