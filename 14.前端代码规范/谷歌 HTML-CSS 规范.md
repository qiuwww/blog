## html与css谷歌推荐的规范

### 协议
省略图片、样式、脚本以及其他媒体文件 URL 的协议部分（http:,https:），除非文件在两种协议下都不可用。这种方案称为 protocol-relative URL，好处是无论你是使用 HTTPS 还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，同时可以节省一部分字节。
```
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

### 大小写
HTML 元素名称，属性，属性值（除非 text/CDATA），CSS 选择器，属性，属性值。

