

## extends，继承创建类

extends关键字用于类声明或者类表达式中，以创建一个类，该类是另一个类的子类。

extends关键字用来创建一个普通类或者内建对象的子类。

继承的.prototype必须是一个Object 或者 null。

## Object.create()，继承创建对象

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请查看浏览器控制台以获取视觉证据。）

proto： 新创建对象的原型对象。对应一个实例或者一个构造函数的prototype。
propertiesObject：可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。


返回值：一个新对象，带着指定的原型对象和属性。

## Object.assign()，混入对象，多个继承
如果你希望能继承到多个对象，则可以使用混入的方式。