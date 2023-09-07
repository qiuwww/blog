const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    console.log('##ConsoleLogOnBuildWebpackPlugin##apply');

    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      console.log('##plugins:ConsoleLogOnBuildWebpackPlugin##', 'webpack 构建正在启动！');
      cb();
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
