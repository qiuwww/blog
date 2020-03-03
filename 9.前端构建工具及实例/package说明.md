# package 说明

[TOC]

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

## package-lock.json/yarn.lock

package-lock.json 内部记录的是每一个依赖的实际安装信息，例如名字，安装的版本号，安装的地址 (npm registry 上的 tar 包地址)等等。额外的，它会把依赖的依赖也记录起来，因此**整个文件是一个树形结构**，保存依赖嵌套关系（类似以前版本的 node_modules 目录）。

## 字段说明

package.json 中有非常多的属性，其中**必须填写的只有两个：name 和 version** ，这两个属性组成一个 npm 模块的唯一标识。

### npm 包命名规则，name

name 即模块名称，其命名时需要遵循官方的一些规范和建议：

- 包名会成为模块 url、命令行中的一个参数或者一个文件夹名称，**任何非 url 安全的字符在包名中都不能使用**，可以使用 validate-npm-package-name 包来检测包名是否合法。

- 语义化包名，可以帮助开发者更快的找到需要的包，并且避免意外获取错误的包。

- 若包名称中存在一些符号，将符号去除后不得与现有包名重复。由于 react-native 已经存在，react.native、reactnative 都不可以再创建。

- 如果你的包名与现有的包名太相近导致你不能发布这个包，**那么推荐将这个包发布到你的作用域下**。用户名 ecoder，那么作用域为 @ecoder，发布的包可以是@ecoder/react。

- 不推荐使用驼峰写法，不使用大写字母。

name 是一个包的唯一标识，不得和其他包名重复，我们可以执行 `npm view packageName`查看包是否被占用。

### 基本描述，description/keywords

- description 用于添加模块的的描述信息，方便别人了解你的模块。

- keywords 用于给你的模块添加关键字。

当然，他们的还有一个非常重要的作用，就是利于模块检索。当你使用 **npm search** 检索模块时，会到 description 和 keywords 中进行匹配。写好 description 和 keywords 有利于你的模块获得更多更精准的曝光。

### 开发人员，author 和 contributors

author 和 contributors， author 指包的主要作者，一个 author 对应一个人。contributors 指贡献者信息，一个 contributors 对应多个贡献者，值为数组。

数组元素格式如下：

```json
{
  "name": "ConardLi",
  "email": "lisqPersion@163.com",
  "url": "https://github.com/ConardLi"
}
```

### 地址

```json
{
  "homepage": "http://ant.design/",
  "bugs": {
    "url": "https://github.com/ant-design/ant-design/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  }
}
```

会被展示到发包的位置，npmjs。

- homepage 用于指定该模块的主页。
- repository 用于指定模块的代码仓库。
- bugs 指定一个地址或者一个邮箱，对你的模块存在疑问的人可以到这里提出问题。

### 依赖配置

#### dependencies

指定了项目运行所依赖的模块，**开发环境和生产环境的依赖模块都可以配置到这里**。

#### devDependencies

有一些包有可能你只是在开发环境中用到，例如你用于检测代码规范的 eslint ,用于进行测试的 jest。

**用户使用你的包时即使不安装这些依赖也可以正常运行**，反而安装他们会耗费更多的时间和资源，所以你可以把这些依赖添加到 devDependencies 中

#### peerDependencies

用于指定你正在开发的模块所依赖的版本以及用户安装的依赖包版本的**兼容性**。

拿 ant-design 来举个例子，ant-design 的 package.json 中有如下配置：

```json
  "peerDependencies": {
    "react": ">=16.0.0",
    "react-dom": ">=16.0.0"
  }
```

当你正在开发一个系统，使用了 ant-design ，所以也肯定需要依赖 React。同时， ant-design 也是需要依赖 React 的，**它要保持稳定运行所需要的 React 版本是 16.0.0**。

npm3 以后不会再要求 peerDependencies 所指定的依赖包被强制安装。

#### optionalDependencies

某些场景下，**依赖包可能不是强依赖的，这个依赖包的功能可有可无**，当这个依赖包无法被获取到时，你希望 npm install 继续运行，而不会导致失败，你可以将这个依赖放到 optionalDependencies 中。

bundledDependencies
和以上几个不同，bundledDependencies 的值是一个数组，数组里可以指定一些模块，这些模块将在这个**包发布时被一起打包**。

```json
"bundledDependencies": ["package1" , "package2"]
```

### 协议 license

- MIT：只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。

- Apache：类似于 MIT，同时还包含了贡献者向用户提供专利授权相关的条款。

- GPL：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。

### 目录、文件相关

- main 属性可以指定程序的主入口文件。
- bin 当你的模块是一个命令行工具时，你需要为命令行工具指定一个入口，即指定你的命令名称和本地可指定文件的对应关系。

### 发布文件配置 files

files 属性用于描述你 npm publish 后推送到 npm 服务器的文件列表，如果指定文件夹，则文件夹内的所有内容都会包含进来。

### man

man 命令是 Linux 下的帮助指令，通过 man 指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息。

如果你的 node.js 模块是一个全局的命令行工具，在 package.json **通过 man 属性可以指定 man 命令查找的文档地址**。

### 脚本配置

- npm run test
- npm run dist
- npm run compile
- npm run build

### config

config 字段用于**配置脚本中使用的环境变量**，例如下面的配置，可以在脚本中使用**process.env.npm_package_config_port**进行获取。

### 发布配置

#### private

如果将 private 属性设置为 true，npm 将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。

#### preferGlobal

如果你的 node.js 模块主要用于安装到全局的命令行工具，那么该值设置为 true ，当用户将该模块安装到本地时，**将得到一个警告**。这个配置并不会阻止用户安装，而是会提示用户防止错误使用而引发一些问题。

#### publishConfig

```json
"publishConfig": {
    "registry": "https://registry.npmjs.org/"
  },
```

### 发布平台 os

```json
"os" : [ "darwin", "linux" ]
"os" : [ "!win32" ]
```

在 node 环境下可以使用 process.platform 来判断操作系统。

## .npmignore

另外，你还可以通过配置一个 .npmignore 文件来排除一些文件, 防止大量的垃圾文件推送到 npm。
