
# Containerfile

1. Containerfile 什么时候执行？仅在 podman build（镜像构建阶段）执行，且只执行一次.
2. 只有当你执行 podman build -t 镜像名:标签 -f Containerfile .（或省略-f Containerfile，默认读取当前目录的 Containerfile/Dockerfile）时，才会触发 Containerfile 的解析和执行。
3. Containerfile 中的每一条指令（FROM、RUN、COPY、ENV等），都会按从上到下的顺序依次执行，每一条指令都会生成一个「镜像层」（只读层）。
   1. CMD：
      1. CMD 命令的核心作用
      2. CMD的唯一核心作用是：为构建的镜像指定「容器启动时默认要执行的命令 / 程序」，相当于给容器设置一个「默认启动脚本」。
      3. 简单理解：镜像就像一个预装了软件的系统镜像，**CMD就是这个系统启动后默认会自动运行的程序**，没有它，容器启动后会因为没有可运行的核心进程，立刻退出（状态变为Exited）。
      4. 容器启动时默认启动Nginx服务（前台运行，保证容器不退出）
         1. CMD ["nginx", "-g", "daemon off;"]
      5. 容器启动时默认进入bash终端
         1. CMD ["/bin/bash"]
      6. 容器启动时默认执行自定义启动脚本
         1. CMD ["/root/startup.sh"]
   2. **CMD 不执行在podman build（镜像构建阶段）**，仅执行在podman run（容器启动阶段）
4. 执行结果：所有指令执行完成后，会生成一个完整的「镜像」（由多个只读镜像层叠加而成），这个镜像会被保存到本地镜像仓库中，后续可以反复用这个镜像启动容器。
5. 核心区别：build是「制作镜像（只读蓝图）」，run是「基于蓝图创建可写实例（容器）并启动进程」。
