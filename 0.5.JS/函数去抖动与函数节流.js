// 延迟执行，避免频繁执行。
// 函数去抖的基本思想是：对需要去抖的函数做包装，使用闭包记录timeout，第一次回调给函数设置 setTimeout定时器，只要在wait时间内，后一次的回调会clearTimeout取消前一次回调的执行。
// 函数去抖（debounce）：让一个函数在一定间隔内没有被调用时，才开始执行被调用方法。
_.debounce = function(func, wait, immediate) {
  var timeout, result;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) result = func.apply(context, args);
    return result;
  };
};

// 函数节流的基本思想是:无视浏览器的回调，自己按一定频率执行代码。间隔执行。
// 函数节流（throttle）：是让一个函数无法在很短的时间间隔内连续调用，当上一次函数执行后过了规定的时间间隔，才能进行下一次该函数的调用。
_.throttle = function(func, wait) {
  var context, args, timeout, result;
  var previous = 0;
  var later = function() {
    previous = new Date();
    timeout = null;
    result = func.apply(context, args);
  };
  return function() {
    var now = new Date();
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
