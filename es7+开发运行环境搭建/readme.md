# readme.md


## 插件也需要安装

"babel-plugin-transform-runtime": "^6.12.0",
"babel-preset-es2015": "^6.13.2",
"babel-preset-es2016": "^6.11.3",
"babel-preset-es2017": "^6.14.0",

## 这里打包仍然不能够在浏览器端运行，里边还有文件依赖

so...

## Babel 所做的只是帮你把‘ES6 模块化语法’转化为‘CommonJS 
模块化语法’，其中的require exports 等是 CommonJS 在具体实现中所提供的变量。

任何实现 CommonJS 规范的环境（如 node 环境）可以直接运行这样的代码，而浏览器环境并没有实现对 CommonJS 规范的支持，所以我们需要使用打包工具（bundler）来进行打包，说的直观一点就是把所有的模块组装起来，形成一个常规的 js 文件。

常用的打包工具包括 browserify webpack rollup 等。

这里使用webpack 来处理依赖，打包为一个文件


## CommonsChunkPlugin这个插件实现的

这个插件可以把多个html中公共依赖的部分打包成一个和多个公共依赖包（chunk），这样每个页面只需要引入这个公共chunk和自己单独的js就可以了。

目前也可以实现，但是太绕了，且会把所有的文件打包为一个文件（未配置的情况下）

## 库支持的版本
```
# For ES6/ES2015 support
npm install babel-preset-es2015 --save-dev

# If you want to use JSX
npm install babel-preset-react --save-dev

# If you want to use experimental ES7 features
npm install babel-preset-stage-0 --save-dev
npm install babel-polyfill --save
```

## 目前先舍弃ES7及其以上的语法

> 使用async...await意义也不是很大，且编译麻烦，编译时间长，开发环境根本没法搞
现阶段能使用一些基础的语法就行，模板字符串，class定义类，require模块化等

> 需要使用ES7+ 最好使用webpack来搭建开发和编译环境

## 查看webpack的版本

npm info webpack
同理别的模块应该也是这样

## 更正一个错误的认识

**在package.json中直接使用webpack命令，运行的是全局的方法，不是当前本地的版本，所以要根据路径来准确的定位webpack的路径。**

## 遇到问题的处理方式

下次遇到问题要冷静处理，不要做一些无用功

## webpak的版本确实会影响到模块的编译，且后可能不兼容前
**切记切记**

## 基本实现对js和css的编译与重启，mock可以,另外下载了两个库mockjs和jquery

## 使用gulp-rename来更改文件名称