

import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// 组件 
// import TimerView from './TimerView';
import Header from './Header';
import LeftTop from './LeftTop';
import RightTop from './RightTop';
import LeftBottom from './LeftBottom';
import RightBottom from './RightBottom';

import mockdata from './mockData';

let mockData = mockdata();

console.log("mockData: ", mockData);

@inject((store) => {
	// 这里拿到需要从store中保存的值,在组件中取值，通过props对象，
	// store就相当于一个最高级的对象，向下传递数据，还不用层层向下传递
	return {
		// 左边是别名
		currentSelect: store.TableStore.currentSelect,
		testAttribute: store.TableStore.testAttribute,
		changeValue2: store.TableStore.changeValue2
	}
})@observer
// 观察下边的内容变化, 输出Table， 使用的部分引用Table
export default class Table extends Component {
	
	constructor(props){    
		// 这里用于传递props到子组件, 属性或者方法
		super(props); 
		console.log(props)
		this.handleChange = this.handleChange.bind(this);
		this.changeSlideState =this.changeSlideState.bind(this)
		// 使用mobx替代这里的方式，是这种方式的一种封装
		this.state = {
			value: 'testStr',
			isEnter: true,
		}
	}
	handleChange(obj) {
	// 	// debugger
	// 	// 子组件调用，将状态上传
	// 	// console.log(obj); 
	// 	// this.initValue.s.value;
	// 	// console.log(this);\
		this.setState({
			value: obj.value
		});

	}
	changeSlideState() {
		// 切换enter|return 
		this.setState({
			isEnter: !this.state.isEnter
		});
		this.props.changeValue2(); // 同步执行的
		// 这里要在更新之后才可用，下边的值还是没有改变之前的值，触发顺序1、2、3
		console.log("storeChange3: ", this.props.testAttribute)
	}
	componentDidUpdate() {
		console.log("storeChange4: ", this.props.testAttribute)
		

	}
	scrollEvent(e) {
		let self = e.target;
	}
	// handleChange(obj){
	// 	this.value = obj.value
	// }
    render() {

    	const randomNum = Math.floor(Math.random()*100000);
    	// 需要传递的属性要在constructor内生命好，然后通过标签传递给子组件
        return (<div id="table" className={this.state.isEnter ? '' : 'active'}> 
        	<div className="slide-area">
        		<div className="slide-btn" onClick={this.changeSlideState}></div>
        	</div>
        	<div className="content">
				<Header initValue={this.state.value} onChange={this.handleChange.bind(this)}></Header>	   
	        	<div className="tables"> 
		        	<div className="thead">
		        		<LeftTop ></LeftTop>
		        		<RightTop tablesData={mockData.data}></RightTop>
		        	</div>
		        	<div className="tbody">
		        		<LeftBottom tablesData={mockData.data}></LeftBottom>
		        		<RightBottom tablesData={mockData.data} testProps='123'></RightBottom>
		        	</div>
	        	</div>
        	</div>    		  	
        </div>)
    }
}


