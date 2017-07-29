// extensions-of-regular-expressions.js
cg("########extensions-of-regular-expressions.js########");
{
/**
 * 如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
 * 而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
 * @type {RegExp}
 */
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
// ES6
cg("flags",new RegExp(/abc/ig, 'i').flags)
// "i"
/**
 * 字符串的正则方法
 * 字符串对象共有4个方法，
 * 可以使用正则表达式：match()、replace()、search()和split()。
 * ES6将这4个方法，在语言内部全部调用RegExp的实例方法，
 * 从而做到所有与正则相关的方法，全都定义在RegExp对象上。
 */
/**
 * u  修饰符
 * ES6对正则表达式添加了u修饰符，含义为“Unicode模式”，
 * 用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。
 */
/**
 * 字符串必须转义，才能作为正则模式。
 */

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

let str = '/path/to/resource.html?search=query';
cg(escapeRegExp(str))
// "\/path\/to\/resource\.html\?search=query"



}
cg("########extensions-of-regular-expressions.js end########");