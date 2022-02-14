import '../styles/normalize'; //通用的ressa

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
