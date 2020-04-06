# hexo 生成网站记录

使用 hexo 生成静态的网站，并部署到 oss 上。

在 Hexo 中有两份主要的配置文件，其名称都是 \_config.yml。

- 其中，一份位于站点根目录下，主要包含 Hexo 本身的配置；
- 另一份位于主题目录下，这份配置由主题作者提供，主要用于配置主题相关的选项。

## 初始化

```bash
hexo init hexo-website
cd hexo-website
# 本地起服务
hexo server
# 打包成静态服务
hexo clean
hexo build
```

## 搬运源文件，并且打包

```bash
cd /Users/qiuww/code/learn/blog/hexo-blog

# 检索learn目录下的BLOG-项目，并且移动到source/_posts下，分类
node ./help-scripts/copy-blog.js

cd ./hexo-website && yarn build
```

## 发布 oss

后边看一下，怎么通过脚本来上传代码

1. 创建存储空间；
2. 上传到存储空间；
3. 绑定域名；

## hexo-website 项目目录

新建完成后，指定文件夹的目录如下：

```
.
├── _config.yml // 网站的 配置 信息，您可以在此配置大部分的参数。
├── package.json
├── scaffolds // 模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。
├── source // 源文件
|   ├── _drafts
|   └── _posts // 需要发布的文章
└── themes // 主题 文件夹。Hexo 会根据主题来生成静态页面。
```

### [\_config.yml](https://hexo.io/zh-cn/docs/configuration)

### source

资源文件夹是存放用户资源的地方。除 `_posts` 文件夹之外，开头命名为 \_ (下划线)的文件 / 文件夹和隐藏的文件**将会被忽略**。**Markdown 和 HTML 文件会被解析并放到 public 文件夹，而其他文件会被拷贝过去。**

### scaffolds

模版 文件夹。当您新建文章时，Hexo 会根据 scaffold 来建立文件。

Hexo 的模板是指在新建的 markdown 文件中默认填充的内容。例如，如果您修改 scaffold/post.md 中的 Front-matter 内容，那么每次新建一篇文章时都会包含这个修改。

### 布局（Layout）

您可以在命令中指定文章的布局（layout），默认为 post，可以通过修改 \_config.yml 中的 default_layout 参数**来指定默认布局**。

Hexo 有三种默认布局：post、page 和 draft，它们分别对应不同的路径，而您自定义的其他布局和 post 相同，都将储存到 source/\_posts 文件夹。

### 布局 路径

post source/\_posts
page source
draft source/\_drafts

### [themes](https://hexo.io/zh-cn/docs/themes)

主题 文件夹。Hexo 会根据主题来生成静态页面。

## 原始访问地址

```js
http://moonbreezee.github.io/ -> https://blog.qiuww.site/
```

## 如何让解决重复发的时候的文件覆盖问题，以及评论功能

每次**不要 clean**，覆盖发布

## hexo 的文档配置选项

[文章配置信息](https://hexo.io/zh-cn/docs/front-matter)

```yaml
---
# layout  布局
# title  标题  文章的文件名
# date  建立日期  文件建立日期
# updated  更新日期  文件更新日期
# comments  开启文章的评论功能  true
# tags  标签（不适用于分页）
# categories  分类（不适用于分页）
# permalink  覆盖文章网址
# keywords  仅用于 meta 标签和 Open Graph 的关键词（不推荐使用）

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
```

### 分类和标签

只有文章支持分类和标签，您可以在 Front-matter 中设置。**在其他系统中，分类和标签听起来很接近**，但是在 Hexo 中两者有着明显的差别：分类具有顺序性和层次性，也就是说 Foo, Bar 不等于 Bar, Foo；**而标签没有顺序和层次**。

## 选择一个主题

[hexo 的主题仓库](https://hexo.io/themes/)

创建 Hexo 主题非常容易，您只要在 themes 文件夹内，新增一个任意名称的文件夹，并修改 \_config.yml 内的 theme 设定，即可切换主题。

[next 配置](https://blog.csdn.net/u012294515/article/details/83094693)

[next 主题](http://theme-next.iissnan.com/getting-started.html)

## 添加评论功能
