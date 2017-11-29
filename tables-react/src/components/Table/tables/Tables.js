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
		trClickHandler: TS.trClickHandler,
		trEvent: TS.trEvent
	}
})@observer
export default class Tables extends Component {
	constructor() {
		super();

	}
	componentDidMount() {

	}

	render() {

		let  { synchronizePosition, trEvent} = this.props;
		let passDownProps = { synchronizePosition, trEvent };

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
