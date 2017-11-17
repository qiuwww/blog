// RightTop.js


import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';


export default class RightTop extends Component {


	render() {

	let data = this.props.tablesData;

	console.log("data", data);

	let tds = data.map((item) => {
		return (			
				<th key={item.id}>{item.date1}</th>
			)
	})


		return (<div className="right top">
			<table>
				<thead>
					<tr>
						{tds}
					</tr>
				</thead>
			</table>
		</div>)
	}

}