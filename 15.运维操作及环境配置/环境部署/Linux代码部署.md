# 如何部署代码

1. [将 Nodejs 服务部署到阿里云服务器](https://www.cnblogs.com/ZLDJ-15-516/p/11122310.html)
   1. 使用 pm2
   2. 在 /usr/local 下新建 deployment 文件夹，**将 nodejs 服务上传到该文件夹**
      1. 这里上传还是通过 git 同步比较好，将整个项目，包括 docker 的配置，一起传到这个目录下边；
   3. [参考官网](https://help.aliyun.com/document_detail/50775.html)；
2. 部署 be 代码到服务器：
   1. 直接上传项目文件，使用的是 Xftp；
   2. 通过 git 两边同步；
