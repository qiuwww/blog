# type-of-data

数据类型的出现是为了把数据分成所需内存大小不同的数据。

## 布尔型

布尔型的值只可以是常量 true 或者 false。一个简单的例子：`var b bool = true`。

```go
// 在 Go 中，布尔值的类型为 bool，值是 true 或 false，默认为 false。

//示例代码
var isActive bool  // 全局变量声明
var enabled, disabled = true, false  // 忽略类型的声明
func test() {
    var available bool  // 一般声明
    valid := false      // 简短声明
    available = true    // 赋值操作
}
```

## 数字类型

- 整型 **int** 和
- 浮点型 **float32**、**float64**，Go 语言支持整型和浮点型数字，
- 并且支持复数，其中位的运算采用补码。

go 1.9版本对于数字类型，**无需定义int及float32、float64，系统会自动识别**。

## 字符串类型

字符串就是一串**固定长度的字符连接起来的字符序列**。Go 的字符串是由单个字节连接起来的。Go 语言的字符串的字节使用 **UTF-8 编码标识 Unicode 文本**。

- 字符串可以通过 + 连接。

```go
// 字符串去除空格和换行符

package main  
  
import (  
    "fmt"  
    "strings"  
)  
  
func main() {  
    str := "这里是 www\n.runoob\n.com"  
    fmt.Println("-------- 原字符串 ----------")  
    fmt.Println(str)  
    // 去除空格  
    str = strings.Replace(str, " ", "", -1)  
    // 去除换行符  
    str = strings.Replace(str, "\n", "", -1)  
    fmt.Println("-------- 去除空格与换行后 ----------")  
    fmt.Println(str)  
}
// 输出结果为：

// -------- 原字符串 ----------
// 这里是 www
// .runoob
// .com
// -------- 去除空格与换行后 ----------
// 这里是www.runoob.com
```

## 派生类型

### (a) 指针类型（Pointer）

### (b) 数组类型

### (c) 结构化类型(struct)

### (d) Channel 类型

### (e) 函数类型

### (f) 切片类型

### (g) 接口类型（interface）

### (h) Map 类型
