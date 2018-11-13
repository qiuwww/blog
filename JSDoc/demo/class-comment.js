/**
 * Class representing a point.，类的说明
 * @name Point
 * @author qiu <1014913222@qq.com>
 * @classdesc This is a description of the Point class. 这里会覆盖前面的类的说明。
 * @version 1.2.3
 * {@link https://github.com GitHub}.
 * {@tutorial destroy Destroying a Widget}.
 */
class Point {
  /**
   * Create a point. 构造函数，功能描述
   * @param {number} x - The x value. 这里是参数的描述
   * @param {number} y - The y value.
   */
  constructor(x, y) {
    // ...
  }

  /**
   * Get the x value.
   * @return {number} The x value.
   */
  getX() {
    // ...
    /** @access private */
    var foo = 0;

    /** @access protected */
    this._bar = 1;

    /** @access public */
    this.pez = 2;
  }

  /**
   * Get the y value.
   * @return {number} The y value.
   */
  getY() {
    // ...
  }

  /**
   * Convert a string containing two comma-separated numbers into a point.这里的静态方法，首先展示。
   * @param {string} str - The string containing two comma-separated numbers.
   * @return {Point} A Point object. 返回值的描述，返回了一个类Point
   */
  static fromString(str) {
    // ...
  }
}

/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
  /**
   * Create a dot.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} width - The width of the dot, in pixels.
   */
  constructor(x, y, width) {
    // ...
  }

  /**
   * Get the dot's width.
   * @return {number} The dot's width, in pixels.
   */
  getWidth() {
    // ...
  }
}
