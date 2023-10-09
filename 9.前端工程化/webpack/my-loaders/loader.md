# less-loader

[github的地址](https://github.com/webpack-contrib/less-loader)

**loader 文件是一个 node 模块， 以 commonJs 的方式导出一个函数**，这个函数接收的参数有三个，content, map, meta，map 和 meta 是可以省略的，其中 content 能拿到 webpack 处理源文件时每个文件对应的代码，它是 string 或者 buffer（buffer 可以转换成 string），我们拿到这个字符串就能对源代码进行修改了，转换成我们需要的样子再返回回去。

总结：webpack loader 其实就是对资源文件的转换，从上一个 laoder 拿到结果，转换后再返回给下一个 loader，所以在配置文件中要注意 loader 的顺序。

## loader的返回值，返回一个 js 文件内容

1. 因为整体还是属于 js 范畴的转换，所以返回的应该是一个符合 commonJS 的 module；
2. 具体返回要参考后续的 loader 的处理；
3. 如果是最后一个 loader，则要看如何嵌入项目中；
   1. 比如，如果要当作 vue 的组件，就返回一个 vue 的文件内容；
   2. 如果只是一个 config，那就返回一个 json；
4. 也就是说这里其实可以返回一个对象，包含很多属性或者组件；

基本的格式如下：

```js
module.exports = function loader(source) {
  const ret = `文件的字符串类型`;
  return `module.exports = ${ret}`;
  // 下边的类型也是可以的
  // return `export default ${ret}`;
};
```

## 对于 md-loader，现在就是处理文件具体内容的问题，对特殊的标记进行转换

1. 需要处理一般的 md 标签；
2. 需要处理 html 的标签；

### source,与 this 对应的内容不同

1. source，就是接受的上个 loader 的内容；
2. this 指向的是当前的 webpack 的运行环境；
3. loader options const options: Options = loaderUtils.getOptions(loaderContext);

### 需要熟悉一下，markdown-it 这个包怎么使用

相当于帮你直接处理了很多内容，当然也可以按照自己的想法来自己进行匹配解析；

就是对一个 js 字符串（符合 md 规范的）进行解析，解析为结构化的 js 对象；

#### markdown-it 常用配置

1. linkify:
2. html:

<!-- https://www.npmjs.com/package/markdown-it -->

```js
// full options list (defaults)
var md = require('markdown-it')({
  html: false, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) {
    return '';
  },
});
```

### 使用 markdown-it-container

将 vue demo code 标记为`<component0></component0>,<component1></component1>`...。

[markdown-it-container](https://www.npmjs.com/package/markdown-it-container)，处理

::: warning _here be dragons_ ::: => `<div class="warning"><em>here be dragons</em></div>`

### markdown-it-anchor，处理锚点

### 拼音转换

用于获取拼音<https://www.npmjs.com/package/transliteration>

```js
const { slugify } = require("transliteration");

const markdownItContent = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  ...options.markdownConfig,
}).use(markdownItAnchor, {
  level: 2,
  slugify,
});
```

结果如下：

```html
<h2>背景知识</h2> => <h2 id="bei-jing-zhi-shi" tabindex="-1">背景知识</h2>
```
