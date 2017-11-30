
// 返回数据格式
{
	errno: 0|1,
	errmsg: 'this is error message',
	total: 10000, // 数值型
	data: {
		frequency: 'quarter', // 频率参数
		leftBottom: [{ // 数组套对象
			'index': 1,
			'title': 'dfds对方水电费',
			'id': 10000,
			'isUserAdd|1': 0|1 // 是否用户添加
		},{
			'index': 2,
			'title': 'sdf是的范德萨发',
			'id': 10000,
			'isUserAdd|1': 0|1 // 是否用户添加
		},
		......
		],
		rightTop: ['2017-10-10', '2017-10-11', ......], // 以为数组	
		rightBottom: [ // 二维数组
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			[2121212, 232232323, ......],
			......
		],
		radios: ['ysz', 'tb', 'hb'], // 当前的选中显示
		trs: [0, 1, 2, .....], // 当前选中的行索引
	}
}

// 请求参数：
{
	page: 1,
	pagesize: 20,
	searchValue: '输入框的值',
	radios: ['ysz', 'tb'], // 当前选中的
	frequency: 'year|day|month|quarter', // 频率参数，开始的时候为空
	title: '整个这一块的title', // 同一个表格每次的title不变
	dataCompare: 'tq|ls' // 同期还是历史，每个表格我会请求两次接口，分别是tq和ls
}
