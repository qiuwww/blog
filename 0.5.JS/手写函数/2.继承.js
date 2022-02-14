/**
 * @desc 组合继承，基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
 */

function Animal(name) {
  this.name = name;
  this.colors = ['black', 'white'];
}

Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('brown');

let dog2 = new Dog('哈赤', 1);
console.log(dog2);
// { name: "哈赤", colors: ["black", "white"], age: 1 }

// 组合继承已经相对完善了，但还是存在问题，它的问题就是调用了 2 次父类构造函数，第一次是在 new Animal()，第二次是在 Animal.call() 这里。

// 所以解决方案就是不直接调用父类构造函数给子类原型赋值，而是通过创建空函数 F 获取父类原型的副本。

/**
 * @description 寄生式组合继承
 */

function Animal(name) {
  this.name = name;
  this.colors = ['black', 'white'];
}

Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}

// 获取父原型的副本，借用中间函数空间，这块等价于 new Animal()
// 避免了调用超类的构造函数
function getParentPrototype(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 这里传入的child和parent都是构造函数
function inheritPrototype(child, parent) {
  let prototype = getParentPrototype(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

inheritPrototype(Dog, Animal);

// 所谓寄生组合式继承：通过借用构造函数来继承属性（apply），通过原型链的混成形式来继承方法（Object.create）

// 思路：不需要为了指定子类型的原型而调用超类型的构造函数（我理解为就是不需要显示的new操作），通过上面的寄生式继承方式来继承超类型的原型即可。
