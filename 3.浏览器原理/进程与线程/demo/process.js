// process.js
const http = require('http');

http.createServer().listen(3000, () => {
  process.title = '测试进程 Node.js'; // 进程进行命名
  console.log(`process.pid: `, process.pid); // process.pid:
});
