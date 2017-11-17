// mockData.js

import Mock from 'mockjs';

let mockData = () => Mock.mock({
	'errno|1': [0,1],
	'errmsg': 'this is error message',
	'total|0-8': 1,
	'data|30-50': [{
		'id|+1': 1,
		'date1': '@date("yyyy-MM-dd")',
		'string1': '@string',
		'cword1': '@cword(3,5)',
		'cword2': '@cword(3,5)'
	}]
});

export default mockData;
