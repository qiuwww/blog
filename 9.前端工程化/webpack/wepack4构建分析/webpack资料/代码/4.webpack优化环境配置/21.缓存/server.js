/*
  服务器代码
  启动服务器指令：
    npm i nodemon -g
    nodemon server.js

    node server.js
  访问服务器地址：
    http://localhost:3000

*/
const express = require('express');

const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms
app.use(express.static('build', { maxAge: 1000 * 3600 }));

app.listen(3000);
