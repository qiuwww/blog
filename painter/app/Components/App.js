import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import Toolbar from './Toolbar';
import Setting from './Setting';
import Painter from './Painter';

@observer
export default class App extends Component {
    render() {
        return <div>
            <Toolbar></Toolbar>
            <Setting></Setting>
            <Painter></Painter>
        </div>
    }
}


