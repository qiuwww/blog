// 类型声明
function greeter(person) {
    return "Hello, " + person;
}
console.log("greeter:", greeter('world'));
function greeter2(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
console.log("greeter2:", greeter2({ firstName: "Jane", lastName: "User" }));
// 类
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter3(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log("greeter3:", greeter3(user));
console.log("##############1.元组##############");
var x;
// Initialize it
x = ['hello', 10]; // OK
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
// 这里的饮用会报错
// console.log(x[4].toString()); // OK, 'string' 和 'number' 都有 toString
console.log("##############/元组##############");
console.log('****************2.any*****************');
var notSure = 4;
// notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
console.log('notSure', notSure);
console.log('****************/any*****************');
console.log('$$$$$$$$$$$$$3.对象的类型声明$$$$$$$$$$$$$$');
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
console.log("{a, b}", a, b);
console.log('$$$$$$$$$$$$$/对象的类型声明$$$$$$$$$$$$$$');
