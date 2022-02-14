window.onload = () => {
  console.log('inner.js 执行');
  var iframe = document.createElement('iframe');
  iframe.src = `http://localhost:3010/index.html`;
  iframe.setAttribute('frameborder', '0');
  document.body.appendChild(iframe);
};
