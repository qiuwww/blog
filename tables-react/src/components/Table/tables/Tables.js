// Tables.js
import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';

import LeftTop from './LeftTop';
import LeftBottom from './LeftBottom';
import RightTop from './RightTop';
import RightBottom from './RightBottom';

import './tables.less';

@inject((store) => {
	// 这里拿到需要从store中保存的值,在组件中取值，通过props对象，
	// store就相当于一个最高级的对象，向下传递数据，还不用层层向下传递
	let TS = store.TableStore;	
	return {
		tableAllData: TS.tableAllDataToJsObj,
		synchronizePosition: TS.synchronizePositionToJsObj,
		onMouseEnter: TS.onMouseEnter,
		onMouseLeave: TS.onMouseLeave,
		trClickHandler: TS.trClickHandler

		// 左边是别名
		// currentSelect: store.TableStore.currentSelect,
		// testAttribute: store.TableStore.testAttribute,
		// changeValue2: store.TableStore.changeValue2,
		// range: store.TableStore.rangeToJsObj,
		// changeLoadingState: store.TableStore.changeLoadingState,
		// isLoadingShow: store.TableStore.isLoadingShowToJsObj,
		// tablePosition: store.TableStore.tableStyleToJsObj,
		// memoryPosition: store.TableStore.memoryPositionToJsObj 
	}
})@observer
export default class Tables extends Component {
	constructor() {
		super();

	}
	componentDidMount() {

	}

	render() {

		let  { synchronizePosition, onMouseLeave, onMouseEnter, trClickHandler} = this.props;
		let passDownProps = { synchronizePosition, onMouseLeave, onMouseEnter, trClickHandler };

		return(<div className="tables"> 
			<div className="thead">
				<LeftTop />
				<RightTop {...passDownProps} />				
			</div>        
			<div className="tbody">
				<LeftBottom {...passDownProps} />
				<RightBottom {...passDownProps}/>
			</div>
		</div>);	
	}	
}
