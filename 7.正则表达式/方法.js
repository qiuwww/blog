
看一下博客园当初写的东西;

/**
 * 正则方法：test
 */

正则对象的方法;

注意lastIndex属性; 不要添加g标志;
g标志下, lastIndex才有用;
/**
 * 正则方法：exec
 */
区分全局和非全局调用;

var reg3 = /\d(\w)(\w)\d/;
var reg4 = /\d(\w)(\w)\d/g;
var str = "$1az2bb3cy4dd5ee";

var ret = reg3.exec(str);
reg3.lastIndex;//0 不是全局搜索，没有lastIndex为0
ret[0]; //"1az2"
ret[1]; //"a"
ret[2]; //"z"
ret.index;//1
ret.input;//"$1az2bb3cy4dd5ee"

while (ret = reg4.exec(str)) {
	console.log(reg4.lastIndex + "\t" + ret.index + "\t" + ret.toString())
}

/**
 * 字符串的search方法
 */

/**
 * 字符串的match方法
 */
与exec对调, 返回结果一样; 功能相对弱;

/**
 * 字符串的split方法，还可以传入正则
 */
`a1b2c3d4e5f6g7`.split(/\d/g);
["a", "b", "c", "d", "e", "f", "g", ""]

/**
 * 字符串的replace方法
 */




