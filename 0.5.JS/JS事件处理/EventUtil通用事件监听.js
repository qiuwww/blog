// 通用事件对象
var EventUtil = {
  // 页面加载完成后
  readyEvent: function (fn) {
    if (fn == null) {
      fn = document;
    }
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = fn;
    } else {
      window.onload = function () {
        oldonload();
        fn();
      };
    }
  }, // 添加事件
  addEvent: function (element, type, hander) {
    if (element.addEventListener) {
      // 非IE
      // 事件类型、需要执行的函数、是否捕捉
      element.addEventListener(type, hander, false);
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on' + type, function () {
        hander.call(element);
      });
    } else {
      element['on' + type] = hander;
    }
  }, // 移除事件
  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, hander);
    } else {
      element['on' + type] = null;
    }
  }, // 阻止事件
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation(); //W3C标准
    } else {
      event.canceBubble = true; //IE
    }
  }, // 取消默认事件
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
  }, // 获取事件目标
  getTarget: function (event) {
    return event.target | event.srcElement;
  }, // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
  getEvent: function (event) {
    event = event || window.event;
    if (!event) {
      var c = this.getEvent.caller;
      while (!c) {
        event = c.arguments[0];
        if (event && Event == event.constructor) {
          break;
        }
        c = c.caller;
      }
    }
    return event;
  },
};
