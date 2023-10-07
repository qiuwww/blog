// 遍历hooks，添加回调，输出`hookName`

class PluginHooksTest {
  apply(compiler) {
    Object.keys(compiler.hooks).forEach((hookName) => {
      if (compiler.hooks[hookName].tap) {
        compiler.hooks[hookName].tap('anyString', () => {
          console.log(`#### PluginHooksTest #### run -> ${hookName}`);
        });

        // beforeCompile

        compiler.hooks.beforeCompile.tap('PluginHooksTest', (factory) => {
          // console.log('$$$$$ beforeCompile', factory);
        });
      }
    });
  }
}
module.exports = PluginHooksTest;
