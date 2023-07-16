# uni-app打包App及上架操作经验

## 背景

1. 随着HBuilder的**原生App云打包**，一次云打包就需要半个多小时，这是日常开发所不允许的，所以就需要自己配置Android和IOS的开发环境，方便日常开发与发布；
2. 如下是参考官方的[App离线打包指导文档](https://nativesupport.dcloud.net.cn/AppDocs/)及项目打包、上架经验的总结，示例以Android为例说明。

## [原生Android工程配置](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)

1. 首先要去下载[Android App离线SDK](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html#)，下载**Android 离线SDK - 正式版**；
   1. 这里下载的是SDK版本是 `3.8.7`，一般就下载当前的最新版本就可以了。同时升级HBuilder为最新版本(3.8.7)，历史版本可能需要去网上搜索下载；
      1. 需要确保uni-app编译器的版本号和离线 SDK 的版本号一致，不符合的HBuilder版本，需要升级到合适的版本；
         1. 或者安装多个版本的HBuilder；
      2. 这里下载需要Android和IOS的版本，并且如果有多个打包环境，**还需要copy出来多份，分别进行配置**，本次只演示Android测试环境；
2. 安装[Android Studio](https://developer.android.google.cn/studio/index.html)，并进行基础项目的配置；
   1. 安装Android Studio比较简单，直接官网下载安装即可；
   2. 打开Android Studio，选择[导入项目](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html#%E6%96%B9%E5%BC%8F%E4%BA%8C-%E5%AF%BC%E5%85%A5%E5%B7%A5%E7%A8%8B)，直接导入**HBuilder-Integrate-AS工程(后续的操作都以此为基础)**，直接运行simpleDemo项目即可；
      1. 这里的项目需要下载依赖，一般要配置代理科学上网，不然比较难以下载成功，[设置代理查看](https://developer.android.com/studio/intro/studio-config?hl=zh-cn#setup-proxy)；
      2. 这里的项目是可以直接运行的，选择运行到真机，可以看到，提示未设置 `appKey`；

[AS运行app](./imgs/AS%E8%BF%90%E8%A1%8Capp.jpeg)

3. 配置工程，[参考官网文档直接执行即可](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html#%E9%85%8D%E7%BD%AE%E5%B7%A5%E7%A8%8B)；
   1. copy下载的目录的 `SDK/libs`到`HBuilder-Integrate-AS/simpleDemo/libs`，这里`HBuilder-Integrate-AS`，应该是官方为了避免不能正确安装SDK的操作；
   2. Android项目里的 `build.gradle`类似前端项目的 `package.json`，声明依赖以及一些配置，可以通过这个文件去下载依赖的SDK；
   3. 申请配置 appKey；
      1. 这里的appKey，[默认的Android应用是不需要的](https://ask.dcloud.net.cn/question/122346)，Android只需要配置证书就可以了，这里的**证书可以使用Android Studio自己生成**。这里的appKey应该只是uniapp为了自己要做一些事情。这里的appKey的操作有一些坑，后边详细说明；
      2. 上述完成后，**在平台信息 > 离线打包key > 点击创建**；
         1. `<meta-data android:name="dcloud_appkey" android:value="申请签名appKey" />`；
      3. 修改`HBuilder-Integrate-AS/simpleDemo/src/main/res/values/strings.xml`，内的`app_name`参数；
      4. build.grade修改配置：
         1. `versionCode`为应用的版本号（整数值），用于各应用市场的升级判断，建议与manifest.json中version -> code值一致；
            1. 这里只需要保证每次上线的版本的数值比前一次大就可以了；
         2. `versionName`为应用的版本名称（字符串），在系统应用管理程序中显示的版本号，建议与manifest.json中version -> name值一致；
            1. 这里可以只修改Android工程中的，遵循基本的版本号升级规则，[可以参考](https://juejin.cn/post/6961223539995197454)；
         3. applicationId为应用的包名，一般设置为反向域名，不建议修改；
            1. 这个具有唯一性，不能与别的app重复；
      5. 配置应用图标和启动界面，这块都在`Androidmanifest.xml`文件内，对照文档操作即可：
         1. splash.png在不同设备上显示效果不一样，为防止出现拉伸的状况，建议使用Android studio生成.9.png类型图片；
      6. 创建data文件夹并拷贝资源；
         1. 主要是这里的`HBuilder-Integrate-AS/simpleDemo/src/main/assets/`下的**data**文件夹的内容，以及apps目录，后面会用到；
            1. `HBuilder-Integrate-AS/simpleDemo/src/main/assets/data/dcloud_control.xml`文件里边配置的appid，是uniapp下的应用标识appid，在manifest.json的基础配置下；

[app证书设置](./imgs/app%E8%AF%81%E4%B9%A6%E8%AE%BE%E7%BD%AE.png)

### Android下申请appKey

[应用appKey申请](./imgs/%E5%BA%94%E7%94%A8appKey%E7%94%B3%E8%AF%B7.png)

1. 参照文档进行获取和配置，Android(Mac)下，SHA1的获取还是挺麻烦的，这里官方文档只提供了一种window下的获取方式，<https://ask.dcloud.net.cn/article/35777>；
2. 本文演示`Android Studio`下操作流程；
   1. 首先通过AS生成一个新的签名，[Android Studio为应用签名](https://developer.android.com/studio/publish/app-signing?hl=zh-cn#generate-key)，`Build > Generate Signed Bundle/APK > Create new > ...`，这里都可以随便写，但是设置的密码要记清楚；
   2. 将证书配置到`build.grade > signingConfigs`，用于后续打包。也可以在打包的时候选择本地证书并输入密码；
   3. 从证书中提取前面需要的`SHA1`，`MD5`以及`SHA256`的值，AS生成的证书是`.jks`格式的；
      1. 签名文件`keStore`和`jks`的在作用上基本上没有太大区别，主要是生成来源不一样；
         1. Keystore 为 Eclipse 打包生成的签名；
         2. jks 为 Android Studio 打包生成的签名；
      2. 使用命令`keytool -v -list -keystore xxxxx.jks`去读取，这样会读取不到md5的值。再次执行`keytool -v -list -keystore xxxxx.jks | openssl dgst -md5`，这样是可以单独获取md5的值的；
      3. 获取之后，继续执行后续操作，就可以获取appKey了；

[sha1](./imgs/sha1.png)

3. 获取了appKey之后，需要设置为`Androidmanifest.xml`的decloud的参数：`<meta-dataandroid:name="dcloud_appkey" android:value="eb3926f1775ab945a5f92c0fa2ddc8bb" />`，这样就算完成了；

[证书参数提取](./imgs/%E8%AF%81%E4%B9%A6%E5%8F%82%E6%95%B0%E6%8F%90%E5%8F%96.png)
[appKey_info](./imgs/appKey_info.png)

## uni-app项目

1. 使用HBuilder创建一个uniapp项目；
   1. 打开HBuilder，新建 `uni-app`项目，选择Hello uni-app项目；
   2. 本次创建项目与下载的SDK目录同级，为`uniapp-app`；
2. 测试[真机运行](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html)，如下主要在Android平台开发；
   1. 连接手机，首先要[开启手机的usb调试模式](https://uniapp.dcloud.net.cn/tutorial/run/run-app-faq.html#check)；
   2. 选择 `运行` => `运行到手机或者模拟器` => `运行到Android App基座`，开启后可以看到运行连接设备，运行成功后如下，**可以在此查看App的功能是否正常**，这个阶段主要用作本地开发与测试；

[真机运行](./imgs/%E7%9C%9F%E6%9C%BA%E8%B0%83%E8%AF%95.png)

### [生成App资源包并导入](https://nativesupport.dcloud.net.cn/AppDocs/importfeproject/export.html)

1. **需要确保uni-app编译器HBuilder的版本号和离线 SDK 的版本号一致**，前面下载的；
   1. 也即这里的HBuilder的版本号 `3.8.7`与下载的SDK(前面下载的)版本号一致；
2. 执行 `选择项目 -> 发行 -> 原生App-本地打包 -> 生成本地打包App资源`，可以生成App资源包；
   1. 这里如果是[cli创建的项目](https://nativesupport.dcloud.net.cn/AppDocs/importfeproject/export.html#%E9%80%9A%E8%BF%87vue-cli%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%88%9B%E5%BB%BA%E7%9A%84%E9%A1%B9%E7%9B%AE-2)，同样有方法。使用cli的方式更方便以后写脚本执行这些过程；
   2. 在生产环境中，每次打包要确保各种参数的正常，如接口地址，env环境等；
3. [导入资源官方指导](https://nativesupport.dcloud.net.cn/AppDocs/importfeproject/android.html)；
   1. 需要修改`HBuilder-Integrate-AS/simpleDemo/src/main/assets/data/dcloud_control.xml`中的appid为uni-app的id，确保`dcloud_control.xml`中的appid与`manifest.json`中的id与文件夹名一致；
   2. 复制uniapp生成的www资源文件夹到Android工程下边，`uniapp-app/unpackage/resources/__UNI__XXX/www` => `Android-SDK@3.8.7.81902_20230704/HBuilder-Integrate-AS/simpleDemo/src/main/assets/apps/__UNI__XXX/www`，这里的步骤如果是使用cli执行生成的，可以写脚本来处理；

[Android工程下assets目录结构](./imgs/assets%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)

## Android打包

1. 每次需要一个新的发布版本，都需要修改versionCode和versionName参数，用来区分不同的安装包；
   1. 注意这里的versionCode，发布的时候会用到，每打包一次上线的包，就需要增加一点，跟versionName没太大关联；
2. 创建签名应用`build > Generate Singed Boundle / APK > 选择APK > next > ...`，可以选择打包debug版本还是release版本，如果成功会在release/debug目录下找到生成的安装包；

### 配置自动修改安装包名

```json
// 这里用已有的信息，去动态拼接打包的包名
// build.grade下与signingConfigs同级添加修改打包名的配置
applicationVariants.all { variant ->
    // apk输出文件名配置
    // uniapp_appDemo_v1.0.1_release_0716.apk
    variant.outputs.all { output ->
        outputFileName = 'uniapp_appDemo' + '_v' + variant.versionName + '_' + variant.buildType.name
        if (variant.buildType.name == buildTypes.release.getName()) {
            outputFileName += '_' + new Date().format('MMdd')
        }
        outputFileName += '.apk'
    }
}
```

### 本地手机安装

1. 有的时候会借助微信发送安装包，会自动带`.apk.1`；
2. 安装apk.1安装器去安装，会方便很多；

### hello项目，打包时未添加oauth模块

1. 打包的时候，和直接本机运行有较大区别，需要添加各种授权与权限申请。
2. 解决方案：在manifest.json->App模块配置中勾选“OAuth（登录鉴权）”，或者直接项目内删掉这块的页面，可以参考<https://ask.dcloud.net.cn/article/36727>；
3. 修改后重新执行上面的app打包资源，app打包的步骤；

## IOS打包

1. 同样需要下载打包的SDK，并进行相关的配置，[官网文档](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)；
2. ios同样需要申请appKey，不过ios要简单很多，只需要填写`iOS BundleId`就可以了，[需要自己去申请](https://juejin.cn/post/7132425089819082765)，这里就需要apple开发者权限了，**目前不是开发者了，没法演示了**；
   1. 在`https://developer.apple.com/account/resources/identifiers/list`创建和管理BundleId；
3. ios的打包与Android对照文档看，问题不大，主要是开发者权限以及里边的各种证书的申请与使用；
   1. 生成App资源包的步骤，没任何区别；
      1. 复制www文件的路径，`uniapp-app/unpackage/resources/__UNI__XXX/www` => `HBuilder-Hello/HBuilder-Hello/Pandora/apps/__UNI__XXX/www`；
   2. 修改版本信息：
      1. version => versionName(Android)；
      2. build => versionCode(Android)；

### ios证书的一些理解

1. [Certificates, Identifiers &amp;Profiles 简单介绍](https://blog.csdn.net/ios_xumin/article/details/88862670)：
   1. Certificate 就是证书，是用于把一台 Mac 电脑标志为开发者电脑所必须的证明
   2. Identifier 就是身份证，是用于把一个应用标志为开发者应用
   3. Devices就是注册为这个开发者设备列表
2. 这里的操作逻辑：
   1. 本地生成钥匙；
   2. 去线上申请两种认证；
   3. 生成profile文件；
   4. 注意区分开发还是发布；

## 推荐的分支管理

1. master主分支，保留打包前的上线代码；
   1. ft/XXX，个人开发分支；
   2. qa，统一的测试分支，只开发和本地测试；
   3. pre，预发；
2. app-build/，专门用作保留打包分支；
   1. app-build/qa-android，安卓测试版本打包分支，从qa合并过来，只保留一些打包的配置内容；
   2. app-build/master-ios，ios上线打包分支，合并自master/pre分支，保留对应的配置；
   3. ...
3. 更复杂的一个仓库处理App和微信小程序的，[可以参考](https://juejin.cn/post/7255879340223184956)；

## 上架

1. 需要申请软件著作权；
2. 上架android平台，一般都会上架应用宝、oppo、vivo、小米、华为这些商城，一般都要经历平台注册、平台认证、上传审核、发布的流程；
   1. 这期间不断的需要法人进行认证，且账户比较多，所以最好有统一的管理员，统一的账户来管理；
3. 上架ios平台，直接通过Xcode上传后，在苹果开发者后台提交审核，成功后发布；

### Android上架遇到的一些问题

公共出现的不再列举。

#### 华为

1. `android_2.0.19.apk:错误:40: 请将编译选项修改为正式发布版本 ;提示:17: 已调用的HMS SDK接口： 34: 已集成的HMS服务：[]`；
   1. 提交的版本打包配置的问题，修改release；
2. `明示存在定向推送或广告精准营销功能，但未提供拒绝、关闭定向推送或广告精准营销的选项，不符合华为应用市场审核标准。`；
   1. 隐私声明的问题，修改隐私声明；
   2. 添加关闭这种推送的控制选项；
3. `缺少聊天模块的资质证明文件未通过审核`；
   1. 补充相关的资质；
4. `您提交的《计算机软件著作权证书》上的著作权人与开发者主体信息不一致`；
   1. 这个需要重新申请新的主体的软著；
5. `您的应用内含激励提现项目但未在应用内提供客服联系方式，不符合华为应用市场审核标准`；
   1. 添加客服功能，公司运营的反馈路径；
6. `您的应用注册选择运输公司模块内含有测试数据，不符合华为应用市场审核标准。`；
   1. 清理正式环境数据；
7. `您的应用内未提供帐号注销服务，不符合华为应用市场审核标准。`；
   1. 请在应用内提供帐号注销服务。

#### 小米

1. `APP首次打开，未见使用权限对应的相关产品或服务时，提前向用户弹窗申请开启敏感权限`；
   1. 添加一些权限申请弹框；
2. `应用上传或应用商店页面展示的图标，不得与安装到设备上的图标不一致`；
   1. 修改相关的图标；

#### 应用宝

1. `联网APP需提供ICP备案截图，请将ICP备案截图加盖公章并上传至版权证明处再提交审核，具体备案流程参考`；
   1. 上传资质；

### IOS上架遇到的一些问题

1. `修改版本号与发布的包版本号一致`；
   1. 发布设置的问题；
2. `Guideline 2.3 - Performance - Accurate Metadata`，修改了app关键字及制作了一个功能操作视频反馈给app审核；
   1. ios不许携带未开发的内容；
   2. 清理正式环境的数据；
3. `您的屏幕截图没有充分显示您正在使用的应用程序`；
   1. 必须6.5截图，且图片要带刘海，5.5的是适配6、7、8的一定不能带刘海；
   2. 不需要在打包，只需要提供6.5英寸的截图；
   3. 需要提供6.5英寸的截图：纵向分辨率为 1242 x 2688 像素；

## 参考文章

1. [新版 jdk 无法查看 keystore 文件 md5 值](https://blog.csdn.net/u010843503/article/details/130425045?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-130425045-blog-105709791.235%5Ev38%5Epc_relevant_default_base&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7EPosition-2-130425045-blog-105709791.235%5Ev38%5Epc_relevant_default_base&utm_relevant_index=5)；
2. [官方文档](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)；

以上只是个人见解，请指教，[个人blog](https://github.com/qiuwww/blog/tree/master/0.5.JS/%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B)。
