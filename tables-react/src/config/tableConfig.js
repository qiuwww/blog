// tableConfig.js

const tableConfig = {
	// 显示的范围以及默认大小的配置
	// 这里至少需要配置18行9列
	tableRange: {
		rowStart: 0,
		rowEnd: 18, // 展示的默认行数，最大行数
		colStart: 0,
		colEnd: 20 // 默认的列数，最大列数
	},
	cellWH: {
		W: 85,
		H: 24
	},
	multiple: 3,
	frequencyConfig: [{
		text: '日',
		key: 'day',
		value: 1
	},{
		text: '月',
		key: 'month',
		value: 2
	},{
		text: '季',
		key: 'quarter',
		value: 3
	},{
		text: '年',
		key: 'year',
		value: 4
	}]
}

export default tableConfig;