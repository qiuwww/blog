# chrome控制台.md


## 页面可编辑模式

`
document.body.contentEditable=true
`

## JS调试技巧（适用于Chrome Inspector 和 Firefox）

1. debugger

2. 控制台输出table

   ```
   var animals = [
       { animal: 'Horse', name: 'Henry', age: 43 },
       { animal: 'Dog', name: 'Fred', age: 13 },
       { animal: 'Cat', name: 'Frodo', age: 18 }
   ];
    
   console.table(animals);
   ```

3. 用 console.time() 和 console.timeEnd() 打印中间的代码执行时间（可测试同步代码和异步代码）

4. ```
   console.log，console.debug，console.warn，console.info，console.error
   ```

5. 自定义log函数，显示描述、值、颜色。当然这里还可以添加别的一些属性，实用%c来添加样式

   ```
   let log = function(desc, msg, color) {
     	console.log(`%c ${desc}: `, `color: ${color};font-size: 20px;`, msg,);
   }
   log('desc', 'msg', 'red');
   log('desc', '{a:1, b:2}', 'red');
   ```
6. 在函数后边调用monitor(funcName);可以监控函数的参数（打印出来）

## 控制台选取DOM元素

```
$(‘tagName’) 、$(‘.class’) 、$(‘#id’) 和 $(‘.class #id’) 相当于 document.querySelector(‘ ‘)。它返回选择器在 DOM 中匹配到的第一个元素。

你可以使用 $$(‘tagName’) 或 $$(‘.class’) 构建特殊的选择器来选取 DOM 中所有匹配的元素（注意是两个 $ 符号）。这会把结果放入一个数组。你可以继续通过下标在数组中获取到特定的某个元素。
```


`$()`与`$$()`的区别就是，前者选择返回结果中的第一个，后者返回所有。

## **将你的浏览器变成编辑器**

打开开发者控制台输入下面内容：

> document.body.contentEditable=true

跟控制台没什么关系，知识借用了contenteditable属性。



## 代码块的执行时间

console.time('myTime'); //Starts the timer with label - myTime

console.timeEnd('myTime'); //Ends the timer with Label - myTime

> console.time('myTime'); //Starts the timer with label - myTime
>
> for(var i=0; i < 100000; i++){
>
>   2+4+5;
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
>     date: [1, 2, 3],
>
>     value: [4, 5, 6],
>
>     name: 123,
>
>     id: "dfsdf123"
>
> }
>
> console.table(data)
>
> 可以用于打印data，返回结果

##  如果你想清空控制台和内存，只需要输入：

> clear()

## 反调试

### 重定义console.log方法，来取消开发过程中的打印信息

```
console.log("HelloWorld");

var fake = function() {};

window['console']['log']= fake;

console.log("You can't see me!");
```





## 利用一个无限循环的debugger指令来避免生产环境代码被人调试执行

```
setTimeout(function(){while (true) {eval("debugger")
```





















