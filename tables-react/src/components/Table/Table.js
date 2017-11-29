

import React, {Component} from 'react';
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';
// 组件 
import Header from './header/Header';
import Tables from './tables/Tables';
import Dialog from './dialogs/Dialog';
import ComputeIndex from './dialogs/ComputeIndex';
// 引入需要的组件，填充页面


import './table.less';

// 现在先用模拟函数来代替，只要返回的数据格式一致就不怕
import { fetch } from '../../Util/utils.js'; 

// 模拟数据
import {res} from '../../Util/mockData.js';

import tableConfig from '../../config/tableConfig.js';

let multiple = tableConfig.multiple;

@inject((store) => {
	let TS = store.TableStore;
	// 这里拿到需要从store中保存的值,在组件中取值，通过props对象，
	// store就相当于一个最高级的对象，向下传递数据，还不用层层向下传递
	return {
		// 初始化数据
		initTableAllData: TS.initTableAllData,
		openDialog: TS.openDialogToJsObj,
		computeIndex: TS.computeIndexToJsObj,
		changeLenovoData: TS.changeLenovoData,
		refreshTable: TS.refreshTable,
		isLoadingShow: TS.isLoadingShow
	}
})@observer
// 观察下边的内容变化, 输出Table， 使用的部分引用Table
export default class Table extends Component {
	
	constructor(props){    
		// 这里用于传递props到子组件, 属性或者方法
		super(props); 
		this.changeLoadingState = this.props.changeLoadingState;
		this.handleChange = this.handleChange.bind(this);
		this.changeSlideState =this.changeSlideState.bind(this)
		// 使用mobx替代这里的方式，是这种方式的一种封装
		this.state = {
			value: 'testStr',
			isEnter: true,
		}

	}

	// 第一次渲染结束render后执行， table部分的数据请求
	componentDidMount() {
		this.props.refreshTable();
		// body上绑定方法, 这里会影响到所有事件的还行
		document.body.addEventListener('click', (e) => {
			let target = e.target;
			if(!target.classList.contains('noPop')){
				this.props.changeLenovoData([]);
			}
		}, false);
	}

	componentWillUpdate() {
		// this.changeLoadingState();
	}

	handleChange(obj) {
		this.setState({
			value: obj.value
		});
	}
	changeSlideState() {
		// 切换enter|return 
		this.setState({
			isEnter: !this.state.isEnter
		});
		// this.props.changeValue2(); // 同步执行的
		// 这里要在更新之后才可用，下边的值还是没有改变之前的值，触发顺序1、2、3
	}
	componentDidUpdate() {

	}

	// 其实这里参数放到props之后（行列范围，总的数据），避免了操作嵌套数据
    render() {
    	// 需要传递的属性要在constructor内生命好，然后通过标签传递给子组件
    	// 这里直接引用组件，就是直接实例化一个对象组件
        return (<div id="table" className={this.state.isEnter ? '' : 'active'}> 
        	<div className="slide-area">
        		<div className="slide-btn" onClick={this.changeSlideState}></div>
        	</div>
        	<div className="content">
				<Header initValue={this.state.value} onChange={this.handleChange.bind(this)}></Header>	   
	        	<Tables></Tables>	        		        	
        	</div>
        	{ this.props.isLoadingShow && <div id="loading"></div> }
        	{ this.props.openDialog && <Dialog></Dialog> }
        	{ this.props.computeIndex && <ComputeIndex></ComputeIndex> }
        </div>)
    }
}


