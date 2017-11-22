

// LeftBottom.js
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, inject} from 'mobx-react';

@inject((store) => {
	let TS = store.TableStore;
	return {
		scrollHandler: TS.scrollHandler,
		leftBottom: TS.tableAllDataToJsObj.leftBottom,
		trClickHandler: TS.trClickHandler
	}
})@observer
export default class LeftBottom extends Component {

	constructor(props){
		super(props);

	}
	// 切换选中与否的状态
	selectClickHandler(e) {
		let target = e.target;
		if(target.getAttribute('class') == 'select'){
			target.setAttribute('class', '');
		}else{
			target.setAttribute('class', 'select');			
		}
	}
	render() {		
		let { leftBottom, synchronizePosition } = this.props;
		let tableStyle = {
			top: -synchronizePosition.scrollTop
		}
		let tds = !!leftBottom && leftBottom.map((item, index) => {
			return (
				<tr key={index}
					 data-index={index}
					 onMouseEnter={this.props.onMouseEnter.bind(this)}					 
					 onMouseLeave={this.props.onMouseLeave.bind(this)}
					 onClick={this.props.trClickHandler.bind(this)}>					  					 
					<td onClick={this.selectClickHandler.bind(this)}></td>
					<td>{item.index}</td>
					<td>{item.title}</td>
				</tr>)
		});
		return (<div className="left bottom">
			<table style={tableStyle}>
				<tbody>
					{tds}
				</tbody>
			</table>
		</div>)
	}
}