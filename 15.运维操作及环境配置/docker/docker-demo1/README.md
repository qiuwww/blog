# docker-demo1

1. 生成镜像：docker build -t docker-demo1-image:v1 .
   1. nginx:v3（镜像名称:镜像标签）
   2. docker build -t docker-demo1-image .
2. 查看生成的镜像
   1. docker images
3. 创建容器并运行：
   1. docker run -p 127.0.0.1:3001:3000 -d --name docker-demo1-container docker-demo1-image:v1
      1. 运行的是 v1 版本；
      2. docker run -p 127.0.0.1:3001:3000 -d --name docker-demo1-container docker-demo1-image
      3. 绑定容器的 80 端口，并将其映射到本地主机 127.0.0.1 的 8111 端口上；

这里每次都需要 build 然后 run。本地开发不太合适，适合部署；
