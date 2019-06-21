
// 设置单个属性
dom.style.top = top;
// 同时设置多个style属性
// 如果你有CSS值为字符串，没有其他CSS已经设置为元素(或者你不在乎覆盖)，使用cssText property：
document.getElementById("myElement").style.cssText = cssString;

