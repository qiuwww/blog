let num = 0;
setInterval(() => {
  console.log('backgroundScript', num++);

  chrome.extension.sendMessage({ msg: 'send a message' + num }, (response) => {
    console.log(response);
  });
}, 2000);
