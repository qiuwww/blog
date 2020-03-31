# sass/less/stylus 的对比.md

[CSS 预处理器的对比](https://cloud.tencent.com/developer/article/1092653)

## 各自的特点

### stylus

- stylus 声明变量没有任何限定，变量名和变量值之间的等号=是需要的。
- stylus 的语法花样多一些；
- 混合

```styl
/* Stylus 定义了一个名叫error的mixin，这个error设置了一个参数“$borderWidth”,在没特别定义外，这个参数的值是默认值2px */
error(borderWidth= 2px) {
  border: borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  error(); /* 调用error mixins */
}
```

- 颜色函数

```styl
lighten(color, 10%); /* 返回的颜色在'color'基础上变亮10% */
darken(color, 10%);  /* 返回的颜色在'color'基础上变暗10% */
saturate(color, 10%);   /* 返回的颜色在'color'基础上饱和度增加10% */
desaturate(color, 10%); /* 返回的颜色在'color'基础上饱和度降低10% */
```

### sass

- sass 声明变量必须是\$开头，后面紧跟变量名和变量值，`$mainColor: #0982c1;`
- 混合

```scss
/* Sass定义了一个名叫error的mixin，这个error设置了一个参数“$borderWidth”,在没特别定义外，这个参数的值是默认值2px*/
@mixin error($borderWidth: 2px) {
  border: $borderWidth solid #f00;
  color: #f00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  @include error(); /* 调用error mixins */
}
```

### less

- less 声明变量和 sass 声明变量一样，唯一区别是变量名前面使用是的@字符。
- 混合

```less
/* LESS 定义了一个名叫error的mixin，这个error设置了一个参数“$borderWidth”,在没特别定义外，这个参数的值是默认值2px */
.error(@borderWidth: 2px) {
  border: @borderWidth solid #f00;
  color: #f00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  .error(); /* 调用error mixins */
}
```

## 小结

### 主要相关知识点

- 变量(Variables)
- 嵌套（Nesting），三个 CSS 预处器都具有相同的语法。
- 混合（Mixins）
- 继承（Inheritance）,@extend，选择器形式。
- 导入（import）
  @import 规则和 CSS 的有所不同，它只是在语义上导入不同的文件，但最终结果是生成一个 CSS 文件。
- 颜色函数
- 运算符（Operations）

### less 与 sass 的比较

１、LESS 环境较 Sass 简单
２、有同学说 LESS 使用较 Sass 简单
３、相对而言，国内前端团队使用 LESS 的同学会略多于 Sass
４、**从功能出发，Sass 较 LESS 略强大一些**
５、Sass 在市面上有一些成熟的框架，比如说 Compass，而且有很多框架也在使用 Sass，比如说 Foundation
６、就国外讨论的热度来说，Sass 绝对优于 LESS
７、就学习教程来说，Sass 的教程要优于 LESS。在国内 LESS 集中的教程是 LESS 中文官网，而 Sass 的中文教程，慢慢在国内也较为普遍。
8、个人还是倾向于 Stylus，如果你以前使用了 Less 或 Sass 会很快的迁移到 Stylus 上来,教程比较少，推荐一个：[stylus 文档](http://www.zhangxinxu.com/jq/stylus/)
9、Bootstrap4.0 已结弃用了 less 改用 Sass 了。
最后，你自己使用哪一种，不应该根据国内对哪一种使用的人多来做出发参考，而是哪种更适合自己的团队。
