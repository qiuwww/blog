# 使用 Docker 部署一个应用 1

1. 在应用的根目录下创建一个 docker 文件；
   1. 这里仍旧使用`docker-demo1`，来实现用例；
2. dockerfile：
   1. [dockerhub](https://hub.docker.com/search?q=node&type=image)上提供了很多的镜像；
   2. FROM：使用的镜像
   3. WORKDIR：/app：制定 docker 镜像内的执行命令的路径
   4. COPY . . ：复制所有文件到/app 下边；
   5. RUN 是创建容器的时候使用的；
   6. CMD 指定启动容器后要执行的命令;
3. 使用 docker build 来创建镜像 image；
   1. `docker build -t docker-demo1 .`
      1. -t 指定镜像的名字；
      2. 最后的点`.`，指定在当前目录下寻找 dockerfiler 文件；
      3. 这里的 images name，可以是带版本号的名称，便于区分版本号，不同版本都可以运行；
         1. 例如这里修改输出端口为 3001，指定映射为 8091；
            1. `docker build -t docker-demo1.1 .`
            2. `docker run -p 8091:3001 -d docker-demo1.1`
4. 第一次调用 build 会比较慢，需要去下载，后续的就比较快了；
5. 有了镜像之后，我们可以通过 run 来执行这个镜像；
   1. `docker run -p 8090:3000 -d docker-demo1`
      1. -p 8090(本地主机访问的端口):3000(docker 服务端口)；
      2. 这个时候就可以访问`localhost:8090`端口了；
   2. `docker images`，可以查看当前所有的镜像；
   3. `docker ps`，查看正在运行的 container；
      1. `docker stop {CONTAINER ID/NAMES}`，关闭运行的 container；
   4. 重启容器`docker restart {CONTAINER ID/NAMES}`
   5. `docker exec -it {CONTAINER ID/NAMES} /bin/sh; exit`，启动远程 shell；
   6. 删除一个 container 的时候，会同步的删除里边的数据，比如部署的 mysql，这个时候怎么处理？
      1. 如果希望保存数据，可以使用里边的 volumes 数据卷；
         1. 可以认为是一个不同容器共享的文件夹；
      2. 可以通过`docker volume create ${volume name}`，来创建数据卷；
         1. `docker volume create docker-demo1-volume`
      3. 在启动容器的时候可以通过`-v ${volume name}:/etc/test`，来指定挂在这个数据卷到容器的哪一个路径上。
         1. 向这个文件写入的任何数据，都会被永久的保存；
         2. `docker run -p 8091:3001 -d docker-demo1.1 -v docker-demo1-volume`
6. 这里运行出错也是会展示在 docker dashboard 的图形界面出来的；
   1. 这里也可以查看运行信息；
   2. 这里可以打开命令行工具，可以看到 docker 有自己的一套系统的，app 就是其中的一个文件夹；
      1. `uname -a`，查看当前系统的信息；
      2. docker 的系统信息：`Linux 279962faf917 4.19.76-linuxkit #1 SMP Thu Oct 17 19:31:58 UTC 2019 x86_64 GNU/Linux`
      3. **这里后边还是要测试一下**。
7. docker-compose：用来对多个容器进行分离，保证即便服务宕机了，数据库还是能用的，这里查看 `blog/docker/使用Docker部署一个应用2.md`；

```dockerfile
FROM node:12.18.4

WORKDIR /app
COPY package.json yarn.lock index.js /app/

RUN npm config set registry http://npmreg.qa.92jkys.com/

RUN npm install
ADD . /app

EXPOSE 3000
ENTRYPOINT [ "npm","run" ]
CMD ["start"]


# FROM 指定基础镜像为 node 的 12.18.4 版本，这里为了和本地 node 版本保持一致；
# WORKDIR 用来指定工作目录；
# COPY 命令将宿主机的文件拷贝到镜像中，格式为 COPY <源路径> <目标路径>；
# RUN 命令用来执行 shell 命令，这里用来安装依赖；
# ADD 命令用来复制指定目录 src(相对路径、URL、tar 压缩文件)到容器中的目录下；
# EXPOSE 用来指定 Docker 服务端容器暴露的端口号；
# ENTRYPOINT 配置容器启动后执行的命令，这里需要指定 npm run start;
# CMD 指定启动容器后要执行的命令;
```

## 如何结合 git 使用？
