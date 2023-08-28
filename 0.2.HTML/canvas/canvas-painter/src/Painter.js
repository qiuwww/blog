import {Text, Line, Rect, Ellipse, Arrow} from './Element/';
import {Util, Point} from './Util/';
import Event from './Util/EventEmitter';
import './Painter.css';

// 定义画布，并且控制图形的事件
// click事件： 单击选中，可移动当前的图形，显示出图形的外轮廓
// dblClick事件： 双击事件，对于文本的选中与更改操作，别的功能目前没发现
// mousedown事件： 鼠标按下的事件，开始作图
class Painter extends Event {
    constructor(id) {
        super();
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
// o(╯□╰)o 加了一个外部包裹层
        let parentNode = this.canvas.parentNode;
        this.frame = document.createElement('div');
        this.frame.className = 'wrapper-canvas';

        parentNode.insertBefore(this.frame, this.canvas);
        this.canvas.parentNode.removeChild(this.canvas);

        this.frame.appendChild(this.canvas);
// 定义事件回调
        this.handlerMouseDown = this.handlerMouseDown.bind(this);
        this.handlerMouseMove = this.handlerMouseMove.bind(this);
        this.handlerMouseUp = this.handlerMouseUp.bind(this);
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerDblClick = this.handlerDblClick.bind(this);
        console.log("Painter: ", this);
    }
    init() {
        this.elements = [];

        this.handlerMode = {};
        this.lastMouseX = null;
        this.lastMouseY = null;
        this.modeName = null;
        this.config = {
            fillStyle: null,
            strokeStyle: null,
            font: 'normal normal 12px 宋体',
            color: '#000000'
        };
        this.dragging = false;

        // 加入到回调序列内
        // 最好拆分到各个类成员上面
        this.registerHandler('select', this.selectHandler());
        this.registerHandler('remove', this.removeHandler());

        this.registerHandler('line', this.lineHandler());
        this.registerHandler('arrow', this.arrowHandler());
        this.registerHandler('rect', this.rectHandler());
        this.registerHandler('text', this.textHandler());
        this.registerHandler('ellipse', this.ellipseHandler());

        this.bind();

        console.log("painter 的 init被调用：", this);
        console.log("this.handlerMode: ", this.handlerMode);

        window.painter = this;
    }
    selectHandler() {
        return {
            'down': (e)=> {
                this.dragging = true;
                this.selectElement(e);
            },
            'move': (e)=>{
                // 当前鼠标是否正在选择元素的相关操作点上 委托回对应元素处理 返回一个状态位 表示是否需要更新画布
                if (!this.selectedElement || !this.dragging) return;
                let x = e.offsetX;
                let y = e.offsetY;
                let point = new Point(x, y);
                this.selectedElement.selectedMoveHandler(point);
                this.redraw();
            },
            'up': () => {
                this.dragging = false;
            }
        };
    }
    removeHandler() {
        return {
            'down': (e)=> {
                this.removeElement(e);
            }
        };
    }
// 画线
    lineHandler() {
        return {
            'move': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                let movePoint = new Point(x, y);
                let config = this.getConfig();
                let line = new Line(this.mouseDownPoint, movePoint, config);
                // 重新绘制
                this.redraw();
                line.draw(this.ctx);
            },
            'up': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                this.mouseUpPoint = new Point(x, y);
                let distance = Util.distance(this.mouseDownPoint, this.mouseUpPoint);
                if (distance <= 40) {
                    this.redraw();
                    return;
                }
                let config = this.getConfig();
                let line = new Line(this.mouseDownPoint, this.mouseUpPoint, config);
                this.setSelected(line, this.mouseUpPoint);
                this.redraw(line);
            }
        };
    }
    arrowHandler() {
        return {
            'move': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                let movePoint = new Point(x, y);
                let config = this.getConfig();
                let arrow = new Arrow(this.mouseDownPoint, movePoint, config);
                this.redraw();
                arrow.draw(this.ctx);
            },
            'up': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                this.mouseUpPoint = new Point(x, y);
                let distance = Util.distance(this.mouseDownPoint, this.mouseUpPoint);
                if (distance <= 40) {
                    this.redraw();
                    return;
                }
                let config = this.getConfig();
                let arrow = new Arrow(this.mouseDownPoint, this.mouseUpPoint, config);
                this.setSelected(arrow, this.mouseUpPoint);
                this.redraw(arrow);
            }
        };
    }
    rectHandler() {
        return {
            'move': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                let movePoint = new Point(x, y);
                let config = this.getConfig();
                let rect = new Rect(this.mouseDownPoint, movePoint, config);
                this.redraw();
                rect.draw(this.ctx);
            },
            'up': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                this.mouseUpPoint = new Point(x, y);
                let distance = Util.distance(this.mouseDownPoint, this.mouseUpPoint);
                if (distance <= 40) {
                    this.redraw();
                    return;
                }
                let config = this.getConfig();
                let rect = new Rect(this.mouseDownPoint, this.mouseUpPoint, config);
                this.setSelected(rect, this.mouseUpPoint);
                this.redraw(rect);
            }
        };
    }
    ellipseHandler() {
        return {
            'move': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                let movePoint = new Point(x, y);
                let config = this.getConfig();
                let ellipse = new Ellipse(this.mouseDownPoint, movePoint, config);
                this.redraw();
                ellipse.draw(this.ctx);
            },
            'up': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                this.mouseUpPoint = new Point(x, y);
                let distance = Util.distance(this.mouseDownPoint, this.mouseUpPoint);
                if (distance <= 40) {
                    this.redraw();
                    return;
                }
                let config = this.getConfig();
                let ellipse = new Ellipse(this.mouseDownPoint, this.mouseUpPoint, config);
                this.setSelected(ellipse, this.mouseUpPoint);
                this.redraw(ellipse);
            }
        };
    }
    textHandler() {
        return {
            'down': null,
            'click': (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                let point = new Point(x, y);
                let config = this.getConfig();
                let text = new Text(point, this, config);
                this.setSelected(text, point, true);
                text.beginEdit();
                this.redraw(text);
            }
        };
    }
    registerHandler(name, handler) {
        if (!handler.down) {
            handler.down = (e)=>{
                let x = e.offsetX;
                let y = e.offsetY;
                this.mouseDownPoint = new Point(x, y);
            };
        }
        if (!handler.move) {
            handler.move = ()=>{};
        }
        if (!handler.up) {
            handler.up = ()=>{};
        }
        this.handlerMode[name] = handler;
    }
    selectElement(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let point = new Point(x, y);
        // 查找最后画上去的一个元素
        let length = this.elements.length - 1;
        let find = false;
        for (let i = length; i >= 0; i--) {
            let element = this.elements[i];
            let flag = element.isSelected(point);
            if (flag && !find) {
                element.setSelected(true, point);
                this.selectedElement = element;
                find = true;
            } else {
                element.setSelected(false, null);
            }
        }
        if (find) {
            this.elements.filter((element)=>{
                return !element.getSelected();
            }).forEach((element)=>{
                element.setSelected(false, null);
            });
        } else {
            this.elements.forEach((element)=>{
                element.setSelected(false, null);
            });
            this.selectedElement = null;
        }
        this.redraw();
    }
    removeElement(e) {
        this.selectElement(e);
        if (this.selectedElement) {
            this.elements = this.elements.filter((element)=>{
                return element !== this.selectedElement;
            });
            this.selectedElement = null;
            this.redraw();
        }
    }
    setSelected(element, point, flag) {
        if (this.selectedElement) {
            this.selectedElement.setSelected(false, null);
        }
        element.setSelected(true, point);
        this.selectedElement = element;
        if (!flag) {
            this.switchSelectMode();
        }
    }
    // 绑定事件
    bind() {
        this.canvas.addEventListener('mousedown', this.handlerMouseDown);
        this.canvas.addEventListener('click', this.handlerClick);
        this.canvas.addEventListener('dblclick', this.handlerDblClick);
    }
    getConfig() {
        return Object.assign({}, this.config);
    }
    setConfig(config) {
        this.config = config;
        this.onSettingChange(config);
    }
    setConfigValue(name, value) {
        this.config[name] = value;
        this.onSettingChange(this.config);
    }
    getSelectedConfig() {
        if (this.selectedElement) {
            this.selectedElement.getConfig();
        }
        return this.getConfig();
    }
    getModeName() {
        return this.modeName;
    }
    setModeName(modeName) {
        this.modeName = modeName;
    }
    // 当鼠标按下的时候，添加mousemove事件和mouseup事件， 结束的时候，需要再去掉（这样避免冲突）
    handlerMouseDown(e) {
        let modeName = this.modeName;
        if (!modeName || !this.handlerMode[modeName]) return;
        this.handlerMode[modeName]['down'](e);
        // 通过选择的命令判断当前鼠标按下的模式
        this.lastMouseX = e.offsetX;
        this.lastMouseY = e.offsetY;
        console.log("handlerMouseDown事件被调用：", this);
        document.addEventListener('mousemove', this.handlerMouseMove);
        document.addEventListener('mouseup', this.handlerMouseUp);
    }
    // canvas上的事件
    handlerMouseMove(e) {
        // 外部处理:canvas外部的坐标不接受，需要保持最后一次在canvas里面的坐标供mouseup的时候使用
        let nodeName = e.target.nodeName.toLowerCase();
        if (nodeName !== 'canvas') return;
        let modeName = this.modeName;
        if (!modeName || !this.handlerMode[modeName]) return;
        this.lastMouseX = e.offsetX;
        this.lastMouseY = e.offsetY;
        
        // console.log("handlerMouseMove被触发: ", this);

        this.handlerMode[modeName]['move'](e);
    }
    handlerMouseUp(e) {
        let nodeName = e.target.nodeName.toLowerCase();
        let {offsetX, offsetY} = e;
        if (nodeName !== 'canvas') {
            offsetX = this.lastMouseX;
            offsetY = this.lastMouseY;
        }
        let modeName = this.modeName;
        if (!modeName || !this.handlerMode[modeName]) return;
        console.log("handlerMouseUp被触发: (结束的时候，需要移除mousemove和mouseup事件)", this);
        this.handlerMode[modeName]['up']({offsetX: offsetX, offsetY: offsetY});
        // 移除mousemove和mouseup
        document.removeEventListener('mousemove', this.handlerMouseMove);
        document.removeEventListener('mouseup', this.handlerMouseUp);
    }
    handlerClick(e) {
        let modeName = this.modeName;
        // 当前只处理文字元素
        if (modeName == 'text') {
            this.handlerMode[modeName]['click'](e);
        }
    }
    handlerDblClick(e) {
        this.selectElement(e);
        if (!this.selectedElement) return;
        let element = this.selectedElement;
        if (element.type !== 'text') return;
        element.beginEdit();
        this.redraw();
    }
    redraw(element) {
        if (element) this.elements.push(element);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let elements = this.elements.filter((elem)=>{
            if (elem.type && elem.type === 'text' && !elem.editMode && !elem.hasText()) {
                return false;
            }
            return true;
        });
        elements.forEach((elem)=>{
            elem.draw(this.ctx);
        });
        this.elements = elements;
    }
    onSettingChange(config) {
        if (!this.selectedElement) return;
        this.selectedElement.setConfig(config);
        this.redraw();
    }
    switchSelectMode() {
        this.setModeName('select');
        // 需要告知外界当前模式发生了变化
        // 自定义事件switchMode，这里来触发
        this.emit('switchMode', 'select');
    }
}

export default Painter;
