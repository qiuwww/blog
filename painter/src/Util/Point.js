export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    toString() {
        return `x:${this.x};y:${this.y}`;
    }
}
