

# table布局
**HTML Table是指使用原生的<table>标签，而CSS Table是指用CSS属性模仿HTML 表格的模型。**

table：指定对象作为块元素级的表格。类同于html标签<table>（CSS2）
inline-table：指定对象作为内联元素级的表格。类同于html标签<table>（CSS2）
table-caption：指定对象作为表格标题。类同于html标签<caption>（CSS2）
table-cell：指定对象作为表格单元格。类同于html标签<td>（CSS2）
table-row：指定对象作为表格行。类同于html标签<tr>（CSS2）
table-row-group：指定对象作为表格行组。类同于html标签<tbody>（CSS2）
table-column：指定对象作为表格列。类同于html标签<col>（CSS2）
table-column-group：指定对象作为表格列组显示。类同于html标签<colgroup>（CSS2）
table-header-group：指定对象作为表格标题组。类同于html标签<thead>（CSS2）
table-footer-group：指定对象作为表格脚注组。类同于html标签<tfoot>（CSS2）

`
适当地调整CSS属性，CSS的Table能做到许多HTML Table 不能做的事情，可以从Table中择优选择属性使用。
`


## 经分析需要处理一列的宽度，只有table布局才有列的概念，故采用display:table | table-row | table-cell来布局。

CSS属性table-layout定义了表格单元格、行和列的布局算法。默认值为auto，表格及其单元格的宽度由其内部的内容决定。而值为fixed时，表格的宽度取决于tabe元素的宽度值，列宽由对应col元素的宽度决定，或者由首行单元格的宽度决定，后续行内单元格不会影响列宽。使用fixed布局方法时，一旦表格的首行下载和解析完成，整个表格即可被渲染。相对于自动布局方法，这种方法可加速表格渲染，但可能会造成后续单元格的内容与列宽不适合。如果单元格的内容溢出，使用overflow属性来决定是否截断溢出内容。