

// LeftBottom.js
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, inject} from 'mobx-react';

@inject((store) => {
	let TS = store.TableStore;
	return {
		scrollHandler: TS.scrollHandler,
		leftBottom: TS.tableAllDataToJsObj.leftBottom,
		toTopHandler: TS.toTopHandler,
		editHandler: TS.editHandler,
		deleteHandler: TS.deleteHandler,
		openDialogEvent: TS.openDialogEvent
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
					 className={item.isUserAdd ? '' : 'user-add'}
					 onMouseEnter={this.props.trEvent.bind(this, 'mouseenter', index)}					 
					 onMouseLeave={this.props.trEvent.bind(this, 'mouseleave', index)}
					 onClick={this.props.trEvent.bind(this, 'click', index)}>					 					  					 
					<td onClick={this.selectClickHandler.bind(this)}></td>
					<td>{item.index}</td>
					<td className="operation">
						<span>{item.title}</span>
						<ul>
							<li onClick={this.props.toTopHandler.bind(this, index)}></li>							
							<li onClick={this.props.editHandler.bind(this, index)}></li>
							<li onClick={this.props.openDialogEvent.bind(this, {type: 4, text: item.title})}></li>
						</ul>
					</td>
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