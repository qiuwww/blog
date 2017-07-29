// string-extensions.js
cg("************string-extensions.js************")
{
/**
 * 模板字符串
 */
// 传统的JavaScript语言，输出模板通常是这样写的。


 // var strOld = 'There are <b>' + basket.count + '</b> ' +
 //  'items in your basket, ' +
 //  '<em>' + basket.onSale +
 //  '</em> are on sale!'

// 上面这种写法相当繁琐不方便，ES6引入了模板字符串解决这个问题。

// 字符串中嵌入变量
var name = "Bob", time = "today";
let str = `Hello ${name}, how are you ${time}?`
cg(str);

}
cg("************string-extensions.js end************")