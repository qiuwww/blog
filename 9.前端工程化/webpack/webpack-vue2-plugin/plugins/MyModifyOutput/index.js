const pluginName = 'MyModifyOutput';
const babelModify = require('./babel-modify.js');
console.log('MyModifyOutput load');

// ! 这里需要找到没经过babel处理的阶段进行修改 / 处理后的代码进行处理
class MyModifyOutput {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        console.log('MyModifyOutput name==', filename);
      }

      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容

          console.log('MyModifyOutput chunk name==', filename);
          let source = compilation.assets[filename].source();

          // 这里可以根据扩展名进行不同的操作
          // 可以借助bable去分析语法，然后去修改执行位置的代码
          if (filename.includes('.js') && filename === 'js/about.js') {
            // // 直接拼接结果，这里是有效果的
            // source = "console.log('哈哈哈哈哈😄');\n" + source;

            // 通过babel分析后，结构化添加
            source = babelModify(source);

            source = `${source}`;
          }

          compilation.assets[filename] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            },
          };
        });
      });
      cb();
    });

    compiler.hooks.done.tap(pluginName, (compilation) => {
      console.log('webpack 构建完毕！！！');
    });
  }
}

module.exports = MyModifyOutput;
