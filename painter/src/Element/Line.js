import Element from './Element';
import {Util} from '../Util/';
import {ControlColor} from '../Config';

export default class Line extends Element {
    constructor(start, end, config) {
        super(config);
        this.start = start;
        this.end = end;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = this.config.strokeStyle;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
        if (this.selected) this.drawSelected(ctx);
    }
    drawSelected(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = ControlColor;
        ctx.fillRect(parseInt(this.start.x, 10) - 3.5, parseInt(this.start.y, 10) - 3.5, 6, 6);
        ctx.rect(parseInt(this.start.x, 10) - 3.5, parseInt(this.start.y, 10) - 3.5, 6, 6);
        ctx.stroke();
        ctx.beginPath();

        let {minX, minY, maxX, maxY} = this.getPoints();
        let centerX = (minX + maxX) / 2;
        let centerY = (minY + maxY) / 2;
        ctx.beginPath();
        ctx.fillStyle = ControlColor;
        ctx.fillRect(parseInt(centerX, 10) - 3.5, parseInt(centerY, 10) - 3.5, 6, 6);
        ctx.rect(parseInt(centerX, 10) - 3.5, parseInt(centerY, 10) - 3.5, 6, 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = ControlColor;
        ctx.fillRect(parseInt(this.end.x, 10) - 3.5, parseInt(this.end.y, 10) - 3.5, 6, 6);
        ctx.rect(parseInt(this.end.x, 10) - 3.5, parseInt(this.end.y, 10) - 3.5, 6, 6);
        ctx.stroke();
        ctx.restore();
    }
    update(start, end) {
        this.start = start || this.start;
        this.end = end || this.end;
    }
    isSelected(point) {
        let {minX, minY, maxX, maxY} = this.getPoints();
        minX = minX - 5;
        minY = minY - 5;
        maxX = maxX + 5;
        maxY = maxY + 5;
        // 坐标在线段的两点之间的区域
        if (point.x >= minX &&
            point.x <= maxX && 
            point.y >= minY &&
            point.y <= maxY) {
                // 坐标和两点之间组成的三角形的高线在检查范围内
                // 还有极端情况  点在线段上面
                let c = Util.distance(this.start, this.end);
                let a = Util.distance(this.start, point);
                let b = Util.distance(this.end, point);
                let p = (a + b + c) / 2;
                let h = 2 * Math.sqrt(p * (p - a) * (p-b) * (p-c)) / c;
                if (h <= 5) {
                    return true;
                }
                return false;
            }
        return false;
    }
    setSelected(selected, point) {
        super.setSelected(selected, point);
        if (!selected) {
            this.prevStart = null;
            this.prevEnd = null;
        } else {
            this.prevStart = this.start.clone();
            this.prevEnd = this.end.clone();
        }
    }
    getPoints() {
        return Util.getMaxMin(this.start, this.end);
    }
    selectedMoveHandler(point) {
        // 如果point在两端控制点上则进行线段坐标更改 否则进行线段平移
        if (Math.abs(this.selectedPoint.x - this.prevStart.x) <= 5 && Math.abs(this.selectedPoint.y - this.prevStart.y) <= 5) {
            this.start = point;
        } else if (Math.abs(this.selectedPoint.x - this.prevEnd.x) <= 5 && Math.abs(this.selectedPoint.y - this.prevEnd.y) <= 5) {
            this.end = point;
        } else {
            let diffX = this.selectedPoint.x - point.x;
            let diffY = this.selectedPoint.y - point.y;
            this.start.x = this.prevStart.x - diffX;
            this.end.x = this.prevEnd.x - diffX;
            this.start.y = this.prevStart.y - diffY;
            this.end.y = this.prevEnd.y - diffY;
        }
    }
}
