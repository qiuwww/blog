const pluginName = 'ModifyOutput';
const modify = require('./modify');

console.log('ModifyOutput load');

class ModifyOutput {
  apply(compiler) {
    // emit
    // compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
    // compile
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      console.log('ModifyOutput tapAsync run');

      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        let source = compilation.assets[filename].source();

        if (/(.js)$/.test(filename)) {
          console.log('ModifyOutput name==', filename);

          if (filename !== 'ast.js') {
            return;
          }
          // 这里使用babel进行处理 => 读取、遍历、增删改查
          console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
          source = modify(source);
          console.log('¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥');
        }
      }

      // compilation.chunks.forEach(function (chunk) {
      //   chunk.files.forEach(function (filename) {
      //     // compilation.assets 存放当前所有即将输出的资源
      //     // 调用一个输出资源的 source() 方法能获取到输出资源的内容

      //     let source = compilation.assets[filename].source();

      //     // 这里可以根据扩展名进行不同的操作

      //     // 可以借助bable去分析语法，然后去修改执行位置的代码

      //     if (/(.js)$/.test(filename)) {
      //       console.log('ModifyOutput name == ', filename);

      //       source = '/*这是我通过webpack plugin 在js文件中插入的一行代码*/\n' + source;

      //       source = `console.log('这里是通过webpack插入的内容，哈哈哈哈哈😄'); ${source}`;

      //       // 这里使用babel进行处理 => 读取、遍历、增删改查
      //       console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      //       source = modify(source);
      //       console.log('¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥');
      //     }

      //     compilation.assets[filename] = {
      //       source: function () {
      //         // 修改了这里的内容，因为filename是已经存在的文件
      //         return source;
      //       },
      //       size: function () {
      //         return source.length;
      //       },
      //     };
      //   });
      // });
    });
    compiler.hooks.done.tap(pluginName, (compilation) => {
      console.log('webpack 构建完毕！');
    });
  }
}

module.exports = ModifyOutput;
