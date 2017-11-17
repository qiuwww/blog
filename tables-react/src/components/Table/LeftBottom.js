// LeftBottom.js

import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';


export default class LeftBottom extends Component {

	render() {

	let data = this.props.tablesData;
	console.log("data", data);

	let tds = data.map((item) => {
		return (
			<tr key={item.id}> 
				<td></td>
				<td>{item.id}</td>
				<td>{item.cword1}</td>
			</tr>)
	})


		return (<div className="left bottom">
			<table>
				<tbody>
					{tds}
				</tbody>
			</table>
		</div>)
	}

}