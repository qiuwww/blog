## from表单的操作

1. 设置默认值defaultValue="value"，设置默认选中defaultChecked；

   ```
   <form onSubmit={this.handleSubmit}> // 这里可以设置确认按钮的操作，更加语义化
         <label>
           Name:
           <input
             defaultValue="Bob"
             type="text" // 一般的文本操作，设置defaultValue="value",与ref共同构建非受控组件。
             ref={(input) => this.input = input} />
         </label>
         <input type="submit" value="Submit" />
   </form>
   ```

   ​

2. 获取元素引用

   ```
   <form action="" ref="form">
       <div class="radio">
           <label htmlFor="id">checkbox||radio</label>
           <input type="radio" id="id" value="value1" name="key1" defaultChecked>
       </div>
       <div class="radio">
           <label htmlFor="id2">checkbox||radio</label>
           <input type="radio" id="id2" value="value2" name="key1">
       </div>
       <hr/>
       <div class="checkbox">
           <label htmlFor="id3">checkbox||radio</label>
           <input type="checkbox" id="id3" value="value2" name="key2" >
       </div>
   </form>
   ```

   通过 let form = this.refs.form  获取form的引用；
   通过 let key1 = form["key1"]  的表单特性获取，key1的引用；
   通过 let key1Value = key1.value  得到key1的值；
   通过 let key2 = form["key2"]  的表单特性获取，key1的引用；
   通过 let key2Value = key2.checked  得到是不是checkbox被选中的一个boolean值；