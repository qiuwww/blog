# webpack 打包配置

## 目标

- js 的处理：转换 ES6 代码，解决浏览器兼容问题
- css 的处理：编译 css，自动添加前缀，抽取 css 到独立文件
- html 的处理：复制并压缩 html 文件
- dist 的清理：打包前清理源目录文件
- assets 的处理：静态资源处理
- server 的启用：development 模式下启动服务器并实时刷新

## 可优化的地方

- 生产环境去除调试信息；
- 缓存包编译结果；

## webpack4 的新特性

### 官方宣布不在支持 Node 4

[Node 6](https://link.juejin.im/?target=https%3A%2F%2Fnodejs.org%2Fen%2Fblog%2Frelease%2Fv6.0.0%2F)

使用的是 v8 5.0 版本，支持 93%的 ES6 语法。不难看出，这个决定是为了更好的利用 ES6 语法的优势，来编写出更加整洁和健壮的代码。

> 备注：当使用[webpack4](https://link.juejin.im/?target=https%3A%2F%2Ftwitter.com%2Fhashtag%2Fwebpack%3Fsrc%3Dhash%26ref_src%3Dtwsrc%255Etfw)时，确保使用 Node.js 的版本 >= 8.9.4。因为 webpack4 使用了很多 JS 新的语法，它们在新版本的 v8 里经过了优化。

### webpack 需要设置 mode 属性，可以是 development 或 production。

**通过 mode, 你可以轻松设置打包环境。**如果你将 mode 设置成 development，你将获得最好的开发阶段体验。这得益于 webpack 针对开发模式提供的特性：

- 浏览器调试工具
- 注释、开发阶段的详细错误日志和提示
- 快速和优化的增量构建机制
  如果你将 mode 设置成了 production, **webpack 将会专注项目的部署**，包括以下特性：
  - 开启所有的优化代码
  - 更小的 bundle 大小
  - 去除掉只在开发阶段运行的代码
  - Scope hoisting 和 Tree-shaking

### webpack4 删除了 CommonsChunkPlugin 插件

它使用内置 API **optimization.splitChunks** 和 **optimization.runtimeChunk**，这意味着 webpack 会默认为你生成共享的代码块。

### 其它插件变化如下

- NoEmitOnErrorsPlugin 废弃，使用 optimization.noEmitOnErrors 替代，在生产环境中默认开启该插件。
- ModuleConcatenationPlugin 废弃，使用 optimization.concatenateModules 替代，在生产环境默认开启该插件。
- NamedModulesPlugin 废弃，使用 optimization.namedModules 替代，在生产环境默认开启。
- uglifyjs-webpack-plugin 升级到了 v1.0 版本, 默认开启缓存和并行功能。

### DefinePlugin 可以在编译时期创建全局变量

该特性适用于开发版本同线上版本在某些常量上有区别的场景。
比如，可能会通过全局变量定义是否需要打印日志，在开发版中打印日志，
而在先上版本不打印日志。

### Webpack 4 支持零配置使用

webpack 4 的零配置主要应用于：

- entry 默认设置为 ./src/index.js
- output 默认设置为 ./dist/main.js
- production 和 development 两种模式

```json
"scripts": {
  "dev": "webpack --mode development ./src/javascripts/index.js --output ./dist/js/main.js",
  "build": "webpack --mode production ./src/javascripts/index.js --output ./dist/js/main.js"
}
```

## 打包的时候去掉 console.log 与 debugger

```js
new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false
  }
});
```

这里的插件已经从 webpack 上移除，需要单独引入使用。

```js
const = require('uglifyjs-webpack-plugin');
```

## 主要配置属性

### module

webpack 通过 loader 可以**支持各种语言和预处理器编写模块**。
loader 描述了 webpack 如何处理 **非 JavaScript(non-JavaScript) _模块_(css，img...)**，并且在 bundle 中引入这些依赖。
webpack 提供了可定制的、强大和丰富的 API，允许任何技术栈使用 webpack，保持了在你的开发、测试和生成流程中无侵入性(non-opinionated)。

### plugins

插件目的在于解决 **loader** 无法实现的其他事。

webpack 插件是一个具有 apply 属性的 **JavaScript 对象**。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个编译生命周期访问**。

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例。

### entry points

入口起点

### output

配置 output 选项可以控制 webpack 如何**向硬盘写入编译文件**。注意，即使可以存在多个入口起点，但**只指定一个输出配置**。

### mode，4 新增

提供 mode 配置选项，告知 webpack 使用相应模式的**内置优化**。

#### 支持的字段

- development

会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。

- production

会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.

### loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader **类似于其他构建工具中“任务(task)”**，并提供了处理前端构建步骤的强大方法。

### 解析(resolve)

配置模块如何解析。例如，当在 ES2015 中调用 import "lodash"，resolve 选项能够对 webpack 查找 "lodash" 的方式去做修改。

### 同时 webpack 也拆成了两部分，webpack 和 webpack-cli，都需要本地安装。

### 文件名 hash

hash 是用在文件输出的名字中的，如 [name].[hash].js，总的来说，webpack 提供了三种 hash：

- [hash]：此次打包的所有内容的 hash。
- [chunkhash]：每一个 chunk 都根据自身的内容计算而来。
- [contenthash]：由 css 提取插件提供，根据自身内容计算得来。

### 提取 js 中的 css 部分到单独的文件

extract-text-webpack-plugin 插件 -> 替代插件 mini-css-extract-plugin

这里提取之后，还需要单独进行压缩 optimize-css-assets-webpack-plugin

## webpack 指令配置

--progress: 压缩的进程提示
--colors ：显示不同的颜色
--profile ： 每个文件的压缩时间

## 通过 webpack，给运行环境（浏览器 window 或者 node 的 global）注入全局变量

```js
plugins: [
  new webpack.DefinePlugin({
    // 注入全局变量，注意这里的变量必须是'" "'包裹的。
    "process.env.env": '"dev"'
    // "process.env": require("../config/dev.env"),
    // "process.env.BASE_URL": '"' + process.env.BASE_URL + '"'
  })
];
```

## webpack 运行的时候的环境配置

### dev

`yarn run dev`

页面访问地址: `http://localhost:1314/`

页面分析的访问地址: `http://127.0.0.1:8888/`
