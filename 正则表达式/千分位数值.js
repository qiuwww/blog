// 千分位数值.js



var numArr = [
	12332522,
	15245.5262412,
	-45625.2352
]

12332522.toString().split(/\d{3}/);

function format (num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
 
var num = 12345;// 12,345.00
alert(format(num));

/*与 regexp 相匹配的子串。表示与之相匹配的子字符串*/

function comdify(n){
　　var re=/\d{1,3}(?=(\d{3})+$)/g;
　　var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
　　return n1;
}
comdify(1212133345.78);
