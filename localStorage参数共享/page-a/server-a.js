// node server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer(function (request, response) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  const filePath = path.resolve(__dirname, `page-a.html`);
  response.end(fs.readFileSync(filePath));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
