# shell

[参考教程](https://www.runoob.com/linux/linux-shell.html)
[什么是 shell? bash 和 shell 有什么关系？](https://www.cnblogs.com/hihtml5/p/9272751.html)

## shell 是什么

操作系统可以分成核心（kernel）和 Shell（外壳）两部分，其中，

Shell 是操作系统与外部的主要接口，**位于操作系统的外层**，**为用户提供与操作系统核心沟通的途径**。

Shell 是一个**命令解释器(也是一种应用程序)**，处于内核和用户之间，负责把用户的指令传递给内核并且把执行结果回显给用户。

同时，shell 也可以作为一门强大的**编程语言**。

Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁。**Shell 既是一种命令语言，又是一种程序设计语言**。

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

## Shell 脚本

Shell 脚本（shell script），是一种为 shell 编写的脚本程序。

业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，**shell 和 shell script 是两个不同的概念**。

## Shell 环境

Shell 编程跟 JavaScript、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。(类比各种浏览器厂商的脚本语言)

- Linux 的 Shell 种类众多，常见的有：
- Bourne Shell（/usr/bin/sh 或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）
- ...

## shell 分类

### 操作上

- 图形界面 shell，如 Windows 的资源管理器 explorer.exe
- 命令行 shell 两大类，如 cmd 命令窗口。

### 系统区分，不同系统有不同的 shell

如 bash、C shell、windows power shell 等等；

在 linux 系统中，通常是 Bourne Again shell ( 即 **bash**)。

在 Windows 平台上，cmd 是 `Command shell` 的简写，是一个独立的应用程序，它为用户提供对操作系统直接通信的功能，它为基于字符的应用程序和工具提供了非图形界面的运行环境，它执行命令并在屏幕上回显 MS-DOS 风格的字符。

所以，可以**近似地认为 `linux shell=bash` 而 `windows shell=cmd`**，都是命令行解释器，都是用户与操作系统的交互接口。但是 bash 要比 cmd 强大很多，windows 也有强大的 shell 叫 windows power shell。

## 执行

```sh
demo ./hello.sh
```

## 语法，参见 demo

### shell 标记

`#!` 是一个约定的标记，它告诉系统这个脚本**需要什么解释器来执行**，即使用哪一种 Shell。

### 变量类型

运行 shell 时，会同时存在三种变量：

1. 局部变量 局部变量在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。
2. 环境变量 所有的程序，包括 shell 启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候 shell 脚本也可以定义环境变量。
3. shell 变量 shell 变量是由 shell 程序设置的特殊变量。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行

### 字符串

字符串可以用单引号，也可以用双引号，也可以不用引号。

#### 单引号字符串的限制

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

### Shell 和其他编程语言一样，支持多种运算符，查看/Users/qww/Documents/learn/blog/shell/demo/operator.sh

包括：

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

### 输入/输出重定向，查看 file.sh

一个命令通常将其输出写入到标准输出，默认情况下，这也是你的终端。

重定向命令列表如下：

- command > file 将输出重定向到 file。
- command < file 将输入重定向到 file。
- command >> file 将输出以追加的方式重定向到 file。
- n > file 将文件描述符为 n 的文件重定向到 file。
- n >> file 将文件描述符为 n 的文件以追加的方式重定向到 file。
- n >& m 将输出文件 m 和 n 合并。
- n <& m 将输入文件 m 和 n 合并。
- << tag 将开始标记 tag 和结束标记 tag 之间的内容作为输入。

### 比较

比较字符串 a 和 b 是否相等就写作：if [ a=b ]
判断字符串 a 是否为空就写作： if [ -z a]判断整数变量 a 是否大于 b 就写作：if[a -gt $b ]

## shell 常用命令

[CMD 命令速查表](http://www.jb51.net/help/cmd.htm)

[Mac 终端命令大全](https://www.jianshu.com/p/3291de46f3ff)

### 使用命令行，打开本地 vscode

code .

### 常用的

1. cd: `显示当前目录名或改变当前目录。`
2. cls: `清除屏幕。`
3. dir: `显示一个目录中的文件和子目录。`
4. date: `显示或设置日期。`
5. del: `删除至少一个文件。`
6. ls: 当前目录的文件
7. cat: cat package.json，显示文件内容

#### 目录（文件夹）

```sh
mkdir -p flodername
rm -rf flodername
```

切勿 mkdir 直接使用，而应将其与-p 旗帜一起使用。如果目录存在，此标志确保 mkdir 不会出错。

#### 文件

```sh
touch filename
rm filename
```

#### 复制

```sh
copy src dist
```

### 显示当前的目录

命令：pwd

快速查看当前所在目录的路径，可以复制出来。

### 帮助命令

man cp

显示 cp 指令的使用方法。

## 清理 mac 文件夹

### 查看当前文件夹下的文件的大小

du -sh \*

### 查看当前目录下所有文件的大小分布，很有用

du -d 1 -h
