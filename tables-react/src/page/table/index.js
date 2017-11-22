// index.js, 单指index.html文件的引用js
// 打包生成的文件
import React from 'react';
// The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. 
// Most of your components should not need to use this module.
import ReactDOM from 'react-dom';

// 状态操作文件
import * as mobx from 'mobx';

import {observer, Provider, inject} from 'mobx-react';

import Table from '../../components/Table/Table';

// 状态管理，保存状态的文件
import TableStore from '../../store/TableStore';

import './index.less';
// 页面进入需要填入的数据
@inject((store) => {
	return {

	}
})@observer
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id="wrap">
				<div id="left">
					左侧图表部分
				</div>
				<div id="right">
					<Provider TableStore={new TableStore()}>
						<Table></Table>
					</Provider>
				</div>				
			</div>
		)
	}
}

// Provider传递对象到子组件
ReactDOM.render(<Provider>
    <App></App>
</Provider>, document.getElementById('container'));
