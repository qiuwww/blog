# Node.js 安装

1. [部署 Node.js 环境](https://help.aliyun.com/document_detail/50775.html)；
2. 这里需要安装 Node.js 环境到服务器；

## [安装 node 环境](https://blog.csdn.net/weixin_45880270/article/details/124222198)

```bash

# 1. 安装到 mkdir /code/software/node 目录下边；cd //code/software/node
# wget 找不到：https://zhuanlan.zhihu.com/p/356717135，需要安装一下 yum -y install wget

wget https://nodejs.org/dist/v16.20.2/node-v16.20.2-linux-x64.tar.xz

tar -xvf node-v16.20.2-linux-x64.tar.xz

# 进入解压目录下的 bin 目录，测试是否安装成功:

cd node-v16.20.2-linux-x64
ls

# 现在 node 和 npm 还不能全局使用，做个链接。回到服务器跟目录下，执行命令：

# 复制命令到 bin 目录。


/code/software/node-v16.20.2-linux-x64/bin

ln -s /code/software/node-v16.20.2-linux-x64/bin/node /usr/local/bin/node
ln -s /code/software/node-v16.20.2-linux-x64/bin/npm /usr/local/bin/npm
ln -s /code/software/node-v16.20.2-linux-x64/bin/npx /usr/local/bin/npx

node -v

echo $PATH

# 安装yarn
npm install yarn -g

ln -s /code/software/node-v16.20.2-linux-x64/bin/yarn /usr/local/bin/yarn
```

这里都适用 npm 吧，yarn 安装起来更麻烦。

删除软连接：`rm /usr/local/bin/node`；

## 查看环境变量文件

vi /etc/profile

## 参考

1. [CentOS 7 部署 node 项目](https://www.cnblogs.com/egrets/p/14861138.html)；
