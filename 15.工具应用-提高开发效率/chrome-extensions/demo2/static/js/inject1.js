console.log('inject1');

// 在content-script中通过DOM方式向页面注入inject-script代码示例

// 向页面注入JS
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'static/js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);

  console.log('injectCustomJs', jsPath, document, temp);

  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.querySelector('body').appendChild(temp);
}

window.onload = function () {
  injectCustomJs();
};
