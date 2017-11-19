/*
    每个命令按钮也可以抽象成一个配置
    编辑器依赖一个外部的配置状态  类似传入props到编辑器组件中

    元素选中后需要将颜色传递回去
*/
export default class Setting {
    constructor(id, parent) {
        this.parent = parent;
        this.frame = document.getElementById(id);
        this.bind();
    }
    bind() {
        this.frame.addEventListener('click', (e)=>{
            let target = e.target;
            if (target.nodeName.toLowerCase() === 'span') {
                if (target.classList.contains('selected')) {
                    target.classList.remove('selected');
                } else {
                    target.classList.add('selected');
                }
                this.onChange();
            }
        });
        let controls = this.frame.querySelectorAll('.button');
        Array.from(controls).forEach((control)=>{
            let nodeName = control.nodeName.toLowerCase();
            if (nodeName === 'span') return;
            control.addEventListener('change', ()=>{
                this.onChange();
            });
        });
    }
    getSetting() {
        // 需要做缓存 否则取配置比较耗性能
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
    onChange() {
        let config = this.getSetting();
        this.parent.setConfig(config);
    }
    setSetting(config) {
        // 可以支持当前选中的元素进行设置
    }
}

window.Setting = Setting;
