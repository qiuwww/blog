
// 选择需要操作的模式的对象， 选择 || 移除 || 线段 || 箭头 || 矩形 || 椭圆 || 文字 
export default class Toolbar {
    constructor(id, parent) {
        // parent就是要操作的canvas，painter
        this.parent = parent;
        // 拿到wrap， id是当前实例对应的元素的父元素的id
        this.frame = document.getElementById(id);
        // 当前是不是已经有选择的
        this.selected = null;
        // 事件绑定
        this.bind();
        console.log("toolbar对象被创建: ", this);
    }
    // 绑定模式选择按钮事件
    bind() {
        // 事件绑定的位置，处理当前需要作图的图形
        this.frame.addEventListener('click', (e)=>{
            let target = e.target;
            console.log("toolbar按钮事件被触发：", this);
            // 代理事件，判断当前的target是不是button
            if (!target.classList.contains('button')) return false;
            // 如果已有选中的就先取消，然后再添加当前target为selected
            if (this.selected) this.selected.classList.remove('selected');
            this.selected = target;
            // 添加selected，主要是用来控制样式的
            this.selected.classList.add('selected');
            let name = this.selected.getAttribute('data-name');
            // 拿到data-name来切换mode
            this.onChange(name);
        });
    }
    // 设置模式
    setMode(switchName) {
        // 拿到所有的button
        let buttons = this.frame.querySelectorAll('.button');
        // 匹配到模式并设置样式，设置当前的selected
        Array.from(buttons).forEach((button)=>{
            let name = button.getAttribute('data-name');
            if (switchName === name) {
                button.classList.add('selected');
                this.selected = button;
            } else {
                button.classList.remove('selected');
            }
        });
    }
    onChange(name) {
        // 切换painter的作图模式，反向更改painter
        this.parent.setModeName(name);
    }
}

window.Toolbar = Toolbar;
