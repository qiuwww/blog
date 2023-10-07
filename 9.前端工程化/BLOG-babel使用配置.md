---
title: babel
date: 2019-6-6
tags:
  - babel
  - 前端构建工具
categories:
  - [前端构建工具, babel]
---

[babel](https://babeljs.io/docs/en/babel-preset-env)

## 预设

下一代 JavaScript 语法的编译器。处理浏览器的语法兼容问题。

### babel-preset-es2015 -> babel-preset-latest

最初的解决方案。

在没有配置项的情况下，babel-preset-env 表现的同 babel-preset-latest 一样(或者可以说同 babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 结合到一起，表现的一致)

是的，在 2017 年第三季度我们终于要和 ES2015 preset 说再见了。

后续使用 babel-preset-env 来替代。

### babel-preset-env

preset-env 相当于用到的已经确定进入 es 规范的语法。

为了处理后续添加更多的功能，配置更方便而出现。babel-preset-env 是非常重要且常用的一个插件预设。

@babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

### 预设的演变

1. es2015 +> es1016 +> es2017

2. babel-preset-latest = ES2015 + ES2016 + ...

3. babel-preset-env，它可以根据开发者的配置，按需加载插件。配置项大致包括：

   - 需要支持的平台：比如 node、浏览器等。
   - 需要支持的平台的版本：比如支持 node@6.1 等。

**默认配置的情况下，它跟 babel-preset-latest 是等同的，会加载从 es2015 开始的所有 preset**。

### babel-preset-stage-x，按照提按阶段区分的，与上边的标准不同

所以上边 preset-env，不包括一些提案阶段的语法。

babel-preset-stage-x 和 babel-preset-env 有什么区别

stage-x(stage-0/1/2/3/4)

stage-x 和上面的 es2015 等有些类似，但是**它是按照 JavaScript 的提案阶段区分的，一共有 5 个阶段。**而数字越小，阶段越靠后，存在依赖关系。也就是说 stage-0 是包括 stage-1 的，以此类推。

## 插件

单独处理。

其实看了上面的应该也明白了，presets，也就是一堆 plugins 的预设，起到方便的作用。如果你不采用 presets，完全可以单独引入某个功能。

比如以下的设置就会引入编译箭头函数的功能。

```json
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

### transform-runtime

transform-runtime 是为了方便使用 babel-runtime 的，它会分析我们的 ast 中，是否有引用 babel-rumtime 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。

transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。

所以 transform-runtime 的方式**更适合开发工具包**，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。

这个插件最大的作用主要有几下几点：

- 解决编译中产生的**重复的工具函数**，减小代码体积；
- 非实例方法的 poly-fill，如 Object.assign，但是实例方法不支持，如"foobar".includes("foo")，这时候需要单独引入 babel-polyfil。l

### transform-remove-console

## 自定义预设或插件

Babel 支持自定义的预设(presets)或插件(plugins)。如果你的插件在 npm 上，可以直接采用这种方式"plugins": ["babel-plugin-myPlugin"]，当然，你也可以缩写，它和"plugins": ["myPlugin"]是等价的。此外，你还可以采用本地的相对路径引入插件，比如"plugins": ["./node_modules/asdf/plugin"]。

## plugins/presets 排序

- 具体而言，plugins 优先于 presets 进行编译。
- plugins 按照数组的 index 增序(从数组第一个到最后一个)进行编译。
- presets 按照数组的 index 倒序(从数组最后一个到第一个)进行编译。因为作者认为大部分会把 presets 写成["es2015", "stage-0"]。具体细节可以看这个。

## 推荐的配置

```json
{
  "presets": ["es2015", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

最新的 webpack4:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-stage-0"],
  "plugins": ["@babel/plugin-transform-runtime"],
  "comments": true
}
```

## babel 常用相关插件说明

1. babel-loader => webpack中转换babel的工具，相当于一个平台不做具体的工作
2. @babel/core => babel转换语言的核心功能，核心api等；
3. babel/preset-env => babel转换语言的内容包，包括es6+所有特性；
4. @babel/cli => 使node环境支持es6语法；@babel/core也能是node环境支持es6语法；
5. @babel/polyfill =>（一些全局方法和变量）Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。babel-polyfill相对来说比较大。
6. @babel/runtime  => 如果不想用babel-polyfill污染全局环境，就是用babel-runtime+babel-plugin-transform-runtime；
7. @babel/plugin-transform-runtime => babel-plugin-transform-runtime依赖于babel-runtime
8. @babel/eslint-parser => babel + eslint 的解析器（好像也没有使用？）
9. 插件名互换：@babel/core === 等同于 babel-core

## .babelrc 配置文件

[如何写好.babelrc](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651553196&idx=2&sn=d9aa131a0f5eb2fc817283c8fd72da1e&chksm=8025aa6db752237bc37551754448691279efeee097949c28b6eb5f26e8c38d5eff653e9adbea&scene=0#rd)

[配置详解](https://www.cnblogs.com/jiebba/p/9613248.html)

presets ： 是**某一类 plugin 的集合**，包含了某一类插件的所有功能。
plugin ： 将某一种需要转化的代码，转为浏览器可以执行代码。

### 编译的执行顺序

1、执行 plugins 中所有的插件
2、plugins 的插件，按照顺序依赖编译
3、所有 plugins 的插件执行完成，在执行 presets 预设。
4、presets 预设，按照倒序的顺序执行。(从最后一个执行)
5、完成编译。

### babel

**The compiler for writing next generation JavaScript。**下一代 JavaScript 语法的编译器。

### 预设(presets)

使用的时候需要**安装对应的插**件，对应 `babel-preset-xxx`，例如下面的配置，需要 `npm install babel-preset-es2015`。

### es2015 与 stage-x

you can use the env preset, which enables transforms for ES2015+

#### es2015

使用 es2015 的，也就是我们常说的 es6 的相关方法，简单翻译如下，更多细节可以参看文档。

#### stage-x(stage-0/1/2/3/4)

stage-x 和上面的 es2015 等有些类似，但是它是按照 JavaScript 的提案阶段区分的，一共有 5 个阶段。而数字越小，阶段越靠后，存在依赖关系。也就是说 stage-0 是包括 stage-1 的，以此类推。

### 插件(plugins)

其实看了上面的应该也明白了，presets，也就是一堆 plugins 的预设，起到方便的作用。如果你不采用 presets，完全可以单独引入某个功能，比如以下的设置就会引入编译箭头函数的功能。

### babel-runtime 与 babel-polyfill 的联系和区别
