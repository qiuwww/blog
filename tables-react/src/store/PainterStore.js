import mobx, { observable, computed, action } from 'mobx';

export default class PainterStore {
    @observable painter;
    @observable modeName = 'select';

    @action.bound
    initPainter() {
        this.painter = new Painter('canvas');
        this.painter.init();
        this.painter.on('switchMode', (name)=>{
            this.modeName = name;
        });
    }
    @action.bound
    setModeName(name) {
        this.modeName = name;
        this.painter.setModeName(name);
    }
    @action.bound
    setConfig(config) {
        this.painter.setConfig(config);
    }
}
