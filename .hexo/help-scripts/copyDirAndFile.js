var fs = require('fs');
var path = require('path');
/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDirAndFile(src, dist, callback) {
  // 这里还要优化，如果文件夹内没有复合要求的文件就删除这个文件夹。
  // 测试用户对 path 指定的文件或目录的权限。
  fs.access(dist, fs.constants.R_OK, function (err) {
    // console.log(`${dist} ${err ? '不可读' : '可读'}`);
    if (err) {
      // 目录不存在时创建目录，同步地创建目录。
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      // 以上都正确，执行下边的操作，异步的 readdir(3)。 读取目录的内容。
      // paths 是目录中的文件名的数组，不包括 '.' 和 '..'。
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err)
        } else {
          // console.log("paths:", paths);
          paths.forEach(function (path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            // 检查文件是否存在。
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  // 读readFileSync然后写writeFileSync
                  // fs.writeFileSync(_dist, fs.readFileSync(_src));
                  filterFileAndCopy(_dist, _src);
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDirAndFile(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

// 获取文件的扩展名
function getExtension(filepath) {
  var ext = path.extname(filepath || '').split('.');
  return ext[ext.length - 1];
}
// 获取文件的名称
function getFilename(filepath) {
  var basename = path.basename(filepath || '');
  return basename;
}

// 过滤文件，并且赋值
function filterFileAndCopy(_dist, _src) {
  // var extname = path.extname(_src);
  var extname = getExtension(_src);
  var filename = getFilename(_src);
  if (extname === 'md' && /Q&A\-/ig.test(filename)){
    _dist = _dist.replace(/Q&A\-/ig, '');
    console.log(_src, extname, filename);
    fs.writeFileSync(_dist, fs.readFileSync(_src));
  }
}

copyDirAndFile('../../blog', './source/_posts', () => {});

// 复制整个blog下的.md文件，然后修改文件名，分类，之后进行gd发布。

// 这里应该还要允许添加自定义的文件路径
// 单独写一个方法，复制这个文件

// 文件的时间命名


// 这里应该还需要执行删除文件的指令
