


# 原理

大概浏览了下jquery.wordexport.js插件的代码，了解到了通过该插件可以导出文本和图片，而图片首先通过canvas的形式

绘制，文本则需要再依赖FileSaver.js插件，FileSaver.js插件则主要通过H5的文件操作新特性new Blob()和new FileReader()

来实现文本的导出。

直接调用wordExport()接口就可以导出word文档，传的参数为导出的word文件名。

## attation
图片要同源，所以最好转为base64

### 补充：

通过我们常规写的外联样式设置样式是无效的，通过个人的实践发现需要写内联样式才能生效，而单位也需要按照word的配置

单位pt设置。

1. 长度的单位要用pt;
2. margin不识别，各部分的宽度，高度都要设置好；
3. position也不识别;o(╯□╰)o
4. div没法设置宽度；