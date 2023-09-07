// 声明一个js函数
const pluginName = 'ExamplePlugin';

function ExamplePlugin(option) {
  this.option = option;
  console.log(option.name + '初始化');
}
// 在函数的原型上声明一个apply方法
ExamplePlugin.prototype.apply = function (compiler) {
  console.log('##ExamplePlugin##apply');

  // 同步的tap方法
  compiler.hooks.compilation.tap('ExamplePlugin', (compilation) => {
    // 回调参数是 compilation 对象，因此这里可以使用各种可用的 compilation hooks(钩子)

    console.log('走到了ExamplePlugin的compilation.tap');

    compilation.hooks.optimize.tap('ExamplePlugin', () => {
      // 优化阶段开始时触发
      console.log('ExamplePlugin 资源正在优化');
    });

    //在webpack的afterPlugins生命周期上添加一个方法
    compiler.hooks.afterPlugins.tap(pluginName, (compilation) => {
      console.log('webpack设置完初始插件之后执行的生命周期');
    });

    //在webpack的emit生命周期上添加一个方法
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      // console.log(pluginName + '生成资源到 output 目录之前执行的生命周期');
    });
  });

  // & 这里将文件的输出结果保存到了一个md文件到本地了
  compiler.hooks.emit.tap(pluginName, (compilation) => {
    let filelist = '构建后的文件: \n';
    for (var filename in compilation.assets) {
      filelist += '- ' + filename + '\n';
      // console.log(filelist);
    }

    // 针对文件，特殊处理
    compilation.assets['filelist.md'] = {
      source: function () {
        return filelist;
      },
      size: function () {
        return filelist.length;
      },
    };
  });

  // webpack 构建完毕！后会执行这里
  compiler.hooks.done.tap(
    'ExamplePlugin',
    (stats /* 绑定 done 钩子后，stats 会作为参数传入。 */) => {
      console.log('Hello World!');
    },
  );

  // 指定一个挂载到 compilation 的钩子，回调函数的参数为 compilation 。
  compiler.hooks.compilation.tap(pluginName, (compilation) => {
    // 现在可以通过 compilation 对象绑定各种钩子
    compilation.hooks.optimize.tap(pluginName, () => {
      console.log('资源已经优化完毕。');
    });
  });

  //
  compiler.resolverFactory.hooks.resolver.for('loader').tap('name', (resolver) => {
    // you can tap into resolver.hooks now
    resolver.hooks.result.tap(pluginName, (result) => {
      // console.log('hooks.resolver', result.context.issuer);
      return result;
    });
  });
};

module.exports = ExamplePlugin;
