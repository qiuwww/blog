

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

table-cell
定高水平垂直居中
不定高水平垂直居中
单行定高水平垂直居中
单行不定高水平垂直居中
多行定高水平垂直居中
多行不定高水平垂直居中
多列等高布局
左边定宽右边自适应布局
左边右边定宽中间自适应三列布局





## table的一些特性与表现形式

虽然table布局因为它的一些**非语义化、布局代码冗余，以及不好维护改版等缺点被赶出了布局界**。但是在css不给力时期，table布局也曾风靡一时，就算现在看来table的一些布局的特性也是非常给力的，而幸好css也吸取了table布局一些好的特性为己用。让我们可以使用更少、更语义化的标签来模拟table布局，可以跳过table布局的缺点又实现我们想要的效果，所以我们首先需要了解table的一些特性以及对应的css属性。

我们在不居中使用到的也就是table、tr、td的一些特性，所以我们只需要了解这三个标签的特性就足够了。

### table标签（display:table）

1) table可设置宽高、margin、border、padding等属性。属性值的单位可以使用px，百分比值。
2) **table的宽度默认由内容的宽高撑开，如果table设置了宽度，宽度默认被它里面的td平均分，如果给某一个td设置宽度，那么table剩余的宽度会被其他的td平均分（有点类似flex布局）。**
3) **给table设置的高度起到的作用只是min-height的作用，当内容的高度高于设置的高度时，table的高度会被撑高。**

### tr标签（display:table-row）

1) **给tr设置高度只起到min-height的作用，默认会平分table的高度**。
2) **tr中的td默认高度会继承tr的高度，若给任一td设置了高度，其他td的高度也同样变高。适合多列等高布局。**
3) 设置宽度、margin、都不起作用。

### td标签（display:table-cell）

1) **td默认继承table的高度，且平分table的宽度。**
2) **若table（display:table）不存在，给td设置的宽高不能用百分比只能用准确的数值（table滚添加滚动效果的时候，需要设置每列的宽高）。**
3) **给td设置vertical-align: middle; td元素里面(除float、position:absolute)所有的块级、非块级元素都会相对于td垂直居中。**
4) **给td设置text-align: center; td元素里面所有非block元素(除float、position:absolute)都会相对于td水平居中，虽然block元素不居中，但其中的文字或inline元素会水平居中。**





### 布局实例->table-layout-demo.html

### 设置了display:table-cell的元素具有以下特性。

1. text-align、vertical-align等对齐属性起作用，margin不起作用。宽高百分比值不起作用。
2. **会生成虚拟的table、tr把自己包裹住，如果有相邻的兄弟元素也被设置了table-cell,则会跟兄弟元素一起生成虚拟的table、tr把自己包裹住，并一行等高显示。**
3. **多个table-cell元素会占满被设置了display: table的元素的宽度，如果一个元素被设置了宽度，那么其他剩余的table-cell元素会占满剩下的宽度。**当然，如果只有一个table-cell元素，就算设置了宽度也会占满table元素的宽度。

对设置了float、absolute的元素不起作用。且IE6、7不支持
这就是所谓的table布局大法。

