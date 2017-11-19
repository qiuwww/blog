// index.js, 单指index.html文件的引用js
// 打包生成的文件
import React from 'react';
// The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. 
// Most of your components should not need to use this module.
import {render} from 'react-dom';

// 引入需要的组件，填充页面

import Table from '../components/Table/Table';

// 状态管理，保存状态的文件
import PainterStore from '../store/PainterStore';
import TableStore from '../store/TableStore';

// 状态操作文件
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';

import './index.less';


@inject((store) => {
	return {
		getTableData: store.TableStore.getTableData
	}
})@observer
class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.getTableData();
	}
	render() {
		return (
			<div id="wrap">
				<div id="left">
					左侧部分
				</div>
				<div id="right">
					<Table></Table>
				</div>				
			</div>
		)
	}
}

// Provider传递对象到子组件
render(<Provider TableStore={new TableStore()}>
    <App></App>
</Provider>, document.getElementById('container'));
