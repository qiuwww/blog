// RightBottom.js


import React, {Component} from 'react';
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';


// 生成示例，返回store内部变量或者方法
@inject((store) => {
	// 拿到rightTop这个数组
	return {
		WH: store.TableStore.WHToJsObj, // 配置内层的高度
		scrollHandler: store.TableStore.scrollHandler, // 滚动的处理函数，需要触发事件调整range和当前窗口的位置（left，top）
		range: store.TableStore.rangeToJsObj,
		rightBottom: store.TableStore.tableAllDataToJsObj.rightBottom // 这里使用的时候并不是一个函数，直接就是结果对象
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
	render() {
		let { WH, tablePosition, range, rightBottom, memoryPosition } = this.props;
		let { scrollLeft, scrollTop } = memoryPosition;

		let middleWrapStyle = {
			width: WH.W,
			height: WH.H,
			backgroundColor: 'red'
	    };

	    let { rowStart, rowEnd, colStart, colEnd } = range;

		let multiple = this.props.multiple;


		let tds = !!rightBottom && rightBottom.map((item, index) => {
			if(index >= 0 && index < 60){
				return (<tr key={index}> 
					{!!item && item.map((_item, _index) => {
						if(_index >= 0 && _index < 50){
							return (<td key={_index}>
								{_item}
							</td>);
						}else{
							return null;
						}						
					})}
				</tr>)
			}else{
				return null;
			}	
		});

		return (<div className="right bottom" >
			<div className="middleWrap" style={middleWrapStyle}>
				<table style={this.props.tableStyle}>
					<tbody>
						{tds}
					</tbody>
				</table>
			</div>			
		</div>)
	}

}