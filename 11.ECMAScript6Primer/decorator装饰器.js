// npx babel-node decorator装饰器.js
/**
 * @description @ 装饰器在业务中的应用，类修饰器（只有一个参数）
 * 用于修改类的行为，ES7的提案，需要babel编译。
 * 对于类的修改是在编译时发生的，而不是运行时。
 * 修饰器接受三个参数：目标函数target、属性名和该属性的描述对象，后两个可以省略。
 * target -> 指向类，如果是类型是 function，则指向 MyFunction.prototype
 * 高阶函数，dva，redux，antd的From组件，都是基于此方式。
 */

/**
 * 默认修改，无参数，给类的prototype添加静态属性isTestAble
 */

function addAttr(target) {
  // 这样添加的是静态方法，实例无法继承
  target.isTestAble = true;
}

@addAttr
class TargetClass {}

console.log('TargetClass.isTestAble', TargetClass.isTestAble); // true
const instantiate = new TargetClass();
console.log('instantiate.isTestAble', instantiate.isTestAble); // undefined

/**
 * @description 可以传递参数的装饰器
 */
function setName(setName) {
  return function(target) {
    target.setName = setName;
  };
}

@setName('lilei')
class TargetClass2 {}

console.log('TargetClass2.setName', TargetClass2.setName);

/**
 * 方法的修饰
 */

// 属于修饰类的属性，比如debounce与throttle方法
// 不能修饰一般的函数，会存在函数提升，但是可以作为高阶函数使用
// 目标对象、参数名、属性描述
function readonly(target, name, descriptor) {
  console.log('descriptor', descriptor);
  descriptor.writable = false;
  return descriptor;
}

class Person {
  first = 'qiu';
  last = 'wei';

  @readonly
  getName() {
    return `${this.first} ${this.last}`;
  }
}
// 这里是实例方法，不是静态方法
const qiu = new Person();
console.log('new Person().getName()', qiu.getName());

// 装饰器第一个参数是类的原型对象，上例是Person.prototype，装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰
// 如下的代码会报错，因为getName是只读的，不可写
// qiu.getName = () => {};
