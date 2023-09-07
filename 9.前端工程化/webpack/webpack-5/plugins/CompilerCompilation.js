const PluginName = 'CompilerCompilation';

console.log('##CompilerCompilation##load');

// 一个插件类基本结构示例：
class CompilerCompilation {
  constructor(options = {}) {
    // 省略构造器部分
  }
  // 调用原型方法 apply 并传入 compiler 对象
  apply(compiler) {
    // 给 compilation 钩子注册 'CompilerCompilation'，回调会在 compilation 对象创建之后触发
    console.log('##CompilerCompilation##apply');
    compiler.hooks.compilation.tap('CompilerCompilation', (compilation) => {
      // 回调参数是 compilation 对象，因此这里可以使用各种可用的 compilation hooks(钩子)
      compilation.hooks.optimize.tap('CompilerCompilation', () => {
        // 优化阶段开始时触发
        console.log('CompilerCompilation资源正在优化');
      });
    });

    // 在 emit 阶段，即输出 asset 到 output 目录之前触发回调函数
    compiler.hooks.emit.tapAsync('CompilerCompilation', (compilation, callback) => {
      console.log('This is an example plugin!');
      // console.log('`compilation`对象，即资源的一个单一版本的构建', compilation);
      // console.log('assetsInfo: ', compilation.assetsInfo);

      // // 使用webpack提供的 plugin API 操作构建
      // compilation.addModule(/* ... */);

      console.log('## CompilerCompilation##callback');

      callback();
    });

    // 异步访问插件，需要返回一个promise
    compiler.hooks.emit.tapPromise(PluginName, (compilation) => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve, reject) => {
        // 这里如果延迟10s，就需要等待10s后才执行
        setTimeout(function () {
          console.log('## 以异步的方式触发具有延迟操作的钩子。');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = CompilerCompilation;
