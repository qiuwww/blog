# git 安装

## 使用 git 同步代码到服务器上，发布项目

## 安装 git 与使用

```bash
yum install git -y

uname -a

# Linux 5GtReyS8qv 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux

mkdir /home/qiuwww

cd /home/qiuwww

git status

git clone https://www.heikemen.cn/gitlab/jmsd/app.git

git checkout -b qiu_be-node_20220621 origin/qiu_be-node_20220621
git checkout -b fe-uniapp2 origin/fe-uniapp2
```

## 修改本地的数据库链接到线上

qa 环境是没有 mysql 的，证书的服务器上是有的。

## 将账户和密码记录到 linux 本地

## git 仓库需要每次都登录

1. 如果我们 `git clone` 的下载代码的时候是连接的 `https://`而不是 `git@git (ssh)`的形式，当我们操作 `git pull/push` 到远程的时候，总是提示我们输入账号和密码才能操作成功，频繁的输入账号和密码会很麻烦。
2. 解决办法：git bash 进入你的项目目录，输入：`git config --global credential.helper store`。然后你会在你本地生成一个文本，上边记录你的账号和密码。当然这些你可以不用关心。然后你使用上述的命令配置好之后，再操作一次 `git pull`，然后它会提示你输入账号密码，这一次之后就不需要再次输入密码了。

## 参考

1. <https://www.cnblogs.com/egrets/p/14861138.html>
