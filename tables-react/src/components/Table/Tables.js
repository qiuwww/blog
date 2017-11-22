// Tables.js
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';




export default class Tables extends Component {

	constructor() {
		super();
	}



	render() {
		return null
		// return(<div className="tables"> 
		// 	<div className="thead">
		// 		<LeftTop></LeftTop>
		// 		<RightTop tableStyle={tableStyle} multiple={multiple}></RightTop>
		// 	</div>        
		// 	<div className="tbody">
		// 		<LeftBottom tableStyle={tableStyle} multiple={multiple}></LeftBottom>
		// 		<RightBottom tableStyle={tableStyle} multiple={multiple} memoryPosition={this.props.memoryPosition}></RightBottom>
		// 	</div>
		// </div>);	
	}
	
}




// render() {
// 		return (<div className="left top">
// 			<table>
// 				<thead>				
// 					<tr>
// 						<th></th>
// 						<th>序号</th>
// 						<th>指标名称</th>
// 					</tr>
// 				</thead>
// 			</table>
// 		</div>)
// 	}