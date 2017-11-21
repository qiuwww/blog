// mockData.js

import Mock from 'mockjs';
window.Mock = Mock;
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

var row;
let res = () => Mock.mock({
	'errno|1': [0],
	'errmsg': 'this is error message',
	'total|0-8': 1,
	'data': {
		'leftBottom|100': [{
			'index|+1': 1,
			'title': '@cword(3,5)',
			'id|10000-100000': 10000
		}],
		'rightTop|100': ['@date("yyyy-MM-dd")'],		
		'rightBottom|100': function(){ // 第一层是行
			row = Mock.mock({
				'rightBottomCol|100': ['@cword(3,5)'] // 第二层是列
			})
			return new Array(100).fill(row.rightBottomCol);
		}
	}
});
export {mockData, res};
