# podman

## 是什么

1. Podman（POD Manager）是一个开源的无守护进程（daemonless）容器引擎，用于管理容器、容器镜像、容器卷和网络。
2. 它兼容 OCI 标准，可以运行 Docker 镜像，并且设计上与 Docker CLI 命令高度兼容。
3. 由 Podman 控制的容器既可以由 root 用户运行，也可以由非特权用户运行。
4. 从 Dockerfile / Containerfile 构建容器，或从远程仓库拉取镜像以运行。
5. 支持的引擎和编排器包括 Podman、Docker、Lima、kind、Red Hat OpenShift、Red Hat OpenShift Developer Sandbox。
6. 参考：
   1. <https://podman.org.cn/docs>
   2. <https://docs.podman.org.cn/en/latest/>

## 为什么要用podman

1. 相对于虚拟机的优势（目前传统的实训方式）
   1. 资源占用极低，轻量化运行；
   2. 启动与部署速度极快
   3. 跨架构兼容性更友好（适配 Mac M 系列 ARM 芯片）
   4. 镜像与容器管理更高效，适合教学共享
   5. 无守护进程（daemonless），更安全可控
   6. 与 Kubernetes 无缝衔接，贴近生产实践
2. 相对于docker的优势（目前主要的研究方向的优势）
   1. 无守护进程（Daemonless）架构，更稳定、更安全
   2. 原生支持 Rootless（无根模式），安全性更高
   3. 原生支持 Pod 概念，更贴近 Kubernetes 生态
      1. docker：核心单元是 “容器”，没有原生的 Pod 概念（Docker Compose 是多容器编排，而非 Pod），与 K8s 的适配需要额外的转换工具。
   4. 无商业闭源风险，完全开源且由社区 / 企业长期维护
      1. docker：自 2021 年起，Docker Desktop 对企业用户收费，且 Docker 公司的战略调整可能导致部分功能更新放缓，存在商业闭源风险。
   5. 更好的跨平台兼容性（尤其是 Mac/Windows）
   6. 命令行完全兼容 Docker，迁移成本为零
3. 参考：
   1. <https://podman.org.cn/features>
   2. <https://zhuanlan.zhihu.com/p/1927019395110114282>

### 核心区别

1. Docker 的完整组成（经典 C/S 架构）；
   1. 底层依赖（Host OS 层）
   2. 核心守护进程（Docker Daemon）：dockerd 是 Docker 的核心，以 root 权限长期运行，负责所有容器 / 镜像的生命周期管理。
   3. 客户端工具（Docker CLI）
   4. 镜像仓库（Registry）
   5. 辅助工具 / 生态组件
      1. Docker Desktop
      2. Docker Compose
      3. Docker Swarm
2. Podman 的完整组成（无守护进程架构）
   1. 底层依赖（Host OS 层）
      1. 内核特性：与 Docker 完全一致，依赖 Linux 内核的 namespaces/cgroups/overlay2 等；
   2. 核心命令行工具（Podman CLI）
   3. 辅助工具（生态扩展）
   4. 镜像仓库（兼容 OCI 标准）
      1. 公有仓库：Docker Hub、Quay、阿里云镜像库等（无需适配，直接 podman pull docker.io/nginx）；
      2. 私有仓库：**Docker Registry**、Harbor（企业级私有仓库） 等（与 Docker 共用）。
   5. **Podman 对比优势**：Podman 无守护进程，单个容器操作失败不会影响整体，且 Rootless 模式避免了特权进程被 OOM Killer 优先杀死，大幅降低 “整体失效” 风险。

## 如何使用podman

1. 查找：无论是在 dockerhub.io 或 quay.io 上查找容器，**还是在内部仓库服务器上**，或直接从供应商处查找，只需几个 podman search 和 podman pull 命令即可轻松完成。
2. 运行：使用 podman run 命令，可以轻松地使用包含运行整个应用程序所需一切的预构建镜像，或者从一个 Linux 发行版基础镜像开始。
3. 构建：使用 podman build，**无论是创建带有微小调整的新层，还是进行重大修改，都非常容易**。
   1. 修改相应的版本；
4. 共享：Podman 让您可以通过一个 podman push 命令将您新构建的容器**推送到任何您想要的地方**。

## 镜像与容器的命名及版本号规则

1. 镜像：命名规则 + 版本号（Tag）规则
   1. [仓库地址/][用户名/][仓库名]:[版本号]
      1. 若省略「仓库地址」，默认拉取 Docker Hub 官方镜像（如 nginx 等价于 docker.io/library/nginx）；
   2. **若省略「版本号」，默认使用 latest**（表示 “最新版”，但不保证是稳定版，不推荐在生产环境使用）。
   3. centos  # 等价于 docker.io/library/centos:latest
   4. 192.168.1.100:5000/my-project/my-centos:1.0.0
2. 容器名称通过 docker/podman run --name 参数指定。
