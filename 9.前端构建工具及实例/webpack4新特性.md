## webpack4新特性

- 官方宣布不在支持Node 4, [Node 6](https://link.juejin.im/?target=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv6.0.0%2F) 使用的是v8 5.0版本，支持93%的ES6语法。不难看出，这个决定是为了更好的利用ES6语法的优势，来编写出更加整洁和健壮的代码。

> 备注：当使用[webpack4](https://link.juejin.im/?target=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fwebpack%3Fsrc%3Dhash%26ref_src%3Dtwsrc%255Etfw)时，确保使用 Node.js的版本 >= 8.9.4。因为webpack4使用了很多JS新的语法，它们在新版本的 v8 里经过了优化。

- webpack需要设置mode属性，可以是 development 或 production。
  **通过mode, 你可以轻松设置打包环境。**如果你将 mode 设置成 development，你将获得最好的开发阶段体验。这得益于webpack针对开发模式提供的特性：

  - 浏览器调试工具
  - 注释、开发阶段的详细错误日志和提示
  - 快速和优化的增量构建机制

  如果你将mode设置成了 production, webpack将会专注项目的部署，包括以下特性：

  - 开启所有的优化代码
  - 更小的bundle大小
  - 去除掉只在开发阶段运行的代码
  - Scope hoisting和Tree-shaking

  ​


- webpack4删除了CommonsChunkPlugin插件，它使用内置API **optimization.splitChunks** 和 **optimization.runtimeChunk**，这意味着webpack会默认为你生成共享的代码块。

其它插件变化如下:

- NoEmitOnErrorsPlugin 废弃，使用optimization.noEmitOnErrors替代，在生产环境中默认开启该插件。
- ModuleConcatenationPlugin 废弃，使用optimization.concatenateModules替代，在生产环境默认开启该插件。
- NamedModulesPlugin 废弃，使用optimization.namedModules替代，在生产环境默认开启。
- uglifyjs-webpack-plugin升级到了v1.0版本, 默认开启缓存和并行功能。

