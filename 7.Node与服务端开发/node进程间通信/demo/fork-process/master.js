const childProcess = require('child_process');
// 获取cpu核心数
const cpuNum = require('os').cpus().length;

for (let i = 0; i < cpuNum; ++i) {
  childProcess.fork('./fork-process.js');
}

console.log('Master: Hello world.');
