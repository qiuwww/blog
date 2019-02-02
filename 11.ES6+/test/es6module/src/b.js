// b.js
let num = 1 // 导出基础类型
let obj = {
  a: 1
}
console.log("b.js-1", { num, obj }); 

let changeValue = () => {
  num = 2;
  obj.a = 3;
  console.log("b.js-2", { num, obj }); 
}

setTimeout(() => {
  console.log("b.js-3", { num, obj }); 
}, 1000);

export {
  num,
  obj,
  changeValue
}