# lerna-demo

使用 lerna 管理大型前端项目，多 packages。

适应于多模块的前端项目，不适合相互独立的项目强行组合到一起，发布什么的都很麻烦，并不能减少工作量；

## 常用命令

```bash
# 创建目标文件夹
$ mkdir projectFolder
# 初始化包
# 这个时候就为独立模式(Independent mode)。
# 独立模式允许每一个包有一个独立的版本号，在使用lerna publish命令时，可以为每个包单独制定具体的操作，同时可以只更新某一个包的版本号。
$ lerna init --independent
# 创建包
$ lerna create <package-name>
# 添加依赖
$ lerna add anywhere --scope=package-1 --dev
# 安装依赖
$ lerna bootstrap # yarn install
# 列表展示
$ lerna list
# 发布
$ lerna publish
```

## 发布

最重要的 lerna publish 了，用于发布更新，运行该命令会执行如下的步骤：

1. 运行 lerna updated 来决定哪一个包需要被 publish
2. 如果有必要，将会更新 lerna.json 中的 version
3. 将所有更新过的的包中的 package.json 的 version 字段更新
4. 将所有更新过的包中的依赖更新
5. 为新版本创建一个 git commit 或 tag
6. 将包 publish 到 npm 上
