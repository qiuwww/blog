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
		'frequency': 'quarter',
		'leftBottom|40': [{
			'index|+1': 1,
			'title': '@cword(3,15)',
			'id|10000-100000': 10000,
			'isUserAdd|1': [0, 1] 
		}],
		'rightTop|10': ['@date("yyyy-MM-dd")'],		
		'rightBottom|100': function(){ // 第一层是行
			row = Mock.mock({
				'rightBottomCol|10': ['@cword(3,5)'] // 第二层是列
			})
			return new Array(4).fill(row.rightBottomCol);
		}
	}
});

// 返回指标列表
let returnIndexLis = () => Mock.mock({
	'errno|1': [0],
	'errmsg': 'this is error message',
	'total|0-8': 1,
	'data|1-1000': [{
		'id|10000-90000': 1,
		'text': '@cword(3,15)' 
	}]
});

export {mockData, res, returnIndexLis};



// 这里需要接口如下：
// 1. 搜索、原始值||同比||环比、变频（记住最后一次的请求的参数中的选项）
// 第一次默认加载20条，（page = 1, 替换）； 
// 之后默认加载 20条（page>2, 拼在最后边（区分正序与倒序）， 最大页面计算出来，下拉不加载）；
// 请求page=1的时候，（区分是从0到1，还是从2到1），不同对待


// 2. 新增

// 3. 计算

// 7. 变频

// 4. 置顶操作

// 5. 删除

// 6. 编辑操作

// 8. 保存记录（选中条数，需要数据请求）