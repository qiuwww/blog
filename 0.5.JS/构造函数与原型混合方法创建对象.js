// 原型方法：
function People(name, age) {
  this.age = age;
  this.name = name;
}
// 添加原型方法
People.prototype.sayName = function() {
  alert(this.name);
  // 方便方法的链式操作
  return this;
};
People.prototype.sayAge = function() {
  alert(this.age);
  return this;
};
var xiaoming = new People("xiaoming", 20);
xiaoming.sayAge().sayName();
