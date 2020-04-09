// 去抖动函数

function debounce(func, wait) {
  var timeId = null;
  return function () {
    var context = this;
    var args = arguments;
    // 再次调用的时候，开始重新计时
    clearTimeout(timeId);
    timeId = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
