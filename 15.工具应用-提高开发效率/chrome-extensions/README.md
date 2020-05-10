# chrome-extensions
chrome-extensions learn
## 插件的主要文件
chrome扩展程序就是一个web应用，所以我们实际是要写html代码。而chrome插件需要的文件就包括

配置文件(manifest.json)、扩展图标(icon.png 可以是任意的名字，在配置文件中会使用到)、popup弹出窗口html文件(popup.html)以及其他静态资源文件(如images、css、js等)。

### manifest.json文件配置项

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