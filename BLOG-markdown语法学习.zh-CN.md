---
title: markdown 语法学习
date: 2017-2-2
tags:
  - markdown
  - 语法学习
categories:
  - markdown
  - [post, markdown 语法学习]
---

上边是 yaml 描述的文档信息。

[md 文档当作 ppt](https://github.com/ksky521/nodeppt)

[TOC]

`[TOC]`，是 Typora 所支持的目录，可自动生成目录，方便查看。

## 介绍，为什么要使用 markdown

1. 纯文本格式，方便编辑和使用，Markdown 是一种**轻量级标记语言**，它允许人们使用易读易写的纯文本格式编写文档。
2. Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档，这里使用 Typora 可方便导出。
3. 方便共享，大部分的社区、在线文档都是支持 markdown 格式编写的，共享方便。完全可以用于开发过程中做一些笔记等。
4. 可以直接使用 html 标签来设置样式，非常的方便。

## 标题

使用 `=` 和`-` 标记一级和二级标题，更常用的是使用`#`来标记。

```md
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

## 目录

也就是页面内的钩子，类似于 html 的 id。通过`#id`，来进行绑定元素与目录。

```md
- [目录 1](#1)
- [目录 2](#2)

<h2 id="1">目录1</h2>
<h2 id="2">目录2</h2>
```

- [目录 1](#1)
- [目录 2](#2)

<h2 id="1">目录1，点击目录 1跳转到此处</h2>
<h2 id="2">目录2，点击目录 2跳转到此处</h2>

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
  ├── 3.浏览器原理                 -- 浏览器原理
  └── BLOG-markdown语法学习.zh-CN  -- markdown规范示例
```

## 引用

引用使用`>`来标记，可以是一块，或者是一行，内部还可以嵌套 md 格式语法。

```md
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

> github 有以下主要功能:
>
> 1. 代码托管平台
> 2. 在线运行环境
> 3. 代码质量监控
> 4. 项目管理平台
```

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

> github 有以下主要功能:
>
> 1. 代码托管平台
> 2. 在线运行环境
> 3. 代码质量监控
> 4. 项目管理平台

## 常用的简单标记

```md
这是<u>下划线</u>，这里本质借助了 html 的标签来设置样式的。

---

分割线

---

~~这是删除线~~

表示**强调**

当然这样也表示**强调**，一般用在行内

表示*斜体*，比强调少了一个说明符

当然这也是*斜体*
```

这是<u>下划线</u>，这里本质借助了 html 的标签来设置样式的。

---

分割线

---

~~这是删除线~~

表示**强调**

当然这样也表示**强调**，一般用在行内

表示*斜体*，比强调少了一个说明符

当然这也是*斜体*

## 列表

列表，一般分为有序列表和无序列表，一般使用有序列表，更清晰，方便记忆。

### 任务列表

```md
- [x] 吃饭
- [x] 看电影，已完成
- [ ] 看书，还没完成的
```

- [x] 吃饭
- [x] 看电影，已完成
- [ ] 看书，还没完成的

### 无序的列表

使用星号`*`、加号`+`或是减号`-`作为列表标记。

```md
- html
- css
- javascript
```

- html
- css
- javascript

### 有序的列表

```md
1. nodejs
2. angularjs
3. react
```

1. nodejs
2. angularjs
3. react

## 代码块

单行代码注视使用``来标记，多行代码快使用```来标记。

`代码样式显示，需要看的时候点到这里，也可以看别人的文档来学习这种语法`

```html
<p>代码块是这样的， 对，就是这样的。</p>
<!-- todo -->
<!-- !waring -->
```

<!-- todo -->
<!-- !waring -->

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
<!-- todo -->
<!-- !waring -->
```

```bash
#!/bin/bash
npm install module@latest
```

## 链接

1. 类似与 html 的 a 标签，可以设置相对路径的连接，也可以设置绝对路径的连接。
2. 一般在 vsc 中，可以复制连接，然后选中元素，直接粘贴就可以生成。

```md
[内嵌式链接](http://www.google.com)

[带标题的内嵌式链接](http://www.google.com '谷歌的主页')

[引用式链接][arbitrary case-insensitive reference text]

[相对引用一个库文件](../blob/master/LICENSE)

[你可以在引用式链接定义中使用数字][1]

或者空着什么都不写 [link text itself]

用来说明引用链接的文字可以放在后面。

[arbitrary case-insensitive reference text]: http://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[内嵌式链接](http://www.google.com)

[带标题的内嵌式链接](http://www.google.com '谷歌的主页')

[引用式链接][arbitrary case-insensitive reference text]

[相对引用一个库文件](../blob/master/LICENSE)

[你可以在引用式链接定义中使用数字][1]

或者空着什么都不写 [link text itself]

用来说明引用链接的文字可以放在后面。

[arbitrary case-insensitive reference text]: http://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

### 自动链接

md 可以自动识别一些地址为 url，展示的时候，会直接展示为连接。

```md
当然标准的 url 直接填入就是了。eg：www.baidu.com

度娘一下，你就知道： <http://www.baidu.com>

[typora 语法学习](http://github.com/qiuwww/blog/blob/master/BLOG-markdown%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.zh-CN.md)
```

当然标准的 url 直接填入就是了。eg：www.baidu.com

度娘一下，你就知道： <http://www.baidu.com>

[typora 语法学习](http://github.com/qiuwww/blog/blob/master/BLOG-markdown%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.zh-CN.md)

### 页面内导航

这里是转为 html 的时候会生成锚点。

```md
[插入图片](#插入图片)

**[:arrow_up: 返回目录](#目录)**
```

[插入图片](#插入图片)

**[:arrow_up: 返回目录](#目录)**

## 表格

可以使用 md 来生成表格，可以控制对齐方式。

```md
| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |
```

| 左对齐 | 右对齐 | 居中对齐 |
| :----- | -----: | :------: |
| 单元格 | 单元格 |  单元格  |
| 单元格 | 单元格 |  单元格  |

其中代码的第二行指定对齐的方式，第一个是左对齐，第二个和第三个是居中，最后一个是右对齐。

## 插入图片

语法使用`![展示的名称](图片的相对或者绝对地址)`。

本地图片直接拖过来就行了，这里最好自己写绝对地址，不然上传在别的地方就访问不到了。

### 网络图片，so easy，（当然标题前后需要空一格）

![防抖debounce_节流throttle](https://user-gold-cdn.xitu.io/2020/6/22/172dca291804db9b?w=2878&h=746&f=png&s=62811)

## 标注

```md
某些人用过了才知道[^注释]

[^注释]: 真的可以啊，但是这里为什么还在呢
```

某些人用过了才知道[^注释]

[^注释]: 真的可以啊，但是这里为什么还在呢

## 流程图

Markdown 编辑器已支持绘制流程图、时序图和甘特图。通过 mermaid 实现图形的插入，点击查看 更多语法详情。

这里不同的编辑器查看到的效果不一样。

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

```flow
st=>start: Start
e=>end
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something
st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1
```

### 以及时序图

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

> **提示：**想了解更多，请查看**流程图**[语法][3]以及**时序图**[语法][4]。

## markdown 内部可以嵌入直接的 html 代码

这里的 html 可以随便写，还可以加内联样式。

<h1 align="center">使用img插入图片</h1>
<img src="https://user-gold-cdn.xitu.io/2020/6/22/172dca291804db9b?w=2878&h=746&f=png&s=62811"
 alt="防抖debounce_节流throttle" width="200"/>

内容折叠，details 和 summary，常用于 qa。

```md
<details>
  <summary>展开查看</summary>
  <pre>
    <code>
      System.out.println("Hello to see U!");
    </code>
  </pre>
</details>
```

<details>
  <summary>展开查看</summary>
  <pre>
    <code>
      System.out.println("Hello to see U!");
    </code>
  </pre>
</details>

### 内容折叠实例

<details>
<summary>View contents</summary>

- list1
- list2

> 这里是引用

- [这里是一个提问](#这里是一个提问)

</details>

### 这里是一个提问

<details>
<summary>这里是答案</summary>

We must have all ingredients of the recipe available, and in quantities that are more than or equal to the number of units required. If just one of the ingredients is not available or lower than needed, we cannot make a single batch.

</details>

## 插入数学公式

这里的兼容性不太好。

[公式编辑](http://www.codecogs.com/latex/eqneditor.php)

### 使用使用 Google Chart 的服务器

这里直接加载是加载不出来。

<!-- <img src="http://chart.googleapis.com/chart?cht=tx&chl=$$\sum_{k=1}^{n}w_k l_k$$" style="border:none;">

<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" style="border:none;"> -->

### 使用 MathJax 引擎，在 vscode 内预览是可以的

[举例参考](http://juejin.im/post/5a6721bd518825733201c4a2)

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

## hexo 生成文章的配置头部

hexo 的文章的头部信息，需要的基本信息：title、date、tags、categories、comments

```yaml
---
layout: post
title: title
date: 2013-7-13 20:46:25
updated: 2013-7-13 20:46:29
photos: https://user-gold-cdn.xitu.io/2020/6/22/172dca291804db9b?w=2878&h=746&f=png&s=62811
tags:
  - JavaScript
  - React
# categories:
# - 编程
categories:
  - [Linux, Hexo]
  - [Tools, PHP]
# 默认为true
comments: true
# 参数越大，越靠前
top: 1
---

```

上边是 yaml 描述的文档信息，方便解析。

## 语法警告提示

> no-inline-html: Inline HTML

常见提示语法的问题，可以配置`.markdownlint.json`文件来解决 warning 的问题。

[⬆ Back to top](#目录)

## 项目解构说明

```lua
ECoder
  ├── block-components -- 基础组件，在页面编辑的时候会用到里边的区块
  ├── config -- 一些项目的基础配置，umi的默认路由的替代(router.config.js)等
  ├── ework-pages -- block的UI定制部分的代码
  ├── pageTemplate // 拉取的线上模板文件
  └── src // 项目文件
      ├── assets // 静态资源文件吧
      ├── components // 公用组件文件夹
      ├── constants // 常量定义的文件夹
      ├── layouts // 包括基础的layout，以及页面头部信息，处理用户的gitlab关联的登录逻辑
      ├── locales // 国际化的东西
      ├── models // 主要存放全局的model的文件，对于具体页面的model，认为放在相应的文件夹内为妥
      ├── utils // 存放全局的工具函数
      ├── services // 接口服务
      ├── app.js // 运行时配置文件
      ├── global.css // 约定的全局样式文件，自动引入，也可以用 global.less
      ├── pages
          ├── .umi/ // dev 临时目录，需添加到 .gitignore
          ├── NewHome // 项目标签下的内容
              ├── models/ // 使用到的model
              ├── components/ // 当前页面的分块组件
                  ├── CreateBox // 创建项目模块
                  ├── GitlabModal // gitlab相关操作模块
                  ├── PageEdit // 页面编辑模块
                  ├── ProjectCreate // 工程目录添加操作
                  ├── ProjectList // 项目展示列表，附带相关操作
                  ├── TerminalWindow // terminal命令执行窗口组件
                  ├── UploadDist // 代码上传操作弹框
              ├── utils/ // 主要是execute函数，`node-pty`区别于`child_process`模块，可以输出执行的详细信息
          ├── blocks.js // 区块
          ├── index.js // 首页
          ├── setting.js // 设置页面
          ├── template.js // 模板页面
  ├── main // Electron的入口文件，这里加载启动的服务页面
  ├── package.json // 项目的基本信息及相关的配置
  ├── webpack.config.js // 在umi配置的基础上的webpack的自定义部分
  ├── .eslintrc // eslint的基础设置
  ├── .umirc.js // umi 配置，同 config/config.js，二选一
  ├── .env                           // 环境变量
```

## 显示 diff 效果

```diff
function addTwoNumbers (num1, num2) {
-  return 1 + 2
+  return num1 + num2
}
```

## 目前到这里，还要熟练运用

changyangzhe-2016.7.22
qiuwww-2018.9.14
qiuwww-2020.6.20

## contact

[github 源文件地址](https://github.com/qiuwww/blog/blob/master/BLOG-markdown%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.zh-CN.md)
