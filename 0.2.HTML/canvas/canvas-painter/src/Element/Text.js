import Rect from './Rect';
import {Util, Point} from '../Util/';
/*
    1. 文字自动换行
    2. 文字大小等样式
    3. 拖拽缩放的最大最小尺寸判断
    4. 编辑器从input到textarea支持多行
    5. 没有输入文字的时候将被清除
    6. 在拖拽完之后需要重新计算高度是否能否包含文字
*/
export default class Text extends Rect {
    constructor(start, parent, config) {
        let padding = 5;
        let defaultWidth = 20;
        let defaultHeight = 24;
        let end = new Point(start.x + padding * 2 + defaultWidth, start.y + padding * 2 + defaultHeight);
        super(start, end, config);
        this.parent = parent;
        this.padding = padding;
        this.text = '';// 默认文字为空
        this.type = 'text';
        this.endEdit = this.endEdit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    draw(ctx) {
        let textWidth = 0;
        if (this.text) {
            ctx.save();
            ctx.font = this.config.font;
            textWidth = ctx.measureText(this.text).width;
            ctx.restore();
        }
        ctx.save();
        let endX = this.start.x + this.padding * 2 + textWidth;
        if (this.end.x < endX) {
            this.end.x = endX;
        }
        let fontHeight = Util.getFontHeight(this.config.font);
        let endY = this.start.y + this.padding * 2 + fontHeight;
        if (this.end.y < endY) {
            this.end.y = endY;
        }
        let width = Math.abs(this.start.x - this.end.x);
        let height = Math.abs(this.start.y - this.end.y);
        if (this.editMode || this.selected) {
            let x = Math.min(this.start.x, this.end.x);
            let y = Math.min(this.start.y, this.end.y);
            ctx.strokeRect(x - 0.5, y - 0.5, width, height);
        }
        if (!this.editMode) {
            // 需要计算当前字体大小的高度
            let {minX, minY} = this.getPoints();
            // 多行文本时 每行文本之间的间隔
            // let fontMarginTop = 5;
            let textX = this.padding + minX;
            let textY = this.padding + minY + fontHeight;
            // let marginTop = (height - fontHeight) / 2;
            // let textY = minY + marginTop + fontHeight;
            ctx.font = this.config.font;
            ctx.fillStyle = this.config.color;
            ctx.fillText(this.text, textX, textY);
            ctx.restore();
        }
        if (this.selected) this.drawSelected(ctx);
    }
    beginEdit() {
        this.editMode = true;
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.className = 'text-editor';
        this.input.autofocus = true;
        this.input.value = this.text;
        this.input.addEventListener('blur', this.endEdit);
        this.input.addEventListener('input', this.onChange);
        let {minX, minY, maxX, maxY} = this.getPoints();
        let style = this.input.style;
        style.top = (minY + 5) + 'px';
        style.left = (minX + 5) + 'px';
        style.width = (maxX - minX - 10) + 'px';
        style.height = (maxY - minY - 10) + 'px';
        style.lineHeight = (maxY - minY - 10) + 'px';
        style.font = this.config.font;
        this.parent.frame.appendChild(this.input);
        this.parent.frame.lastElementChild.focus();
    }
    endEdit() {
        this.editMode = false;
        this.text = this.input.value;
        this.input.removeEventListener('blur', this.endEdit);
        this.input.parentNode.removeChild(this.input);
        this.parent.redraw();
        if (this.text) {
            this.parent.switchSelectMode();
        }
    }
    onChange() {
        this.text = this.input.value;
        this.parent.redraw();
        let width = Math.abs(this.start.x - this.end.x);
        this.input.style.width = (width - 10) + 'px';
    }
    hasText() {
        return this.text ? true : false;
    }
}
