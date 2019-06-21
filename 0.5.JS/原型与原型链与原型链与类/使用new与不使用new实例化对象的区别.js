
// 创建一个类
function Person(name, sex) {
    this.name = name;
    this.sex = sex;
    console.log(this);
}
Person.prototype.say = function() {
    console.log(`my name is ${this.name}!`);
}

// test
// 第一种是构造函数式，即通过new运算符调用构造函数Function来创建函数
var person1 = new Person('xiaoming', 'male');
// 第二种不是实例化，只是调用函数把返回值赋给变量。
var person2 = Person('xiaohong', 'formale');


// 1. 调用之后的返回结果：
person1
// Person {name: "xiaoming", sex: "male"}
person2
// undefined
// 2. 调用方法
person1.say();
// my name is xiaoming!

person2.say();
// 报错：Cannot read property 'say' of undefined

// 3. 全局调用name，得到"xiaohong"

// 异同
// 1. 使用new方法最终会返回当前创建的对象，不使用new方法，最终只会是一个函数调用，返回结果依据构造函数内的返回说明。
// 2. 使用new会创建一个对象（函数上下文执行环境在当前对象，this指向当前对象），不使用new的时候，只是创建了几个全局变量（this指向全局）。
// 3. 当使用new 关键字来调用构造函数时，执行上下文从全局对象（window）变成一个空的上下文，这个上下文代表了新生成的实例。因此，this 关键字指向当前创建的实例。
// 4. 默认情况下，如果你的构造函数中没有返回任何内容，就会返回this——当前的上下文。