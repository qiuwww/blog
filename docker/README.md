# Docker

[docker-tutorial](https://www.runoob.com/docker/docker-tutorial.html)

docker 使用的时候，客户端必须开着。

## 是什么

1. Docker 是一个开源的**应用容器引擎**，基于 Go 语言 并遵从 Apache2.0 协议开源。

2. Docker 可以让开发者打包他们的**应用以及依赖**包到一个**轻量级、可移植的容器**中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

3. 容器是完全使用**沙箱机制**，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

### Docker 架构

Docker 包括三个基本概念:

1. 镜像（Image）：Docker 镜像（Image），就相当于是一个 **root 文件系统**。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
   1. Docker 镜像是用于创建 Docker 容器的**模板**，比如 Ubuntu 系统。
2. 容器（Container）：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，**镜像是静态的定义，容器是镜像运行时的实体**。容器可以被创建、启动、停止、删除、暂停等。
   1. 容器是独立运行的**一个或一组应用**，**是镜像运行时的实体**。
3. 仓库（Repository）：仓库可看成一个**代码控制中心，用来保存镜像**。

Docker 使用客户端-服务器 (C/S) 架构模式，使用远程 API 来管理和创建 Docker 容器。

**Docker 容器通过 Docker 镜像来创建**。

#### 主要概念

1. 容器 => 对象
2. 镜像 => 类
3. Docker 主机(Host): 一个物理或者虚拟的机器**用于执行 Docker 守护进程和容器**。
4. Docker Registry: Docker 仓库用来保存镜像，可以理解为**代码控制中的代码仓库**。
   1. 一个 Docker Registry 中可以包含**多个仓库（Repository）**；**每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像**。
5. Docker Machine: Docker Machine 是一个简化 Docker 安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装 Docker，比如 VirtualBox、 Digital Ocean、Microsoft Azure。

## 为什么

### Docker 的应用场景

1. **Web 应用**的自动化打包和发布。
2. 自动化测试和持续集成、发布。
3. 在服务型环境中部署和调整**数据库**或其他的后台应用。
4. 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的 PaaS 环境。

### Docker 的优点

1. 快速，一致地交付您的应用程序；
   1. 容器非常适合持续集成和持续交付（CI / CD）工作流程。
2. 响应式部署和扩展；
3. 在同一硬件上运行更多工作负载

## 怎么做

### [MacOS Docker 安装](https://www.runoob.com/docker/macos-docker-install.html)

`brew cask install --appdir=/Applications docker`

### 注册登陆

1. docker login 登录的是 docker 官网的**仓库 docker hub**, 其他非官方的有 daocloud 等(也需注册)。

2. 注册直接去官网：`https://store.docker.com/signup`，和你平时申请游戏账号一回事。

3. 注册后，执行 docker login ，那个 username 就是你在官网注册时设置的用户名，密码就是注册时候的密码。

### 运行 docker 安装的系统执行命令

docker run ubuntu:15.10 /bin/echo "Hello world"

<!-- 这里登陆与阿里云登陆一样 -->

docker run -i -t ubuntu:15.10 /bin/bash

cat /proc/version

### [查看当前 docker 运行状态](https://www.runoob.com/docker/docker-hello-world.html)

我们需要确认容器有在运行，可以通过 `docker ps` 来查看。

- CONTAINER ID: 容器 ID。
- IMAGE: 使用的镜像。
- COMMAND: 启动容器时运行的命令。
- CREATED: 容器的创建时间。
- STATUS: 容器状态。状态有 7 种：
  - created（已创建）
  - restarting（重启中）
  - running 或 Up（运行中）
  - removing（迁移中）
  - paused（暂停）
  - exited（停止）
  - dead（死亡）
- PORTS: 容器的端口信息和使用的连接类型（tcp\udp）。
- NAMES: 自动分配的容器名称。

`docker stop CONTAINER ID/NAMES` 命令来停止容器。

### 常用指令

- 获取镜像: `docker pull ubuntu`
- 启动容器: `docker run -it ubuntu /bin/bash`
  - /bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
- exit
- 启动已停止运行的容器 `docker ps -a`,`docker start b750bbbcfd88`
- 后台运行: `docker run -itd --name ubuntu-test ubuntu /bin/bash; docker exec`
  - 停止一个容器: docker stop <容器 ID>
  - 通过 docker restart 重启: docker restart <容器 ID>
- 导出和导入容器:
  - 导出容器: docker export 1e560fca3906 > ubuntu.tar
    - 打开就是当前的文件系统目录
  - 导入容器快照: cat docker/ubuntu.tar | docker import - test/ubuntu:v1
  - 删除容器使用 docker rm 命令: docker rm -f 1e560fca3906
- 运行一个 web 应用
  - 下载服务文件；
  - 执行 web 服务命令；
  - 查看 web 服务：
    - 0.0.0.0:32769->5000/tcp，访问`http://0.0.0.0:32768/`，
    - Docker 开放了 5000 端口（默认 Python Flask 端口）映射到主机端口 32769 上。

### Docker 镜像使用(像是一堆组件)

当运行容器时，使用的镜像如果在本地中不存在，docker 就会自动从 docker 镜像仓库中下载，默认是从 Docker Hub 公共镜像源下载。

1. 查看镜像：`docker images`；
2. 同一仓库源可以有**多个 TAG**，代表这个仓库源的不同个版本，如 ubuntu 仓库源里，有 15.10、14.04 等多个不同的版本，我们使用 REPOSITORY:TAG 来定义不同的镜像。
3. 获取一个新的镜像：`docker pull centos:latest`
4. 删除镜像: `docker rmi hello-world`
5. 构建镜像: 我们使用命令 `docker build` ， 从零开始来创建一个新的镜像。为此，我们**需要创建一个 Dockerfile 文件**，其中包含一组指令来告诉 Docker 如何构建我们的镜像。

### Docker 容器连接

前面我们实现了通过网络端口来访问运行在 docker 容器内的服务。

容器中可以运行一些网络应用，要让外部也可以访问这些应用，可以通过 -P 或 -p 参数来指定端口映射。

1. 我们可以指定容器绑定的网络地址，比如绑定 127.0.0.1。`docker run -d -p 127.0.0.1:5001:5000 training/webapp python app.py`；
2. 查看端口的绑定情况：`docker port angry_elbakyan 5000`；

### Docker 仓库管理

仓库（Repository）是集中存放镜像的地方。

目前 Docker 官方维护了一个公共仓库 Docker Hub。

用户登录后，可以通过 docker push 命令将自己的镜像推送到 Docker Hub。

`docker tag centos:latest qiuwww/centos:latest`

### Docker Compose

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

### Dockerfile

Dockerfile 是一个**用来构建镜像的文本文件**，文本内容包含了一条条构建镜像所需的**指令和说明**。

### 使用 Dockerfile 定制镜像

1. 文件声明，Dockerfile 的**指令每执行一次都会在 docker 上新建一层**。所以过多无意义的层，会造成镜像膨胀过大。

2. 开始构建镜像：`docker build -t nginx:v3 .`
   1. 上下文路径下不要放无用的文件，因为会一起打包发送给 docker 引擎，如果文件过多会造成过程缓慢。

## cli 大全

[Docker 命令大全](https://www.runoob.com/docker/docker-command-manual.html)

## docker 内不能保存数据库数据

？？
