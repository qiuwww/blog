# chrome 控制台,调试技巧

### 页面可编辑模式

`document.body.contentEditable=true`

### JS 调试技巧（适用于 Chrome Inspector 和 Firefox）

1. debugger

2. 控制台输出 table，可以直接输出 data

```
var animals = [
    { animal: 'Horse', name: 'Henry', age: 43 },
    { animal: 'Dog', name: 'Fred', age: 13 },
    { animal: 'Cat', name: 'Frodo', age: 18 }
];
console.table(animals);
```

3. 代码执行时间的问题

用 console.time() 和 console.timeEnd() 打印中间的代码执行时间（可测试同步代码和异步代码）;

4. console 的一些别的方法

```
console.log，console.debug，console.warn，console.info，console.error
```

5. 自定义 log 函数，显示描述、值、颜色。当然这里还可以添加别的一些属性，实用%c 来添加样式

   ```js
   let log = function(desc, msg, color) {
     console.log(`%c ${desc}: `, `color: ${color};font-size: 20px;`, msg);
   };
   log("desc", "msg", "red");
   log("desc", "{a:1, b:2}", "red");
   ```

6. 在函数后边调用 monitor(funcName);可以监控函数的参数（打印出来）

## 控制台选取 DOM 元素

```
$(‘tagName’) 、$(‘.class’) 、$(‘#id’) 和 $(‘.class #id’) 相当于 document.querySelector(‘ ‘)。它返回选择器在 DOM 中匹配到的第一个元素。

你可以使用 $$(‘tagName’) 或 $$(‘.class’) 构建特殊的选择器来选取 DOM 中所有匹配的元素（注意是两个 $ 符号）。这会把结果放入一个数组。你可以继续通过下标在数组中获取到特定的某个元素。
```

`$()`与`$$()`的区别就是，前者选择返回结果中的第一个，后者返回所有。

## **将你的浏览器变成编辑器**

打开开发者控制台输入下面内容：

> document.body.contentEditable=true

跟控制台没什么关系，知识借用了 contenteditable 属性。

## 代码块的执行时间

console.time('myTime'); //Starts the timer with label - myTime

console.timeEnd('myTime'); //Ends the timer with Label - myTime

> console.time('myTime'); //Starts the timer with label - myTime
>
> for(var i=0; i < 100000; i++){
>
> 2+4+5;
>
> }
>
> console.timeEnd('mytime'); //Ends the timer with Label - myTime
>
> //Output - myTime:12345.00 ms

## 将返回结果打印为表格，也是很有意思的啊

> var myArray=[{a:1,b:2,c:3},{a:1,b:2,c:3,d:4},{k:11,f:22},{a:1,b:2,c:3}]
>
> console.table(myArray)
>
> var data = {
>
> date: [1, 2, 3],
>
> value: [4, 5, 6],
>
> name: 123,
>
> id: "dfsdf123"
>
> }
>
> console.table(data)
>
> 可以用于打印 data，返回结果

## 如果你想清空控制台和内存，只需要输入：

> clear()

## 反调试

### 重定义 console.log 方法，来取消开发过程中的打印信息

```
console.log("HelloWorld");

var fake = function() {};

window['console']['log']= fake;

console.log("You can't see me!");
```

## 利用一个无限循环的 debugger 指令来避免生产环境代码被人调试执行

```
setTimeout(function(){while (true) {eval("debugger")
```

## 菜单分类

- Elements - 页面 dom 元素
- Console - 控制台
- Sources - 页面静态资源
- Network - 网络
- Performance - 设备加载性能分析
- Application - 应用信息，PWA/Storage/Cache/Frames
- Security - 安全分析
- Audits - 审计，自动化测试工具

## 呼出快捷指令面板：cmd + shift + p

- 性能监视器：> performance monitor
- FPS实时监控性能：> FPS选择第一项
- 截图单个元素：> screen 选择 Capture node screenhot，元素截图

## dom节点调试，break on

- Subtree modifications: 子节点删除或添加时
- Attributes modifications: 属性修改时
- Node Removal: 节点删除时

## 本地覆盖：Local overrides

使用我们自己的本地资源覆盖网页所使用的资源。

类似的，使用DevTools的工作区设置持久化，**将本地的文件夹映射到网络，基本上也就是代理啊，跳出了中间代理请求**，在chrome开发者功能里面对css 样式的修改，都会直接改动本地文件，页面重新加载，使用的资源也是本地资源，达到持久化的效果。

## 扩展：Local overrides 模拟 Mock 数据

对于返回json 数据的接口，可以利用该功能，简单模拟返回数据。

比如：

api 为: http://www.xxx.com/api/v1/list
在根目录下，新建文件www.xxx.com/api/v1/list，list 文件中的内容，与正常接口返回格式相同。
