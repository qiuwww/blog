
fetch(`http://i.baidu.com/calendars/calendars/listInfo`)
	.then((res) => res.text()) // 声明返回的数据的格式，返回的格式可以是下边注释
	.then((res) => {console.log(res)}) // 具体的调用


// text() - 以string的形式生成请求text
// json() - 生成JSON.parse(responseText)的结果
// blob() - 生成一个Blob
// arrayBuffer() - 生成一个ArrayBuffer
// formData() - 生成格式化的数据，可用于其他的请求

// 就这个格式
fetch(`http://i.baidu.com/calendars/calendars/listInfo`)
	.then((res) => res.json()) // 声明返回的数据的格式，返回的格式可以是下边注释
	.then((res) => {console.log(res)}) // 具体的调用
	.catch(function(e) { // 错误处理
	    console.log("Oops, error");
  	});


// 写一个较好的封装




// fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。
// 你也可以传一个可选的第二个参数—— init（参考 Request）。
// 做了兼容性处理，需要配置支持es7的环境
let dataRequest = async (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	// if (type == 'GET') {
		// 不管怎么样都要拼接，不通过url，特殊字符就不会被解析
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	// }
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "default"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				// 麻痹的，这里的数据不是一个json字符串，而是一个key=value&型字符串				
				// value: JSON.stringify(data)
				value: dataStr
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json(); // 这里可以修改fetch的返回类型
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}        

let response = dataRequest(`http://i.baidu.com/calendars/calendars/listInfo`);

response.then(res => { // 已略过了 response => response.json() 这一步
	console.log(res)
});