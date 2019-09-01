// movies.js
import fs from 'fs';
import path from 'path';
// Request is designed to be the simplest way possible to make http calls.
// It supports HTTPS and follows redirects by default.
// 用于后端发送请求，爬虫。。。
import request from 'request';

var movieDir = __dirname + '/movies',
  exts = ['.mkv', '.avi', '.mp4', '.rm', '.rmvb', '.wmv'];

// 读取文件列表
var readFiles = function () {
  return new Promise(function (resolve, reject) {
    // 读取文件夹, files返回的是文件名
    fs.readdir(movieDir, function (err, files) {
      console.log('files:', files);
      // 获取文件名
      // includes用来检测数组中是否包含指定的元素
      // path.parse(pathString) 返回路径字符串的对象。
      // 如下的返回结果是exts中存在的扩展名的文件名，movieName
      resolve(files.filter((v) => exts.includes(path.parse(v).ext)));
      // 打印一个字符串对象
      console.log('path.parse(files[0]): ', path.parse(files[0]));
    });
  });
};

// 获取海报
var getPoster = function (movieName) {

  let url = `https://api.douban.com/v2/movie/search?q=${encodeURI(movieName)}`;
  // 返回海报的地址的回调函数调用状态
  return new Promise(function (resolve, reject) {
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      console.log('body:', body);
      if (error) return reject(error);
      // 传入的回调函数，两种情况的处理回调
      resolve(body.subjects[0].images.large);
    })
  });
};

// 保存海报
var savePoster = function (movieName, url) {
  // pipe处理流程，拿到上一级返回的结果
  // pipe，它以用来把当前的可读流和另外一个可写流连接起来。
  // 可读流中的数据会被自动写入到可写流中。
  // fs.createWriteStream：返回一个WriteStream（输出流）对象（可写流）。
  request.get(url).pipe(fs.createWriteStream(path.join(movieDir, movieName + '.jpg')));
};

// 异步操作写的跟同步一样
(async () => {
  // 这里的files得到的是文件的所有信息对象
  let files = await readFiles();

  // await只能使用在原生语法
  for (var file of files) {

    let name = path.parse(file).name;

    console.log(`正在获取【${name}】的海报`);

    savePoster(name, await getPoster(name));
  }

  console.log('=== 获取海报完成 ===');

})();
