# Regular Expression Helper

帮助书写正则表达式。

## 参考文章

[ast 在线测试](https://astexplorer.net/)

## 主要功能

1. 嵌套 regulex 这个工具页面；
2. 提供一些常用的正则表达式；
3. 部分拼装；
   1. 任意数字；
   2. 任意字母；
4. 常用方法测试 match/test；
   1. 注意是 js 的常用方法；
   2. 字符串的正则方法；

## 调查

1. 平时遇到写/测试正则表达式的时候怎么处理？
2. 遇到什么问题？
3. 如果有这样一个工具是否会去使用？

## vscode 与 chrome 的通用性

## 使用工具

1. 基于 vue 来写；
2. 使用 gulp 来打包；

## 遇到的坑

1. popup.html 中的 js 在插件中无效，需要通过引用 popup.js，动态绑定 js 事件。
2. 除了通过事件来通信，popup 和 background**还能通过 chrome.extensionAPI 来访问脚本**。
3. getBackgroundPage 可以返回当前扩展在后台运脚本的 window 对象。
4. chrome.extension.getViews()，getViews 返回一个数组，含有每一个在当前扩展程序中运行的页面的 JavaScript window 对象。

## 正则解析技术选型

https://www.appinn.com/regexper
