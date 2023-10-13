const pluginName = 'PluginModify';
const babelModify = require('./babelModify.js');

/**
 * 这里似乎可以这样理解：
 * 1. assets代表的是原始的代码，修改了会影响到目标结果；=> 修改模块代码:在 compilation 阶段，你可以监听 optimize-chunk-assets 事件，它会提供输出的 chunk 对象。你可以遍历这些 chunk，获取模块的代码，然后修改代码，最后通过 compilation.assets 对象将修改后的代码重新写入到输出文件中。
 *   1.1 都是走到了compilation.assets[fileName]；
 * 2. chunks和modules修改了也只是修改了，没什么用；
 * 3. compiler.hooks.normalModuleFactory应该也是同样的问题
 */

class PluginModify {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // 方式一
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        // console.log('MyModifyOutput name==', filename);
      }
      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          let source = compilation.assets[filename].source();
          // 这里可以根据扩展名进行不同的操作

          if (filename.includes('.js') && filename.includes('modifyByPlugin')) {
            // 方式一
            source =
              "console.log('哈哈哈哈哈😄');\n" +
              source +
              "\n;console.log('add by plugin-modify-1!');";
            // 方式二
            // 通过babel分析后，结构化添加
            source = babelModify(source);
            source = `${source}`;
          }

          // 这里修改的是assets
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

    // !这个会在emit前面添加
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, callback) => {
        chunks.forEach((chunk) => {
          // 遍历块的所有文件
          chunk.files.forEach((file) => {
            if (file.endsWith('.js')) {
              // 获取文件内容
              // webpack处理过的代码
              let source = compilation.assets[file].source();
              // 在文件开头添加自定义注释
              source = `/* ¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥ */\n${source}`;
              // 将修改后的内容写回文件
              compilation.assets[file] = {
                source: () => source,
                size: () => source.length,
              };
            }
          });
        });

        // 执行回调函数
        callback();
      });
    });

    compiler.hooks.done.tap(pluginName, (compilation) => {
      console.log('webpack 构建完毕！！！');
    });
  }
}

module.exports = PluginModify;
