// exp.js
let num = 1; // 导出基础类型
let obj = {
  a: 1,
};
console.log('####exp.js-1', { num, obj }); // 最先运行 1 1

let changeValue = () => {
  num = 2;
  obj.a = 3;
  // 这里运行之后，内部的改变了，但是require的一般类型还是没有改变，引用类型改变了
  console.log('####exp.js-2', { num, obj }); // 第三个运行，在a的前面， 2 3
};

setTimeout(() => {
  // a中更改obj的值之后打印了b
  console.log('####exp.js-3', { num, obj }); // 2 12， 也就是num只可以当前模块内可更改，obj却可以被引用的模块改变
}, 1000);

module.exports = {
  num,
  obj,
  changeValue,
};
