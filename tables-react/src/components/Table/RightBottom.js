// RightBottom.js


import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';

import mockdata from './mockData';


export default class RightBottom extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
		console.log("constructorprops", props);
	}
	//  是在组件挂载（mount） 之前被调用。因为它是在render()方法之前被调用。在该方法中进行同步 setState 不会导致重绘。
	componentWillMount() {
		console.log("componentWillMount:", this.props)
		this.setState({
			data: this.props.tablesData		
		});
	}
    scrollHandle(e) {
    	console.log("testScroll", this);
    	let target = e.target;

    	console.log("target.scrollTop", target.scrollTop);
    	console.log("target.scrollLeft", target.scrollLeft);

    	console.log("testScroll", target);
    	this.state.data.splice(20, 1);
    	console.log("this.state: ", this.state);
    	console.time('isAsync');
		this.setState({
    		data: this.state.data
    	})

		// let mockData = mockdata();

		// this.setState({
		// 	data: mockdata.data
		// });
    	
    	// console.log("target.")
    }
	render() {

		
		// let data = this.state.data;
		// console.log("state.data", this.state.data);
    	console.timeEnd('isAsync');

		let tds = this.state.data.map((item) => {
			return (
				<tr key={item.id}> 
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>					
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
					<td>{item.cword1}</td>
				</tr>)
		})

		return (<div className="right bottom" onScroll={this.scrollHandle.bind(this)}>
			<table>
				<tbody>
					{tds}
				</tbody>
			</table>
		</div>)
	}

}