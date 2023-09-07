const pluginName = 'CompilerHook';

function CompilerHook(option) {
  this.option = option;
  console.log(pluginName + option.name + ' 初始化 ');
}
// 在函数的原型上声明一个apply方法
CompilerHook.prototype.apply = function (compiler) {
  compiler.hooks.environment.tap(pluginName, (params) => {
    /* ... */
    // console.log(pluginName + ' params ', params);
  });

  compiler.hooks.entryOption.tap(pluginName, (context, entry) => {
    /* ... */
    // console.log(pluginName + ' ', entry);
  });
};

module.exports = CompilerHook;
