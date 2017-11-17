import Rect from './Rect';
import {Util} from '../Util/';

export default class Ellipse extends Rect {
    constructor(start, end, config) {
        super(start, end, config);
    }
    draw(ctx) {
        let {minX, minY, maxX, maxY} = this.getPoints();
        let width = maxX - minX;
        let height = maxY - minY;
        let a = width / 2;
        let b = height / 2;
        let x = (maxX + minX) / 2;
        let y = (maxY + minY) / 2;
        Util.drawEllipse(ctx, x, y, a, b, this.config.fillStyle, this.config.strokeStyle);
        if (this.selected) this.drawSelected(ctx);
    }
}
