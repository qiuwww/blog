// https://bbs.aoshitang.com/static/js/jquery-1.7.1.min.js

var request = require('request');

var count = 0;

var loop = (url) => {
  request(url, function (error, response, body) {
    // 打印百度首页html内容
    // console.log('loop:', url, ++count);
    console.log(new Date(), ++count);
  });
};

var url1 = 'https://bbs.aoshitang.com/static/js/jquery-1.7.1.min.js';
var url2 = `https://bbs.aoshitang.com/static/image/colorful_day/x_btn_game.gif`;

var url3 = `https://bbs.aoshitang.com/static/image/zhengba/header.jpg`;

setInterval(() => {
  if (new Date().getSeconds() > 50) {
    console.log(new Date());
    return;
  }
  loop(url1);
  loop(url2);
  loop(url3);
}, 30);
