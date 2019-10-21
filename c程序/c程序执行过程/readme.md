# c 程序执行过程

在终端中编译并运行 c 文件

## 通过 gcc 编译 c 程序

`gcc -c hello.c`

## 生成可执行文件

`gcc hello.o -o hello`

## 执行

`./hello`

其中编译和连接可以通过一行指令来完成`gcc hello.c -o hello`，顺便执行`& ./hello`
