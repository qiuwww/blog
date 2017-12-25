

// fetch() 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 promise 对象，resolve 对应请求的 Response。
// 你也可以传一个可选的第二个参数—— init（参考 Request）。
// 做了兼容性处理，需要配置支持es7的环境
let httpRequest = async (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	// if (type == 'GET') {
		let dataStr = ''; 
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	// }
	if (window.fetch && method == 'fetch' && false) {
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

export { httpRequest };