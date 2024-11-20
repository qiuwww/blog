# docker-demo2-realtime

**首先你要在`docker-demo2-realtime`下运行**；

docker 作为一个开发环境提供者，在一个镜像环境中运行命令来执行本地项目，可以用作实时开发，[具体参考](https://juejin.cn/post/6932808129189150734)；

1. 生成镜像：`docker build -t docker-demo2-realtime-image .`
   1. **排除了源文件，只保留运行环境；**
2. 查看生成的镜像
   1. `docker images`
3. 创建容器并运行：
   1. `docker run -it --name docker-demo2-realtime-container -v `pwd`:/docker-demo2-realtime -p 3002:3000 docker-demo2-realtime-image /bin/bash`

这个时候，就不是直接执行了，而是需要手动去执行命令。

1. `root@2819a69d8c51:/# cd docker-demo2-realtime/`
2. `root@2819a69d8c51:/docker-demo2-realtime# node index.js`
   1. 但是仍然不能热加载，每次都需要重启；
      1. node本来就需要重启；
