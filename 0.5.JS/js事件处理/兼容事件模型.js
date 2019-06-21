// 手写事件侦听器，并要求兼容浏览器
var eventUtil = {
  getEvent: function(event) {
    return event || window.event;
  },

  getTarget: function(event) {
    return event.target || event.srcElement;
  },

  addListener: function(element, type, hander) {
    if (element.addEventListener) {
      element.addEventListener(type, hander, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, hander);
    } else {
      element["on" + type] = hander;
    }
  },

  removeListener: function(element, type, hander) {
    if (element.removeEventListener) {
      element.removeEventListener(type, hander, false);
    } else if (element.deattachEvent) {
      element.detachEvent(type, hander);
    } else {
      element["on" + type] = null;
    }
  },

  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};
// 调用
(function() {
  var btn = document.getElementById("btn");
  var link = document.getElementsByTagName("a")[0];
  eventUtil.addListener(btn, "click", function(event) {
    var event = eventUtil.getEvent(event);
    var target = eventUtil.getTarget(event);
    alert(event.type);
    alert(target);
    eventUtil.stopPropagation(event);
  });

  eventUtil.addListener(link, "click", function(event) {
    alert("prevent default event");
    var event = eventUtil.getEvent(event);
    eventUtil.preventDefault(event);
  });

  eventUtil.addListener(document.body, "click", function() {
    alert("click body");
  });
})();
