---
title: wepack构建分析
date: 2020-5-17
tags:
  - 构建工具
  - webpack
  - 配置
  - 构建分析
categories:
  - [构建工具, webpack]
---

`24.lazy loading git:(master) ✗ webpack --config webpack.config.js`

[TOC]

本教程将重点讲解 webpack 配置参数，开发环境配置，生产环境配置，**企业级的优化环境配置以及 webpack5 震撼新特性**。涉及知识点：

1. tree shaking、
2. code spilt、
3. caching、
4. HMR、
5. PWA、
6. lazy loading、
7. prefetch、
8. Dll 等核心配置。

## 课程知识点

1. 构建工具 -> 很多功能聚合体，去做很多事情；
2. 静态资源打包器：文件（静态模块） -> (loader) -> 资源引入后转为 chunk（代码块） -> (plugin) -> output(bundle)；
3. 核心概念：
   1. entry
   2. output
   3. loader，翻译器，翻译给 webpack 看。
   4. plugins，插件(Plugins)可以**用于执行范围更广的任务**。插件的范围包括，从**打包优化和压缩**，一直到**重新定义环境中的变量**等。
   5. mode
4. 优化开发环境的配置，模块热替换 ｜ hrm
   1. devServer.hot = true;
   2. 修改 css，js 被重新打包了(模块重新打包的问题)；
      1. css，style-loader 实现了；
      2. html，不需要 hrm；
      3. js，默认没支持；-> 修改非入口文件的 js -> module.hot 判断，然后更新；
5. 开发环境下调试代码 devtool：
   1. source-map，错误代码的准确信息和错误的准确位置；
   2. 提供**源代码**和**构建后代码**映射的方式；
   3. inline-source-map： 内联，速度快；只生成一个文件的 source-map，错误代码的准确信息和错误的准确位置；
   4. eval-source-map： 内联，多个文件的 source-map；
   5. eval > inline > cheap；选择 eval-source-map
6. **oneOf**，多个匹配规则，只会匹配一个执行，避免被多个 loader 都处理一遍；
7. 缓存，一般 js 变更的比较多，多用到 babel-loader 后边添加 cacheDirectory；
8. **tree-sharking**：排除没有用的代码，减小体积。排除 tree sharking 在 package.json 中添加配置：`"sideEffects":{"*.css"}`，前提如下：
   1. es6 代码；
   2. 开启开启 production 环境；
9. code spliting，**代码分割**：
   1. 多入口；
   2. optimization.splitChunks.chunks = 'all'；
   3. jquery 等包文件会单独打包成一个 chunk；
   4. 借助 import 方法实现分割（分割代码还是 babel 处理），通过 js 代码，让某个文件被单独打包成一个 chunk，`import().then()`动态导入语法：能将某个文件单独打包；
10. lazy loading，懒加载：
    1. 当文件需要使用时才加载；
    2. 使用 **import()**.then()语法实现，这里不会重复加载，会使用缓存；
11. 渐进式网络开发应用程序(离线可访问)：
    1. service work；
    2. workbox --> workbox-webpack-plugin
12. 多进程打包：
    1. 进程启动大概为 600ms，进程通信也有开销。
    2. 只有工作消耗时间比较长，才需要多进程打包；
    3. loader: 'thread-loader',一般用在 js 打包中；
13. externals，外链文件声明：
    1. 类似 Jquery 的，可以外部引入，不参与打包；
14. dll，动态链接库：
    1. 与 externals 类似，externals 是不打包，dll 的内容是自己打包一次；
    2. 代码分割打包；
    3. 避免重复打包；
    4. 打包内容可以是外部库，或者自己的模块；
    5. 对某些库（第三方库：jquery、react、vue...）**进行单独打包**；
    6. 需求：**需要运行 webpack.dll.js 文件** --> webpack --config webpack.dll.js；
    7. 打包生成一个 manifest.json --> 提供和 jquery 映射
    8. 感觉与添加入口 vendor 一致，仓库分割打包；
    9. outPut.library: '[name]\_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字；
    10. manifest：告诉 webpack 哪些库不参与打包，同时使用时的名称也得变；
    11. **webpack.dll.js** 运行用于生成内部打包结果；
15. optimization：优化：
    1. 压缩；

## [优化打包速度和优化调试](https://www.bilibili.com/video/BV1A7411A7Sa?p=31)

### 优化打包速度

1. oneOf；
2. babel 缓存；
3. 多进程打包 thread-loader；
4. externals -> cdn
5. dll；
   1. 对应 code spliting；

### 优化代码运行性能

1. 文件加载缓存，关键是打包名称(hash-chunkhash（同一个入口就是同一个 chunk）-contenthash)，hash 不变就可以缓存代码；
2. tree sharking；
3. code spliting；
4. 懒加载/预加载；
5. pwa；

## webpack5

此版本重点关注以下内容:

- 通过**持久缓存**提高构建性能.
- 使用**更好的算法和默认值来改善长期缓存**.
- 通过更好的**树摇**和代码生成来**改善捆绑包大小**.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

## webpack 的构建分析

### 流程

### 中间产物

### 最终生成的文件的组织方式

## 参考资料

1. [尚硅谷 webpack 新版视频教程](https://www.bilibili.com/video/BV1A7411A7Sa?p=1)
