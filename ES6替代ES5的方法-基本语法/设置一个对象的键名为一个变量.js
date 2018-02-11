

// ES6
const foo = 'bar';
const baz = { [foo]: 'abc'};

// ES5 也是可以用一用的
const test = JSON.parse(`{"${foo}":"test"}`);


// 直接赋值呢
var a = {};
var b = "key";
var c = "value";
a[b] = c; 