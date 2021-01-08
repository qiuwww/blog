console.log('contentScript');
console.log('global', window);

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  console.log('收到消息');
  sendResponse('发送返回值');
});
