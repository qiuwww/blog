import React, {Component} from 'react';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';

@inject((store)=>{
    return {
        initPainter: store.PainterStore.initPainter
    }
})@observer
export default class Painter extends Component {
    componentDidMount() {
        this.props.initPainter();
    }
    render() {
        let style = {
            width: '600px',
            height: '600px'
        };
        return <div>
            <canvas width="600" height="600" id="canvas" style={style}></canvas>
        </div>
    }
}
