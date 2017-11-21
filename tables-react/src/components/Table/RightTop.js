// RightTop.js


import React, {Component} from 'react';
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';

// 生成示例，返回store内部变量或者方法
@inject((store) => {
	// 拿到rightTop这个数组
	return {
		range: store.TableStore.rangeToJsObj,
		left: store.TableStore.synchronizePositionToJsObj.scrollLeft,
		rightTop: store.TableStore.tableAllDataToJsObj.rightTop // 这里使用的时候并不是一个函数，直接就是结果对象
	}
	// observer, 如果store中数据发生改变，这个组件有引用，就更新下边的状态
})@observer
export default class RightTop extends Component{

	render() {		
		let { rightTop, range, left } = this.props;
		let { colStart, colEnd } = range;
		let tableStyle = { left: -left };
		let multiple = this.props.multiple;
		// 按照范围生成jsx片段
		let ths = rightTop && rightTop.map((item, index) => {
			if(index >= colStart * multiple && index < colEnd * multiple){
				return (<th key={index}>{item}</th>)
			}else{
				return null;
			}			
		});
		return (<div className="right top">
			<table style={tableStyle}>
				<thead>
					<tr>
						{ths}
					</tr>
				</thead>
			</table>
		</div>);
	}
}
