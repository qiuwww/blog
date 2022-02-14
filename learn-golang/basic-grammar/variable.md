# variable

## 一般变量的声明

- 通过 **const** 关键字来进行常量的定义。
- 通过在函数体外部使用 **var** 关键字来进行**全局变量的声明和赋值**。
- 通过 **type** 关键字来进行**结构(struct)和接口(interface)的声明**。
- 通过 func 关键字来进行**函数的声明**。
- var 声明 1 个或者多个变量。
- 你可以申明一次性声明多个变量。
- Go 将自动推断已经初始化的变量类型。
- 声明变量且没有给出对应的初始值时，变量将会初始化为零值 。例如，一个 int 的零值是 0。

## 可见性规则

Go 语言中，使用**大小写**来决定该常量、变量、类型、接口、结构或函数是否可以被外部包所调用。

函数名首字母小写即为 private : func getId() {}
函数名首字母大写即为 public : func Printf() {}

## 变量声明

声明变量的一般形式是使用 var 关键字：`var identifier type`

- 第一种，指定变量类型，声明后若不赋值，使用默认值。`var v_name v_type`
- 第二种，根据值自行判定变量类型。`var v_name = value`
- 第三种，**省略 var**, 注意 `:=` 左侧如果没有声明新的变量，就产生编译错误，格式：`v_name := value`，也就是单个变量的时候，需要左侧变量是一个新的变量。

### 多变量声明

```go
// 类型相同多个变量, 非全局变量
var vname1, vname2, vname3 type
vname1, vname2, vname3 = v1, v2, v3

var vname1, vname2, vname3 = v1, v2, v3 // 和python很像,不需要显示声明类型，自动推断

vname1, vname2, vname3 := v1, v2, v3 // 出现在:=左侧的变量不应该是已经被声明过的，否则会导致编译错误


// 这种因式分解关键字的写法一般用于声明全局变量
var (
    vname1 v_type1
    vname2 v_type2
)
```

实例

```go
package main

var x, y int
var (  // 这种因式分解关键字的写法一般用于声明全局变量
    a int
    b bool
)

var c, d int = 1, 2
var e, f = 123, "hello"

// 这种不带声明格式的只能在函数体中出现
// g, h := 123, "hello"

func main(){
    g, h := 123, "hello"
    println(x, y, a, b, c, d, e, f, g, h)
}
```

## 值类型和引用类型

所有像 int、float、bool 和 string 这些基本类型都属于**值类型**，使用这些类型的变量**直接指向存在内存中的值**。