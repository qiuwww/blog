// jq下的单击事件与双击事件的相互不影响的处理方法

var timeIdLabel,
  flag = true;

label.addEventListener("click", function(e) {
  flag = true;
  timeIdLabel = setTimeout(function() {
    if (flag) {
      console.log("单击触发左侧公司列表刷新事件：" + item.city);
    }
  }, 200);
});
label.addEventListener("dblclick", function(e) {
  clearTimeout(timeIdLabel);
  flag = false;
  // 还要调整中心位置和缩放等级
  map.setCenter(this.point);
  map.zoomIn();
  console.log("dbclick，双击事件触发放大一个等级事件：" + item.city);
});

// 函数节流
// 一段时间内，代码块只能被执行一次
clearTimeout(timeID);
var $this = $(this);
timeID = setTimeout(function() {});
