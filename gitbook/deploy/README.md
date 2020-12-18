# 发布

发布到github的gh-pages上，[参考文档](http://www.chengweiyang.cn/gitbook/github-pages/README.html)

## 源码发布

1、Github上新建仓库
2、gitbook build编译，确保_book目录生成
3、git init 添加git管理
4、git add * 所有文件添加到版本库
5、git commit -m "first commit" 提交版本库
6、git remote add origin （刚新建仓库的地址）添加远程仓库地址
7、git push -u origin master  推送到远程仓库master分支
8、源码发布完成

## 构建书本

1、首先，使用 gitbook build 将书籍内容输出到默认目录，也就是当前目录下的 _book 目录。
2、创建 gh-pages 分支。
3、加入 _book 下的内容到分支中：

### 静态页发布(即将_book目录下文件发布到gh-pages分支)

1、git subtree push --prefix=_book origin gh-pages

### 查看

所有在 Gitbook.com 上的书的http地址为 http://{author}.gitbooks.io/{book}/，而书内容的地址是 http://{author}.gitbooks.io/{book}/content/

### 更新线上

```bash
git build
git subtree push --prefix=_book origin gh-pages
```
