console.log("## section 4 -> 类");

// 4、typeScript中的类

// 4.1 类的定义
// 4.2 继承
// 4.3 类里面的修饰符
// 4.4 静态属性 静态方法
// 4.5 抽象类 继承 多态

// 1、ts中类的定义

/* es5: 
  function Person(name) {
    this.name = name;
    this.run = function () {
      console.log(this.name)
    }
  }
  let p = new Person('张三');
  p.run()
*/

/*
* ts中定义类：
*/


class Person61 {
  name: string;   // 属性  前面省略了public关键词
  constructor(n: string) {  //构造函数   实例化类的时候触发的方法
    this.name = n;
  }
  run(): void {
    console.log(this.name);
  }
}
let p61 = new Person61('张三');
console.log("p61: ", p61);

p61.run()


// 完整创建
class Person62 {
  name: string;
  constructor(name: string) {  //构造函数   实例化类的时候触发的方法
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
let p62 = new Person62('张三');
console.log("p62: ", p62);

console.log(p62.getName());
p62.setName('李四');
console.log(p62.getName());

// 2、ts中实现继承  extends、 super

class Person63 {
  name: string;
  // new 的时候给定的参数
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}
// let p = new Person('王五');
// console.log(p.run())

class Web63 extends Person63 {
  constructor(name: string) {
    super(name);  /*初始化调用父类的构造函数*/
  }
}

let w63 = new Web63('李四');
console.log("w63: ", w63);

console.log(w63.run());

// ts中继承的探讨  父类的方法和子类的方法一致
class Person64 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}
let p64 = new Person64('王五');
console.log("p64: ", p64);
console.log(p64.run())

// 结合extends与super继承
class Web64 extends Person64 {
  constructor(name: string) {
    // 构造函数赋值
    super(name);  /*初始化父类的构造函数*/
  }
  // 方法重写
  run(): string {
    return `${this.name}在运动-子类`
  }
  work() {
    console.log(`${this.name}在工作`)
  }
}
let w64 = new Web64('李四');
console.log("w64: ", w64);
w64.work();
console.log(w64.run());


// 3、类里面的修饰符 typescript里面 定义属性 的时候给我们提供了 三种修饰符

/*
  public: 公有          在当前类里面、子类、类外面都可以访问
  protected: 保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
  private: 私有         在当前类里面可以访问，子类、类外部都没法访问

  属性如果不加修饰符 默认就是 公有 （public）
*/

// public: 公有  在类里面、子类、类外面都可以访问
class Person65 {
  public name: string;  /*公有属性*/
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}
let p65 = new Person65('王五');
console.log("p65: ", p65);

console.log(p65.run())
class Web65 extends Person65 {
  constructor(name: string) {
    super(name);  /*初始化父类的构造函数*/
  }
  run(): string {
    return `${this.name}在运动-子类`
  }
  work(): void {
    console.log(`${this.name}在工作`)
  }
}

let w65 = new Web65('李四');

w65.work();


// 类外部访问公有属性

class Person66 {
  public name: string;  /*公有属性*/
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}

let p66 = new Person66('哈哈哈');
console.log("p66: ", p66);
// 并不是指全局
console.log(p66.name);

// protected：保护类型    在类里面、子类里面可以访问 ，在类外部没法访问


class Person67 {
  protected name: string;  /*公有属性*/
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}
let p67 = new Person67('王五');
console.log(p67.run());
// console.log(p67.name); // 属性“name”受保护，只能在类“Person67”及其子类中访问。

class Web67 extends Person67 {
  constructor(name: string) {
    super(name);  /*初始化父类的构造函数*/
  }
  work() {
    console.log(`${this.name}在工作`)
  }
}

let w67 = new Web67('李四11');
w67.work();

console.log(w67.run());

// 类外外部没法访问保护类型的属性
class Person69 {
  protected name: string;  /*保护类型*/
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}
let p69 = new Person69('哈哈哈');
// 这里无法访问了， 类外部无法访问保护属性
// console.log(p69.name);

// private ：私有 在类里面可以访问，子类、类外部都没法访问

class Person610 {
  // 私有相当于静态属性
  private name: string;  /*私有*/
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在运动`
  }
}

let p610 = new Person610('哈哈哈');
console.log("p610: ", p610);

console.log(p610.run());
class Web610 extends Person610 {
  constructor(name: string) {
    super(name)
  }
  work() {
    // 子类在这里就无法访问name了
    // console.log(`${this.name}在工作`)
  }
}

// readonly修饰符
// 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
console.log("readonly object: ", Octopus.prototype, dad);
console.log("Octopus.name: ", dad.name);
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

// 存取器
console.log("### 存取器")
// TypeScript支持通过getters / setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
// 只带有 get不带有 set的存取器自动被推断为 readonly。
let passcode = "secret passcode";
class Employee {
  private _fullName: string = ''; // 私有属性最好以 _ 开头
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log("Employee: ", employee.fullName);
}

console.log("### 静态属性 静态方法")

// 静态属性 静态方法 ，类属性与方法

/*
    function Person(){
      this.run1 = function(){ // 实例方法
      }
    }
    Person.name = '哈哈哈'; // 静态属性，原型上的属性
    Person.run2 = function(){  静态方法
    }
    let p = new Person();
    Person.run2(); 静态方法的调用
*/

/*
  function $(element){
    return new Base(element)
  }
  $.get = function(){
  }
  function Base(element){
    // 实例方法
    this.element = 获取dom节点;
    this.css = function(arr,value){
      this.element.style.arr=value;
    }
  }
  $('#box').css('color','red');
  // 静态方法，不需要进行实例化
  $.get('url',function(){});
*/

class Person611 {
  public name: string;
  public age: number = 20;
  // 静态属性
  static sex = "男";
  constructor(name: string) {
    this.name = name;
  }
  /*实例方法*/
  run() {
    console.log(`${this.name}在运动`)
  }
  work() {
    console.log(`${this.name}在工作`)
  }
  static print() {  /*静态方法 里面没法直接调用类里面的属性*/
    console.log('print方法' + Person611.sex);
  }
}

let p611 = new Person611('张三');
console.log("p611: ", p611);
// 实例方法，通过实例来调用
p611.run();
// 通过类名来调用
Person611.print();
console.log(Person611.sex); // 打印类方法

// 多态: 父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现 
// 多态属于继承
class Animal612 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    // 具体吃什么不知道，具体吃什么? 继承它的子类去实现，每一个子类的表现不一样
    console.log('吃的方法')
  }
}

class Dog612 extends Animal612 {
  constructor(name: string) {
    super(name)
  }
  eat(): string {
    return this.name + '吃粮食'
  }
}
class Cat612 extends Animal612 {
  constructor(name: string) {
    super(name)
  }
  eat(): string {
    return this.name + '吃老鼠'
  }
}
console.log("### 抽象类")
// typescript中的抽象类：它是提供其他类继承的基类base，不能直接被实例化。
// 用abstract关键字定义抽象 类 和 抽象方法，抽象类中的抽象方法不包含具体实现并且 必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。标准：Animal 这个类要求它的子类 必须 包含eat方法

// 标准:
abstract class Animal613 {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract eat(): any;  // 抽象方法不包含具体实现并且必须在派生类中实现。
  run() {
    console.log('其他方法可以不实现')
  }
}
// 无法创建抽象类的实例
// let a613=new Animal613() /*错误的写法*/

class Dog613 extends Animal613 {
  // 抽象类的子类必须实现抽象类里面的抽象方法
  constructor(name: any) {
    super(name)
  }
  // 这里是必须的
  eat() {
    console.log(this.name + '吃粮食')
  }
}
// 这里可以创建实例
let d613 = new Dog613('小花花');
console.log("d613: ", d613);
d613.eat();

class Cat613 extends Animal613 {
  // 抽象类的子类必须实现抽象类里面的抽象方法
  constructor(name: any) {
    super(name)
  }
  run() {
  }
  eat() {
    console.log(this.name + '吃老鼠')
  }
}

let c613 = new Cat613('小花猫');
c613.eat();



/**
 * static 与 private 有什么区别与联系
 */

// 1. 静态属性和方法是在类上的属性和方法，只有类名可以调用，实例，子类都不可以调用；使用类名访问。
// 2. 私有属性，类内部通过this调用。类中访问。

class TestStaticAndPrivatePerson {
  // 定义共享属性
  public name: string;
  // 私有属性
  private age: number = 20;
  // 静态属性
  static sex = "男";
  constructor(name: string) {
    this.name = name;
  }
  // 这里定义的似有方法只能在自己内部使用，对外部无法调用，只能是内部的中间过程
  private getSex() {
    return this.age;
  }
  getName() {
    return this.age;
  }
  static print() {  /*静态方法 里面没法直接调用类里面的属性*/
    console.log('print方法' + TestStaticAndPrivatePerson.sex);
  }
}
// 
console.log("类 TestStaticAndPrivatePerson: ", TestStaticAndPrivatePerson);
// 这里是一个函数，具有sex属性，print方法，以及一些函数所特有的name，length，caller，arguments，prototype等属性
console.dir(TestStaticAndPrivatePerson);
// 这里可以拿到类的原型
console.dir(TestStaticAndPrivatePerson.prototype);

let person612 = new TestStaticAndPrivatePerson('xiaohuang');
// 这里的实例包括age、name与getName方法
console.log("TestStaticAndPrivatePerson: ", person612);

console.log("person612.name: ", person612.name);
// Property 'sex' is a static member of type
// console.log("person612.sex: ", person612.sex);
console.log("person612.sex: ", TestStaticAndPrivatePerson.sex);
console.log("TestStaticAndPrivatePerson.print(): ", TestStaticAndPrivatePerson.print());
// 属性“age”为私有属性，只能在类“TestStaticAndPrivatePerson”中访问。
// console.log("person612.age: ", person612.age);
// 类型“typeof TestStaticAndPrivatePerson”上不存在属性“age”。
// console.log("TestStaticAndPrivatePerson.age: ", TestStaticAndPrivatePerson.age);
