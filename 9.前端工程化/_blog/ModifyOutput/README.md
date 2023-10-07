
借助babel，对输出结果进行处理。

## 要分析一下这里的生命周期 / [compiler 钩子](https://webpack.docschina.org/api/compiler-hooks/)

1. compiler.hooks.emit.tapAsync
2. compiler.hooks.run.tap

### run：在开始读取 records 之前调用

开启这个选项可以生成一个 JSON 文件，其中含有 webpack 的 "records" 记录 - 即「用于存储跨多次构建(across multiple builds)的模块标识符」的数据片段。可以使用此文件来跟踪在每次构建之间的模块变化。

### emit：输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器

