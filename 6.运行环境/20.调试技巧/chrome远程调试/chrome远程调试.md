# chrome远程调试

这里的目的是为了在特定的应用的浏览器内核下运行h5代码，可以在chrome内查看其效果，方便找到问题。可以认为是一个增强的vconsole，也可以认为vconsole是一个简易版的chrome远程调试。

## 操作

1. 打开chrome输入`chrome://inspect/#devices`，安卓打开需调试app的h5页面，点击chrome inspect弹出新窗口（弹出窗口有可能为白屏或显示chrome HTTP/1.1 404 Not Found ，连vp嗯即可解决）；
2. 启动本地h5项目，在弹出新窗口地址栏输入项目对应h5本地地址即可实现本地调试安卓中h5页面；

## 效果

1. 可以看到元素；
2. 可以看到控制台的输出；
3. 可以debug；

## 一些限制

1. **安卓开发人员需要对你页面调试得webview添加setWebContentsDebuggingEnabled得静态方法**。
   1. 就像支付宝，是没开调试的webview的，所以不能调试；
   2. 这个似乎比手机默认的浏览器还要流畅；
2. 模拟器一些按钮不能点？

## 一些场景

1. com.android.browser；
2. 正常使用，是能看到左侧展示的页面的，运行的基础还是手机；
   1. 但是会比较卡；
3. 查看代理：
   1. `Mozilla/5.0 (Linux; U; Android 13; zh-cn; Mi 10 Pro Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.127 Mobile Safari/537.36 XiaoMi/MiuiBrowser/17.5.220418 swan-mibrowser`；
4. 可以在控制台输出一些内容到手机端的展示页面；
   1. 如：`alert(123)`；
   2. 也可以修改一些样式来达到查看元素的目的；
5. 可以在左侧模拟器直接操作，手机上会有对应的操作；
6. 这些场景都是在手机自带的浏览器内的；

## 参考

1. <https://blog.csdn.net/qq_31248809/article/details/109725980>；
2. [chrome调试h5移动端(含android,ios)](https://blog.csdn.net/hahahhahahahha123456/article/details/109593729)；
