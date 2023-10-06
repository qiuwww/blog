# charles 移动端调试

[参考文章](https://blog.csdn.net/yongf2014/article/details/78271909?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

## 这里发现，本地接口8888，被nginx代理了，所以会出现一只不能请求的情况，中间请求下载文件，一只不能下载，同时返回'{"status": "success", "result": "nginx json"}'的问题，也是走到了nginx这里

所以要多检查一下自身的环境，通常遇到问题，如果完全搜不到答案，大概率是自己写的有问题。

## Charles 主要功能包括

- 截取 Http 和 Https 网络封包
- 支持重发网络请求，方便后端调试
- 支持修改网络请求参数
- 支持网络请求的截获并动态修改
- 支持模拟慢速网络

## Charles 主要提供两种查看封包的视图，分别名为 “Structure” 和 “Sequence”

1. Structure 视图将网络请求按访问的域名分类。
2. Sequence 视图将网络请求按访问的时间排序。

## 基础配置，移动端的手机

1. 打开 Charles，Help->SSL Proxying->Install Charles Root Certificate，这里安装证书，**小米手机使用 uc 浏览器是可以的**。
2. 手机上安装证书。打开 Charles，Help->SSL Proxying->Install Charles Root Certificate on a Mobile Device or Remote Browser
3. 配置当前的 wifi，手动代理，在同一个 wifi 下。

## <unknown>

使用 uc 浏览器可以下载证书。

因为 https 是加密的，Charles 需要配置证书才可以抓包。

这里需要添加证书和配置 ssl 代理。

proxy -> ssl Proxying -> \*/443.

## 拦截 pc 端的接口

**需要代理电脑端**，**就选中图标下拉的 macOS Proxy**；

## 每次重新打开 Charles

**重启一下，重新打开就可以了**。

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

## charles使用

1. [抓包神器之--Charles配置和用手册](https://zhuanlan.zhihu.com/p/391112574)；
2. [mac M2 charles iphone 抓包](https://www.cnblogs.com/guanchaoguo/p/17405895.html)；

## 证书安装

1. 需要先关闭mac proxy的代理，然后点击help => 去安装；
2. 然后添加信任；

## [【Charles安装后不能正常使用场景故障排查】](https://blog.csdn.net/weixin_49353386/article/details/126184814)

## 代理电脑上的服务到测试手机

1. 手机连接charles的服务；
2. 配置代理映射：选择 Tools -> Map Remote -> add

## [设置remote代理](https://blog.csdn.net/qq_40308101/article/details/105816843)

1. 如设置www.baidu.com到本地8000端口；
2. 设置：
   1. remote https => <www.baidu.com> => 443；
   2. http => localhost => 8000
