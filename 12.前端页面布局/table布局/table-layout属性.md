        table-layout属性
        table-layout: auto | fixed | initial | inherit;
        使用table-layout属性指定表格的显示方式，设置表格的列幅是自动布局（auto）、是固定布局(fixed)。两种情况下行的 纵高会自动计算出。
        当指定了table-layout:auto;时，浏览器会把整个表格全部读入后，根据单元格内容开始计算各列的宽度；当指定了table-layout:fixed;时，最初的一行决定各列的宽幅，这样能够提高显示速度。

        取值

        auto	自动布局表格的列宽	
        fixed	表格的列宽固定	
        initial	保持原有属性的值	
        inherit	继承母元素的设定。


