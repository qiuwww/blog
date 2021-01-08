# chrome-extensions，开发 chrome 插件

chrome-extensions learn

[官方文档](https://developer.chrome.com/docs/extensions/)
[360 翻译 chrome 插件开发文档](http://open.chrome.360.cn/html/dev_debug.html)

[插件指南](https://www.w3cschool.cn/kesyi/kesyi-m5uo24rx.html)

[mv2](https://developer.chrome.com/docs/extensions/mv2/)

## 介绍

1. Chrome 插件通常是.crx 后缀的文件，通过谷歌网上应用商店下载或者在开发者模式中可以直接拖入到浏览器进行安装。

### 插件类型

几种，包括应用、游戏、扩展程序、主题背景。

### 项目参考结构

```
.
├── Gruntfile.js    //grunt配置文件
├── LICENSE
├── README.md
├── buildSrc        //最终打包成crx的目录
│   ├── icon.png
│   ├── icon_gray.png
│   ├── image
│   │   └── icon.png
│   ├── js
│   │   ├── background.js
│   │   ├── contentScript.js
│   │   └── popup.js
│   ├── key.pem
│   ├── manifest.json
│   ├── mdl
│   │   ├── material.min.css
│   │   └── material.min.js
│   ├── popup.html
│   └── style
│       ├── content.css
│       ├── content.css.map
│       ├── content.scss
│       ├── style.css
│       ├── style.css.map
│       └── style.scss
├── crx             //crx文件生成的输出目录
│   ├── clearRead.crx
│   └── clearRead.zip
├── devSrc          //开发文件目录
│   ├── background.js
│   ├── contentScript.js
│   ├── lib
│   │   └── Readability.js
│   └── popup.js
├── package-lock.json
└── package.json
```

## 参考项目

[FeHelper](https://github.com/zxlie/FeHelper)

[官方示例](https://github.com/GoogleChrome/chrome-extensions-samples)

[FeHelper ( 浏览器插件 )](https://www.baidufe.com/fehelper/json-format/index.html)

## 插件的主要文件

1. chrome 扩展程序就是一个 web 应用，所以我们实际是要写 html 代码。而 chrome 插件需要的文件就包括

2. 配置文件(manifest.json)、扩展图标(icon.png 可以是任意的名字，在配置文件中会使用到)、popup 弹出窗口 html 文件(popup.html)以及其他静态资源文件(如 images、css、js 等)。
   1. manifest.json 是**整个插件的功能及文件配置清单**，非常重要。

### manifest.json 文件配置项

#### 权限申请

```
"permissions": [
    "contextMenus", // 右键菜单
    "tabs", // 标签
    "notifications", // 通知
    "webRequest", // web请求
    "webRequestBlocking",
    "storage", // 插件本地存储
    "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
    "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
]
```

## mv3

### chrome.declarativeNetRequestAPI

该 chrome.declarativeNetRequestAPI 用于通过指定声明性规则来阻止或修改网络请求。这使扩展程序可以修改网络请求，而不会拦截它们并查看其内容，从而提供了更多的隐私。

## getting start

一个 Chrome 扩展其实就是一个配置（入口）文件 manifest.json 和一系列 html、css、js、图片文件的集合，所以只要有前端基础，写一个简单的 Chrome 扩展是分分钟的事情。

### manifest 文件的编写

包括扩展的名称（name）、版本（version）、描述（description）、图标位置（icons）和 manifest 版本（manifest_version）等信息。

https://www.appinn.com/regexper/

## 如何调试 chrome 插件，总不能一直安装吧？

[Chrome 插件（Extensions）开发攻略](https://www.cnblogs.com/guogangj/p/3235703.html)

### 调试当前页面

1. 右键 -> 审查弹出框内容；
2. 这里一般的信息都可以直接打开页面进行查看，需要调试 popup 的才需要审查这里的元素。
3. 还有一种我觉得也是可以的方案，就是找到当前加载的文件，放一个文件的指向，**应该是可以的**；

## 主要关注点/api/结构

### 后台页面/事件页面 / background （查看视图 背景页）

1. 顾名思义，后台网页是运行在浏览器后台的，**随着浏览器的启动开始运行**，**浏览器关闭结束运行**。 **事件页面则是需要调用时加载，脚本空闲时被卸载**，两者都是运行在后台。

2. 配置参数 `persistent:false` **则后台页面变为事件页面**，事件页面和背景页面的区别是 是否常住后台运行。

3. 这里的执行过程可以查看视图。

### 用户界面网页(popup) / browser_action

```json
{
  "browser_action": {
    "default_title": "clearRead",
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  }
}
```

1. 点击插件出来的小弹窗，每次点击弹出开始运行，弹窗关闭后结束，可以与 backgrund 脚本交互。
2. popup 界面主要是提供插件的启用状态和快捷键配置功能。
3. default_icon 要使用 png 的图片；browser_action.default_icon 添加的是插件列表的展示图标；
   1. chrome://extensions/页面展示的图标，需要**icons**在配置；

### 内容脚本(content) / content_scripts

下边的文件似乎不注册也能加载？且如下的文件需要点击出现了 pupop 了才能执行。也就是随着文件执行。

```json
{
  "content_scripts": [
    {
      // matches字段可以设置一个匹配表达式来过滤需要注入脚本的网站。
      "matches": ["*://*/*", "file://*"],
      "css": ["style/content.css"],
      "js": ["js/contentScript.js"]
    }
  ]
}
```

1. 安装插件后每打开一个网页可以将 content 脚本注入到页面中，**内容脚本可以读取浏览器访问的网页的细节，并且可以修改页面**。
2. 这里如果被激活就会一直常驻，且会影响到当前打开的页面；
3. **content 脚本会被注入到每个打开的浏览器标签中**。

### 一个或者多个图标来表示扩展，app，和皮肤 / icons

[参考文档](http://open.chrome.360.cn/html/dev_manifest.html#icons)

你通常可以提供一个 128x128 的图标，这个图标将在 webstore 安装时候使用。扩展需要一个 48x48 的图标，扩展管理页面需要这个图标。同时，你还可以提供给一个 16x16 的图标作为扩页面的 fa 网页图标 。这个 16x16 的图标，还将显示在实验性的扩展 infobar 特性上。

```json
{
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  }
}
```

### content、background、popup 之间通信

1. 如果从 popup 或者 background 发送消息到 content 中需要先确认当前的 content，使用 chrome.tabs.query 可以找到当前激活的窗口。
2. content 脚本会被注入到每个打开的浏览器标签中。

### apps

```json
"app": {
    // “ urls”：指定应用程序中所有其他网页的起始URL。
    "urls": [
      "http://mysubdomain.example.com/"
    ],
    "launch": {
      // “ web_url”：指定用户启动应用程序时浏览器显示的页面。
      "web_url": "http://mysubdomain.example.com/"
    }
  }
```

## 打包方式

1. Chrome 浏览器的扩展程序页面就提供了打包扩展的功能。
2. 第二种就是使用命令打包了，使用 crx 模块。
3. 第三种方法比较推荐，结合 grunt 进行打包（grunt-crx）。

## 发布上架

应用开发完成打包后就可以上架到应用商店了，首先需要一个 **Google 账号登录开发者**信息这个，首次成为开发着需要**支付 5 美元**才能上传插件到谷歌应用商店点击添加新内容开始上传填写插件信息。

上传文件后开始填写插件的**图标、说明、及截图，截图**将会以轮播图的形式展现。屏幕截图的尺寸必须是 1280x800 或 640x400 差一点点都会上传失败。

### [注册开发者账户](https://developer.chrome.com/docs/webstore/register/)

[展示开发者信息](https://chrome.google.com/webstore/devconsole/28870fba-63c8-4065-843b-624f37cf3c20/settings)
