const pluginName = 'ModifyAssets';

function ModifyAssets(option) {
  this.option = option;
  console.log(option.name + '初始化');
}
// 在函数的原型上声明一个apply方法
ModifyAssets.prototype.apply = function (compiler) {
  compiler.hooks.emit.tap('AssetsReplacePlugin', (compilation) => {
    console.log('## AssetsReplacePlugin ##', compilation.assets);

    for (var filename in compilation.assets) {
      if (filename.startsWith('ast-')) {
        console.log('## assets ##', filename, compilation.assets[filename]);
      }
    }

    // let old = compilation.assets[this.assetsName];

    //   (compilation.assets[this.assetsName] = {
    //     source() {
    //       return old.source().replace(self.target, self.value);
    //     },
    //     size() {
    //       return this.source().length;
    //     },
    //   });
  });
};

module.exports = ModifyAssets;
