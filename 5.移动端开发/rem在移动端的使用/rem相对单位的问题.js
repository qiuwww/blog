// 经过实践，发现部分安卓机出现的该问题大多是rem计算出来的font - size总是要比预期要大一些，甚至听说部分三星的手机还有计算出来比预期小的情况，这简直是骇人听闻。
// 参考网上各种方法，最后综合提出一种最为稳妥的处理方法，就是在计算font - size值时多一步判断来进行页面font - size的reset。

// 1. 设置基本的rem的取值；
// 这段代码，最好放置在css之前就调用
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth; if (!clientWidth) return;
			if (clientWidth >= 640) {
				clientWidth = 640;
			}else if (clientWidth <= 320) {
				clientWidth = 320;
			} else { } docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
		};
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 2. 有一些浏览器，设置的rem与实际的有出入，例如红米4的webview
// 这个时候，需要用一个标签来量一下rem的大小，然后重置font-size

var resetRem = function () {
	var $reset = $("<div id='reset'></div>").css({ 'width': '3.75rem', 'height': '0' });
	$('body').append($reset);
	setTimeout(function () {
		var realWidth = $('#reset').width();
		var fontSize = parseInt($('html').css('font-size'));
		var width = $('body').width();
		if (width != realWidth) {
			var resizeNum = fontSize * width / realWidth + 'px';
			$('html').css('font-size', resizeNum);
		}
	}, 0);
}
// 与上边的一致，不过设置的方式不一致导致上边的可能不能实现这个功能
window.onload = function () {
  var html = document.getElementsByTagName('html')[0];
  var settedFs = settingFs = parseInt(html.style.fontSize);
  var whileCount = 0;
  while (true) {
    var realFs = parseInt(window.getComputedStyle(html).fontSize);
    var delta = realFs - settedFs;
    if (Math.abs(delta) > 1) {  //不相等
      if (delta > 0) settingFs--; else settingFs++;
      html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
    } else {
      break;
    }
  }
}
