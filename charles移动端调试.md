# charles 移动端调试

找个视频看一看。

[参考文章](https://blog.csdn.net/yongf2014/article/details/78271909?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

## 基础配置，移动端的手机

1. 打开 Charles，Help->SSL Proxying->Install Charles Root Certificate
2. 手机上安装证书。打开 Charles，Help->SSL Proxying->Install Charles Root Certificate on a Mobile Device or Remote Browser
3. 配置当前的 wifi，手动代理，在同一个 wifi 下。

## <unknown>

因为 https 是加密的，Charles 需要配置证书才可以抓包。

这里需要添加证书和配置 ssl 代理。

proxy -> ssl Proxying -> \*/443.

## 拦截 pc 端的接口

## 每次重新打开 Charles

重启一下，重新打开就可以了。
