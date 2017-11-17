// 打包生成的文件
import React from 'react';
import {render} from 'react-dom';
// 这里配置与webpack.config.js的配置是差不多的，只是这里会让他们打包成一个文件
import App from './Components/Hello/Hello';
import PainterStore from './Store/PainterStore';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';






render(<Provider PainterStore={new PainterStore()}>
    <app></app>
</Provider>, document.getElementById('container'));
