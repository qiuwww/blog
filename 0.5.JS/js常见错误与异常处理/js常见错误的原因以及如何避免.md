# JavaScript 常见错误以及如何避免

![js常见错误](js常见错误.png)

### 1.Uncaught TypeError: Cannot Read Property

当你**读取一个属性或调用一个未定义对象的方法**时，Chrome 中就会报出这样的错误。常见的一种情况是在渲染 UI 组件时，不正确地初始化状态。

**避免方法:**

合适位置的初始化操作以及初始化的值。

### 2. (unknown): Script Error

当未捕获的 JavaScript **错误违背跨边界原则**时，就会发生脚本错误。例如，如果将 JavaScript 代码托管在 CDN 上，则任何**未被捕获的错误**（通过 window.onerror 处理程序发出的错误，而不是 try-catch 中捕获到的错误）将仅报告为“脚本错误”。这是浏览器的一种安全措施，主要用于防止跨域传递数据的情况出现。

**避免办法:**

要获取真实的错误消息，需要执行以下操作：

**Access-Control-Allow-Origin**

将 Access-Control-Allow-Origin 设置为  *，  表示可以从任何域正确访问资源。*  如有必要，也可以用自己的域名进行替换，例如：

Access-Control-Allow-Origin: www.example.com。

### 3.Uncaught RangeError: Maximum Call Stack

这是在很多种情况，Chrome 中发生的错误，一种情况是当你调用一个不会终止的递归函数时。

## summary：

事实证明很多这些 null 或 undefined 的错误是普遍存在的。  一个类似于 Typescript 这样的好的静态类型检查系统，当设置为严格的编译选项时，能够帮助开发者避免这些错误。
