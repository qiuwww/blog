const fs = require('fs');

const pluginName = 'ModifyAssets';
function ModifyAssets(option) {
  this.option = option;
  console.log(option.name + '初始化');
}
// 在函数的原型上声明一个apply方法
ModifyAssets.prototype.apply = function (compiler) {
  compiler.hooks.emit.tap(pluginName, (compilation) => {
    for (var filename in compilation.assets) {
      if (filename.startsWith('ast-')) {
        let old = compilation.assets[filename].source();

        // 这里拿到的是字符串的文本
        fs.writeFileSync(__dirname + '/output/' + filename, old);

        // 这边只是方便在前后添加，因为这个时候，代码已经被处理成字符串了
        old = old + 'console.log("ModifyAssets add")';

        compilation.assets[filename] = {
          source() {
            // return old.source().replace(self.target, self.value);
            return old;
          },
          size() {
            return old.length;
          },
        };
      }
    }
  });
};

module.exports = ModifyAssets;
