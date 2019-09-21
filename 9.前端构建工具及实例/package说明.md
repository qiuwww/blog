# package 说明

```json
{
  "name": "webpack-config",
  "version": "1.0.0",
  "description": "webpack4",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --config scripts/webpack.dev.js",
    "build": "webpack --config scripts/webpack.prod.js",

    "dev0": "webpack-dev-server --mode development ./src/utils/utils.js --output ./dist/js/main.js --module-bind js=babel-loader",
    "build0": "webpack --mode production ./src/utils/utils.js --output ./dist/js/main.js --module-bind js=babel-loader"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "_comment": "devDependencies 就是开发中使用的依赖，它区别于实际的依赖。也就是说，在线上状态不需要使用的依赖，就是开发依赖。",
    "autoprefixer": "^9.4.6",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^1.0.1",
    "copy-webpack-plugin": "^4.5.2",
    "css-loader": "^1.0.1",
    "cssnano": "^4.1.8",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "install": "^0.12.2",
    "jimp": "^0.6.0",
    "less": "^3.7.0",
    "mini-css-extract-plugin": "^0.5.0",
    "optimize-css-assets-webpack-plugin": "^5.0.1",
    "postcss-cssnext": "^3.1.0",
    "postcss-import": "^12.0.1",
    "postcss-loader": "^3.0.0",
    "postcss-url": "^8.0.0",
    "responsive-loader": "^1.2.0",
    "style-loader": "^0.21.0",
    "sugarss": "^2.0.0",
    "ts-loader": "^5.3.3",
    "typescript": "^3.2.4",
    "uglifyjs-webpack-plugin": "^2.1.1",
    "url-loader": "^1.1.2",
    "webpack": "^4.29.0",
    "webpack-cli": "^3.2.1",
    "webpack-dev-server": "^3.1.4",
    "webpack-merge": "^4.2.1"
  },
  "dependencies": {
    "_comment": "运行时依赖，生产环境依赖的包",
    "less-loader": "^4.1.0",
    "lodash": "^4.17.10"
  },
  "peerDependencies": {}
}
```

## dependencies 与 devDependencies 的区别

devDependencies 就是开发中使用的依赖，它区别于实际的依赖。也就是说，在线上状态不需要使用的依赖，就是开发依赖。

### 大概有这么几类可以归为开发依赖

- 构建工具
- 预处理器
  - 注意点，那就是 babel-runtime 是 dependencies 而不是 devDependencies。
- 测试工具

把依赖安装成开发依赖，则可以使用`npm i -D`或者`npm i —save-dev`命令。

如果想达成刚才说的缩减安装包的目的，可以使用命令 npm i —production 忽略开发依赖，只安装依赖，这通常在线上机器（或者 QA 环境）上使用。

## 版本号的写法

### 举例说明

首先我们得搞清三位版本号的定义，以 “**a.b.c**” 举例，它们的含义是：

a - 主要版本（也叫大版本，**major version**）

大版本的升级**很可能意味着与低版本不兼容的 API 或者用法**，是一次颠覆性的升级（想想 webpack 3 -> 4)。

b - 次要版本（也叫小版本，**minor version**）

小版本的升级**应当兼容同一个大版本内的 API 和用法**，因此应该对开发者透明。所以我们通常只说大版本号，很少会精确到小版本号。

**特殊情况是如果大版本号是 0 的话，意味着整个包处于内测状态**，**所以每个小版本之间也可能会不兼容**。所以在选择依赖时，尽量避开大版本号是 0 的包。

c - 补丁 (**patch**)

一般用于**修复 bug 或者很细微的变更，也需要保持向前兼容**。

### 常规的版本号写法

- “1.2.3” - 无视更新的精确版本号，锁定版本
- “^1.2.3” - 兼具更新和安全的折中考虑
  > 官方的定义是“能够兼容除了**最左侧的非 0 版本号之外**的其他变化”(Allows changes that do not modify the left-most non-zero digit in the [major, minor, patch] tuple)。
  - “^1.2.3” 等价于 “>= 1.2.3 < 2.0.0”。
  - “^0.2.3” 等价于 “>= 0.2.3 < 0.3.0”。
  - “^0.0.3” 等价于 “>= 0.0.3 < 0.0.4”。
- “~1.2.3” - 比 ^ 更加安全的**小版本更新**
  > 关于 ~ 的定义分为两部分：**如果列出了小版本号（第二位），则只兼容 patch（第三位）的修改**；如果没有列出小版本号，则兼容第二和第三位的修改。
  - “~1.2.3” 列出了小版本号（2），因此只兼容第三位的修改，等价于 “>= 1.2.3 < 1.3.0”。
  - “~1.2” 也列出了小版本号，因此和上面一样兼容第三位的修改，等价于 “>= 1.2.0 < 1.3.0”。
  - “~1” 没有列出小版本号，可以兼容第二第三位的修改，因此等价于 “>= 1.0.0 < 2.0.0”
- 版本号写`*`，这意味着安装最新版本的依赖包，但缺点同上，可能会造成版本不兼容，慎用

### 安装版本命令

```bash
#!/bin/bash
$ npm install sax@latest
$ npm install sax@">=0.1.0 <0.2.0"
```

#### 本地路径

npm 支持使**用本地路径来指向一个依赖包**，这时候需要在路径之前添加 `file:`，例如：

```json
{
  "dependencies": {
    "bar1": "file:../foo/bar1",
    "bar2": "file:~/foo/bar2",
    "bar3": "file:/foo/bar3"
  }
}
```

## package-lock.json

package-lock.json 内部记录的是每一个依赖的实际安装信息，例如名字，安装的版本号，安装的地址 (npm registry 上的 tar 包地址)等等。额外的，它会把依赖的依赖也记录起来，因此**整个文件是一个树形结构**，保存依赖嵌套关系（类似以前版本的 node_modules 目录）。
