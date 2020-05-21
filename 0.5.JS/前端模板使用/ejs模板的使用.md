# ejs 模板的使用

nodejs 的模板引擎有很多， ejs 是比较简单和容易上手的。

常用的一些语法:
用<%...%>包含 js 代码
用<%=...%>输出变量 变量若包含 '<' '>' '&'等字符 会被转义
用<%-...%>输出变量 不转义
用<%- include('user/show') %>引入其他模板 包含 ./user/show.ejs
用<%# some comments %>来注释，不执行不输出
<%% 转义为 '<%'
<% ... -%> 删除新的空白行模式?
`<%_ ... _%>` 删除空白符模式

本质上就是 html 里边插入 js

## 数据编译与更新

```js
// RENDER
// /_第一次渲染的时候调用该方法,返回值是被数据填充的模版_/
html = new EJS({ url: '/template.ejs' }).render(data);

// UPDATE
// /_当数据有更新的时候，调用 update 方法_/
new EJS({ url: '/template.ejs' }).update(document.body, data2);
```

为了最大提高模版的性能，默认是开启了缓存的。

## 模版嵌套

模版可以嵌套：示例如下：

```html
<h2>This is from the containing template</h2>
<div class="template">
  <%= this.partial({url: 'templates/partial.ejs'}) %>
</div>
```

该模版中包含一个子模版 partial.ejs。这样对结构重用有很大的益处。
