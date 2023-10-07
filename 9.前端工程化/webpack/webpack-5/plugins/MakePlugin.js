const pluginName = 'MakePlugin';

function MakePlugin(option) {
  this.option = option;
  console.log(option.name + '初始化');
}
// 在函数的原型上声明一个apply方法
MakePlugin.prototype.apply = function (compiler) {
  // Error: Invalid tap options
  compiler.hooks.make.tap(MakePlugin, (compilation) => {
    compilation.hooks.succeedModule.tap(MakePlugin, (module) => {
      console.log('module.request', module.request);

      if (/ast.js/.test(module.request)) {
        let newsource = module._source._value; //这里是源码

        console.log('newsource', newsource);

        // newsource = newsource.replace(/777777777/g, `(function(){console.log(123);return 90;})()`);
        module._source._value = newsource;
      }
    });
  });
};

module.exports = MakePlugin;
