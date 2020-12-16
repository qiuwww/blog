# scss 使用经验

[官方文档](https://www.sass.hk/guide/)

## CSS, Sass, SCSS 关系

[CSS, Sass, SCSS 关系](https://www.cnblogs.com/wphl-27/p/9765647.html)

1. **Sass(Syntactically Awesome Style Sheets) ,是一种 css 预处理器和一种语言**, 它可以用来定义一套新的语法规则和函数，以加强和提升 CSS。 **它有很多很好的特性，但是它有类似 Ruby 的语法，没有花括号，没有分号，遵循严格的缩进**。
2. 它在书写规则，变量命名方面和 CSS 代码有着很大的区别。于是，后来官方在 2010 年推出了一个**全新的语法，叫做 SCSS**, 意思是 Sassy CSS。 这个语法带来了对 CSS 友好的语法，试图弥合 Sass 和 CSS 之间的差别。
3. Sass （预处理器）有两种不同的语法：
   1. Sass,一种缩进语法；
   2. SCSS,一种 CSS-like 语法。
4. SCSS 是 Sass 改良版, SCSS 使用的人数也比 Sass 多, 所以推荐使用 SCSS , 当然两者都会那更好了。

## 安装测试

```bash
# install
$ yarn global add sass
# 单文件转换命令
$ sass demo.scss demo.css

# 单文件监听命令，功能测试，｜compact
$ sass --watch demo.scss:demo.css --style expanded

# 如果你有很多的sass文件的目录，你也可以告诉sass监听整个目录：
$ sass --watch app/sass:public/stylesheets

# Convert SCSS to Sass
$ sass-convert demo.scss demo.sass
```

使用`$ sass --watch demo.scss:demo.css --style expanded`，进行测试。

## Features/特色功能

- 完全兼容 CSS3
- 在 CSS 基础上增加变量、嵌套 (nesting)、混合 (mixins) 等功能
- 通过函数进行颜色值与属性值的运算
- 提供控制指令 (control directives)等高级功能
- 自定义输出格式
