// 方法记录.js
/**
 * keys 方法仅返回可枚举属性和方法的名称。
 */
// Create a constructor function.
function Pasta(grain, width, shape) {
    this.grain = grain;
    this.width = width;
    this.shape = shape;

    // Define a method.
    this.toString = function () {
        return (this.grain + ", " + this.width + ", " + this.shape);
    }
}

// Create an object.
var spaghetti = new Pasta("wheat", 0.2, "circle");

// Put the enumerable properties and methods of the object in an array.
var arr = Object.keys(spaghetti);
document.write (arr);

// Output:
// grain,width,shape,toString




  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);