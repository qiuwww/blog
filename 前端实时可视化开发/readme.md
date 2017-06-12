## readme.md

http://www.imooc.com/video/12887

### 方法
1. livestyle ： 需要安装浏览器插件和编辑器插件。双向通信。
2. livereload ： 需要chrome插件，和node.js模块，看一下官网。可以与gulp配合使用。
3. browser-sync ： 不需要浏览器插件，似乎更好用的。看一下官网。browser-sync实现局部刷新，实现多个浏览器视图和交互的同步，依赖npm插件。
和livereload相似之处，1、对所有的文件都可以实时更新。2、也都是单向的，只能通过文件修改页面不能通过页面修改文件，3、都支持chrome脚本
区别：1、browser sync只依赖nodejs插件，不依赖浏览器插件。2、局部刷新。3、可以实现手机浏览器或者pc浏览器，多个浏览器之间的同步。包括视图同步和交互的同步



在安装nodejs之后，只需要在终端输入npm install -g browser-sync 就可以了。（我也不知道能不能安装成功，毕竟我写笔记的时候，还没反应。。。。草，全是问题。失败了）


Browsersync能让浏览器实时、快速响应您的文件更改（html、JS、css、sass、less等）并自动刷新页面。更重要的是 Browsersync可以同时在PC、平板、手机等设备下进项调试。您可以想象一下：“假设您的桌子上有pc、ipad、iphone、Android等设备，同时打开了您需要调试的页面，当您使用browsersync后，您的任何一次代码保存，以上的设备都会同时显示您的改动”。

cd 项目路径的目录下， 执行

browser-sync start --server --files "css/*.css"

监控所有文件
browser-sync start --server --files "**"