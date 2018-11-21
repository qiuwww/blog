// js基本规范.js


避免全局变量：

;(function(){
	// your code
})();

变量命名：

1. 基本变量驼峰式，如 thisIsMyName；
2. 常量使用大写，如 URL，MAX_COUNT，ID；
3. 尽量使用单引号，如 var str = 'string'；

尝试使用 严格等于 === 替代 自动转换类型的等于 ==


代码注释：

1. 多行代码块注释，三行；
/**
 * 注释
 */
用于注释：函数，逻辑复杂的代码，业务复杂的代码，可能存在错误的代码，浏览器hack代码。
2. 单行注释，一般的说明；
3. 文档注释，参看jsDoc；


模块化思想编程：
1. 抽象为模块，轻业务；


文件引用：
1. 省略文档类型声明；


## 常量
命名方式：全部大写
命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词
命名建议：语义化
```
const MAX_COUNT = 10;
const URL = 'http://www.foreverz.com';
```

## 函数
命名方式：小驼峰式命名法。
命名规范：前缀应当为动词。
命名建议：语义化

函数第一个单词，建议如下中选择：

返回一个boolean值：
  - can： 判断是否可执行后续动作；
  - has： 判断是否有某个值；
  - is： 判断是否为某个值；
返回一个非boolean值：
  + get： 获取某个值；
  + set： 设置某个值；
  + load： 加载某些数据；

## 类、构造函数
命名方式：大驼峰式命名法，首字母大写
命名规范：前缀为名称。
命名建议：语义化

公共属性和方法：跟变量和函数的命名一样。
私有属性和方法：前缀为_(下划线)，后面跟公共属性和方法一样的命名方式。

```
class Person {
  private _name: string;
  public name: string;
  constructor() { }
  // 公共方法
  getName() {
    return this._name;
  }
  // 公共方法
  setName(name) {
    this._name = name;
  }
}
const person = new Person();
person.setName('mervyn');
person.getName(); // ->mervyn
```

## css（class、id）命名规则BEM

我们还是使用大团队比较常用的BEM模式

（1）class命名使用BEM其实是块（block）、元素（element）、修饰符（modifier）的缩写，利用不同的区块，功能以及样式来给元素命名。这三个部分使用__与--连接（这里用两个而不是一个是为了留下用于块儿的命名）。
命名约定的模式如下：
```
.block{}
.block__element{}
.block--modifier{}
block 代表了更高级别的抽象或组件
block__element 代表 block 的后代，用于形成一个完整的 block 的整体
block--modifier代表 block 的不同状态或不同版本
```
（2）id一般参与样式，命名的话使用驼峰，如果是给js调用钩子就需要设置为js_xxxx的方式
