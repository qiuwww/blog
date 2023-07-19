# Kubernetes(k8s) 和 Docker 之间的共生关系

1. Kubernetes 可以在没有 Docker 的情况下运行，而 Docker 可以在没有 Kubernetes 的情况下运行。
2. Docker 使我们能够在单个操作系统上运行、创建和管理容器。 Kubernetes 将其增加到 11。
3. Kubernetes 可以让您从单个命令行或仪表板跨所有这些节点自动执行容器配置、网络、负载平衡、安全性和扩展。由单个 Kubernetes 实例管理的节点集合称为 Kubernetes 集群。

## docker，单个容器

1. 第一种方法涉及将 Docker 容器视为真正的轻量级虚拟机。
2. 第二种方法是将 Docker 视为软件打包和交付平台。

## Kubernetes，容器编排技术

1. 关于 Kubernetes 集群，您需要了解两个基本概念。第一个是节点。这是 Kubernetes 管理的 VM 和/或裸机服务器的通用术语。
2. 第二个术语是 pod，它是 Kubernetes 中的基本部署单元。Pod 是需要共存的相关 Docker 容器的集合。
