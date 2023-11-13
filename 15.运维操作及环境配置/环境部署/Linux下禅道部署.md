# 禅道部署

1. 安装文档：`https://www.zentao.net/book/zentaopmshelp/40.html`
2. 下载安装包，`wget https://www.zentao.net/sdl/projects/zentao/files/12.3.2/ZenTaoPMS.12.3.2.zbox_64.tar.gz`
3. 解压安装包，`sudo tar -zxvf ZenTaoPMS.12.3.2.zbox_64.tar.gz -C /opt`
4. cd /opt/zbox
5. sudo ./zbox start
   1. 启动失败，修改接口地址：
   2. 例如（apache 端口改为 6666，mysql 端口改为 6667）：
   3. /opt/zbox/zbox -ap 6666 -mp 3307
   4. /opt/zbox/zbox start
   5. /opt/zbox/zbox restart
6. 访问地址：
   1. 默认用户名 admin 密码 123456 => jmsd123456
   2. `http://115.231.27.45:8088/zentao/my/?tid=g9a4hcae`
7. 网页登录数据库：
   1. **数据库最好别动：**
   2. 先 cd /opt/zbox/auth/ 然后执行 ./adduser.sh
   3. `https://www.zentao.net/book/zentaopmshelp/40.html`
   4. 设置密码；
      1. 这里的密码设置太复杂就不能用
8. 命令行连接数据库
   1. 登录数据库：`/opt/zbox/bin/mysql -u root -P mysql 端口 -p （比如：/opt/zbox/bin/mysql -u root -P 3306 -p）`
