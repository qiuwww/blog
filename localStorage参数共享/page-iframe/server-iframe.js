// node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3010;

const server = http.createServer(function (request, response) {
  console.log(request.url);
  response.statusCode = 200;
  if ('/inner.js' == request.url) {
    response.setHeader('Content-Type', 'text/javascript');
    response.end(fs.readFileSync(path.resolve(__dirname, `inner.js`)));
  } else if ('/' == request.url) {
    response.setHeader('Content-Type', 'text/html');
    response.end(fs.readFileSync(path.resolve(__dirname, `page-iframe.html`)));
  } else {
    response.statusCode = 404;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
