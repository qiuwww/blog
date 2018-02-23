



此乃历史问题。不难理解，空白字符压缩（white space collapse）是西文排版的必然结果。SGML、TeX都是如此。不过对于不使用空格作为词分界的语言，比如东亚语言来说，就造成了问题。所以其实这是行内（inline）的问题（inline-block也是将其本身作为inline，内部作为block）。

造成「inline-block」元素空隙的本质是 HTML 中存在的空白符（whitespace）。

- 父元素设置 font-size:0，inline-block 的元素 font-size 再单独设置为正常大小；
- 删除 HTML 文件中 inline-block 元素之间的空格和空行。