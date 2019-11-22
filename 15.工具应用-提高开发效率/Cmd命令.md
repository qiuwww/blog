# CMD 命令

[CMD 命令速查表](http://www.jb51.net/help/cmd.htm)

[Mac 终端命令大全](https://www.jianshu.com/p/3291de46f3ff)

## 可能常用的

1. cd: `显示当前目录名或改变当前目录。`
2. cls: `清除屏幕。`
3. dir: `显示一个目录中的文件和子目录。`
4. date: `显示或设置日期。`
5. del: `删除至少一个文件。`

## Mac 下的常用终端（terminal）命令总结

### 查看当前目录

ls： 当前目录的文件

ls package.json ：当前目录是否存在 package.json 这个文件

### 显示文件内容

cat package.json

### 目录（文件夹）

```sh
$ mkdir flodername
$ rm -rf flodername
```

### 文件

```sh
$ touch filename
$ rm filename
```

### 复制

```sh
$ copy src dist
```

### 打开成可视化的文件夹

如果是`open .`则是打开当前命令里的目录，如果要打开指定的文件夹或者文件则格式为`open 要打开的路径`即可。

### 显示当前的目录

命令：pwd

快速查看当前所在目录的路径，可以复制出来。

### 帮助命令

man cp

显示 cp 指令的使用方法。
