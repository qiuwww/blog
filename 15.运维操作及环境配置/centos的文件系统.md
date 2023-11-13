# [centos 的文件系统](https://segmentfault.com/a/1190000009393665)

/bin 二进制可执行命令
/dev 设备特殊文件
/etc 系统管理和配置文件
/etc/rc.d 启动的配置文件和脚本
/home **用户主目录的基点**，比如用户 user 的主目录就是/home/user，可以用~user 表示
/lib 标准程序设计库，又叫动态链接共享库，作用类似 windows 里的.dll 文件
/sbin 系统管理命令，这里存放的是系统管理员使用的管理程序
/tmp 公用的临时文件存储点
/root **系统管理员的主目录（呵呵，特权阶级）**
/mnt 系统提供这个目录是让用户临时挂载其他的文件系统。
/lost+found 这个目录平时是空的，系统非正常关机而留下“无家可归”的文件（windows 下叫什么.chk）就在这里
/proc 虚拟的目录，是系统内存的映射。可直接访问这个目录来获取系统信息。
**/var 某些大文件的溢出区，比方说各种服务的日志文件**
/usr 最庞大的目录，要用到的应用程序和文件几乎都在这个目录。其中包含：
/usr/x11r6 存放 x window 的目录
/usr/bin **众多的应用程序**
/usr/sbin 超级用户的一些管理程序
/usr/doc linux 文档
/usr/include linux 下开发和编译应用程序所需要的头文件
/usr/lib 常用的动态链接库和软件包的配置文件
/usr/man 帮助文档
/usr/src 源代码，linux 内核的源代码就放在/usr/src/linux 里
/usr/local/bin 本地增加的命令
/usr/local/lib 本地增加的库

/usr： 系统级的目录，可以理解为 C:/Windows/；/usr/bin 存放应用程序；/usr/share 存放共享数据，/usr/lib **存放不能直接运行的，却是许多程序运行所必需的一些函数库文件**，可以理解为 C:/Windows/System32 \*比如 Java 的安装目录，我会放在这里。

/usr/local：**用户级的程序目录**，可以理解为 C:/Progrem Files/。
用户**自己编译的软件默认会安装到这个目录下**。 \*比如 Hadoop，Tomcat 的安装目录我一般会放在/usr/目录下

/opt：**给主机额外安装软件所摆放的目录。用户级的程序目录**，可以理解为 D:/Software，opt 有可选的意思，**这里可以用于放置第三方大型软件（或游戏），当你不需要时，直接 rm -rf 掉即可。**在硬盘容量不够时，也可将/opt 单独挂载到其他磁盘上使用。 \*比如临时上传到 Linux 里的软件；tar.gz rpm 等文件，**用作软件仓库**。
