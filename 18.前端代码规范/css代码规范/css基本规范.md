
# css基本规范.css
## 语法：

1. 四空格缩进；
2. 组合选择器，独占一行；
.sel1,
.sel2{
	padding: 0;
}
3. 每条声明独占一行；
4. 不为值为0的属性指明单位；
5. 类似使用#fff来替代#ffffff；
6. 每条声明语句之后应该插入一个空格。
7. 为选择器中的属性添加双引号，例如，input[type="text"]。只有在某些情况下是可选的，但是，为了代码的一致性，建议都加上双引号。

## class命名：

1. 小写，尽量使用中划线连接，如sign-in；
2. 避免过度简写，但要明确；
3. 行为class，js需要操作的class尽量添加js-前缀，如js-sign-btn；
4. 模块class样式可以添加-module，如confirm-module；

## 声明顺序：

1. position 位置；
2. Box model 盒模型；
3. typographic 排版；
4. visual 外观；

## 文件命名：
1. 小写，中划线；
2. 声明分类，如style-min.css；

## 分类的命名方法：使用单个字母+"-"为前缀

布局（grid）（.g-）；
模块（module）（.m-）；
元件（unit）（.u-）；
功能（function）（.f-）；
皮肤（skin）（.s-）；
状态（state，zhuangtai）（.z-）。

## 不要使用 @import，相比于link标签会慢很多

## Less 和 Sass 中的嵌套
1. 尽量不要嵌套；择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 3 。
2. 为了提高可读性，在圆括号中的数学计算表达式的数值、变量和操作符之间均添加一个空格。