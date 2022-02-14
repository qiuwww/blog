/**
 * section 1
 */
console.log("## section 1 -> 实时运行环境的搭建");
console.log('hello ts');
// 定义一个变量，类型是number，然后赋值123
var num = 123;
// 这里的num与index2中的num相同，在这里export作为一个包，所以可以确保不提示num重声明
export { num };
