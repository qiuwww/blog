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