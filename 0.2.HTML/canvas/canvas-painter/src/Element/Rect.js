import Element from './Element';
import {ControlResize, Util, Point} from '../Util/';
import {ControlColor} from '../Config';

export default class Rect extends Element {
    constructor(start, end, config) {
        super(config);
        this.start = start;
        this.end = end;
        this.minWidth = 20;
        this.minHeight = 20;
        console.log("React被创建：", this);
        // 这个时候已经拿到其实位置与结束位置
    }
    draw(ctx) {
        ctx.save();
        let width = Math.abs(this.start.x - this.end.x);
        let height = Math.abs(this.start.y - this.end.y);
        let x = Math.min(this.start.x, this.end.x);
        let y = Math.min(this.start.y, this.end.y);
        if (this.config.fillStyle) {
            ctx.fillStyle = this.config.fillStyle;
            ctx.fillRect(x - 0.5, y - 0.5, width, height);
        }
        ctx.strokeStyle = this.config.strokeStyle;
        ctx.strokeRect(x - 0.5, y - 0.5, width, height);
        ctx.restore();
        if (this.selected) this.drawSelected(ctx);
    }
    drawSelected(ctx) {
        // 计算绘制拖拽的8个坐标点
        let points = this.getAllControlPoints();
        ctx.save();
        points.forEach((point)=>{
            ctx.beginPath();
            // ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            // ctx.fill();
            ctx.fillStyle = ControlColor;
            ctx.fillRect(parseInt(point.x, 10) - 3.5, parseInt(point.y, 10) - 3.5, 6, 6);
            ctx.rect(parseInt(point.x, 10) - 3.5, parseInt(point.y, 10) - 3.5, 6, 6);
            ctx.stroke();
        });
        ctx.restore();
    }
    update(start, end) {
        this.start = start || this.start;
        this.end = end || this.end;
    }
    getPoints(start, end) {
        start = start || this.start;
        end = end || this.end;
        return Util.getMaxMin(start, end);
    }
    getAllControlPoints(start, end) {
        let {minX, minY, maxX, maxY} = this.getPoints(start, end);
        let width = maxX - minX;
        let height = maxY - minY;
        let points = [];
        points.push({x: minX, y: minY});
        points.push({x: minX + width / 2, y: minY});
        points.push({x: maxX, y: minY});
        points.push({x: maxX, y: minY + height / 2});
        points.push({x: maxX, y: maxY});
        points.push({x: minX + width / 2, y: maxY});
        points.push({x: minX, y: maxY});
        points.push({x: minX, y: minY + height / 2});
        return points;
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
            return true;
        }
        return false;
    }
    selectedMoveHandler(point) {
        // 是否在8个控制坐标点上 当前拖动区域为整个矩形框
        let points = this.getAllControlPoints(this.prevStart, this.prevEnd);
        let find = false;
        let index = -1;
        points.forEach((p, i)=>{
            if (Math.abs(this.selectedPoint.x - p.x) <= 5 && Math.abs(this.selectedPoint.y - p.y) <= 5) {
                find = true;
                index = i;
                return false;
            }
        });
        if (!find) {
            let diffX = this.selectedPoint.x - point.x;
            let diffY = this.selectedPoint.y - point.y;
            this.start.x = this.prevStart.x - diffX;
            this.end.x = this.prevEnd.x - diffX;
            this.start.y = this.prevStart.y - diffY;
            this.end.y = this.prevEnd.y - diffY;
        } else {
            var resizeHandler = ControlResize[index];
            let {minX, minY, maxX, maxY} = resizeHandler.call(this, point);
            this.start = new Point(minX, minY);
            this.end = new Point(maxX, maxY);
        }
    }
}
