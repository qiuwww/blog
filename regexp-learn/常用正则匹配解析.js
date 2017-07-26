

// 常用正则匹配解析.js



//  用于获取cookie的值
function getCookie(name){
	var arr,
	reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)){		
		return unescape(arr[2]);
	}else{
		return null;
	}
}