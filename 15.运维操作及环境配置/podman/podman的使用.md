# podman的使用

## 使用流程

1. 查找
   1. podman search httpd
   2. podman pull
2. 运行
   1. podman run
   2. 因为容器以分离模式运行（由 podman run 命令中的 -d 表示），Podman 将在后台运行该容器，并在执行命令后打印出容器 ID。-t 选项还会添加一个伪 TTY，以便在交互式 shell 中运行任意命令。
3. 构建
   1. podman build
4. 共享
   1. podman push
5. 查看正在运行的容器
   1. podman ps 命令用于列出已创建和正在运行的容器。

## 使用

1. 安装后，你需要创建并启动你的第一个 Podman machine。
   1. podman machine init
   2. podman machine start
2. 运行一个容器
   1. podman run -dt -p 8080:80/tcp docker.io/library/httpd
      1. 启动了一个在8080端口的服务，访问：<http://localhost:8080/>

## 搭建本地的podman和docker都可以用的源

1. Docker & Podman 「完全可以共用同一个镜像源」（最全说明 + 配置 + 避坑）；
   1. Docker 和 Podman 都是遵循 OCI 容器镜像标准（Open Container Initiative），这是行业统一规范，所有容器工具（Docker/Podman/Containerd）都遵守，镜像格式、仓库协议、拉取规则完全一致，本质上是「同一种镜像，不同工具调用」，就像同一个视频文件，能用腾讯视频 / 爱奇艺 / 播放器都能打开一样。
2. 镜像源地址完全共用：Docker 用的 docker.io、阿里云镜像加速、清华镜像源、私有仓库地址，Podman 直接复制粘贴就能用，地址格式一模一样；
3. Docker 下载的镜像（比如你要的centos:7），**Podman 可以直接调用运行**，无需重新下载；
4. 镜像拉取 / 运行命令基本通用：docker pull centos:7 和 podman pull centos:7 写法几乎一致，上手零成本。

### 核心原理：本地镜像仓库的作用

1. 你先从外网拉取镜像（比如 centos:7），推送到本地仓库；
2. 同事们从你的本地仓库拉取镜像，**走内网，速度能跑满带宽（比如 100MB/s 以上）**；
3. **支持 Docker/Podman 共用，配置一次，两种工具都能使用**。
4. 我们用 **Docker Registry 来搭建**（官方工具，轻量、无依赖、1 行命令启动），也可以用更友好的 Harbor（适合企业级多镜像管理），这里先讲最适合你场景的 Docker Registry 方案。

### 查看docker的源地址及镜像存储地址（同等替换为podman）

1. 查看源地址：
   1. cat ~/.docker/daemon.json
2. 查看本地已下载的镜像地址和名称：
   1. docker images --format "{{.Repository}}:{{.Tag}} @ {{.ID}}"
3. 存储目录
   1. docker info | grep "Docker Root Dir"

### 具体操作

**存储地址：/var/lib/registry**
mac: ipconfig getifaddr en0 => 192.168.0.15

步骤 1：1 行命令启动本地仓库
在你的 Mac 终端执行以下命令，启动一个轻量级的 Docker Registry 服务：
bash
运行

```bash
# 启动本地镜像仓库，端口映射 5000，数据持久化到本地目录
docker run -d \
  --name local-registry \
  --restart=always \
  -p 10000:5000 \
  -v ~/docker-registry-data:/var/lib/registry \
  registry:2

# 这里安装会出现端口占用、重复线程、重复local-registry的问题。
# 上边的不太对，需要修改为可以走http的版本：
docker run -d --name local-registry --restart=always -p 10000:5000 -v /var/lib/registry:/var/lib/registry registry:2
```

参数说明：
-p 5000:5000：把容器的 5000 端口映射到 Mac 的 5000 端口，同事通过 你的内网IP:5000 访问；
-v ~/docker-registry-data:/var/lib/registry：把仓库的镜像数据保存到 Mac 本地目录，重启容器数据不丢失；
registry:2：官方的 Registry 镜像，体积只有 20MB 左右，秒启动。

步骤 2：验证仓库是否启动成功

```bash
# 运行
# 查看容器状态（显示 Up 就是成功）
docker ps | grep local-registry

# 访问仓库API（返回 {} 表示正常）
curl http://你的内网IP:5000/v2/_catalog
# curl http://192.168.0.15:10000/v2/_catalog
# 示例：curl http://192.168.1.100:5000/v2/_catalog
```

三、核心操作：把镜像推送到本地仓库

以你需要的 centos:7 为例，分 3 步：拉取外网镜像 → 打标签 → 推送到本地仓库。

1. 拉取外网镜像（你自己从外网下载一次即可）
   1. docker pull centos:7
2. 给镜像打「本地仓库标签」
   1. Docker/Podman 要求镜像标签格式为 仓库地址/镜像名:版本，否则无法推送：
   2. 格式：docker tag 原镜像名:版本 你的内网IP:5000/镜像名:版本
   3. docker tag centos:7 192.168.1.100:5000/centos:7
      1. docker tag centos:7 192.168.0.15:10000/centos:7
3. 步骤 3：推送到本地仓库
   1. docker push 192.168.1.100:5000/centos:7
      1. docker push 192.168.0.15:10000/centos:7
   2. 推送成功后，镜像就保存在你的本地仓库里了，同事可以直接从你的电脑拉取。
4. 步骤 4：验证镜像是否推送成功
   1. curl <http://192.168.1.100:5000/v2/_catalog>

4、同事端配置：从你的本地仓库快速拉取镜像

1. "insecure-registries": ["192.168.0.15:10000"],
2. docker pull 192.168.0.15:10000/centos:7

### 总结步骤

#### 发布端

1. 第一步：你从外网拉取官方镜像（比如 centos:7 / ubuntu:22.04 等）
docker pull 镜像名:版本

2. 第二步：给镜像打「内网仓库标签」【必做】，固定格式替换即可
docker tag 镜像名:版本 192.168.0.15:10000/镜像名:版本

3. 第三步：把镜像推送到你的本地仓库
docker push 192.168.0.15:10000/镜像名:版本

具体：

1. docker pull centos:7
2. docker tag centos:7 192.168.0.15:10000/centos:7
3. docker push 192.168.0.15:10000/centos:7

#### 学生端/同事端

1. docker pull 192.168.0.15:10000/镜像名:版本
2. docker pull 192.168.0.15:10000/centos:7

#### 补充【你的仓库常用维护命令】（极简 4 条，备用）

1. 查看仓库是否在运行（确认服务正常）
docker ps | grep local-registry

2. 停止仓库
docker stop local-registry

3. 启动仓库
docker start local-registry

4. 查看仓库里已上传的所有镜像
curl <http://192.168.0.15:10000/v2/_catalog>

#### 运行

1. docker run -d --name my-centos7 192.168.0.15:10000/centos:7
2. 交互式：docker run -it --name my-centos7 192.168.0.15:10000/centos:7 /bin/bash
3. 同事端：
   1. docker run -it --name my-centos7 192.168.0.15:10000/centos:7 /bin/bash

这里非常大的一个问题，mac上拉取的是mac版本的包，windows上不能用。所以想要windows能用，就必须是windows的源。

#### podman

1. podman pull 192.168.0.15:10000/centos:7
2. podman run -it --name my-centos7 192.168.0.15:10000/centos:7 /bin/bash
   1. 如果存在就删除：podman rm -f my-centos7

## 常用命令

1. cat /etc/centos-release
