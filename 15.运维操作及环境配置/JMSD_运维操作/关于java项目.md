## Java 项目启动

1. 启动 mysql: `mysql.server start`；
2. radis: `brew services start redis && redis-server`；
   1. redis-server ？？
3. Java 后台，启动步骤：
   1. git clone 代码
   2. import module：be-java/pom.xml
   3. 启动 JeecgApplication，看日志报错
   4. 本地安装 redis，密码不用设置
   5. 访问文档地址 <http://localhost:8081/yimingguanche-gm/>
   6. 选中 system 模块，获取验证码、登录
4. 打开本地 fe 项目：`yarn dev`；