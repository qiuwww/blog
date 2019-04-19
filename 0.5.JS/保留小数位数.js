// 保留小数位数.js
var num = new Number(13.37);
// NumberObject.toFixed(num)
num.toFixed(1); // 得到一个字符串，number需要时引用类型
// parseFloat(string)
parseFloat(num + ""); // 保留两位小数
