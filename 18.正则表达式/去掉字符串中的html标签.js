去掉字符串中的html标签.js


获取标签的内容
1. 使用jquery来获取这个标签的jquery对象，使用text获取内容;
	$(html).text();
2. 替换掉这个标签;
	html.replace(/<[^>]+>/g,"");
3. 使用exec来匹配字符串：/^(?:\<\s*([a-z]+)\s*[^>]*\/?\>)(.*)(?:\<\/\1\>)/ig;

var html = '<span class="grid-r f-aid pos-time answer-time f-pening">发布于2014-10-06 15:23</span>';
// \1 : 前面的第一个子表达式；
// (?:x) : 匹配 x 不会捕获匹配项。这被称为非捕获括号（non-capturing parentheses）。
var reg = /^(?:\<\s*([a-z]+)\s*[^>]*\/?\>)(.*)(?:\<\/\1\>)/ig;
// 一个在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）。
var res = reg.exec(html);
// ["<span class="grid-r f-aid pos-time answer-time f-pening">发布于2014-10-06 15:23</span>", 
// "span", 
// "发布于2014-10-06 15:23", 
// index: 0, 
// input: "<span class="grid-r f-aid pos-time answer-time f-pening">发布于2014-10-06 15:23</span>"
// ]
// 一个在字符串中执行查找匹配的String方法，它返回一个数组或者在未匹配到时返回null。
var res2 = html.match(reg);
// ["<span class="grid-r f-aid pos-time answer-time f-pening">发布于2014-10-06 15:23</span>"]

var reg3 = /(?:\>)(.*)(?:\<)/ig;
var res3 = html.match(reg3);

var res4 = reg3.exec(html);