// /lib/Compiler.js
const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable');

class Compiler {
  constructor(context) {
    // 定义一堆hook，done,beforeRun,run,emit等等
    this.hooks = Object.freeze({
      /** @type {SyncBailHook<[Compilation], boolean>} */
      run: new AsyncSeriesHook(['compiler']), // 在开始读取records之前调用
      /** @type {SyncHook<[Compilation, CompilationParams]>} */
      thisCompilation: new SyncHook(['compilation', 'params']), // 初始化 compilation 时调用，在触发 compilation 事件之前调用
      /** @type {AsyncSeriesHook<[Compilation]>} */
      emit: new AsyncSeriesHook(['compilation']), // 输出 asset 到 output 目录之前执行
      /** @type {AsyncSeriesHook<[Compilation]>} */
      afterEmit: new AsyncSeriesHook(['compilation']), // 输出 asset 到 output 目录之后执行
      /** @type {AsyncSeriesHook<[Stats]>} */
      done: new AsyncSeriesHook(['stats']), // 在 compilation 完成时执行
    });
  }
  watch(watchOptions, handler) {} // 以监听模式执行 webpack 打包的方法

  // !执行插件的apply方法，就会走到compiler的run方法
  run(callback) {
    // run 即为执行 webpack 打包的主流程函数
    const onCompiled = (err, compilation) => {};
    const run = () => {
      this.hooks.beforeRun.callAsync(this, (err) => {
        this.hooks.run.callAsync(this, (err) => {
          if (err) return finalCallback(err);
          this.readRecords((err) => {
            // 读取之前的 records
            if (err) return finalCallback(err);
            this.compile(onCompiled); //  在 compile 过程后调用 onCompiled，主要用于输出构建资源
          });
        });
      });
    };
  }
  compile(callback) {
    // compile 是真正进行编译的方法，最终会把所有原始资源编译为目标资源。
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, (err) => {
      if (err) return callback(err);
      this.hooks.compile.call(params);
      // createCompilation方法主要就是清除之前的compilation，重新实例化一个Compilation
      const compilation = this.createCompilation();
      compilation.name = this.name;
      compilation.records = this.records;
      // 触发compiler.hooks：thisCompilation 和 compilation
      // 注册plugins阶段在这两个钩子注册的事件在拿到compilation对象后开始执行
      this.hooks.thisCompilation.call(compilation, params);
      this.hooks.compilation.call(compilation, params);
      return compilation;
    });
  }
}
