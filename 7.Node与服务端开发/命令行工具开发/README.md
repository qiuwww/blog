# 命令行工具开发 & commander 功能测试

## 主要接口

### version

设置当前的版本号

### command

对应的执行命令

### option

1. program.option，给 program 添加选择项；
1. command.option，给 command 添加选择项；

### alias

简写形式

### description

当前执行的命令描述

### action

执行命令后所执行的方法。

## 这里使用`npm link`命令来把命令添加到全局

需要在 package.json 文件所在目录下执行 npm link 命令就可以执行了。

这里会进行两步操作

`/usr/local/bin/qcli -> /usr/local/lib/node_modules/commander/index.js`
`/usr/local/lib/node_modules/commander -> /Users/qww/Documents/learn/blog/7.Node 与服务端开发/命令行工具`

这样就可以直接执行`qcli`,就等于执行 bin 声明的命令。

## 主要用到的包

### inquirer

用来交互式的提示操作

### prompt 的类型

type: (String) Type of the prompt. Defaults: input - Possible values: input, number, confirm, list, rawlist, expand, checkbox, password, editor

这里类比与一般的 input 输入控件：

list -> radio

### chalk

用来多色彩展示
