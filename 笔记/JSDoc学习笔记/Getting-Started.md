## what
```
1. JSDoc是一个根据javascript文件中注释信息，生成JavaScript应用程序或库、模块的API文档 的工具。
2. JSDoc注释一般应该放置在方法或函数声明之前，它必须以/ **开始，以便由JSDoc解析器识别。
3. 在JSDoc 注释有一套标准的注释标签，一般以@开头。
```
### 示例代码
```
/**
 * Book类，代表一个书本.
 * @constructor
 * @param {string} title - 书本的标题.
 * @param {string} author - 书本的作者.
 */
function Book(title, author) {
    this.title=title;
    this.author=author;
}
Book.prototype={
    /**
     * 获取书本的标题
     * @returns {string|*}
     */
    getTitle:function(){
        return this.title;
    },
    /**
     * 设置书本的页数
     * @param pageNum {number} 页数
     */
    setPageNum:function(pageNum){
        this.pageNum=pageNum;
    }
};
```
### 名称路径
1. 基本语法
```
/** @constructor */
Person = function() {
    this.say = function() {
        return "I'm an instance.";
    }

    function say() {
        return "I'm inner.";
    }
}
Person.say = function() {
    return "I'm static.";
}

var p = new Person();   //entity
p.say();      // I'm an instance. 实例
Person.say(); // I'm static. 静态

myFunction      //基本函数
MyConstructor	//构造函数	
MyConstructor#instanceMember    //名为“instanceMember”的MyConstructor的实例方法
MyConstructor.staticMember      //名为“staticMember”的MyConstructor的静态方法
MyConstructor~innerMember   //名为“innerMember”的MyConstructor的内部函数
```
2. 特殊情况：模块，外部组件和事件。

```
/** A module. Its name is module:foo/bar.
 * @module foo/bar
 */
/** The built in string object. Its name is external:String.
 * @external String
 */
/** An event. Its name is module:foo/bar.event:MyEvent.
 * @event module:foo/bar.event:MyEvent
 */
使用名称路径也有一些特殊的情况：@module名称由"module:"前缀，@external 名称由"external:"前缀，@event名称由"event:"前缀。
一个命名空间中的成员名称有带有特殊字符（哈希字符#号，破折号，双引号）。这种情况下，你需要这样引用这些名字：chat."#channel", chat."#channel"."op:announce-motd"，等等。在名称内部的双引号应该用反斜杠转义：`chat."#channel"."say-\"hello\""。
 ```


### 命令行参数
基本实例
```
使用配置文件/path/to/my/conf.json，为./src目录的中文件生成文档，并保存输出到./docs目录中：

/path/to/jsdoc src -r -c /path/to/my/conf.json -d docs
运行所有JSDoc的测试，其名称包含 tag，并记录每个测试信息：

/path/to/jsdoc -T --match tag --verbose

```

### 用conf.json配置JSDoc
自定义JSDoc的行为，可以使用JSON格式的配置文件格式化JSDoc
不指定的情况
```
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": [],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```
1. source选项组，结合给JSDoc命令行的路径，确定哪些文件要用JSDoc生成文档。
```
"source": {
    "include": [ /* array of paths to files to generate  documentation for */ ],//可选的路径数组，JSDoc应该为它们生成文档。
    "exclude": [ /* array of paths to exclude */ ],//可选的路径数组，JSDoc应该忽略的路径。
    "includePattern": ".+\\.js(doc)?$",//一个可选的字符串，解释为一个正则表达式。
    "excludePattern": "(^|\\/|\\\\)_"//一个可选的字符串，解释为一个正则表达式。
}
```
2. 它有可能把许多JSDoc的命令行选项放到配置文件，而不用在命令行中指定它们。要做到这一点，只要在conf.json的opts部分中使用的相关选项的longnames,值是该选项的值。
```
"opts": {
    "template": "templates/default",  // same as -t templates/default
    "encoding": "utf8",               // same as -e utf8
    "destination": "./out/",          // same as -d ./out/
    "recurse": true,                  // same as -r
    "tutorials": "path/to/tutorials", // same as -u path/to/tutorials
}
```
3. 要启用插件，只要添加它们的路径（相对于JSDoc文件夹）到plugins数组中就可以了。
```
"plugins": [
    "plugins/markdown",
    "plugins/summarize"
]
```
4. Output style configuration(配置输出风格)
```
"templates": {
    "cleverLinks": false,//如果templates.cleverLinks为true，如果“asdf”是一个URL，{@link asdf} 会以正常字体呈现，否则等宽。
    "monospaceLinks": false   //如果templates.monospaceLinks为true，从@link标签生成的所有链接文本将会以等宽字体渲染。
}
```
5. Tags and tag dictionaries(标签和标签字典)
tags选项控制哪些JSDoc标签允许被使用和解析。
```
"tags": {
    "allowUnknownTags": true,
    "dictionaries": ["jsdoc","closure"]
}
```


### 默认模板

### 块标签和内联标签
JSDoc支持两种不同类型的标签：

1. 块标签, 这是在一个JSDoc注释的最高级别。
2. 内联标签, 块标签文本中的标签或说明。
注：
```
块标签通常会提供有关您的代码的详细信息，如一个函数接受的参数。内联标签通常链接到文件的其他部分，类似于HTML中的锚标记（<a>）。
块标签总是以 at 符号（@）开头。除了JSDoc注释中最后一个块标记，每个块标签后面必须跟一个换行符。
```
实例
```
在下面的例子中， @param 是一个块标签，而{@link}是一个内联标签。

例如，JSDoc注释中的块标签和内联标签：

/**
 * Set the shoe's color. Use {@link Shoe#setSize} to set the shoe size.
 *
 * @param {string} color - The shoe's color.
 */
Shoe.prototype.setColor = function(color) {
    // ...
};
```

### 插件系统
Creating and Enabling a Plugin（创建并启用插件）

创建并启用新JSDoc插件,需要两个步骤：

1. 创建一个包含你的插件代码的JavaScript模块.
2. 将该模块添加到JSDoc配置文件的plugins数组中。你可以指定一个绝对或相对路径。如果使用相对路径，JSDoc按照相对于配置文件所在的目录，当前的工作目录和JSDoc安装目录的顺序搜索插件。

### markdown插件
SDoc包括markdown插件，自动把Markdown-formatted文本转换成HTML。你可以在任何JSDoc模板中使用这个插件。

### Tutorials 教程
### 包含Package（包）文件

包文件包含的信息对你的项目文档是很有用的，比如该项目的名称和版本号。当JSDoc生成的文档的时候,可以自动使用项目中package.json文件中的信息。
实例
```
在源路径中包含一个包文件:

jsdoc path/to/js path/to/package/package.json
使用 -P/--package 选项：

jsdoc --package path/to/package/package-docs.json path/to/js
```

### 包含readme文件
实例
```
在源路径中包含一个 README 文件:

jsdoc path/to/js path/to/readme/README.md
使用 -R/--readme 选项：

jsdoc --readme path/to/readme/README path/to/js
```
