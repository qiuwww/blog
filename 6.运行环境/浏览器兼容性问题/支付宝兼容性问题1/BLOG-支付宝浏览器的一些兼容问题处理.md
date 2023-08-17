# BLOG-支付宝浏览器的一些兼容问题处理

## 页面超出滚动，overflow不生效

具体表现如下：

微信、其他浏览器扫码可查看

## flex与overflow结合导致的元素被挤压的问题

## 浏览器内核不支持的问题处理

1. 支付宝浏览器内核的一些兼容问题；
2. 查看浏览器内核：
   1. navigator.userAgent；

### 对比浏览器内核

1. 支付宝小程序的webview：'Mozilla/5.0 (Android 9.0; Mi 10 Pro Build/QKQ1) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/15E148 ChannelId(0) LyraVM Nebula  AlipayDefined(nt:WIFI,ws:360|0|2.75) AliApp(AP/10.3.70) AlipayClient/10.3.70 Language/zh-Hans AlipayIDE'
   1. 'Mozilla/5.0 (Android 9.0; Mi 10 Pro Build/QKQ1) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/15E148 ChannelId(0) LyraVM Nebula  AlipayDefined(nt:WIFI,ws:360|0|2.75) AliApp(AP/10.3.70) AlipayClient/10.3.70 Language/zh-Hans AlipayIDE MiniProgram'

2. chrome：'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'

3. 支付宝app：$$Mozilla/5.0(Linux U: Android13 zh-CN Mi 10 Pro Build/
TKQ1.221114.001) AppleWebKit/537.36(KHTMLlike Gecko)Version/4.0 Chrome/69.0.3497100 UWS/3.22.2.59 Mobile Safari/53736 UCBS/322.2.59 230213152242 Channelld(0) NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:4Gws:393|0|2.75) AliApp(AP/10.5.8.8000) AlipayClient/10.5.8.8000 Language/zh-Hans useStatusBar/true isConcaveScreen/true Region/CNAriver/1.0.0

#### <https://blog.csdn.net/qq_42363090/article/details/112535117，用谷歌浏览器模拟微信和支付宝浏览器环境>

<https://blog.csdn.net/weixin_44142611/article/details/107067626，这个也是不行的>

### 现在的问题就是支付宝内的浏览器内核比较高，并且出了样式的问题，别的位置模拟不出来这个结果

### <https://m-test.funtown.cn/main?id=cef5cf43eaee43e5b27c2c0e30c9df2d&vconsole=9999&test=testtest，标记调试>

### 这里的100%，确实包括了浏览器的导航的高度，就导致实际占有的高度是755 - 导航高度，但是100%后，导航被加了进去

1. 主动去计算导航的高度，然后删除；
2. 正常应该是688，这里相差67px；

### style

1. height: -webkit-fill-available;

## 关于今天遇到的三个问题

```css
/* <!-- 默认的样式 --> */
{
      /* 原本设置的滚动方式，表现就是在一般的浏览器内都可以正常滚动，但是在支付宝浏览器内不能滚动，会被压缩在一起 */
     display: flex;
     flex-direction: column;
     flex: 1;
     overflow-x: hidden;
     overflow-y: auto;
     width: 100%;
   
   /* 修改为如下方式，可以滚动了 */
    flex-direction: row;
    overflow: scroll;
    flex-wrap: wrap;
}
```

## 最主要的一个问题是，没法本地调试，只能每次发布测试环境，忙试

1. 后续，需要配置好charles本地代理工具，遇到限制不严重的，可以代理本地的文件到测试手机；
2. 最好能拿到本地开发环境；
3. 遇到问题不要慌，通常情况下只是没想道，一般都不困难；
   1. 从根本上对问题进行分析；
