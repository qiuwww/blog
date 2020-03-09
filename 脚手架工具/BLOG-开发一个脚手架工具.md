---
title: 脚手架工具
date: 2020-03-05
---

其实脚手架的初衷，就是提供一个最佳实践的基础模板，因此**模板拷贝是其核心功能**。

所以目前阶段的 ice 及当前做的 ecoder-web，基本就是一个大号的 脚手架工具 cli。

[参考文章](https://juejin.im/post/5d650613f265da03951a0364)

## 基本思路

大家熟知的 vue-cli create-react-app @tarojs/cli umi 最基本功能：

首先提出一些列问题选项，然后为你的新建项目提供一份模板并安装依赖，再提供调试构建命令。

最核心的部分就是这个思路；但如果要做成一个**可伸缩的、用户友好的，还需考虑这些需求**：

- 模板支持版本管理
- 支持扩展新模板
- 自动检测版本更新
- 根据用户选择，生成个性化模板
- 友好的 UI 界面
- 构建功能独立，可因模板而异 (如区分 H5/PC/weapp/RN)
- 多人合作项目，能确保构建结果一致

## 版本的问题

npm 仓库**天然支持版本管理**，因此将模板发布到 npm 上自然解决了这个问题 (非开源项目，可考虑自建仓库或者私有的仓库)。

## 自动检测版本更新

npm 提供了一些命令来检测包的版本，比如你 npm view react version 返回 16.9.0，告知你最新版本。

借此，可以判断用户目前安装的是否最新版本，并提示用户更新。

获取最新版本，对比当前的版本，如果不对应就提示更新。

## 根据用户选择，生成个性化模板

模板虽说是为了统一，但也要在统一中支持差异，可通过问询用户，来提供差异化支持。

## 友好的 UI 界面

## 构建功能独立，可因模板而异

通常使用 webpack 来构建/调试，对于不同的模板，构建流程存在较大差异，我们需要支持为不同的模板配置不同的构建。

因此构建能力也被抽离成单独的 npm 包，模板中可指定其构建包。

## 脚手架的三类包

- 全局命令包，ecoder-cli
- 模板插件包，ecoder-server+ecoder-client

## cli 开发中值得收藏的一些第三方调料包

- minimist 解析用户命令，将 process.argv 解析成对象
- fs-extra 对 fs 库的扩展，支持 **promise**
- chalk 让你 console.log 出来的字带颜色，比如成功时的绿色字
- **import-from** 类似 require，但支持指定目录，让你可以跨工程目录进行 require，比如全局包想引用工程路径下的内容
- resolve-from 同上，只不过是 require.resolve
- inquirer **询问用户并记录反馈结果，界面互动的神器**
- yeoman-environment 【核心】用于执行一个「**模板插件包**」
- easy-table 类似 console.table，输出**漂亮的表格**
- ora 提供 loading 菊花
- semver 提供版本比较
- figlet console.log 出一个**漂亮的大 logo**
- cross-spawn **跨平台的 child_process**(跨 Windows/Mac)
- osenv 跨平台的系统信息
- open 跨平台打开 app，比如调试的时候开打 chrome

比如，查看天气，投骰子，随即电影
启动一个服务器

控制台显示图片

open -a Google\ Chrome 打开一个网址

熟悉脚手架及 shell 使用
