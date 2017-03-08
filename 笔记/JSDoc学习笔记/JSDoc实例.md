## ES 2015 Classes
你并不需要使用诸如如@class 和 @constructor的标签来描述 ES 2015 classes，JSDoc通过分析你的代码会自动识别类和它们的构造函数。ES 2015 classes在JSDoc3.4.0及更高版本支持。

### Documenting a simple class（文档化一个简单的类）
```
下面的例子演示了如何通过一个构造函数，两个实例方法和一个静态方法文档化一个简单的类：

例如，简单的 ES 2015 类 ：

/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        // ...
    }
}
您还可以记录类表达式中定义的类，将其分配给一个变量或常量：

例如，ES 2015 类表达式：

/** Class representing a point. */
const Point = class {
    // and so on
}
```
### Extending classes（扩展类）
当您使用 extends关键字来扩展一个现有的类的时候，你还需要告诉JSDoc哪个类是你要扩展的。 为此，您可以使用 @augments (或 @extends) 标签。

```
扩展如上所示Point 类，扩展一个 ES 2015 类：

/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        // ...
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        // ...
    }
}
```

## ES2015 moudles

### Module identifiers（模块标识符）
当你描述一个 ES 2015 module（模块）时，您将使用@module 标签来描述模块的标识符。例如，如果用户通过调用import * as myShirt from 'my/shirt' 加载模块，你会写一个包含@module my/shirt标签的JSDoc注释。

### Exported values （导出值）
在多数情况下，你可以简单地在export语句上添加一个JSDoc注释来定义导出值。如果要以其他名称导出一个值，您可以在其export块中描述导出值。

## CommonJS Modules
JSDoc承认的Node.js modules（模块）的约定，它扩展了CommonJS的标准（例如，将值分配给module.exports）。

### Module identifiers（模块标识符）

### AMD Modules



