
// 1、创建新节点

createDocumentFragment() //创建一个DOM片段
createElement() //创建一个具体的元素
createTextNode() //创建一个文本节点


// 2、添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点

// 3、查找
getElementsByTagName() //通过标签名称
getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById() //通过元素Id，唯一性


// 4、class操作使用classLis
/**
 * Element.classList 是一个只读属性，返回一个元素的类属性的实时 DOMTokenList集合。
 * 使用 classList 是一个方便的替代方法，通过element.className作为空格分隔的字符串访问元素的类列表。
 * 似乎可以操作啊，
 */

// div是具有class =“foo bar”的<div>元素的对象引用
div.classList.remove("foo"); // 删
div.classList.add("anotherclass"); // 增

// 如果visible被设置则删除它，否则添加它
div.classList.toggle("visible"); // 增删

// 添加/删除 visible，取决于测试条件，i小于10
div.classList.toggle("visible", i < 10);

alert(div.classList.contains("foo"));// 查询

//添加或删除多个类
div.classList.add("foo","bar");
div.classList.remove("foo", "bar");




// 5、元素查找
// 6、操作自定义属性
// 7、添加移除属性


// 8、cssText 返回样式规则所包含的实际文本.想要能够动态的设置一个样式表规则
// cssText，DOMString类型
// cssText特性必须返回序列化的CSS规则。
// 当设置cssText特性时运行这些步骤：
//  1. 解析其值。
//  2. 如果解析失败则终止运行。
//  3. 如果新对象的type并不匹配当前对象的type则抛出"InvalidModificationError"异常。
//  4. 替换当前对象为新对象。

// 原来的样式设置：
xxx.style.width = "233px";
xxx.style.position = "fixed";
xxx.style.left = "233px";

// 替换方案：
xxx.style.cssText="width:233px;height:233px;position:fixed";
