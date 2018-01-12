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
/**
 * 定义基本的点
 * clone:
 * toString(): 重写了toSting方法，为了什么？
 */