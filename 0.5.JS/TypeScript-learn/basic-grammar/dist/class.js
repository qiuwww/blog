"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Person61 = /** @class */ (function () {
    function Person61(n) {
        this.name = n;
    }
    Person61.prototype.run = function () {
        console.log(this.name);
    };
    return Person61;
}());
var p61 = new Person61('张三');
console.log("p61: ", p61);
p61.run();
// 完整创建
var Person62 = /** @class */ (function () {
    function Person62(name) {
        this.name = name;
    }
    Person62.prototype.getName = function () {
        return this.name;
    };
    Person62.prototype.setName = function (name) {
        this.name = name;
    };
    return Person62;
}());
var p62 = new Person62('张三');
console.log("p62: ", p62);
console.log(p62.getName());
p62.setName('李四');
console.log(p62.getName());
// 2、ts中实现继承  extends、 super
var Person63 = /** @class */ (function () {
    // new 的时候给定的参数
    function Person63(name) {
        this.name = name;
    }
    Person63.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person63;
}());
// let p = new Person('王五');
// console.log(p.run())
var Web63 = /** @class */ (function (_super) {
    __extends(Web63, _super);
    function Web63(name) {
        return _super.call(this, name) || this;
    }
    return Web63;
}(Person63));
var w63 = new Web63('李四');
console.log("w63: ", w63);
console.log(w63.run());
// ts中继承的探讨  父类的方法和子类的方法一致
var Person64 = /** @class */ (function () {
    function Person64(name) {
        this.name = name;
    }
    Person64.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person64;
}());
var p64 = new Person64('王五');
console.log("p64: ", p64);
console.log(p64.run());
// 结合extends与super继承
var Web64 = /** @class */ (function (_super) {
    __extends(Web64, _super);
    function Web64(name) {
        // 构造函数赋值
        return _super.call(this, name) || this;
    }
    // 方法重写
    Web64.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8-\u5B50\u7C7B";
    };
    Web64.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web64;
}(Person64));
var w64 = new Web64('李四');
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
var Person65 = /** @class */ (function () {
    function Person65(name) {
        this.name = name;
    }
    Person65.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person65;
}());
var p65 = new Person65('王五');
console.log("p65: ", p65);
console.log(p65.run());
var Web65 = /** @class */ (function (_super) {
    __extends(Web65, _super);
    function Web65(name) {
        return _super.call(this, name) || this;
    }
    Web65.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8-\u5B50\u7C7B";
    };
    Web65.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web65;
}(Person65));
var w65 = new Web65('李四');
w65.work();
// 类外部访问公有属性
var Person66 = /** @class */ (function () {
    function Person66(name) {
        this.name = name;
    }
    Person66.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person66;
}());
var p66 = new Person66('哈哈哈');
console.log("p66: ", p66);
// 并不是指全局
console.log(p66.name);
// protected：保护类型    在类里面、子类里面可以访问 ，在类外部没法访问
var Person67 = /** @class */ (function () {
    function Person67(name) {
        this.name = name;
    }
    Person67.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person67;
}());
var p67 = new Person67('王五');
console.log(p67.run());
// console.log(p67.name); // 属性“name”受保护，只能在类“Person67”及其子类中访问。
var Web67 = /** @class */ (function (_super) {
    __extends(Web67, _super);
    function Web67(name) {
        return _super.call(this, name) || this;
    }
    Web67.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web67;
}(Person67));
var w67 = new Web67('李四11');
w67.work();
console.log(w67.run());
// 类外外部没法访问保护类型的属性
var Person69 = /** @class */ (function () {
    function Person69(name) {
        this.name = name;
    }
    Person69.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person69;
}());
var p69 = new Person69('哈哈哈');
// 这里无法访问了， 类外部无法访问保护属性
// console.log(p69.name);
// private ：私有 在类里面可以访问，子类、类外部都没法访问
var Person610 = /** @class */ (function () {
    function Person610(name) {
        this.name = name;
    }
    Person610.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person610;
}());
var p610 = new Person610('哈哈哈');
console.log("p610: ", p610);
console.log(p610.run());
var Web610 = /** @class */ (function (_super) {
    __extends(Web610, _super);
    function Web610(name) {
        return _super.call(this, name) || this;
    }
    Web610.prototype.work = function () {
        // 子类在这里就无法访问name了
        // console.log(`${this.name}在工作`)
    };
    return Web610;
}(Person610));
// readonly修饰符
// 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 8;
        this.name = theName;
    }
    return Octopus;
}());
var dad = new Octopus("Man with the 8 strong legs");
console.log("readonly object: ", Octopus.prototype, dad);
console.log("Octopus.name: ", dad.name);
// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
// 存取器
console.log("### 存取器");
// TypeScript支持通过getters / setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
// 只带有 get不带有 set的存取器自动被推断为 readonly。
var passcode = "secret passcode";
var Employee = /** @class */ (function () {
    function Employee() {
        this._fullName = ''; // 私有属性最好以 _ 开头
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log("Employee: ", employee.fullName);
}
console.log("### 静态属性 静态方法");
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
var Person611 = /** @class */ (function () {
    function Person611(name) {
        this.age = 20;
        this.name = name;
    }
    /*实例方法*/
    Person611.prototype.run = function () {
        console.log(this.name + "\u5728\u8FD0\u52A8");
    };
    Person611.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    Person611.print = function () {
        console.log('print方法' + Person611.sex);
    };
    // 静态属性
    Person611.sex = "男";
    return Person611;
}());
var p611 = new Person611('张三');
console.log("p611: ", p611);
// 实例方法，通过实例来调用
p611.run();
// 通过类名来调用
Person611.print();
console.log(Person611.sex); // 打印类方法
// 多态: 父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现 
// 多态属于继承
var Animal612 = /** @class */ (function () {
    function Animal612(name) {
        this.name = name;
    }
    Animal612.prototype.eat = function () {
        // 具体吃什么不知道，具体吃什么? 继承它的子类去实现，每一个子类的表现不一样
        console.log('吃的方法');
    };
    return Animal612;
}());
var Dog612 = /** @class */ (function (_super) {
    __extends(Dog612, _super);
    function Dog612(name) {
        return _super.call(this, name) || this;
    }
    Dog612.prototype.eat = function () {
        return this.name + '吃粮食';
    };
    return Dog612;
}(Animal612));
var Cat612 = /** @class */ (function (_super) {
    __extends(Cat612, _super);
    function Cat612(name) {
        return _super.call(this, name) || this;
    }
    Cat612.prototype.eat = function () {
        return this.name + '吃老鼠';
    };
    return Cat612;
}(Animal612));
console.log("### 抽象类");
// typescript中的抽象类：它是提供其他类继承的基类base，不能直接被实例化。
// 用abstract关键字定义抽象 类 和 抽象方法，抽象类中的抽象方法不包含具体实现并且 必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。标准：Animal 这个类要求它的子类 必须 包含eat方法
// 标准:
var Animal613 = /** @class */ (function () {
    function Animal613(name) {
        this.name = name;
    }
    Animal613.prototype.run = function () {
        console.log('其他方法可以不实现');
    };
    return Animal613;
}());
// 无法创建抽象类的实例
// let a613=new Animal613() /*错误的写法*/
var Dog613 = /** @class */ (function (_super) {
    __extends(Dog613, _super);
    // 抽象类的子类必须实现抽象类里面的抽象方法
    function Dog613(name) {
        return _super.call(this, name) || this;
    }
    // 这里是必须的
    Dog613.prototype.eat = function () {
        console.log(this.name + '吃粮食');
    };
    return Dog613;
}(Animal613));
// 这里可以创建实例
var d613 = new Dog613('小花花');
console.log("d613: ", d613);
d613.eat();
var Cat613 = /** @class */ (function (_super) {
    __extends(Cat613, _super);
    // 抽象类的子类必须实现抽象类里面的抽象方法
    function Cat613(name) {
        return _super.call(this, name) || this;
    }
    Cat613.prototype.run = function () {
    };
    Cat613.prototype.eat = function () {
        console.log(this.name + '吃老鼠');
    };
    return Cat613;
}(Animal613));
var c613 = new Cat613('小花猫');
c613.eat();
/**
 * static 与 private 有什么区别与联系
 */
// 1. 静态属性和方法是在类上的属性和方法，只有类名可以调用，实例，子类都不可以调用；使用类名访问。
// 2. 私有属性，类内部通过this调用。类中访问。
var TestStaticAndPrivatePerson = /** @class */ (function () {
    function TestStaticAndPrivatePerson(name) {
        // 私有属性
        this.age = 20;
        this.name = name;
    }
    // 这里定义的似有方法只能在自己内部使用，对外部无法调用，只能是内部的中间过程
    TestStaticAndPrivatePerson.prototype.getSex = function () {
        return this.age;
    };
    TestStaticAndPrivatePerson.prototype.getName = function () {
        return this.age;
    };
    TestStaticAndPrivatePerson.print = function () {
        console.log('print方法' + TestStaticAndPrivatePerson.sex);
    };
    // 静态属性
    TestStaticAndPrivatePerson.sex = "男";
    return TestStaticAndPrivatePerson;
}());
// 
console.log("类 TestStaticAndPrivatePerson: ", TestStaticAndPrivatePerson);
// 这里是一个函数，具有sex属性，print方法，以及一些函数所特有的name，length，caller，arguments，prototype等属性
console.dir(TestStaticAndPrivatePerson);
// 这里可以拿到类的原型
console.dir(TestStaticAndPrivatePerson.prototype);
var person612 = new TestStaticAndPrivatePerson('xiaohuang');
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
