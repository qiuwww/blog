// 下拉刷新.js

function addEvent() {
  var that = this;
  var $target = this.target;
  that.target.scroll(function() {
    var height = $target.height(); //显示外框的高度，一般不改变
    var scrollTop = $target.scrollTop(); //滚动了的距离
    var scrollHeight = $target[0].scrollHeight; //内容的实际高度
    if (scrollTop + height >= scrollHeight - 10 && that.isMoreData) {
      that.show();
    }
  });
}
