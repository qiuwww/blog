import Line from './Line';
import {Util} from '../Util/';

export default class Arrow extends Line {
    constructor(start, end, config) {
        // 需要传入结束和开始位置，
        super(start, end, config);
    }
    draw(ctx) {
        Util.drawArrow(ctx, this.start.x, this.start.y, this.end.x, this.end.y, this.config.strokeStyle);
        if (this.selected) this.drawSelected(ctx);
    }
}
/**
 * 箭头 
 */