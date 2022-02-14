# tree，生成文档结构树

[参考文档](https://blog.csdn.net/gwdgwd123/article/details/103923110)
[配置命令](https://blog.csdn.net/obsolescence/article/details/75268885)

## 安装

`brew install tree`

## 查看项目结构

`tree -L 3 > tree.text`

列出 3 层，输出到 tree.text

如下，列出当前项目的文件树；

```bash
tree -L 2 -N > tree.text
```
