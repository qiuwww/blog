# 脚本语言

## shell 是什么

操作系统可以分成核心（kernel）和 Shell（外壳）两部分，其中，

Shell 是操作系统与外部的主要接口，**位于操作系统的外层**，**为用户提供与操作系统核心沟通的途径**。

Shell 是一个**命令解释器(也是一种应用程序)**，处于内核和用户之间，负责把用户的指令传递给内核并且把执行结果回显给用户。

同时，shell 也可以作为一门强大的**编程语言**。

## shell 分类

### 操作上

- 图形界面 shell，如 Windows 的资源管理器 explorer.exe
- 命令行 shell 两大类，如 cmd 命令窗口。

### 系统区分，不同系统有不同的 shell

如 bash、C shell、windows power shell 等等；

在 linux 系统中，通常是 Bourne Again shell ( 即 **bash**)。

在 Windows 平台上，cmd 是 `Command shell` 的简写，是一个独立的应用程序，它为用户提供对操作系统直接通信的功能，它为基于字符的应用程序和工具提供了非图形界面的运行环境，它执行命令并在屏幕上回显 MS-DOS 风格的字符。

所以，可以**近似地认为 `linux shell=bash` 而 `windows shell=cmd`**，都是命令行解释器，都是用户与操作系统的交互接口。但是 bash 要比 cmd 强大很多，windows 也有强大的 shell 叫 windows power shell。
