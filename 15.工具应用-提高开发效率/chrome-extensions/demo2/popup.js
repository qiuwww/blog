// alert('popup hahaha');

chrome.browserAction.setBadgeText({ text: 'haha' });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

// 显示桌面通知
$('#show_notification').click((e) => {
  chrome.notifications.create(null, {
    type: 'image',
    iconUrl: 'static/img/icon-16.png',
    title: '祝福',
    message: '骚年，祝你圣诞快乐！Merry christmas!',
    imageUrl: 'static/img/icon-16.png',
  });
});

$('#call_background').click((e) => {
  // popup.js
  var bg = chrome.extension.getBackgroundPage();
  console.log('bg', bg);
  debugger;

  bg.test(); // 访问bg的函数
  alert(bg.document.body.innerHTML); // 访问bg的DOM
});
