import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
// 组件 
import Toolbar from './Toolbar';
import Setting from './Setting';
import Painter from './Painter';
import Hello from './Hello';

@observer
// 观察下边的内容变化
export default class App extends Component {
    render() {
        return <div>
        	<Painter></Painter>        	
        	<Setting></Setting>        	
        	<Toolbar></Toolbar>        	
        </div>
    }
}


