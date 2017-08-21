获取请求url中的字段.js

1. 使用函数封装，主要使用字符串剪切(substring),以及分隔(split),来实现,新建一个对象保存键值对，并返回；

2. 使用函数封装，正则匹配得到对应的键值对：

// 最好在一个页面内只调用一次，得到一个对象，然后取对象的值
function getParam (){
	var query = location.search.substring(1);
	var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
	var obj = {};
	while(reg.exec(query)){
		if(RegExp.$2 == "%"){
			obj[RegExp.$1] = "%"
		}
		obj[RegExp.$1] = RegExp.$2;
	}
	return obj;
}
var obj = getParam();
console.log("obj : ", obj);


3. 使用高版本chrome的对象URLSearchParams()得到这个对象；
https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams