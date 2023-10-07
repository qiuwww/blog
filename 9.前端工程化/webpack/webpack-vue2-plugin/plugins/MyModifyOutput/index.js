const pluginName = 'MyModifyOutput';
const babelModify = require('./babel-modify.js');
const ConcatSource = require('webpack-sources').ConcatSource;
console.log('MyModifyOutput load');

// ! 这里需要找到没经过babel处理的阶段进行修改 / 处理后的代码进行处理
class MyModifyOutput {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      console.log('MyModifyOutput tapAsync run');

      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        console.log('MyModifyOutput name==', filename);
      }

      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容

          console.log('MyModifyOutput name==', filename);

          let source = compilation.assets[filename].source();

          // 这里可以根据扩展名进行不同的操作

          // 可以借助bable去分析语法，然后去修改执行位置的代码

          if (filename.includes('.js') && filename === 'js/about.js') {
            // 直接拼接结果
            source = "console.log('哈哈哈哈哈😄');\n" + source;

            // 通过babel分析后，结构化添加
            babelModify(source);

            source = ` ${source}`;
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

    // 通过 optimizeChunkAssets 的钩子可以拿到所有的 chunks 信息，针对具体的 chunks 可以修改对应的源码

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 这里的代码实际上已经被处理过了，生成了chunk，文件的id都已经有了
      compilation.hooks.optimizeChunkAssets.tap('CustomPlugin', (chunks) => {
        console.log('### optimizeChunkAssets');

        chunks.forEach((chunk) => {
          chunk.files.forEach((fileName) => {
            // 判断具体要修改的文件，假设简单通过 chunk 的文件名称判断入口
            console.log('optimizeChunkAssets fileName', fileName);

            if (fileName.indexOf('js/about.js') > -1) {
              // console.log('optimizeChunkAssets assets', compilation.assets[fileName].source());

              compilation.assets[fileName] = new ConcatSource(
                `console.log('code before');`,
                compilation.assets[fileName],
                `console.log('code after');`,
              );
            }
          });
        });
      });
    });

    // !这里可以拿到源码
    compiler.hooks.make.tap(pluginName, (compilation) => {
      compilation.hooks.succeedModule.tap(pluginName, (module) => {
        // 这里的module request是所有资源的整合
        if (/views\/AboutView.vue/.test(module.request)) {
          console.log('module.request', module.request);

          let newsource = module._source._value; // 这里是源码

          // newsource = newsource.replace(
          //   /777777777/g,
          //   `(function(){console.log(123);return 90;})()`,
          // );

          console.log('make succeedModule', newsource);

          module._source._value = newsource;
        }
      });
    });

    // beforeRun 钩子只为 run 调用，而不是为 watch 调用。
    compiler.hooks.beforeRun.tap(pluginName, (compiler) => {
      console.log('#### 准备编译，这里只会在build被触发，dev不会被触发');
    });

    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    // compiler.plugin('compilation', function (compilation) {
    //   console.log('#### 准备编译，这里只会在build被触发，dev不会被触发', compilation);
    // });
    // ❌ compiler.plugin is not a function

    compiler.hooks.compilation.tap(pluginName, function (compilation) {
      // console.log('#### compiler.hooks.compilation.tap', compilation);
    });
  }
}

module.exports = MyModifyOutput;
