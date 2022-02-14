# 阿里云部署 mysql 服务

[官方文档](https://developer.aliyun.com/article/747503)
[在阿里云上部署 linux 版本的 mysql](https://zhuanlan.zhihu.com/p/286885771)

## 在 ECS 实例所使用的安全组入方向添加规则并放行 3306 端口

1. [创建安全组](https://help.aliyun.com/document_detail/25468.html?spm=a2c4g.11186623.2.13.37ca2bd99GOk2g#concept-ocl-bvz-xdb)

2. [添加安全组规则](https://help.aliyun.com/document_detail/25471.html?spm=a2c6h.12873639.0.0.3b7449cbYJnAlJ#concept-sm5-2wz-xdb)

**快速添加入方向的安全规则，3306 端口。**

## 下载/安装

[手动部署 MySQL（CentOS 8）](https://help.aliyun.com/document_detail/188447.html?spm=a2c4g.11186623.6.1248.18c634fdqRlA7J)

## 常用命令

```bash
mysql -V

# 运行以下命令启动MySQL，并设置为开机自启动。
systemctl enable --now mysqld

# 运行以下命令查看MySQL是否已启动。
systemctl status mysqld

# 运行以下命令执行MySQL安全性操作并设置密码。
mysql_secure_installation

# 登陆与退出登陆
mysql -h172.31.9.54 -uqiuwww -p

exit
```

## 远程访问 MySQL 数据库

```bash
运行以下命令后，输入root用户的密码登录MySQL。
mysql -uroot -p

create user 'dms'@'%' identified by 'PASSword123!';
grant all privileges on *.* to 'dms'@'%' with grant option;
flush privileges;
```

## 基本操作

可以借助三方工具，或者 dms 进行操作。

导入数据步骤：

1. 选中数据库表；
2. 导入向导；
3. 选中文件，选择 root，导入；
