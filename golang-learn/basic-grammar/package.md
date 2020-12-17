# package

## 包的导入

也就是只要是外部导入的函数，开头必然大写

```go
// 可以通过 import 关键字单个导入:

import "fmt"
import "io"

// 也可以同时导入多个:

import (
  "fmt"
  "math"
)

// 为fmt起别名为fmt2
import fmt2 "fmt"

// 省略调用(不建议使用):
// 调用的时候只需要Println()，而不需要fmt.Println()
// 前面加个点表示省略调用，那么调用该模块里面的函数，可以不用写模块名称了
// 相当于commonjs中的{}解构导入 import { funcName } from module
import . "fmt"

// Go 语言的包引入一般为: 项目名/包名
import "test/controllers"

// 方法的调用为: 包名.方法名()
controllers.Test()
```
