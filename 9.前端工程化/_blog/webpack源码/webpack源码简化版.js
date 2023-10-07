// /lib/webpack.js
const webpack = (options, callback) => {
  // 创建 Compiler 类的实例
  const compiler = new Compiler(options.context);
  compiler.options = options;
  // 注册所有自定义插件
  if (Array.isArray(options.plugins)) {
    // 遍历传入的 webpack 配置中的实例化插件数组
    for (const plugin of options.plugins) {
      if (typeof plugin === 'function') {
        // 在compiler对象的作用域下调用plugin构造函数，即this指向compiler；同时把compiler对象当作参数传过去。并且compiler对象会继承plugin的所有属性、方法
        plugin.call(compiler, compiler);
      } else {
        // 如果 plugin 是其他类型，就执行plugin对象的apply方法。
        // plugins 数组的内容一般都是一个个插件实例化对象，也就是 object。
        plugin.apply(compiler);
      }
    }
  }
  applyWebpackOptionsDefaults(options);
  // 触发 compiler 的 两个 hook: environment，afterEnvironment
  compiler.hooks.environment.call();
  compiler.hooks.afterEnvironment.call();
  // 根据 options 的配置不同，注册激活一些默认自带的插件和 resolverFactory.hooks
  // 大部分插件的作用是往 compiler.hooks:compilation,thisCompilation 里注册一些事件
  new WebpackOptionsApply().process(options, compiler);
  compiler.hooks.initialize.call();
  // 获取是否以watch监听模式启动的 webpack 以及 监听相关配置
  let watch = options.watch || false;
  let watchOptions = options.watchOptions || {};
  if (callback) {
    // 如果传递了回调
    if (watch) {
      // 配置传了 watch 则调用监听模式启动 webpack
      compiler.watch(watchOptions, callback);
    } else {
      // 启动 compiler.run，即开启编译工作， webpack 的核心构建流程
      compiler.run((err, stats) => {
        // stats 对象是编译过程中的有用信息， 包括：
        //*   错误和警告(如果有的话)
        //*   计时信息
        //*   module 和 chunk 信息
        // webpack CLI 正是基于这些信息在控制台 展示友好的格式输出。
        compiler.close((err2) => {
          callback(err || err2, stats);
        });
      });
    }
    return compiler;
  } else {
    if (watch) {
      util.deprecate(
        () => {},
        'watch模式必须提供callback回调函数！',
        'DEP_WEBPACK_WATCH_WITHOUT_CALLBACK',
      )();
    }
    return compiler;
  }
};

module.exports = webpack;
