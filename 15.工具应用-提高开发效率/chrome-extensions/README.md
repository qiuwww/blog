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

## 如何调试 chrome 插件，总不能一直安装吧？

[Chrome 插件（Extensions）开发攻略](https://www.cnblogs.com/guogangj/p/3235703.html)

### 调试当前页面

1. 右键 -> 审查弹出框内容；
2. 这里一般的信息都可以直接打开页面进行查看，需要调试 popup 的才需要审查这里的元素。
3. 还有一种我觉得也是可以的方案，就是找到当前加载的文件，放一个文件的指向，**应该是可以的**；

## 主要关注点/api/结构

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

## 下载安装

**勾选开发者模式**即可以文件夹的形式直接加载插件，**否则只能安装.crx 格式的文件**。**Chrome 要求插件必须从它的 Chrome 应用商店安装，其它任何网站下载的都无法直接安装**，所以，其实我们可以把 crx 文件解压，然后通过开发者模式直接加载。

## Chrome 插件(扩展)开发全攻略

[文章地址](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

详细目录：![img](https://images2015.cnblogs.com/blog/352797/201707/352797-20170711100228759-367621595.png)

Chrome 插件提供了很多实用 API 供我们使用，包括但不限于：

1. 书签控制；
2. 下载控制；
3. 窗口控制；
4. 标签控制；
5. 网络请求控制，各类事件监听；
6. 自定义原生菜单；
7. 完善的通信机制；
8. 等等；

### 开发方式

1. 开发中，代码有任何改动都必须重新加载插件，只需要在插件管理页按下 Ctrl+R 即可，以防万一最好还把页面刷新一下；
   1. manifest 变动，需要重新拖进去；
2. 页面内不允许 script 标签包裹 js 代码，只能外链；

### manifest 文件的编写

包括扩展的名称（name）、版本（version）、描述（description）、图标位置（icons）和 manifest 版本（manifest_version）等信息。

1. 其中，manifest_version、name、version3 个是必不可少的，description 和 icons 是推荐的。
   1. 只需要这三个参数就可以生成一个什么功能都没有的扩展；
2. 浏览器右上角图标设置，browser_action、page_action、app 必须三选一。
   1. browser_action： 一般的行为，默认展示；
   2. page_action： 当某些特定页面打开才显示；
   3. 需要直接注入页面的 JS；

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

### 后台页面/事件页面 / background （查看视图 背景页）

1. 顾名思义，后台网页是运行在浏览器后台的，**随着浏览器的启动开始运行**，**浏览器关闭结束运行**。 **事件页面则是需要调用时加载，脚本空闲时被卸载**，两者都是运行在后台。

2. 配置参数 `persistent:false` **则后台页面变为事件页面**，事件页面和背景页面的区别是 是否常住后台运行。

3. 这里的执行过程可以查看视图。

### event-pages

event-pages，它是一个什么东西呢？鉴于 **background 生命周期太长，长时间挂载后台可能会影响性能**，所以 Google 又弄一个 event-pages，在配置文件上，它与 background 的唯一区别就是多了一个 persistent 参数

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

### injected js

### 右键自定义

1. 通过开发 Chrome 插件可以自定义浏览器的右键菜单，主要是通过 **chrome.contextMenusAPI** 实现，右键菜单可以出现在不同的上下文，比如普通页面、选中的文字、图片、链接，等等，如果有同一个插件里面定义了多个菜单，Chrome 会自动组合放到以插件名字命名的二级菜单里；
2. 在 background.js 内定义；

这里只是简单列举一些常用的，完整 API 参见：`https://developer.chrome.com/extensions/contextMenus`

```js
chrome.contextMenus.create({
  type: 'normal'， // 类型，可选：["normal", "checkbox", "radio", "separator"]，默认 normal
  title: '菜单的名字', // 显示的文字，除非为“separator”类型否则此参数必需，如果类型为“selection”，可以使用%s 显示选定的文本
  contexts: ['page'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认 page
  onclick: function(){}, // 单击时触发的方法
  parentId: 1, // 右键菜单项的父菜单项 ID。指定父菜单项将会使此菜单项成为父菜单项的子菜单
  documentUrlPatterns: 'https://_.baidu.com/_' // 只在某些页面显示此右键菜单
});
// 删除某一个菜单项
chrome.contextMenus.remove(menuItemId)；
// 删除所有自定义右键菜单
chrome.contextMenus.removeAll();
// 更新某一个菜单项
chrome.contextMenus.update(menuItemId, updateProperties);
```

### 5 种类型的 JS 对比

[Chrome 插件的 JS 主要可以分为这 5 类：injected script、content-script、popup js、background js 和 devtools js。](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html#5%E7%A7%8D%E7%B1%BB%E5%9E%8B%E7%9A%84js%E5%AF%B9%E6%AF%94)

#### 通信机制

1. popup 和 background 其实几乎可以视为一种东西，因为它们可访问的 API 都一样、通信机制一样、都可以跨域。

## q&a

### background.html:1 Error in event handler: TypeError: Cannot read property 'onPageChanged' of undefined

在 background.js 内，需要申请权限，如这里需要申请 declarativeContent。

`"permissions": ["declarativeContent"]`
