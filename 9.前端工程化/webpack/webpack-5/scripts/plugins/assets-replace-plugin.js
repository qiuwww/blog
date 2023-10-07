// 插件，用于替换编译过程中的变量，修改appid到具体的值，在智云健康小程序项目中使用

// new AssetsReplacePlugin({
//   assetsName: '目标文件地址',
//   target: '匹配字段',
//   value: '结果'
// })

class AssetsReplacePlugin {
  constructor(options) {
    this.assetsName = options.assetsName;
    this.target = options.target;
    this.value = options.value;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('AssetsReplacePlugin', (compilation) => {
      console.log('compilation', compilation);
      let old = compilation.assets[this.assetsName];
      let self = this;
      old &&
        (compilation.assets[this.assetsName] = {
          source() {
            return old.source().replace(self.target, self.value);
          },
          size() {
            return this.source().length;
          },
        });
    });
  }
}

module.exports = AssetsReplacePlugin;
