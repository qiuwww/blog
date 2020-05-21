/**
 * ES6与ES5的类型声明对比
 */

/**
 * ES6
 */
class Shape {
  // 构造函数
  constructor(id, x, y) {
    this.id = id;
    this.move(x, y);
  }
  // 静态方法
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}
// 继承子类
class Rectangle extends Shape {
  constructor(id, x, y, width, height) {
    super(id, x, y); // 关键步骤
    this.width = width;
    this.height = height;
  }
}
class Circle extends Shape {
  constructor(id, x, y, radius) {
    // 调用父类的静待方法，添加到子类上
    super(id, x, y);
    this.radius = radius;
  }
}

/**
 * ES5
 */

// 使用构造函数与原型混合的方法，似乎更方便一些
var Shape2 = function (id, x, y) {
  this.id = id;
  this.move(x, y);
  // 默认retrun this
};
Shape2.prototype.move = function (x, y) {
  this.x = x;
  this.y = y;
};

var Rectangle2 = function (id, x, y, width, height) {
  Shape.call(this, id, x, y);
  this.width = width;
  this.height = height;
};
Rectangle2.prototype = Object.create(Shape2.prototype);
Rectangle2.prototype.constructor = Rectangle2;

var Circle2 = function (id, x, y, radius) {
  Shape.call(this, id, x, y);
  this.radius = radius;
};
Circle2.prototype = Object.create(Shape2.prototype);
Circle2.prototype.constructor = Circle2;

/**
 * 上下两段代码ES6完胜ES5，类的声明更简洁也更专业，有点Java的味道。
 * 另外，extends命令，super方法让继承变的简单。这对于习惯于面向对象开发的同学而言简直就是福音啊。
 * 个人觉得面向对象是JavaScript开发很重要的一部分，虽然强调组件化，但是组件的开发依然无法离开面向对象存在。
 * 再加上ES6的静态方法，模块化让JS开发生产力更上一层楼。
 */
