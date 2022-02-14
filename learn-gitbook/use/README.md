# 使用

## gitbook init

该命令会生成READM.md和SUMMARY.md两个文件

```markdown
READM.md    书籍的介绍
SUMMARY.md  书籍概要文件 形式如下：
  * [前言](README.md)
  * [安装](install/README.md)
  * [使用](use/README.md)
  * [发布](deploy/README.md) 
  * [book.json文件](expand/README.md)
```

如果SUMMARY.md已编辑好，执行 `gitbook init` 会生成对应文件夹和.md文件
注：该方法只支持到二级，如多级，需手动创建文件夹

## gitbook build 构建书本

该命令会生成一个_book文件夹,里面是编译好html文件，一般github pages托管这里面文件，就可以作为静态博客了

## gitbook serve 本地开发

该命令会启动服务，浏览器访问localhost:4000即可查看
