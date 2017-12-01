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
let resData = () => Mock.mock({
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
		'rightTop|100': ['@date("yyyy-MM-dd")'],		
		'rightBottom|40': function() {
			return new Array(40).fill('').map(() => {
				return new Array(100).fill('').map(() => {
					return Mock.mock('@float(1, 10000, 1, 3)');
				});
			});
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



let mockData = (row, col) => { // 这里使用函数来生成，当然可以使用ajax来
	return Mock.mock({ // 这里模拟一个可配置的二维数组
		data: function() {
			return new Array(row).fill('').map(() => {
				return new Array(col).fill('').map(() => {
					return Mock.mock('@float(1, 10000, 1, 3)');
				});
			});
		}
	});
}

// mockData(10, 20);



export {mockData, resData, returnIndexLis};



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




// {
// 	'errno': 0|1,
// 	'errmsg': 'this is error message',
// 	'total': 10000,
// 	'data': {
// 		'frequency': 'quarter', // 频率参数
// 		'leftBottom': [{ // 数组套对象
// 			'index': 1,
// 			'title': 'dfds',
// 			'id': 10000,
// 			'isUserAdd|1': 0|1 // 是否用户添加
// 		},{
// 			'index': 2,
// 			'title': 'sdf',
// 			'id': 10000,
// 			'isUserAdd|1': 0|1 // 是否用户添加
// 		},......],
// 		'rightTop': ['2017-10-10', '2017-10-11', ......], // 以为数组	
// 		'rightBottom': [ // 二维数组
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 			[2121212, 232232323, ......],
// 		],
// 		radios: ['ysz', 'tb', 'hb'], // 当前的选中显示
// 		trs: [0, 1, 2, .....], // 当前选中的行索引
// 	}
// }

// // 请求参数：
// {
// 	page: 1,
// 	pagesize: 20,
// 	searchValue: '输入框的值',
// 	radios: ['ysz', 'tb'], // 当前选中的
// 	frequency: 'year|day|month|quarter', // 频率参数，开始的时候为空
// 	title: '整个这一块的title', // 同一个表格每次的title不变
// 	dataCompare: 'tq|ls' // 同期还是历史，每个表格我会请求两次接口，分别是tq和ls
// }




