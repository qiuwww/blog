// header.js
// 这里的Component表示的就是React.Component
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// import { Input } from 'antd';
import './header.less';
// 这里需要监控的属性有，输入框的值、原始值||同比||环比


@inject((store) => {
	let TS = store.TableStore;
	return {
		computeClickHandler: TS.computeClickHandler,
		searchValue: TS.searchValueToJsObj,
		searchChangeHandler: TS.searchChangeHandler,
		onKeyDownHandler: TS.onKeyDownHandler,
		searchBtnHandler: TS.searchBtnHandler,
		changeFrequencyHandler: TS.changeFrequencyHandler,
		openDialogEvent: TS.openDialogEvent
	}
})@observer
export default class Header extends Component { 
	// 组件内部通过props来访问传过来的参数，组件都继承于Component
	// props是组件唯一的数据来源，对于组件来说：
	// props永远是只读的。
	constructor(props) {
		super(props); // 使用this.props引用传递过来的属性
	}	
	onChangeHandler(v) {
		// 需要从父组件传过来，自己不可以更改自己的状态，需要使用事件来更改props（父组件传入）
		console.log(this);
		this.props.onChange({
			structure: this.props.structure,
			value: v.target.value
		});
	}
	addClickHandler(e) {
		// 需要从父组件传过来，自己不可以更改自己的状态，需要使用事件来更改props（父组件传入）
		console.log(this);
		console.log("打开安哥的弹框");
		
	}
	
	//点击选择框操作
	selectLiEvent(e) {		

		let self = e.target;
		console.log(self.tagName);

		if(self.tagName !== 'LI'){
			return;
		}
		if(self.getAttribute('class')){
			e.target.setAttribute('class', '');
		}else{
			e.target.setAttribute('class', 'select');			
		}

	} 
    render() {            	
    	console.log('this.props: ', this.props);
    	const { searchValue } = this.props; 
    	console.log("searchValue: ", searchValue);
        return (<div className="header search-btns">        	
	        		<div className="search-input">
	        			<input 
	        			placeholder={this.props.placeholder} 
	        			value={searchValue} 
	        			onKeyDown={this.props.onKeyDownHandler.bind(this)}
	        			onChange={this.props.searchChangeHandler.bind(this)} />
	        			<span className="search-btn" onClick={this.props.searchBtnHandler.bind(this)}></span>
	        	    </div>
	        	    <ul className="radios" onClick={this.selectLiEvent.bind(this)}>
	        	    	<li>显示原始数值</li>
	        	    	<li>显示同比</li>
	        	    	<li>显示环比</li>
	        	    </ul>
	        	    <div className="btns">
	        	   		<div className="switch" title="变频操作" onClick={this.props.openDialogEvent.bind(this, {type: 5})}>变频</div>
	        	   		<div className="add" onClick={this.addClickHandler.bind(this)}>新增</div>
	        	   		<div className="compute" onClick={this.props.computeClickHandler.bind(this)}>计算</div>
	        	    </div>
        	    </div>);
    }
    
}

// defaultProps 也是一个关键字, 表示组件的默认属性，这里只是作为初始化传入的值
// 这里默认是在componentWillMount之前加载进来
// 更改什么的需要从上往下传递
Header.defaultProps = {
	text: '文字输入',
	initValue: '',
	displayRow: false,
	structure: null,
	handleChange: null,
	onChange: null,
	onChangeHandler: null,
	placeholder: '请输入指标名称或关键字'
}

