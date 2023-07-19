# Node.js 安装

1. [部署 Node.js 环境](https://help.aliyun.com/document_detail/50775.html)；
2. 这里需要安装 Node.js 环境到服务器；

## [安装 node 环境](https://blog.csdn.net/weixin_45880270/article/details/124222198)

```bash

# 1. 安装到 mkdir /home/qiuwww/node 目录下边；cd /home/qiuwww/node
# wget 找不到：https://zhuanlan.zhihu.com/p/356717135，需要安装一下 yum -y install wget

`wget https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz`

`tar -xvf node-v16.15.1-linux-x64.tar.xz`

进入解压目录下的 bin 目录，测试是否安装成功:

`cd node-v16.15.1-linux-x64`
`ls`

现在 node 和 npm 还不能全局使用，做个链接。回到服务器跟目录下，执行命令：

复制命令到 bin 目录。

`ln -s /home/qiuwww/node/node-v16.15.1-linux-x64/bin/node /usr/local/bin/node`
`ln -s /home/qiuwww/node/node-v16.15.1-linux-x64/bin/npm /usr/local/bin/npm`
`ln -s /home/qiuwww/node/node-v16.15.1-linux-x64/bin/npx /usr/local/bin/npx`

`node -v`

`echo $PATH`

```

这里都适用 npm 吧，yarn 安装起来更麻烦。

## 查看环境变量文件

vi /etc/profile

## 参考

1. <https://www.cnblogs.com/egrets/p/14861138.html>
