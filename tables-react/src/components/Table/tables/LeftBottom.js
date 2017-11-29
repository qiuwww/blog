

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
		openDialogEvent: TS.openDialogEvent,
		changeCurrentIndexTextHandler: TS.changeCurrentIndexTextHandler,
		currentIndexText: TS.currentIndexTextToJsObj,
		blurHandler: TS.blurHandler,
		changeSelectTrIndexs: TS.changeSelectTrIndexs,
		page: TS.pageToJsObj,
		pagesize: TS.pagesize
	}
})@observer
export default class LeftBottom extends Component {
	constructor(props){
		super(props);
	}
	// 切换选中与否的状态
	selectClickHandler(index, e) {
		let target = e.target;
		if(target.getAttribute('class') == 's   lect'){
			target.setAttribute('class', '');
		}else{
			target.setAttribute('class', 'select');	
		}
		// 选中的列
		let trSelects = document.querySelectorAll('.left.bottom tr td.select');
		let selectArr = [];

		if(trSelects.length) {
			trSelects.forEach((item, index) => {
				selectArr.push(item.dataset.index);
			});
		}  

		this.props.changeSelectTrIndexs(selectArr);
	}
	render() {		
		let { leftBottom, synchronizePosition, page, pagesize } = this.props;
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
					<td onClick={this.selectClickHandler.bind(this, index)} data-index={index}></td>
					<td>{(page - 1) * pagesize + index + 1}</td>
					<td className="operation">
						<p>
							<input value={this.props.currentIndexText} 
									className="hide" 
									onChange={this.props.changeCurrentIndexTextHandler.bind(this, index)} 
									onBlur={this.props.blurHandler.bind(this)}
									/>
									<span>{item.title}</span>
						</p>
						<ul>
							<li onClick={this.props.toTopHandler.bind(this, index)}></li>							
							<li onClick={this.props.editHandler.bind(this, index)}></li>
							<li onClick={this.props.openDialogEvent.bind(this, {type: 4, text: item.title, index})}></li>
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