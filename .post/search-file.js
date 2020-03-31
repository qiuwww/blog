// 读取blog下的所有文件，查找文件名为BLOG-开头的，然后输出为一个json文件

var path = require('path');
var fs = require('fs');
var dirs = [];
var pathName = path.resolve(__dirname, '../');

console.log('pathName', pathName);

fs.readdir(pathName, function(err, files) {
  for (var i = 0; i < files.length; i++) {
    fs.stat(path.join(pathName, files[i]), function(err, data) {
      if (data.isFile()) {
        dirs.push(files[i]);
      }
    });
  }
  console.log(dirs);
});
