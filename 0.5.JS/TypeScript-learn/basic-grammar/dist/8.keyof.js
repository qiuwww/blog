"use strict";
console.log("## section 8 -> keyof");
// 入口索引类型查询或者说 keyof; 索引类型查询 keyof T 会得出 T 可能的属性名称的类型.keyof T 类型被认为是 string 的子类型.
// 枚举类型，页面宽度切换的关键点
var Breakpoint;
(function (Breakpoint) {
    Breakpoint[Breakpoint["xxl"] = 0] = "xxl";
    Breakpoint[Breakpoint["xl"] = 1] = "xl";
    Breakpoint[Breakpoint["lg"] = 2] = "lg";
    Breakpoint[Breakpoint["md"] = 3] = "md";
    Breakpoint[Breakpoint["sm"] = 4] = "sm";
    Breakpoint[Breakpoint["xs"] = 5] = "xs";
})(Breakpoint || (Breakpoint = {}));
var responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};
console.log("responsiveMap: ", responsiveMap);
// 映射类型是获取字面量类型的并集, 再通过计算新对象的属性集合产生的. 
