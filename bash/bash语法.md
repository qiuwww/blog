# [linux]BASH 的基本语法

[参考文档](https://www.cnblogs.com/lonelywolfmoutain/p/5950439.html)

## 基础语法

```bash
#!/bin/bash
# This is a very simple example
echo Hello World
```

- `#!` 是说明 hello 这个文件的类型的
- 在 BASH 中 第一行的 "#!" 及后面的 "/bin/bash" 就表明该文件是一个 BASH 程序，需要由 /bin 目录下的 bash 程序来解释执行。
- 第二行的 "# This is a ..." 就是 BASH 程序的注释

## 关于输入、输出和错误输出

- ">"就是输出（标准输出和标准错误输出）重定向的代表符号，连续两个 ">" 符号，即 ">>" 则表示不清除原来的而追加输出。

## BASH 中对变量的规定

在 BASH 中变量定义是不需要的。

### 简单变量

BASH 中的变量既然不需要定义，也就没有类型一说，一个变量即可以被定义为一个字符串，也可以被再定义为整数。如果对该变量进行整数运算，他就被解释为整数；如果对他进行字符串操作，他就被看作为一个字符串。

比较字符串 a 和 b 是否相等就写作：if [ a=b ]
判断字符串 a 是否为空就写作： if [ -z a]判断整数变量 a 是否大于 b 就写作：if[a -gt $b ]

也就是说函数内的局部变量 HELLO 的影响只存在于函数那个程序块中。

### BASH 中的基本流程控制语法

```bash
if [ expression ]
then
statments
elif [ expression ]
then
statments
else
statments
fi
```

### 使用命令行，打开本地vscode

code .

### 创建一个文件

`touch example.txt`

### 创建目录

`mkdir -p mydir`

切勿mkdir直接使用，而应将其与-p旗帜一起使用。如果目录存在，此标志确保mkdir不会出错。

### 

