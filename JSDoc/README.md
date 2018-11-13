# JSDoc文档生成操作库

JSDoc是一个根据javascript文件中注释信息，生成JavaScript应用程序或库、模块的API文档 的工具。你可以使用他记录如：命名空间，类，方法，方法参数等。类似JavaDoc和PHPDoc。

## 使用jsdoc的操作步骤
1. 全局安装jsdoc；
```
  sudo npm install jsdoc -g
```
2. 调用`jsdoc`命令，创建文档；
```
  jsdoc filename.js
```

## 使用jsdoc2md的操作步骤
1. 全局安装jsdoc2md；
```
  sudo npm install -g jsdoc-to-markdown
```
2. 调用`jsdoc2md`命令，创建文档；
```
  jsdoc2md filename.js > outputfilename.md
```

## 基础的注释语法

需要遵守一定的格式和规则。

### JSDoc解析器的识别
JSDoc注释一般应该放置在方法或函数声明之前，它必须以`/**`开始，以便由JSDoc解析器识别。其他任何以`/*`，`/***`或者超过3个星号的注释，都将被JSDoc解析器忽略。

### 注释标签
在JSDoc 注释有一套标准的注释标签，一般以@开头。

### 命令行参数

1. 添加readme说明文件，在命令行最后添加`.md`结尾的文件。可以提供一个`[Markdown file][md-file]`（以“.md”结尾）或者一个名为“README”文件的路径，它将被添加到文档的头部。
2. 输出文件地址: `-d <value> || --destination <value>	输出生成文档的文件夹路径。`

**用conf.json配置JSDoc**


### 注释的语法 块标签和内联标签

JSDoc支持两种不同类型的标签：

- 块标签, 这是在一个JSDoc注释的最高级别。
- 内联标签, 块标签文本中的标签或说明。

块标签通常会提供有关您的代码的详细信息，如一个函数接受的参数。内联标签通常链接到文件的其他部分，类似于HTML中的锚标记（`<a>`）。

块标签总是以 at 符号（@）开头。除了JSDoc注释中最后一个块标记，每个块标签后面必须跟一个换行符。
内联标签也以 at 符号（@）开。然而，内联标签及其文本必须用花括号（{ and }）括起来。 { 表示行内联标签的开始，而}表示内联标签的结束。如果你的标签文本中包含右花括号（}），则必须用反斜线（ \ ）进行转义。在内联标签后,你并不需要使用一个换行符。
大多数JSDoc标签是块标签。一般来说，当这个网站上说"JSDoc 标签",我们真正的意思是"块标签"。


### 只有在全局中的内容才会被记录
这个时候需要把不存在window对象上的主动添加到window上。

### 常用功能标签：

  desc/description 描述方法、变量，放在第一排可省略

  method/function   方法名

  param    参数，可定义类型

  property    属性，可定义类型

  return  方法返回值，可定义类型

  todo 描述函数的功能

  global   表示变量是否是全局

  constructs 表明是构造函数

  default  默认值

  alias  别名

  event  事件

  example  示例

  type   变量类型

  module   标明当前文档模块

### 文档信息标签

  version   版本信息

  author   作者

  license   开源协议

  link   链接

