# export-word







### 2017-12-20

1. jszip前端压缩domo；
2. 对比ddoc与officegen两种实现方式的异同，简单的元素的转化输出；
3. 页面结构布局，从html提取内容到word生成模板；





### 需要处理的样式
1. P 基本的文本输出 + 添加样式控制；
2. 页眉页脚设置；
3. 图片添加 + 样式控制；
4. 页面布局设置；
5. table设置；
6. 页面边距控制；
7. 页面分页处理，自动分页，手动强制分页？
8. header，标题设置；
9. 对应div||p||image||span||table之类的标签的对应处理 + 样式的提取与转化；
10. 页码样式的控制；
11. 长度||字体单位转换；
12. 字体||下划线||字体大小||斜体||背景色设置  
13. 目录自动生成？手动生成
14. 是不是因为html的声明不对导致，导出出现很多问题？


word转为html常用的元素：
table
p
span
image



导出

window.API.use('HXPrintPdf', '智能研报');

设置分页样式
STYLE="page-break-before:always"

背景图片和颜色
@media print and (color) {
   * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
   }
}