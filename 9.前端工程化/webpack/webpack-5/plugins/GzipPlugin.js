const zlib = require('zlib');

class GzipPlugin {
  constructor(option) {
    this.option = option;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('GzipPlugin', (compilation) => {
      for (var filename in compilation.assets) {
        // if (/(.js|.css)$/.test(filename)) {
        if (/(.js)$/.test(filename)) {
          console.log('filename', filename);
          // console.log('这里可以获取文件的源码', compilation.assets[filename].source());
          // zlib.gzipSync
          const gzipFile = zlib.gzipSync(compilation.assets[filename].source(), {
            //压缩等级
            level: this.option.level || 7,
          });

          // 添加了一些文件，将结果修改为了gzipFile
          compilation.assets[filename + '.gz'] = {
            source: function () {
              return gzipFile;
            },
            size: function () {
              return gzipFile.length;
            },
          };
        }
      }
    });
  }
}

module.exports = GzipPlugin;
