// 外部 JavaScript 中创建我们的 web worker
var i = 0;
function timedCount() {
  i = i + 1;
  // @ts-ignore
  postMessage(i);
  setTimeout('timedCount()', 500);
}

timedCount();
