import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, inject} from 'mobx-react';

@inject((store)=>{
    return {
        setConfig: store.PainterStore.setConfig
    }
})@observer
export default class Setting extends Component {
    onChange = (e) => {
        let target = e.target;
        let nodeName = target.nodeName.toLowerCase();
        let name = target.getAttribute('data-name');
        if (nodeName === 'span') {
            if (target.classList.contains('selected')) {
                target.classList.remove('selected');
            } else {
                target.classList.add('selected');
            }
        }
        let config = this.getConfig();
        this.props.setConfig(config);
    }
    getConfig() {
        let controls = this.frame.querySelectorAll('.button');
        let previewConfig = {};
        Array.from(controls).forEach((control)=>{
            let nodeName = control.nodeName.toLowerCase();
            let name = control.getAttribute('data-name');
            // let value = null;
            if (nodeName === 'span') {
                if (control.classList.contains('selected')) {
                    previewConfig[name] = true;
                } else {
                    previewConfig[name] = false;
                }
            } else {
                previewConfig[name] = control.value;
            }
        });
        let config = {};
        let keys = ['fillStyle', 'strokeStyle', 'color'];
        keys.forEach((key)=>{
            config[key] = previewConfig[key];
        });
        config.font = [previewConfig.fontStyle ? 'italic' : 'normal', previewConfig.fontWeight ? 'bold' : 'normal', previewConfig.fontSize + 'px', previewConfig.fontFamily].join(' ');
        return config;
    }
    render() {
        return <div className="setting" ref={(frame) => { this.frame = frame; }}>
            <input onChange={this.onChange} className="button" data-name="strokeStyle" title="描边" type="color"/>
            <input onChange={this.onChange} className="button" data-name="fillStyle" title="填充" type="color"/>
            <select onChange={this.onChange} className="button" data-name="fontFamily" title="字体">
                <option name="宋体" value="宋体">宋体</option>
                <option name="微软雅黑" value="宋体">微软雅黑</option>
                <option name="楷体,楷体_GB2312, SimKai">楷体</option>
                <option name="黑体, SimHei">黑体</option>
                <option name="隶书, SimLi">隶书</option>
                <option name="sans-serif">sans-serif</option>
                <option name="andale mono">andale mono</option>
                <option name="arial, helvetica,sans-serif">arial</option>
                <option name="arial black,avant garde">arial black</option>
                <option name="comic sans ms">comic sans ms</option>
                <option name="impact,chicago">impact</option>
                <option name="times new roman">times new roman</option>
            </select>
            <select onChange={this.onChange} className="button" data-name="fontSize" title="字体大小">
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
                <option value="26">26</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
                <option value="36">36</option>
            </select>
            <span onClick={this.onChange} className="button" data-name="fontWeight" title="粗体">B</span>
            <span onClick={this.onChange} className="button" data-name="fontStyle" title="斜体">I</span>
            <input onChange={this.onChange} className="button" data-name="color" title="字体颜色" type="color"/>
        </div>;
    }
}
