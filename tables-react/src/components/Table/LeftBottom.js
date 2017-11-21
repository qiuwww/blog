

// LeftBottom.js
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, inject} from 'mobx-react';

@inject((store) => {
	return {
		leftBottom: store.TableStore.tableAllDataToJsObj.leftBottom,
		range: store.TableStore.rangeToJsObj,
		top: store.TableStore.synchronizePositionToJsObj.scrollTop,
		scrollHandler: store.TableStore.scrollHandler 
	}
})@observer
export default class LeftBottom extends Component {
	render() {		
		let { leftBottom, range, top } = this.props;
		let { rowStart, rowEnd } = range;
		let tableStyle = { top: -top };		
		let multiple = this.props.multiple;
		let tds = !!leftBottom && leftBottom.map((item, index) => {
			if( index >= rowStart * multiple && index < rowEnd * multiple){
				return (
					<tr key={index}> 
						<td></td>
						<td>{item.index}</td>
						<td>{item.title}</td>
					</tr>)
			}else{
				return null;
			}			
		});
		return (<div className="left bottom" onScroll={this.props.scrollHandler.bind(this)}>
			<table style={tableStyle}>
				<tbody>
					{tds}
				</tbody>
			</table>
		</div>)
	}
}