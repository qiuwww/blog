// extend.js



//  这样似乎只能扩展已有的属性, 
//  只是支持单个对象，如果是多个对象需要使用arguments对象来处理多的参数
function extend(obj, extension){
	if(typeof extension === 'object'){
		for( var key in obj){
			extension[key] = obj[key];
		}
	}
	return obj;
}

// 默认第一个传递被扩展的对象，最终返回一个新的对象
function extendDeep(obj){
	var res = {};
	var argsArr = Array.prototype.slice.apply(arguments);	
	var current;
	for( var len = argsArr.length, i = 0; i < len; i++ ){
		current = argsArr[i];
		if(typeof current == 'object'){
			for( var key in current){
				res[key] = current[key];
			}
		}
	}
	return res;
}

extendDeep({a:1,b:2}, {b:3, c:4}, {d:10, e:20});

// ok
