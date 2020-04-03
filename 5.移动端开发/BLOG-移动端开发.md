---
title: 移动端开发
date: 2018-8-8
tags:
  - 移动端开发
  - 浏览器
categories:
  - [移动端开发]
  - [浏览器]
---

## h5 与原生 app 的交互，本质上说，就是两种调用

- app 调用 h5 的代码
  因为 app 是宿主，可以直接访问 h5，所以这种调用比较简单，就是在 h5 中曝露一些全局对象（包括方法），然后在原生 app 中调用这些对象。
- h5 调用 app 的代码
  **这种调用常用有两种方式：**
  - 由 app 向 h5 注入一个全局 js 对象，然后在 h5 直接访问这个对象
  - 由 h5 发起一个自定义协议请求，app 拦截这个请求后，再由 app 调用 h5 中的回调函数

## 移动端开发过程中遇到的问题

### 解决页面使用 overflow: scroll 在 iOS 上滑动卡顿的问题

首先你可能会给页面的 html 和 body 增加了 height: 100%, 然后就可能造成 IOS 上页面滑动的卡顿问题。解决方案是：

(1) 看是否能把 body 和 html 的 height: 100%去除掉。
(2) 在滚动的容器中增加：-webkit-overflow-scrolling: touch 或者给 body 增加：body {overflow-x: hidden}。

### IOS 机型 margin 属性无效问题

(1) 设置 html body 的高度为百分比时，margin-bottom 在 safari 里失效
(2) 直接 padding 代替 margin

### IOS 绑定点击事件不执行

添加样式 `cursor ：pointer`。

点击后消除背景闪一下的 css：`-webkit-tap-highlight-color:transparent;`

## JQ 对 a 标签点击事件不生效

出现这种情况的原因不明，有的朋友解释：我们平时都是点击的 A 标签中的文字了。 所以要想用 JS 模拟点击 A 标签事件，就得先往 A 标签中的文字添加能被 JS 捕获的元素，然后再用 JS 模拟点击该元素即可。但是我觉得不合理，虽然找不到原因但是解决办法还是有的。
(1)`document.getElementById("abc ").click();`
(2)`$("#abc ")[0].click();`

### transform 属性影响 position:fixed

规范中有规定：如果元素的 transform 值不为 none，则该元素会生成包含块和层叠上下文。CSS Transforms Module Level 1 不只在手机上，电脑上也一样。除了 fixed 元素会受影响之外，z-index（层叠上下文）值也会受影响。绝对定位元素等和包含块有关的属性都会受到影响。当然如果 transform 元素的 display 值为 inline 时又会有所不同。最简单的解决方法就是 transform 元素内部不能有 absolute、fixed 元素.

### input[number]类型输入非数字字符

js 获取的值是空；比如-12，+123 等

### Javascript：history.go()和 history.back()的用法与区别

简单的说就是：go(-1):返回上一页，原页面表单中的内容会丢失；

back():返回上一页，原页表表单中的内容会保留。history.go(-1):后退+刷新 history.

back():后退

之所以注意到这个区别，是因为不同的浏览器后退行为也是有区别的，而区别就跟 javascript：history.go()和 history.back()的区别类似。

**Chrome 和 ff 浏览器后退页面，会刷新后退的页面，若有数据请求也会提交数据申请。类似于 history.go(-1);**

而 safari（包括桌面版和 ipad 版）的后退按钮则不会刷新页面，也不会提交数据申请。类似于 javascript：history.back();

### 点击元素产生背景或边框怎么去掉

ios 用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置`-webkit-tap-highlight-color` 的 alpha 值为 0 去除灰色半透明遮罩；

android 用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置`-webkit-tap-highlight-color` 的 alpha 值为 0 去除部分机器自带的效果；

winphone 系统,点击标签产生的灰色半透明背景，能通过设置`<meta name="msapplication-tap-highlight" content="no">`去掉；

特殊说明：有些机型去除不了，如小米 2。对于按钮类还有个办法，不使用 a 或者 input 标签，直接用 div 标签

```css
a,
button,
input,
textarea {
  /* -webkit-user-modify有个副作用，就是输入法不再能够输入多个字符 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-user-modify: read-write-plaintext-only;
}
```

也可以

```css
 {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
```

winphone 下

`<meta name="msapplication-tap-highlight" content="no">`

## 移动端调试工具，也就是页面显示控制台

使用 [vconsole](https://www.npmjs.com/package/vconsole)。

## 移动端兼容性问题

### ios

#### 事件点击不触发的问题

desc: span，div 等元素绑定事件 ios 上不会触发，解决办法

ans: 添加 css，`cursor: pointer;`

#### input 内框的内阴影

ans:

```css
input[type='text'] {
  -webkit-appearance: none;
}
```

#### ios 的输入框的时候会放大当前的输入框的问题

ans:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

#### ios 浏览器 不支持 es6，ios 的兼容问题主要集中在 js 语法的不兼容

desc: 开发过程中使用 chrome，chrome 可能直接就可以支持部分 ES6 的语法，但是放到 ios 的浏览器或者 webview 中就不可以了，会出现报错等问题。

ans:

- 检查语法：
  - 注意开发过程中的 let const 声明之类；
  - 注意处理函数的默认参数的声明。
  - 模板字符串：``。
  - 对象的简写形式： {key}
  - 箭头函数 =>
- 使用编译工具，这个对于较大的 h5 适用，相对来说比较麻烦，使用 gulp 或者 webpack 处理

#### ios 中的 button，如果内部需要嵌入文字或者图文组合，无法调整样式

ans：需要对内部的文字或者图文组合套一层包裹，不然就没法调整样式

```html
<button><span>button</span></button>
<button>
  <div>
    <img src="" alt="" />
    <span>button</span>
  </div>
</button>
```

#### 不要设置小于 12 像素的字体在 pc 上

不然在电脑开发的时候显示 12px（设置 9px），但是在手机上确实可以显示很小的字体

也就是说电脑上是不可以显示 9px 的，但是在移动端是可以的。**切记切记**

#### 日期问题

desc： 对于 yyyy-mm-dd hh:mm:ss 这种格式在 ios 系统不识别，时间格式化的时候，在浏览器端处理好好的，到了手机端，就变成 NAN，或者 null，这种情况，是 ios 系统不能转化这种类型的时间。`let date = new Date('2019-02-28 18:33:24'); // null`

ans：解决方案是，转成 yyyy/mm/dd hh:mm:ss 这种格式就可以了`replace(/\-/g, "/")`。

#### 键盘收起，页面卡住，不回落

desc：ios12 上，发现键盘收起的时候，页面会卡主，留下底部一片空白，稍微动一下页面，就会恢复。

ans： 让页面滚动一下，`window.scrollTo(0, scroll);`，在**ontouchstart**事件中触发。 ontouchstart 事件优于 click 事件触发。

#### 键盘遮挡输入框

desc：输入框如果使用了 fixed 固定在底部，键盘顶起的时候，iphone 上 fixed 会失效，导致页面滚动输入框会随着页面滚动，并且在部分机型上，输入框偶尔会被键盘遮挡，这种偶现的问题，很不友好

ans：放弃使用 fixed 布局，页面如果有滚动，也放弃 absolute，如果强行要使用 absolute，请参考上一条光标偏移。

建议使用 flex 布局，兼容性会得到解决。

当然，如果遇到以上这些问题，**说明产品设计就很不合理，如果必要的话，还是要更换设计**，改成 input 不需要被键盘顶起的设计，这些兼容性的解决方案，也不并不能完美的解决所有机型的问题。
