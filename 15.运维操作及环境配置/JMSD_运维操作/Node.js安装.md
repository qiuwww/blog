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



## 如何部署 be

1. [将 Nodejs 服务部署到阿里云服务器](https://www.cnblogs.com/ZLDJ-15-516/p/11122310.html)
   1. 使用 pm2
   2. 在 /usr/local 下新建 deployment 文件夹，**将 nodejs 服务上传到该文件夹**
      1. 这里上传还是通过 git 同步比较好，将整个项目，包括 docker 的配置，一起传到这个目录下边；
   3. [参考官网](https://help.aliyun.com/document_detail/50775.html)；
2. 部署 be 代码到服务器：
   1. 直接上传项目文件，使用的是 Xftp；
   2. 通过 git 两边同步；
