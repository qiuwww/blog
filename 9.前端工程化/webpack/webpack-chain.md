# webpack-chain

[文档](https://github.com/neutrinojs/webpack-chain#getting-started)
[需要学习一下：前端工程化：webpack-chain](https://juejin.cn/post/6844904138954801166)

## 添加 loader 的时候的参数

```js
config.module
  // 具名规则，以后用来修改规则
  .rule('md')
  // 匹配的方式
  .test(/\.md$/)
  // 使用的loader
  .loader(path.resolve(__dirname, './markdown-loader/src/index.js'))
  .end();

// true
if (process.env.templateBlocksPath) {
  config.module
    .rule('js')
    .test(/\.js$/)
    .include.add(decodeURI(process.env.templateBlocksPath))
    .end()
    .include.add(process.env.eCoderWorkspacePath)
    .end();
}
```

```js
const { getOptions } = require('loader-utils');

module.exports = function loader(source) {
  const options = getOptions(this);
  // 获取options参数
  console.log('\n\n##################txt-loader：', source, options);

  source = source.replace(/\[name\]/g, options.name);

  return `export default ${JSON.stringify(source)}`;
};
```

1. rule: name
2. use: name，
3. loader: Rule.loader 是 Rule.use: [ { loader } ] 的简写。
   1. use: ['vue-loader', path.resolve(__dirname, './markdown-loader/src/index.js')]
