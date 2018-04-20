

// 1. this在调用的时候被绑定


// 测试代码1

function a() {
    console.log("a.this: ", this); // a在window中调用，内部函数同样也是在window内调用
    b();
}
function b() {
    console.log("b.this: ", this); // 指向window，函数a没有独立的作用上下文，换用let同样
}
a();


// 2. 回调函数丢失this绑定

function foo() {
    console.log("foo.this: ", this);
}

var obj = {
    a: "a obj",
    foo: foo
}

obj.foo(); // ->obj

var a = obj.foo;

a(); // -> window


// 3. 显式绑定

// call || apply || bind

var obj2 = {
    c: 2
}

// call的绑定结果会直接运行
foo.call(obj2); // ->obj2

foo.call(3); // ->Number类型的一个值


// 4. 显示调用||隐式调用||new操作符||默认的调用位置绑定

// 5. bind，bind的第一个参数指向内部函数this的指向，如果传递null就是不关心this的指向，this自动寻找

