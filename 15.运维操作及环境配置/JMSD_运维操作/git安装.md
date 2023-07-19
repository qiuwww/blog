# git 安装

## 使用 git 同步代码到服务器上，发布项目

## 安装 git

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

## 参考

1. <https://www.cnblogs.com/egrets/p/14861138.html>
