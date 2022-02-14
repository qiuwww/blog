# webpack 插件开发

[参考文档](https://www.webpackjs.com/contribute/writing-a-plugin/)

插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。创建插件比创建 loader 更加高级，因为你将需要理解一些 webpack 底层的内部特性来做相应的钩子，所以做好阅读一些源码的准备！

webpack 插件由以下组成：

- 一个 JavaScript 命名函数（构造函数）。
- 在插件函数的 prototype 上定义一个 apply 方法（入口，拿到参数 compiler）。
  - 这个 apply 方法在安装插件时，会被 webpack compiler 调用一次。
- 指定一个绑定到 webpack 自身的事件钩子（webpack 的执行阶段，如 AssetsReplacePlugin）。
- 处理 webpack 内部实例的特定数据。
  - 如：compilation.assets
- 功能完成后调用 webpack 提供的回调。
  - 如：.source()

## Compiler 和 Compilation

在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步。

- compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。**当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用**。可以使用它来访问 webpack 的主环境。

- **compilation 对象代表了一次资源版本构建**。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。**compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用**。
