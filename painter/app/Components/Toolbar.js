import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, inject} from 'mobx-react';

@inject((store)=>{
    return {
        modeName: store.PainterStore.modeName,
        setModeName: store.PainterStore.setModeName
    }
})@observer
export default class Toolbar extends Component {
    setModeName = (e) => {
        let target = e.target;
        let name = target.getAttribute('data-name');
        this.props.setModeName(name);
    }
    buildItems() {
        let dict = {
            'select': '选择',
            'remove': '移除',
            'line': '线段',
            'arrow': '箭头',
            'rect': '矩形',
            'ellipse': '椭圆',
            'text': '文字'
        };
        let keys = Object.keys(dict);
        let items = keys.map((key, i)=>{
            let className = ['button'];
            if (key === this.props.modeName) className.push('selected');
            className = className.join(' ');
            return <span key={i} className={className} data-name={key}>{dict[key]}</span>;
        });
        return items;
    }
    render() {
        let items = this.buildItems();
        return <div className="tool" onClick={this.setModeName}>
            {items}
        </div>;
    }
}
