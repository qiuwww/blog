/** @constant
    @type {string}
    @default
*/
const RED = 'FF0000';

/** @constant {number} */
var ONE = 1;


/**
 * Enum for tri-state values. 枚举
 * @readonly
 * @enum {number}
 */
var triState = {
  /** The true value */
  TRUE: 1,
  FALSE: -1,
  /** @type {boolean} */
  MAYBE: true
};

(function () {
  /** @global */
  var foo = 'hello foo';

  this.foo = foo;
}).apply(window);
