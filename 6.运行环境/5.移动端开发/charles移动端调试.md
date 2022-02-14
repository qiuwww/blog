# charles 移动端调试

[参考文章](https://blog.csdn.net/yongf2014/article/details/78271909?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

## 基础配置，移动端的手机

1. 打开 Charles，Help->SSL Proxying->Install Charles Root Certificate，这里安装证书，小米手机使用 uc 浏览器是可以的。
2. 手机上安装证书。打开 Charles，Help->SSL Proxying->Install Charles Root Certificate on a Mobile Device or Remote Browser
3. 配置当前的 wifi，手动代理，在同一个 wifi 下。

## <unknown>

使用 uc 浏览器可以下载证书。

因为 https 是加密的，Charles 需要配置证书才可以抓包。

这里需要添加证书和配置 ssl 代理。

proxy -> ssl Proxying -> \*/443.

## 拦截 pc 端的接口

**需要代理电脑端**，就选中图标下拉的 macOS Proxy

## 每次重新打开 Charles

重启一下，重新打开就可以了。

## 代理微信开发工具的数据

设置 -》 代理设置 -》 手动设置代理

## 代理数据 - charles 修改返回数据

### 修改数据有很多种方法，先介绍最简单的一种，BreakPoint

1. 首先选中要修改数据的接口，进行断点：选中 -》 右键 -》 BreakPoints；
2. 重新请求就可以到这个地方；
   1. 第一次断点的时候，可以修改请求参数，右侧 -》 edit request -》 json/json text；
   2. 这里要向下执行的时候，需要点击最下边的 execute，向后执行一步；
   3. 执行完成，修改返回结果，点击，右侧 -》edit response -》 json/json text；
   4. 这里要向下执行的时候，需要点击最下边的 execute，向后执行一步；
3. 取消断点，修改数据，选中 -》 右键 -》 BreakPoints；
