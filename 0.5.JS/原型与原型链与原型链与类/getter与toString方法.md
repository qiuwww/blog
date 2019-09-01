## toString() 方法返回一个表示该对象的字符串。

- 可以自定义一个方法来取代默认的 toString() 方法。**该 toString() 方法不能传入参数并且必须返回一个字符串。自定义的 toString() 方法可以是任何我们需要的值**，但如果它附带有关对象的信息，它将变的非常有用。

- 如果当前的对象调用了 toString() 方法，它将会返回从Object继承下来的 toString()方法的返回默认值“[[object Object]]”。

- 任何时候在**字符串上下文中直接使用对象**，JavaScript 都会自动调用 toString() 方法，并且返回字符串。

- 重写toString方法：

  ```
  Dog.prototype.toString = function dogToString() {
    var ret = "Dog " + this.name + " is a " + this.sex + " " + this.color + " " + this.breed;
    return ret;
  }
  ```
- 应用：

  - 检测对象类型

    ```
    var toString = Object.prototype.toString;

    toString.call(new Date); // [object Date]
    toString.call(new String); // [object String]
    toString.call(Math); // [object Math]

    //Since JavaScript 1.8.5
    toString.call(undefined); // [object Undefined]
    toString.call(null); // [object Null]
    ```

    ​


## getter方法，将对象属性绑定到查询该属性时将被调用的函数。（计算属性）

也就是每次的**对象取属性值的操作**都会调用这个方法。

> ```
> 语法： {get prop() { ... } }
> ```

**有时需要允许访问返回动态计算值的属性，或者你可能需要反映内部变量的状态，而不需要使用显式方法调用**。在JavaScript中，可以使用 *getter *来实现。虽然可以使用 getter 和 setter 来创建一个伪属性类型，但是不可能同时将一个 getter 绑定到一个属性并且该属性实际上具有一个值。

可通过 delete 操作符删除 getter。

```
var obj = {
  log: ['example','test'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  }
}
console.log(obj.latest); // "test"

只需使用 delete，就可删除 getter：
delete obj.latest;
```
要随时将 getter 添加到现有对象，使用 Object.defineProperty().

```
var o = { a:0 }

Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });

console.log(o.b) // Runs the getter, which yields a + 1 (which is 1)

```

Getters 给你一种方法来定义一个对象的属性，**但是在访问它们之前不会计算属性的值**。 **getter 延续计算值的成本，直到需要值，如果不需要，您就不用支付成本。**

**该值是在第一次调用getter 时计算的，然后被缓存。**

### 用途

1. 缓存在当前对象上的不变属性，可以使用这个，会缓存变量，比如获取url中的参数，或者缓存当前对象依附的dom节点等；
2. ​