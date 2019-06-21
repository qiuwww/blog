function MyPlugin(options) {
  console.log("MyPlugin,options", options);
}
// 2.函数原型上的 apply 方法会注入 compiler 对象
MyPlugin.prototype.apply = function(compiler) {
  // 3.compiler 对象上挂载了相应的 webpack 事件钩子 4.事件钩子的回调函数里能拿到编译后的 compilation 对象
  compiler.plugin("emit", (compilation, callback) => {
    console.log(
      "MyPlugin*************************************************start"
    );
    console.log("MyPlugin", compilation);
    console.log("MyPlugin*************************************************end");
  });
};
// 1.独立的 JS 模块，暴露相应的函数
module.exports = MyPlugin;
