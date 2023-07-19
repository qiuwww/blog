# Linux 上部署 Jenkins

## docker + jenkins + gitlab 项目部署的原理

1. 本地代码 push 到 gitlab
2. gitlab 通过 webhook 通知到 jenkins
3. **jenkins 拉取 gitlab 仓库代码,并执行 shell 脚本**
   1. 这个时候就需要一个 gitlab 的账户权限，这个容易理解；
4. shell 脚本执行 docker 命令,打包项目
5. 安装 nginx,并把打包好的 dist 目录映射到 nginx 代理目录下
6. 部署成功,访问服务器 ip+端口号访问你的项目

```bash

yum search jdk
```

## [Linux 安装 jdk1.8](https://blog.csdn.net/qq_25646191/article/details/109097265)

1. https://www.cnblogs.com/whtbky/p/13667188.html

需要先安装 java1.8 => 选择到 JDK 官网上下载你想要的 JDK 版本，下载完成之后将需要安装的 JDK 安装包上传到 Linux 系统指定的文件夹下，并且命令进入该文件夹下。

```bash
// 这里不行，还是要手动下载然后上传
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" https://download.oracle.com/otn/java/jdk/8u261-b12/a4634525489241b9a9e1aa73d9e118e6/jdk-8u261-linux-x64.tar.gz


tar -xvf jdk-8u261-linux-x64.tar.gz -C /usr/lib/jvm

# /usr/lib/jvm/jdk1.8.0_261


```

## 堡垒机文件上传

1. 直接连接文件上传；
2. 到 tmp 目录下面把文件移动到你需要的对应的目录下面即可；

## 配置环境变量

1. vim /etc/profile
2. 插入如下：

```
export JAVA_HOME=/usr/lib/jvm/jdk1.8.0_261
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

3. 重新载入配置文件: source /etc/profile

## yum install jenkins

1. yum install jenkins
   1. sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo
   2. sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
   3. sudo yum install jenkins
2. vi /etc/sysconfig/jenkins，修改配置文件
3. 输入启动命令以启动 Jenkins 服务。`service jenkins start`
4. vi /etc/rc.d/init.d/jenkins
   1. /usr/lib/jvm/jdk1.8.0_261/bin/java
5. 软连接： `ln -s /usr/lib/jvm/jdk1.8.0_261/bin/java /usr/bin/java`
6. 修改服务端口：8089

firewall-cmd –zone=public –add-port=8089/tcp –permanent

firewall-cmd --query-port=8089/tcp firewall-cmd --permanent --add-port=8089/tcp

## 配置 Jenkins

说明：默认安装目录

（1）/usr/lib/jenkins/：jenkins 安装目录，WAR 包会放在这里。（2）/etc/sysconfig/jenkins：jenkins 配置文件，“端口”，“JENKINS_HOME”等都可以在这里配置。（3）/var/lib/jenkins/：默认的 JENKINS_HOME。（4）/var/log/jenkins/jenkins.log：Jenkins 日志文件。

（1）修改默认端口号编辑文件：vim /etc/sysconfig/jenkins

找到 JENKINS_PORT，修改默认(8080)的端口号，我这里改为 8081

（2）修改 jdk 配置编辑文件：vim /etc/init.d/jenkins

找到 candidates 在第一行 加入 自己的 jdk 的 java 路径

注：linux 查看 jdk 安装路径命令 —— which java

（3）修改防火墙配置：选一种方式执行（1）开启 8081 端口，然后重启防火墙： 开启 8081 端口：firewall-cmd –zone=public –add-port=8081/tcp –permanent 重启防火墙：firewall-cmd –reload

（2）关闭防火墙：systemctl stop firewalld

4.Jenkins 启动/重启/停止命令 linux 命令行：

（1）启动：service jenkins start （2）重启：service jenkins restart （3）停止：service jenkins stop

浏览器进入 Jenkins

（1）登录：http://自己的 IP:8081/ （2）关闭：http://自己的 IP:8081/exit （3）重启：http://自己的 IP:8081/restart （4）重新加载：http://自己的 IP:8081/reload

5.浏览器登录 Jenkins （1）解锁 Jenkins：

输入命令： cat /var/lib/jenkins/secrets/initialAdminPassword

将管理员密码复制到页面输入框：92aa3b378394496fb9cd7f0c300

## Job for jenkins.service failed because the control process exited with error code. See "systemctl status jenkins.service" and "journalctl -xe" for details.

<!-- 最终通过软连接的形式解决了java的依赖的问题 -->

## ps -ef | grep jenkins

Jekins 进程查看

## service jenkins start / service jenkins restart

## [gitlab+jenkins 自动化部署](https://blog.csdn.net/ALLLiu/article/details/122559546)

[参考 2](https://blog.csdn.net/ALLLiu/article/details/122559546) https://zhuanlan.zhihu.com/p/201307678

1. whereis git

2. 生成公私钥
   1. [root@jenkins ~]# ssh-keygen -t rsa
   2. 一路回车 会生成/root/.ssh/目录，其中包含 id_rsa,id_rsa.pub 两个文件。其中带有.pub 的表示公钥文件
   3. 把私钥文件 id_rsa 文件的内容拷贝到 jenkins 上
      1. [root@jenkins ~]# cat /root/.ssh/id_rsa
3. gitlab 仓库什么都没有的时候，会报错，这个时候似乎不存在 master 分支，随意报错了；

## 项目文件被放在了哪里？

## ？ 这里如果我构建正式的代码，怎么操作？，难道也要部署一份？
