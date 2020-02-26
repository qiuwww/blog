// node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
};
http
  .createServer(function(request, response) {
    let fileName = request.url;
    if (fileName === '/') {
      fileName = 'index.html';
    } else {
      fileName = fileName.split('/')[1];
    }
    const filePath = path.resolve(__dirname, fileName);
    // 格式必须为 binary 否则会出错
    const resource = fs.readFileSync(filePath, 'binary');
    const fileType = fileName.split('.')[1];
    console.log('request come', fileName, fileType);
    response.writeHead(200, {
      'Content-Type': `${mime[fileType]}`,
      // 'Cache-Control': 'no-cache',
      'Cache-Control': 'no-store',

    });
    // response.write(resource, 'binary');
    response.end(resource, 'binary');
  })
  .listen(8888);

console.log('server listening on 8888');
