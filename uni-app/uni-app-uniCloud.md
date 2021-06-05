# uni-app-uniCloud

[官方网站](https://uniapp.dcloud.io/uniCloud/README)

[unicloud 控制台](https://unicloud.dcloud.net.cn/home)

[视频](https://www.bilibili.com/video/BV17p4y1a71x?p=2&spm_id_from=pageDriver)

[小程序本身就有云开发](https://developers.weixin.qq.com/community/business/doc/00022011ec0a287dd32b4ddce5180d)

- serverless
- 服务共享资源池
- uniCloud 是 mongodb 的强化版本

## hello world

1. HbuilderX 创建项目，新建 -> uni-app -> 启用 uniCloud -> 腾讯云；
2. HbuilderX 选中目录，快捷创建云空间操作；
   1. 关联云空间；
3. 新建云函数；
   1. cloudfunctions，右键新建云函数；
4. 本地运行云函数；
   1. 也可以上传运行；

## 云函数 url 化

1. 需要服务器回调的场景，就是服务器来调用我们的接口；

## 前端资源静态化，类似 oss

## 操作云数据库

[clientDB](https://uniapp.dcloud.io/uniCloud/hellodb)

如何同步本地数据到线上？

### 简单的增删改查

1. 创建云服务空间 -> 创建云数据库 -> 创建数据表 -> "read": true,；
2. 数据 -> 添加记录；
3. uniClouddb，创建视图；

## 绑定多个云空间，需要指定云空间的对应关系？？

## 导入导出数据的操作，要保证某天数据可以被保存到本地？？

mysql 数据应该怎么导入？？

阿里云支持 json 与 cvs 文件上传。

## 云组件

1. uni-easyinput

## schema2code，很好很强大

[后边继续](https://www.bilibili.com/video/BV17p4y1a71x?p=10&spm_id_from=pageDriver)
