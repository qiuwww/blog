# 使用 Docker 部署一个应用 2

这个对应 koa-docker

配置文件`docker-compose.yml`；

1. 在该文件下，可以通过 services 配置多个 container；
2. 使用 docker-compose，需要安装；
   1. 检查是否安装: `docker-compose -version`；
   2. 安装方式：[参考 runoob](https://www.runoob.com/docker/docker-compose.html)；
3. 构建和运行您的应用：`docker-compose up`；
   1. -d 添加意思在后台运行；
4. 重启所有的容器: `docker-compose restart`；
5. 关闭/删除容器: `docker-compose down`；
   1. 数据卷需要手动删除；
   2. 或者这里添加`--volumes`，进行删除；

## docker 与 kubernetes 的关系

并不是同一个层面的东西；

kubernetes 就是将你的服务发布到一个集群上运行，并进行自动化管理；

## Docker + node(koa) + nginx + mysql 开发环境搭建

[参考文章](https://www.cnblogs.com/lostyu/p/docker_dev.html)
[git 代码](https://github.com/tonysoul/docker-koa)

主要内容：

1. node:12-alpine
2. koa 基础框架
3. koa-router 路由
4. promise-mysql mysql
5. nodemon 自动重启服务

- koa-docker
  - conf
  - data
  - docker-compose.yml
  - node_modules
  - package.json
  - server.js
  - static
  - yarn.lock

### [docker-compose](https://www.runoob.com/docker/docker-compose.html)

[文档](https://www.runoob.com/docker/docker-compose.html)

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

1. 如果我们只需要一个容器，可以用 Dockerfile 进行单独配置，（当然每个容器都可以写一个 Dockerfile，然后 docker-compose 来 build）

2. 现在我们有多个容器需要管理，docker-compose.yml

```bash
$ docker-compose up
# localhost:3000
```

#### Compose 使用的三个步骤

1. 使用 Dockerfile 定义**应用程序的环境**。
2. 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以**在隔离环境中一起运行**。
3. 最后，执行 `docker-compose up` 命令来启动并运行整个应用程序。

### 现在的问题是 volumes 怎么使用？配合 mysql 使用

<!-- todo -->
