# hexo 生成网站记录

使用 hexo 生成静态的网站，并部署到 oss 上。

参考原部署的 moonbreezee.github.io。

## 初始化

```bash
hexo init hexo-website
cd hexo-website

hexo server

```

## 项目目录

新建完成后，指定文件夹的目录如下：

```
.
├── _config.yml // 网站的 配置 信息，您可以在此配置大部分的参数。
├── package.json
├── scaffolds // 模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。
├── source
|   ├── _drafts
|   └── _posts
└── themes // 主题 文件夹。Hexo 会根据主题来生成静态页面。
```

### source

资源文件夹是存放用户资源的地方。除 `_posts` 文件夹之外，开头命名为 _ (下划线)的文件 / 文件夹和隐藏的文件**将会被忽略**。**Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。**

blog learn-hexo

## 分支说明

master 分支，保存网站，github 的 pages 只能保存在`moonbreezee.github.io`的 master 分支之下。

source 分支，保存 hexo-blog 的源文件，主要是一份操作与配置，通过格式化 blog 项目下的文件，然后生成 hexo 网站，这个分支是默认分支。

# hexo-blog 部分的代码说明

本部分，主要是通过脚本复制`blog`下需要发布的 markdown 文件，生成 html，发布到`github`的 pages 上。

## help-scripts

辅助脚本，复制文件与任务执行

## scaffolds

模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。

Hexo 的模板是指在新建的 markdown 文件中默认填充的内容。例如，如果您修改 scaffold/post.md 中的 Front-matter 内容，那么每次新建一篇文章时都会包含这个修改。

## source

资源文件夹是存放用户资源的地方。
除 _posts 文件夹之外，开头命名为 _ (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。
**Markdown 和 HTML** 文件会被解析并放到 **public** 文件夹，**而其他文件会被拷贝过去。**

### 布局（Layout）

您可以在命令中指定文章的布局（layout），默认为 post，可以通过修改 \_config.yml 中的 default_layout 参数来指定默认布局。

Hexo 有三种默认布局：post、page 和 draft，它们分别对应不同的路径，而您自定义的其他布局和 post 相同，都将储存到 source/\_posts 文件夹。

### 布局 路径

post source/\_posts
page source
draft source/\_drafts

## themes

主题 文件夹。Hexo 会根据主题来生成静态页面。

## 原始访问地址

```js
http://moonbreezee.github.io/ -> https://blog.qiuww.site/
```

## 如何让解决重复发的时候的文件覆盖问题，以及评论功能

每次不要 clean，覆盖发布

## 标记，确保 hexo-blog 与这些要发布的文件夹同级

- Q&A
- 别的项目中的 Readme 文件。

## 本地开发模式

需要刷新一下才能看到效果

```bash
hexo server
```

## 安装 hexo

```bash
npm install hexo -g #安装Hexo
npm update hexo -g #升级
hexo init #初始化博客
```

## 命令简写

```bash
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo g == hexo generate #生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy #部署

hexo server #Hexo会监视文件变动并自动更新，无须重启服务器
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存，若是网页正常情况下可以忽略这条命令
```

## 站点配置文件

\_config.yml 文件称为站点配置文件。

## hexo 的部署插件

```bash
npm install hexo-deployer-git --save
hexo clean
hexo g
hexo d
```

## 更新

```bash
hexo g
hexo d
```

## 如果我想发布 blog 下的文件到 hexo

需要自己执行命令把 blog 下的指定文件复制到 hexo-blog 下的`source/_posts`目录下，然后运行`hexo g && hexo d`

## 主题配置

进入根目录里的 themes 文件夹，里面也有个\_config.yml 文件，这个称为主题配置文件

## 关联 hexo 与 github

下一步将我们的 Hexo 与 GitHub 关联起来，打开站点的配置文件\_config.ym
deploy:
type: git
repo: 这里填入你之前在 GitHub 上创建仓库的完整路径，记得加上 .git

## 地址解析

1. 修改仓库的定向地址

setting -> GitHub Pages -> Custom domain -> 域名解析地址

2. 添加解析

- 添加服务类型 A，指向 GitHub 的地址；
- 添加子域名 blog，指向 `http://moonbreezee.github.io`

3. 创建记事本

第三步，进入本地博客文件夹 ，进入**blog/source**目录下，创建一个记事本文件，输入你的域名，对，**只要写进你自己的域名即可**。如果带有 www，那么以后访问的时候必须带有 www 完整的域名才可以访问，但如果不带有 www，以后访问的时候带不带 www 都可以访问。

4. 重新发布

## 修改主题

1. 下载主题到`themes`文件夹下;
2. 修改`_config.yml`内的`theme`选项为`theme: next`;
3. 重新发布。

## hexo 的文档配置选项

https://hexo.io/zh-cn/docs/front-matter

---

layout: post
title: title
date: 2013/7/13 20:46:25
updated: 2013/7/13 20:46:29
photos: https://github.com/moonbreezee/treasure-pictures/blob/master/%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94%E4%B8%8E%E4%BC%A0%E7%BB%9F%E8%8A%82%E6%97%A5/2019%E5%B9%B41%E6%9C%885%E6%97%A5-%E5%B0%8F%E5%AF%92.jpeg
tags:

- JavaScript
- React
  categories:
- 编程
  categories:
- [Linux, Hexo]
- [Tools, PHP]
  comments: true

---

### 以下是预先定义的参数，您可在模板中使用这些参数值并加以利用。

参数 描述 默认值
layout 布局
title 标题
date 建立日期 文件建立日期
updated 更新日期 文件更新日期
comments 开启文章的评论功能 true
tags 标签（不适用于分页）
categories 分类（不适用于分页）
permalink 覆盖文章网址

## 保存源文件到分支上

```bash
git clone https://github.com/moonbreezee/moonbreezee.github.io.git

git remote add origin https://github.com/moonbreezee/moonbreezee.github.io.git
git add .
git commit -m "your description"
git push origin save
```
