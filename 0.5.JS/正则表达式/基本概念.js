// 基本概念.js

/**
 * 1. RegExp对象
 */

//使用字面量或者RegExp对象

var str = 'he is a boy.this is a dog';
var reg = /\bis\b/;// 只是匹配到第一个
console.log(str.replace(reg, 'ISSSS'));
//添加g,全文匹配;
var str = 'he is a boy.this is a dog';
var reg = /\bis\b/;
console.log(str.replace(reg, 'ISSSS'));
VM53:3 he ISSSS a boy.this is a dog

var str = 'he is a boy.this is a dog';
var reg = /\bis\b/g;// 只是匹配到第一个
console.log(str.replace(reg, 'ISSSS'));
VM55:3 he ISSSS a boy.this ISSSS a dog

构造函数: 
var regNew = new RegExp('\\bis\\b', 'ig');
console.log(str.replace(regNew, 'ISSSS'));

修饰符:
g:全文搜索,搜索所有;
i:ignore case,忽略大小写;
m:多行搜索的标志m;

/**
 * 2. 元字符
 */
特殊意义的非字母字符;
. * + ? | \ () {} []

/**
 * 类 []
 */
1. 使用[]来构造类;
2. 使用^构造一个反向类;取非;中括号内这个意思,还表示开头
3. 范围类:[a-z] ; '2016-09-12'.replace(/[0-9-]/g,'x'); 这里集合内的第二个'-'  就可以匹配到 '-'
4. 预定义类及边界: ab[0-9][^\r\n] 等价于 ab\d.
   \b: 单词边界;\B:  非边界;
'this is a boy'.replace('/\bis\b/g', '0');
"this is a boy"
'this is a boy'.replace('/\Bis\b/g', '0');
"this is a boy"
5. 多行匹配:
`abc@xyz
abc@xyz
abc@xyz`.replace(/^.{3}@/gm, "$");
"$xyz
$xyz
$xyz"

/**
 * 量词 {}
 */

 {m, n} :  匹配m到n次;
 ? + *
{n}
{n,}
{,n}

/**
 * 贪婪模式||非贪婪模式
 */
默认是尽可能多的匹配;
在两次后边加上问号开启非贪婪模式;
'123456789'.replace(/\d{2,5}?/g, 'Q');// 这个时候会尽量匹配2次的;
"QQQQ9"


/**
 * 分组 ()
 */
	
使用小括号来表示;
或: 使用'|'来表示; (on|ca)

/**
 * 反向引用
 */

'2015-12-25'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1/$2/$3');
"2015/12/25"

是希望捕获分组,添加 ?: ;

/**
 * 前瞻与后顾,断言
 */
\w(?=\d)正向前瞻表示找到一个Word然后看下后面一个字符是不是数字，是数字的话这个Word匹配的
\w(?!\d)负向前瞻表示找到一个Word然后看下后面一个字符是不是数字，不是数字的话这个Word匹配的

例如：(/\w(?=\d)/) 表示单词/字符后面是数字，(/\w(?!\d)/) 表示单词/字符后面不是数字，后面断言部分只是用来判断，不会被匹配！！！
