import Line from './Line';
import {Util} from '../Util/';

export default class Arrow extends Line {
    constructor(start, end, config) {
        super(start, end, config);
    }
    draw(ctx) {
        Util.drawArrow(ctx, this.start.x, this.start.y, this.end.x, this.end.y, this.config.strokeStyle);
        if (this.selected) this.drawSelected(ctx);
    }
}
