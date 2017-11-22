

import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';

export default class LeftTop extends Component {
	render() {
		return (<div className="left top">
			<table>
				<thead>				
					<tr>
						<th></th>
						<th>序号</th>
						<th>指标名称</th>
					</tr>
				</thead>
			</table>
		</div>)
	}
}