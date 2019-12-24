# typora 语法学习

## 目录

[TOC]

## 项目结构

```lua
Blog
  ├── .github                     -- git仓库的配置
  ├── .vscode                     -- vscode编辑器的配置
  ├── 0.2.HTML                    -- html相关
  ├── 0.3.CSS                     -- css相关
  ├── 0.5.JS                      -- js相关
      ├── 前端模板使用              -- 模板文件
      ├── 异步编程                 -- 从callback到async...await
          ├── async...await       -- async...await
          ├── generator...yield   -- generator...yield
          ├── promise
      └── 原型与原型链与原型链与类
  ├── 1.数据结构与算法              -- 数据结构与算法
  ├── 2.js-design-patterns        -- js设计模式
  ├── 3.浏览器原理                  -- 浏览器原理
  └── BLOG-markdown语法学习.zh-CN   -- markdown规范示例
```

## 引用

> 这是一个块引用，
>
> 应该可以写很长，很长
>
> ### 引用的标题
>
> balabalabala
>
> > 这是第二级引用。
> > return shell_exec(`echo $input | $markdown_script`);

## 常用的简单标记

这是`<u>`下划线`</u>`，但是这里为什么一直有一个提示错误

---

分割线

---

~这是删除线，但是不起作用，好像^与~都不可用~

`代码样式显示，需要看的时候点到这里，也可以看别人的文档来学习这种语法`

```html
代码块是这样的， 对，就是这样的。
```

```html
当然也可以这样， 就是这样啊。
```

表示**强调**

当然这样也表示**强调**，一般用在行内

表示*斜体*，比强调少了一个说明符

当然这也是*斜体*

## 列表

### 任务列表

- [x] 吃饭
- [x] 看电影，已完成
- [ ] 看书，还没完成的

### 无序的列表

> 使用星号、加号或是减号作为列表标记

#### 无序的列表 1，当然官方是推荐`-`的

- html
- css
- javascript

#### 无序的列表 2

- vue
- angularjs
- react

#### 无序的列表 3

- vue
- angularjs
- react

### 有序的列表

1. nodejs
2. angularjs
3. react

### 嵌套块引用的列表

github 有以下主要功能:

> 代码托管平台
> 在线运行环境
> 代码质量监控
> 项目管理平台

## 代码块

```js
/**
 * @desc 判断`obj`是否为空
 * @param {Object} obj object
 * @return {Boolean}
 */
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}
```

```bash
#!/bin/bash
npm install module@latest
```

## 链接

[内嵌式链接](https://www.google.com)

[带标题的内嵌式链接](https://www.google.com '谷歌的主页')

[引用式链接][arbitrary case-insensitive reference text]

[相对引用一个库文件](../blob/master/LICENSE)

[你可以在引用式链接定义中使用数字][1]

或者空着什么都不写 [link text itself]

用来说明引用链接的文字可以放在后面。

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

### 自动链接

当然标准的 url 直接填入就是了。eg：www.baidu.com

度娘一下，你就知道： <http://www.baidu.com>

[typora 语法学习](https://github.com/moonbreezee/blog/blob/master/typora%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.md)

### 页面内导航

这里应该是转为 html 的时候会生成锚点

[插入图片](#插入图片)

**[:arrow_up: 返回目录](#目录)**

## 表格

| 姓名 | 性别 |   毕业学校   | 工资 |
| :--- | :--: | :----------: | ---: |
| 杨洋 |  男  | 重庆交通大学 | 3200 |
| 峰哥 |  男  |   贵州大学   | 5000 |
| 坑货 |  女  |   北京大学   | 2000 |

其中代码的第二行指定对齐的方式，第一个是左对齐，第二个和第三个是居中，最后一个是右对齐。

## 插入图片

本地图片直接拖过来就行了：![gitflow工作流](./4.版本管理工具/imgs/git-workflow-release-cycle-4maintenance.png)，这里最好自己写与当前文档相对地址，不然上传在别的地方就访问不到了。

### 网络图片，so easy，（当然标题前后需要空一格）

![img](http://upload-images.jianshu.io/upload_images/1182605-1cbd9bb6f1ed0be4.gif?imageMogr2/auto-orient/strip)

## 这是两种分割线

分割内容 1

---

分割内容 2

---

分割内容 3， 当然官方是推荐的`******`，六个

## 删除线

~~要划除的行内内容~~

## 标注

某些人用过了才知道[^注释]

[^注释]: 真的可以啊，但是这里为什么还在呢

## 流程图

Markdown 编辑器已支持绘制流程图、时序图和甘特图。通过 mermaid 实现图形的插入，点击查看 更多语法详情。

### 流程图 1

```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```

### 以及时序图

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。

## markdown 内部可以嵌入直接的 html 代码

```html
<h1 align="center">
  <br />
  <a href="https://github.com/stephentian/33-js-concepts"
    ><img
      src="https://github.com/stephentian/33-js-concepts"
      alt="每位 JS 开发应该懂的 33 个概念"
      width="200"
  /></a>
  <br />
  <br />
  JavaScript开发者应懂的33个概念
  <br />
</h1>
```

## 插入数学公式

[公式编辑](https://www.codecogs.com/latex/eqneditor.php)

### 使用使用 Google Chart 的服务器

<img src="http://chart.googleapis.com/chart?cht=tx&chl=$$\sum_{k=1}^{n}w_k l_k$$" style="border:none;">

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" style="border:none;">

### 使用 MathJax 引擎，在 vscode 内预览是可以的

[举例参考](https://juejin.im/post/5a6721bd518825733201c4a2)

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

> $$公式$$表示行间公式，$公式$表示行内公式

$$x_1$$

$$x_1^2$$

$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$

$$a + b$$

$$\frac{x+y}{2}$$

$$\sqrt{1+\sqrt[^p\!]{1+a^2}}$$

$\int_a^b f(x)dx$

$\sum_{k=1}^n\frac{1}{k}$

$(a + b)$

$(x=\frac{-b\pm\sqrt{b^2-4ac}}{2a})$

紧贴 $a\!b$
没有空格 $ab$
小空格 a\,b
中等空格 a\;b

$$\int_a^b f(x)\,\mathrm{d}x$$

$$\left(\sum_{k=\frac{1}{2}}^{N^2}\frac{1}{k}\right)$$

$$\begin{Bmatrix}1 & 2\\\\3 &4\end{Bmatrix}$$

## 脚注

Text prior to footnote reference.[^2]
[^2]: Comment to include in footnote.

## 插入 html 标签

<p>
  <a href="https://github.com/moonbreezee/blog"><img src="https://avatars0.githubusercontent.com/u/9795348?s=400&u=9f4942de719b15791c2154fd0323ab74505f0876&v=4" alt="blog" style="width:100px;height:100px;">blog</a>
</p>

## hero 生成文章的配置头部

```yaml
---
layout: post
title: title
date: 2013-7-13 20:46:25
updated: 2013-7-13 20:46:29
photos: https://github.com/moonbreezee/treasure-pictures/blob/master/%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94%E4%B8%8E%E4%BC%A0%E7%BB%9F%E8%8A%82%E6%97%A5/2019%E5%B9%B41%E6%9C%885%E6%97%A5-%E5%B0%8F%E5%AF%92.jpeg
tags:
  - JavaScript
  - React
# categories:
# - 编程
categories:
  - [Linux, Hexo]
  - [Tools, PHP]
comments: true
---

```

## 目前到这里，有一点小问题，以后在学习别人怎么写，还要熟练运用

changyangzhe-2016.7.22
moonbreezee-2018.9.14
