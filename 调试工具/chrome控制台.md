# chrome控制台.md


## 页面可编辑模式

`
document.body.contentEditable=true
`

# JS调试技巧（适用于Chrome Inspector 和 Firefox）

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
