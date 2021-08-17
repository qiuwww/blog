# Docker

[docker-tutorial](https://www.runoob.com/docker/docker-tutorial.html)

docker 使用的时候，客户端必须开着。

## 是什么

1. Docker 是一个开源的**应用容器引擎**，基于 Go 语言 并遵从 Apache2.0 协议开源。

2. Docker 可以让开发者打包他们的**应用以及依赖**包到一个**轻量级、可移植的容器**中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

3. 容器是完全使用**沙箱机制**，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

4. 可以打包程序和运行环境，将程序和运行环境一起发布的容器。
5. 主要是为了解决：在我的机器上是正常的，为什么到你的机器上就不正常了的问题。
6. build -》share -》run。
7. 类似于虚拟机，但是比虚拟机更加的效率、稳定、节省空间。

### Docker 架构/Docker 的一些概念

Docker 包括三个基本概念:

1. 镜像（Image）：Docker 镜像（Image），就相当于是一个 **root 文件系统**。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
   1. 虚拟机的快照；
      1. 通过镜像可以创建不同的 container；
   2. Docker 镜像是用于创建 Docker 容器的**模板**，比如 Ubuntu 系统。
2. 容器（Container）：镜像（Image）和容器（Container）的关系，**就像是面向对象程序设计中的类和实例一样**，**镜像是静态的定义，容器是镜像运行时的实体**。容器可以被创建、启动、停止、删除、暂停等。
   1. 相当于运行起来的虚拟机；
   2. `docker image ls` & `docker ps`；
   3. 容器是独立运行的**一个或一组应用**，**是镜像运行时的实体**；
   4. container 容器就可比作为一个**操作系统**，**image 镜像就是一个个应用程序**；
   5. container 容器：**基于镜像新建一个容器并启动，或者启动一个终止状态的容器**；
   6. Image 镜像：在 Docker 的术语里，**一个只读层被称为镜像，一个镜像是永久不会变的**；
3. 仓库（Repository）：仓库可看成一个**代码控制中心，用来保存镜像**，我们搭建环境使用的镜像都可以在上面的仓库找到。
4. dockerfile: 自动化脚本；
   1. 用来创建镜像；

Docker 使用**客户端-服务器 (C/S) 架构模式**，使用远程 API 来管理和创建 Docker 容器。

**Docker 容器通过 Docker 镜像来创建**。

[参考视频](https://www.bilibili.com/video/BV1s54y1n7Ev/?spm_id_from=333.788.recommend_more_video.1)

#### 主要概念

1. 容器 => 对象
2. 镜像 => 类
3. Docker 主机(Host): 一个物理或者虚拟的机器**用于执行 Docker 守护进程和容器**。
4. Docker Registry: Docker 仓库用来保存镜像，可以理解为**代码控制中的代码仓库**。
   1. 一个 Docker Registry 中可以包含**多个仓库（Repository）**；**每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像**。
5. Docker Machine: Docker Machine 是一个简化 Docker 安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装 Docker，比如 VirtualBox、 Digital Ocean、Microsoft Azure。
6. images 和 container。
   1. 其中 images 很好理解，跟平常使用的虚拟机的镜像一个意思，相当于一个模版，
   2. **而 container 则是 images 运行时的的状态**。docker 对于运行过的 image 都保留一个状态（container），可以使用命令 docker ps 来查看正在运行的 container，对于已经退出的 container，则可以使用 docker ps -a 来查看。 如果你退出了一个 container 而忘记保存其中的数据，你可以使用 docker ps -a 来找到对应的运行过的 container 使用 docker commit 命令将其保存为 image 然后运行。
   3. 由于 image 被某个 container 引用（拿来运行），**如果不将这个引用的 container 销毁（删除），那 image 肯定是不能被删除。**
   4. 所以想要删除运行过的 images 必须首先删除它的 container。

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

### 制作自定义镜像

1. docker 允许使用 dockerfile 来进行自定义镜像的制作；
   1. dockerfile 是用来制作自定义镜像的配置文件；
   2. 可以在自定义文件内，获取需要依赖的上层镜像（父镜像）；
2. 运行`docker build --tag=hello .`，制作自定义镜像；
   1. 这里的`.`，代表使用当前目录的 dockerfile。
3. 使用`docker run -p 8090:3000 hello(制作的镜像的名称)`，来创建并运行容器；
   1. 8090：外部宿主机；
   2. 3000 是内部暴露的端口；
   3. http://localhost:8090/，可以从宿主机直接访问到内部的服务。
   4. `-t hello_demo`
4. demo:docker-demo1
5. 启动之后，文件修改并不能直接映射到外部的镜像，需要绑定一个映射关系：`docker run -p 5555:80 制作的镜像的名称 -v 文件夹的绝对路径`；
6. docker images -a，可以查看当前的 images，这些文件存储在哪里？
   1. [通过面板找到](https://jingyan.baidu.com/article/cdddd41c4aff0512ca00e12c.html)，dashboard -》 setting -》 Resources -》 Disk image location（</Users/qiuww/Library/Containers/com.docker.docker/Data/vms/0/data>）
   2. 这里的 images 有一些是测试的，但是也占据了很大的位置，怎么删除？
      1. [如何删除 docker images 镜像和 docker Container 容器](https://www.huaweicloud.com/articles/249e70f24970413c78020c8c5984d5b1.html)
         1. `docker images`，查看当前的本地 docker 镜像；
         2. 尝试删除`docker rmi {imageId}`，因为可能删除不了；
            1. 这里的 imageId 也可以是 image 的 REPOSITORY；
            2. 无法删除 image id 为 365b0a528e2e 的镜像，因为一个正在运行的容器 3c9ecebf0a31 正在使用该镜像。
         3. 需要先关闭正在运行中的容器`docker stop {容器id}`，
      2. 如何使用桌面应用删除 images？
      3. 查看 docker 的帮助会发现有两个与删除有关的命令 rm 和 rmi
         1. `rm Remove one or more containers`
         2. `rmi Remove one or more images`

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

### Dockerfile，文件配置

1. COPY：
2. ADD：

## docker 内不能保存数据库数据

？？

## docker 的使用过程

1. 先简单理解 docker 的使用过程，**它分为镜像构建与容器启动**。
   1. 镜像构建：**即创建一个镜像（可以理解为对应 git 的一个版本）**，它包含安装运行所需的环境、程序代码等。这个创建过程就是使用 dockerfile 来完成的。
   2. 容器启动：**容器最终运行起来是通过拉取构建好的镜像，通过一系列运行指令（如端口映射、外部数据挂载、环境变量等）来启动服务的**。
      1. 针对单个容器，这可以通过 docker run 来运行。
   3. 而如果涉及**多个容器的运行（如服务编排）就可以通过 docker-compose 来实现**，它可以轻松的将多个容器作为 service 来运行（当然也可仅运行其中的某个），并且提供了 scale (服务扩容) 的功能。
2. 简单总结：
   1. dockerfile: 构建镜像；
   2. docker run: 启动容器；
   3. docker-compose: 启动服务；

## dockerfile 与 docker-compose.yml

1. 我所理解的 docker-compose 是编排容器的。例如，你有一个 php 镜像，一个 mysql 镜像，一个 nginx 镜像。如果没有 docker-compose，那么每次启动的时候，你需要敲各个容器的启动参数，环境变量，容器命名，指定不同容器的链接参数等等一系列的操作，相当繁琐。而用了 docker-composer 之后，你就可以把这些命令一次性写在 docker-composer.yml 文件中，以后每次启动这一整个环境（含 3 个容器）的时候，你只要敲一个 docker-composer up 命令就 ok 了。
   1. 而 dockerfile 的作用是从无到有的构建镜像。
2. Dockerfile - 为 docker build 命令准备的，用于建立一个独立的 image ，在 docker-compose 里也可以用来实时 build
   1. docker-compose.yml - 为 docker-compose 准备的脚本，可以同时管理多个 container ，包括他们之间的关系、用官方 image 还是自己 build（自定义镜像）、各种网络端口定义、储存空间定义等

## 构建 docker 镜像

在构建前先添加一下`.dockerignore`文件：

```
node_modules
npm-debug.log
```

执行 docker build：

```
docker build -t yukari521/express-app .
```

![docker build镜像构建](<C:\Users\ks\Desktop\药开开H5切图10.26\1610021973(1).jpg>)

`docker build`会根据 Dockerfile 文件的命令依次执行，构建成功后可以通过`docker images`命令来查看已构建的镜像。

### 运行启动容器

通过`docker run`命令基于创建的 express-app 镜像来运行启动一个容器：

```
docker run -d -p 8001:3000 --name express-app yukari521/express-app
```

`docker run` 是 `docker create` 和 `docker start` 两个命令的简写。

- `-d` 即 `--detach`，代表让容器后台运行；
- `-p` 指定宿主机和容器的端口映射，左边为宿主机的端口，右边为容器的端口，也就是说访问宿主机的 8001 端口，会映射到容器内的 3000 端口；
- `--name` 设置容器别名，如果不指定，docker 会随机生成一个名字；

运行成功后可以可以通过`docker ps`命令来查看运行的容器；

![](<C:\Users\ks\Desktop\药开开H5切图10.26\1610022689(1).jpg>)

### 结语

关于 docker 相关的内容还有很多可以学习和尝试。

### 参考文档

[前端上手 Docker 超详细基础教程](https://juejin.cn/post/6901833426182078471)

[Docker 中文文档](http://www.dockerinfo.net/document)

[把一个 Node.js web 应用程序给 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)
