
// 计算的弹框
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// import { Input } from 'antd';
import './dialogs.less';
import { returnIndexLis } from '../../../Util/mockData.js';




@inject((store) => {
	let TS = store.TableStore;	

	return {
		computeSureHandler: TS.computeSureHandler,
		closeCompute: TS.closeCompute,
		addOperatorsHandler: TS.addOperatorsHandler,
		addIndexHandler: TS.addIndexHandler,
		indexLis: TS.indexLisToJsObj,
		indexLisChange: TS.indexLisChange,
		expressArr: TS.expressToJsObj,
		selectExpressHandler: TS.selectExpressHandler
	}
})@observer
export default class Dialog extends Component { 

	constructor(props) {
		super(props); // 使用this.props引用传递过来的属性
	}

	componentDidMount() {
		let res = returnIndexLis();
		setTimeout(() => {
			if(!res.errno){
				this.props.indexLisChange(res.data);				
			}
		}, 1000);
	}

	// 指标拼接
	renderLis() {
		let lisArr = this.props.indexLis;
		let lis = '';
		if(lisArr.length){ 
			lis = lisArr.map((item, index) => {
				return (<li key={index}><span id={item.id}>{item.text}</span></li>);
			});
		}else{
			lis = null;
		}
		return lis;
	}
	// 需要保存这个html片段作为名称保存起来
	render() {
		let { expressArr } = this.props;
		let express = expressArr.length ? expressArr.map((item, index) => {
			if(item.id){
				return (<li key={index} data-index={index}><span>{item.text}</span></li>);
			}else{
				return (<li key={index} data-index={index}>{item.text}</li>);				
			}
		}) : null;
		return (
			<div className="dialog compute">
				<div className="dialog-wrap">
					<h4 className="d-title-cancle">
						指数运算
						<i className="cancle" onClick={this.props.closeCompute.bind(this)}></i>
					</h4>
					<div className="detail">
						<div className="name-selects left">
							<div className="name">
								<p>指标名称</p>
								<input value='' type="text" />
							</div>
							<div className="selects">
								<p>待选指标</p>
								<div className="search">
									<input value="" type="text"/>
									<i></i>
								</div>
								<ul onDoubleClick={this.props.addIndexHandler.bind(this)}>
									{this.renderLis()}									
								</ul>
							</div>
						</div>
						<div className="compute-index right">
							<p>指标计算</p>
							<div className="operators-express">
								<ul className="operators" onClick={this.props.addOperatorsHandler.bind(this)}>
									<li>+</li>
									<li>-</li>
									<li>*</li>
									<li>/</li>
									<li>(</li>
									<li>)</li>
								</ul>
								<ul className="express" onClick={this.props.selectExpressHandler.bind(this)}>
									{express}
								</ul>
							</div>
						</div>
					</div>
					<ul className="cancle-beSure">
						<li onClick={this.props.closeCompute.bind(this)}>取消</li>
						<li onClick={this.props.computeSureHandler.bind(this)}>确认</li>
					</ul>
				</div>

			</div>
		);
	}
}
