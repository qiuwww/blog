// header.js
// 这里的Component表示的就是React.Component
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// import { Input } from 'antd';
import './header.less';
// 这里需要监控的属性有，输入框的值、原始值||同比||环比

import tableConfig from '../../../config/tableConfig.js';


@inject((store) => {
	let TS = store.TableStore;
	return {
		computeClickHandler: TS.computeClickHandler,
		searchValue: TS.searchValueToJsObj,
		searchChangeHandler: TS.searchChangeHandler,
		onKeyDownHandler: TS.onKeyDownHandler,
		searchBtnHandler: TS.searchBtnHandler,
		changeFrequencyHandler: TS.changeFrequencyHandler,
		openDialogEvent: TS.openDialogEvent,
		changeSearchValue: TS.changeSearchValue,
		changeLenovoData: TS.changeLenovoData,
		lenovoData: TS.lenovoDataToJsObj,
		refreshTable: TS.refreshTable,
		radiosChange: TS.radiosChange,
		radius: TS.radiosToJsObj,
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
		this.props.onChange({
			structure: this.props.structure,
			value: v.target.value
		});
	}
	addClickHandler(e) {
		// 需要从父组件传过来，自己不可以更改自己的状态，需要使用事件来更改props（父组件传入）
		console.log("打开安哥的弹框");
		
	}
	
	//点击选择框操作
	selectLiEvent(e) {		
		let self = e.target;
		if(self.tagName !== 'LI'){
			return;
		}
		let types = document.querySelectorAll('.header .radios li.select');

		if(self.getAttribute('class')){
			if(types.length > 1){
				e.target.setAttribute('class', '');				
			}
		}else{
			e.target.setAttribute('class', 'select');			
		}
		setTimeout(() => {
			types = document.querySelectorAll('.header .radios li.select');
			// 显示同比||环比||原始值
			let resArr = [];
			types.length && types.forEach((item, index) => {
				resArr.push(item.dataset.type);
			});
			this.props.radiosChange(resArr);			
		}, 0);
	
	} 
	// 联想框选择处理函数
	selectLenovoHandler(e) {
		e.stopPropagation();
		let target = e.target; 
		if(target.tagName == 'LI'){
			let text = target.innerText;
			// 拿到这个text来改变上边input的值，并且搜索
			this.props.changeSearchValue(text);
			// 关闭弹框并且搜索
			this.props.changeLenovoData([]); // 传入空数组就表示关闭当前的联想结果框
			// 搜索事件
			this.props.refreshTable();
		}
	}
    render() {            	
    	const { searchValue, lenovoData, radius } = this.props; 
    	let lenovo = null;
    	if(lenovoData.length){ 
	    	let lis = lenovoData.map((item, index) => {
		        return <li key={index} className="noPop">{item}</li>
		    });
		    lenovo = <div className="lenovoSelect">
	    		<ul onClick={this.selectLenovoHandler.bind(this)}> 
		    		{lis}		        	    		
	    		</ul>
	    	</div>
		}  	 		
		// 依据刷新的数据来显示当前显示的
		let radiusConfig = tableConfig.radius;
		let type;
		let className;
		let radiusLis = radiusConfig.map((item, index) => {
			type = item.type;
			className = radius.indexOf(type) != -1 ? 'select' : '';
			return <li key={index} data-type={type} className={className}>{item.text}</li>
		});

        return (<div className="header search-btns">        	
	        		<div className="search-input">
	        			<input 
	        			placeholder={this.props.placeholder} 
	        			value={searchValue} 
	        			onKeyDown={this.props.onKeyDownHandler.bind(this)}
	        			onChange={this.props.searchChangeHandler.bind(this)} />
	        			<span className="search-btn" onClick={this.props.searchBtnHandler.bind(this)}></span>
	        	    	{lenovo}
	        	    </div>
	        	    <ul className="radios" onClick={this.selectLiEvent.bind(this)}>
	        	    	{radiusLis}
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
	placeholder: '请输入指标名称或关键字'
}

