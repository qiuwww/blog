# node 版本控制

node 有一个模块叫 n，是专门用来管理 node.js 的版本。

## 查看版本

node -v

## 清除 npm cache

npm cache clean -force

## 安装 n 模块

npm install -g n

## 不行就这样：npm install -g n -f

## 升级新版本（稳定版 stable ,最新版 latest ,指定版本号 v8.11.1）

n latest

## 查看版本号，确认是否升级成功

node -v

[n npm](https://www.npmjs.com/package/n)

## 安装版本

n latest
n stable

## 切换版本

n

然后选择需要的版本

## 升级版本

n help
