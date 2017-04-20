// 双击触发，阻止单击事件.js
var timeId;

$('#id1').click(function() {
  timeId = setTimeout(function() {
    // your code
  }, 500);
});

$('#id1').dblclick(function() {
  clearTimeout(timeId);
  // your code
});