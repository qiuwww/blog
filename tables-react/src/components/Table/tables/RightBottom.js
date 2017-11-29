// RightBottom.js


import React, {Component} from 'react';
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';


// 生成示例，返回store内部变量或者方法
@inject((store) => {
	// 拿到rightTop这个数组
	let TS = store.TableStore;
	return {
		// WH: store.TableStore.WHToJsObj, // 配置内层的高度
		scrollHandler: TS.scrollHandler, // 滚动的处理函数，需要触发事件调整range和当前窗口的位置（left，top）
		// range: store.TableStore.rangeToJsObj,
		rightBottom: TS.tableAllDataToJsObj.rightBottom // 这里使用的时候并不是一个函数，直接就是结果对象
	}
	// observer, 如果store中数据发生改变，这个组件有引用，就更新下边的状态
})@observer
export default class RightBottom extends Component {
	constructor(props){
		super(props);
	}
	//  是在组件挂载（mount） 之前被调用。因为它是在render()方法之前被调用。在该方法中进行同步 setState 不会导致重绘。
	componentWillMount() {

	}
	componentWillUpdate() {
		console.time('Update');
	}
	componentDidUpdate() {
		console.timeEnd('Update');
	}
	render() {
		let { rightBottom } = this.props;
		let trs = !!rightBottom && rightBottom.map((item, index) => {			
			return (<tr key={index}
					 data-index={index}
					 onMouseEnter={this.props.trEvent.bind(this, 'mouseenter', index)}					 
					 onMouseLeave={this.props.trEvent.bind(this, 'mouseleave', index)}
					 onClick={this.props.trEvent.bind(this, 'click', index)}> 
				{ !!item && item.map((_item, _index) => {
					return (<td key={_index}>
						{_item}
					</td>);		
				}) }
			</tr>)
		});

		return (<div className="right bottom" onScroll={this.props.scrollHandler.bind(this)}>
			<table>
				<tbody>
					{trs}
				</tbody>
			</table>
		</div>)
	}
}