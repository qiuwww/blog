// Dialog.js
// 基本的弹框
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// import { Input } from 'antd';
import './dialogs.less';
// 这里需要监控的属性有，输入框的值、原始值||同比||环比
import tableConfig from '../../../config/tableConfig.js';



@inject((store) => {
	let TS = store.TableStore;	

	return {
		closeDialog: TS.changeDialogstate,
		beSureHandler: TS.beSureHandler,
		dialogType: TS.dialogTypeToJsObj,
		frequency: TS.frequencyToJsObj,
		changeFrequencyHandler: TS.changeFrequencyHandler,
		flag: TS.flag,
		deleteIndex: TS.deleteIndexToJsObj
	}
})@observer
export default class Dialog extends Component { 

	constructor(props) {
		super(props); // 使用this.props引用传递过来的属性
		
	}



	render() {


		let { dialogType, frequency } = this.props;

		let frequencyConfig = tableConfig.frequencyConfig;

		let returnDetail = (dialogType) => {
			let { deleteIndex, flag } = this.props;
			let detail = '';
			switch(dialogType){
				case 1:
					detail = <p>历史比较，最多可勾选10个指标!</p>;
					break;
				case 2:
					detail = <p>同期比较，最多可勾选2个指标!</p>;
					break;
				case 3:
					detail = <p>频率不同，无法参加计算!</p>;
					break;
				case 4:
					detail = <p className="attation"><i></i>是否删除指标“{deleteIndex}”？</p>;
					break;
				case 5:
					let class1 = '';
					let class2 = '';
					let lis = frequencyConfig.length && frequencyConfig.map((item, index) => {
						class1 = frequency == item.key ? 'select': '';
						class2 = flag <= item.value ? '' : 'disabled';
					 	return (<li key={index} className={class1 + ' ' + class2} data-frequency={item.key}>{item.text}</li>);
					});
					detail = <div id="changeFrequency">
								 <p>新频率</p>
								 <ul onClick={this.props.changeFrequencyHandler.bind(this)}>
								 	{lis}
								 </ul>
							 </div>;
					break;
			}
			return detail;
		}


		return (
			<div className="dialog">
				<div className="dialog-wrap">
					<h4 className="d-title-cancle">
						改变频率
						<i className="cancle" onClick={this.props.closeDialog.bind(this)}></i>
					</h4>
					<div className="detail">
						{returnDetail(dialogType)}
					</div>
					<ul className="cancle-beSure">
						<li onClick={this.props.closeDialog.bind(this)}>取消</li>
						<li onClick={this.props.beSureHandler.bind(this, dialogType)}>确认</li>
					</ul>
				</div>

			</div>
			);
	}
}