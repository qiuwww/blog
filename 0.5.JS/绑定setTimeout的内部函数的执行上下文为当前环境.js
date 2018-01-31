// 绑定setTimeout的内部函数的执行上下文为当前环境.js
// 1. bind绑定
var obj = {

	timeID : '',

	doSth: function() {
		clearTimeout(this.timeID);
		this.timeID = setTimeout(function(){
			this.log();
		}.bind(this), 200); // 这里绑定与不绑定决定this是不是能调取得到
	},
	log: function(){
		console.log(123123)
	}
}
obj.doSth();

// 2.或者就是用箭头函数，箭头函数没有上下文，上下为外层对象