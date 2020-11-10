---
title: Vue微信公众号H5项目中使用微信开放标签wx-open-launch-weapp跳转
date: 2020-11-5
tags:
  - 微信小程序
  - 微信开放标签
  - Vue
categories:
  - [经验总结, 微信开放标签]
---

## 使用微信开放标签跳转小程序配置

先认真查看[官网文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html)三遍。

> 微信版本要求为：7.0.12 及以上。 系统版本要求为：iOS 10.3 及以上、Android 5.0 及以上。所以在使用的过程中要给出限制之下的版本进行提示。

主要的步骤如下：

1. 绑定域名；
   1. **JS 接口安全域名**，设置：公众号设置 -> 功能设置 -> JS 接口安全域名；
      1. > 这里的域名须通过 ICP 备案的验证，还要确保可以被访问到，所以就决定了，本地没发调试，必须每次发布到线上；
      2. > 这里会影响到微信的一些功能的使用，比如分享、拍照、获取用户信息等；
2. 通过 config 接口注入权限验证配置并申请所需开放标签
   1. 在需要调用 JS 接口的页面引入如下 JS 文件：<http://res.wx.qq.com/open/js/jweixin-1.6.0.js>（支持 https）；
   2. 通过 `wx.config({})`，来配置微信 sdk 的基础信息，并通过**openTagList**来申请开放标签的权限；

```ts
const openTagList = ['wx-open-launch-app'];

wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
  appId: '', // 必填，公众号的唯一标识，在公众号页面内获取
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [], // 必填，需要使用的JS接口列表
  openTagList: openTagList // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
});

// 在vue项目中忽略自定义元素标签抛出的报错
Vue.config.ignoredElements = openTagList;
```

## 在页面中使用

对于 Vue 等视图框架，为了避免 template 标签冲突的问题，可使用`<script type="text/wxtag-template"><script>`进行代替，来包裹插槽模版和样式，官方示例如下：

```html
<wx-open-launch-weapp
  id="launch-btn"
  username="gh_xxxxxxxx"
  path="pages/home/index.html?user=123&action=abc"
>
  <script type="text/wxtag-template">
    <style>
      .btn {
        padding: 12px;
      }
    </style>
    <button class="btn">打开小程序</button>
  </script>
</wx-open-launch-weapp>

<script>
  var btn = document.getElementById('launch-btn');
  btn.addEventListener('launch', function (e) {
    console.log('success');
  });
  btn.addEventListener('error', function (e) {
    console.log('fail', e.detail);
  });
</script>
```

这里唯一需要确认的就是 **username 参数**，这个是小程序的原始码，gh\_开头的，不传 path 情况下，默认进入到小程序的首页。

### 直接将跳转目标元素写在开放标签内的问题

1. 内外样式是**隔离的**，不能将外部的样式直接用在开放标签内部，只能写在内部的 style 标签内或者使用内联样式；
2. 这里在开发环境标签是**不显示**的，这里有一个问题就是每次调整开放标签内的样式，都需要发到线上进行调试，**调试样式非常的麻烦**，逐个调试不太现实。

## 解决方法

封装一个组件，在组件内对**需要渲染的内容**和**开放标签点击事件**进行**分层**，这样与一般的开发页面就没什么差别了，只需要在发布测试的时候来测试跳转功能。

具体的组件如下：

```html
<template>
  <div class="wx-open-launch-weapp-block">
    <div class="slot-wrap">
      <slot></slot>
    </div>
    <div class="open-tag-wrap">
      <wx-open-launch-weapp
        class="launch-btn"
        :username="tagUsername"
        :path="tagPath"
        @error="handleErrorFn"
        @launch="handleLaunchFn"
      >
        <script type="text/wxtag-template">
          <!-- 这里是为了撑开元素，让其可以被点击，不添加template会报错，添加了template不添加内容也会报错 -->
          <div style="padding: 10000px">
          </div>
        </script>
      </wx-open-launch-weapp>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class WxOpenLaunchWeappBlock extends Vue {
    @Prop(String) tagPath!: string;

    @Prop(String) tagUsername!: string;

    // 监听launch 函数，用户点击跳转按钮并对确认弹窗进行操作后触发
    handleLaunchFn(e) {
      console.log('handleLaunchFn:', e);
    }

    // 用户点击跳转按钮后出现错误
    handleErrorFn(e) {
      console.log('handleErrorFn:', e);
    }
  }
</script>

<style scoped lang="less">
  .wx-open-launch-weapp-block {
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    .slot-wrap {
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    .open-tag-wrap {
      position: absolute;
      z-index: 10;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: transparent;
    }
    .launch-btn {
      width: 100%;
      height: 100%;
      display: block;
      overflow: hidden;
    }
  }
</style>
```

在页面中使用：

```html
<WxOpenLaunchWeappWrap :tag-username="item.sourceCode" :tag-path="`${item.url}.html`">
  <div class="menu item">
    <img :src="imgSrc" />
    <span class="text">候诊间</span>
  </div>
</WxOpenLaunchWeappWrap>
```

这样，不管需要添加什么样式的标签作为小程序的跳转标签，直接嵌套进组件内就可以了。同样可以拓展到开放标签`<wx-open-launch-app>`。
