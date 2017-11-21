// header.js
// 这里的Component表示的就是React.Component
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import { Input } from 'antd';


@inject((store) => {
	return {
		currentSelect: store.TableStore.currentSelect
	}
})@observer
class Header extends Component { 
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
		
	}
	computeClickHandler(e) {
		// 需要从父组件传过来，自己不可以更改自己的状态，需要使用事件来更改props（父组件传入）
		console.log(this);
		
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
    	const { initValue } = this.props; 
        return (
        	<div className="search-add-compute">        	
	        		<div className="search-input">
	        			<input placeholder={this.props.placeholder}  value={initValue} onChange={this.onChangeHandler.bind(this)} />
	        			<span className="search-btn" onChange={this.onChangeHandler.bind(this)}></span>
	        	    </div>
	        	    <ul className="radios" onClick={this.selectLiEvent.bind(this)}>
	        	    	<li>显示原始数值</li>
	        	    	<li>显示同比</li>
	        	    	<li>显示环比</li>
	        	    </ul>
	        	    <div className="add-compute">
	        	   		<div className="add" onClick={this.addClickHandler.bind(this)}>新增</div>
	        	   		<div className="compute" onClick={this.computeClickHandler.bind(this)}>计算</div>
	        	    </div>
        	   </div>
    	    );
    }
    
}

// defaultProps 也是一个关键字, 表示组件的默认属性，这里只是作为初始化传入的值
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

export default Header;