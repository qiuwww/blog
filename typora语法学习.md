
# typora语法学习

## 目录

[TOC]

## 引用

> 这是一个块引用，
>
> 应该可以写很长，很长
>
> ### 引用的标题
> balabalabala
> > 这是第二级引用。
> return shell_exec(`echo $input | $markdown_script`);

## 常用的简单标记

这是<u>下划线</u>，但是这里为什么一直有一个提示错误

******
分割线
******

~这是删除线，但是不起作用，好像^与~都不可用~

`代码样式显示，需要看的时候点到这里，也可以看别人的文档来学习这种语法`

```html
  代码块是这样的，
  对，就是这样的。
```

~~~html
  当然也可以这样，
  就是这样啊。
~~~

表示**强调**

当然这样也表示__强调__，一般用在行内

表示*斜体*，比强调少了一个说明符

当然这也是_斜体_

## 列表

### 任务列表

- [x] 吃饭
- [x] 看电影，已完成
- [ ] 看书，还没完成的

### 无序的列表

> 使用星号、加号或是减号作为列表标记

#### 无序的列表1，当然官方是推荐`-`的

* html
* css
* javascript

#### 无序的列表2

- vue
- angularjs
- react

#### 无序的列表3

+ vue
+ angularjs
+ react

### 有序的列表

1. nodejs
2. angularjs
3. react

### 嵌套块引用的列表

github有以下主要功能:
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
  if (!obj || typeof obj !== "object" || Array.isArray(obj))
    return false;
  return !Object.keys(obj).length;
}
```

## 链接

[内嵌式链接](https://www.google.com)

[带标题的内嵌式链接](https://www.google.com "谷歌的主页")

[引用式链接][arbitrary case-insensitive reference text]

[相对引用一个库文件](../blob/master/LICENSE)

[你可以在引用式链接定义中使用数字][1]

或者空着什么都不写 [link text itself]

用来说明引用链接的文字可以放在后面。

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

### 自动链接

当然标准的url直接填入就是了。eg：www.baidu.com

度娘一下，你就知道： <http://www.baidu.com>

[typora语法学习](https://github.com/moonbreezee/blog/blob/master/typora%E8%AF%AD%E6%B3%95%E5%AD%A6%E4%B9%A0.md)

### 页面内导航

这里应该是转为html的时候会生成锚点

[插入图片](#插入图片)

**[:arrow_up: 返回目录](#目录)**

## 表格

| 姓名   |  性别  |  毕业学校  |   工资 |
| :--- | :--: | :----: | ---: |
| 杨洋   |  男   | 重庆交通大学 | 3200 |
| 峰哥   |  男   |  贵州大学  | 5000 |
| 坑货   |  女   |  北京大学  | 2000 |

其中代码的第二行指定对齐的方式，第一个是左对齐，第二个和第三个是居中，最后一个是右对齐。

## 插入图片

本地图片直接拖过来就行了：![react生命周期](/Users/qww/Documents/learn/blog/10.各种库与框架的设计思想和工作原理/React/React的生命周期/react生命周期.png)

### 网络图片，so easy：，（当然标题前后需要空一格）

![img](http://upload-images.jianshu.io/upload_images/1182605-1cbd9bb6f1ed0be4.gif?imageMogr2/auto-orient/strip)

## 这是两种分割线

分割内容1

******
分割内容2
______
分割内容3， 当然官方是推荐的`******`，六个

## 删除线

~~要划除的行内内容~~

## 标注

某些人用过了才知道[^注释]

[^注释]: 真的可以啊，但是这里为什么还在呢

## 流程图

Markdown 编辑器已支持绘制流程图、时序图和甘特图。通过 mermaid 实现图形的插入，点击查看 更多语法详情。

### 流程图1

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

## markdown内部可以嵌入直接的html代码

```html
<h1 align="center">
<br>
  <a href="https://github.com/stephentian/33-js-concepts"><img src="https://github.com/stephentian/33-js-concepts" alt="每位 JS 开发应该懂的 33 个概念" width=200"></a>
<br>
<br>
  JavaScript开发者应懂的33个概念
<br>
</h1>
```

## 脚注

Text prior to footnote reference.[^2]
[^2]: Comment to include in footnote.

## 目前到这里，有一点小问题，以后在学习别人怎么写，还要熟练运用

changyangzhe-2016.7.22
moonbreezee-2018.9.14
