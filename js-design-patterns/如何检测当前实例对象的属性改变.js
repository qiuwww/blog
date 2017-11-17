// 如何检测当前实例对象的属性改变.js

// 属性改变方法与需要触发的事件放在一起

var obj = {
	init() {
		this.params = {}
	},
	changeParams(propsObj, callback) {
		var self = this;
		var params = self.params;
		for(var key in propsObj){
			if(params.hasOwnProperty(key)){
				if (params[key] === propsObj[key]) {
					return;
				}else{
					params[key] = propsObj[key];
					// 属性改变，触发需要触发的事件
					callback();
				}
			}
		}
	}
}