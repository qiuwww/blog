
// 整个语句都开启严格模式的语法
"use strict";
// 总库，需要的复制出来，不至于每次都占用过多内存
export default Utils = {
	isInteger(x) { 
		return (x^0) === x; 
	},
	log(msg) {
		console.log(msg)
	}	
}






 