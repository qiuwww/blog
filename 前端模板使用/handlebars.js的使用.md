


# handlebars.js的使用.js

## 注意点如下：

1. 本质上还是字符串的拼接，还是要分块来操作。尽量细化，不要搞的太大。
2. 遍历数组中，this代表当前元素。
3. 事件还是需要单出来写，然后每次渲染之后，插入到body中后，绑定事件。



<!--其他参考文章的地址-->
http://www.ghostchina.com/handlebars-wen-dang-bi-ji/
http://www.cnblogs.com/yldf55/p/5147996.html
http://handlebarsjs.com/
http://blog.csdn.net/vuturn/article/details/51259355
http://caibaojian.com/handlebars-js.html

## 特点

handlebars作为一个logicless的模板，不支持特别复杂的表达式、语句，只内置了一些基本的语法，像if、each这些。
可惜的是就连if都十分弱，只能判断值是否为true/false，或转化后是否为true/false，不能对值进行比较。
不过，handlebars提供了自定义helper的能力，通过自定义helper，可以实现非常丰富的功能。



## 点分割表达式
```
<h1>{{article.title}}</h1>  
```

当前上下文找 article 属性，再找它的 title 属性;
标识符可以是除了以下字符以外的 unicode 字符 Whitespace ! “ # % & ‘ ( ) * + , . / ; < = > @ [ \ ] ^ ` { | } ~

## 不合法的标识符用 “[]” 包装,应该是数字属性，或者是特殊字符属性；
```
{{#each articles.[10].[#comments]}}
  <h1>{{subject}}</h1>
  <div>
    {{body}}
  </div>
{{/each}}
```

## 不转义, 如果包含一些标签或者转义字符，就使用三个大括号
```
{{{foo}}}
```

# Helpers

## helper说明
```
helper大概可以分为两类，一类是用于格式化输出数据，
使用起来像这样：{{formatDate date}}，官方没有给起名字，我姑且叫做简单helper好了。
另一类叫块级helper，**块级helper有自己的作用域**，可以拿到上下文数据，
并可以定义渲染的内容，可以发挥的作用就比较大了。
```
**options**: 是一个对象，包含上下文相关的一些信息。

**options.fn**方法:，此方法可以将你传入的上下文主体编译到模板，返回编译后的结果，
在helper中，我们把this传了进去，于是在模板中也可以引用到它。

**options.inverse**，它是取相反的意思。

**块级helper**：在用的时候开头要加"#"，并且要有结束符，就是上面的{{/if_even}}
**helper的销毁**: 调用Handlebars.unregisterHelper('list')即可销毁一个helper
**一次注册多个helper**:
```
andlebars.registerHelper({
    foo: function() {},
    bar: function() {}
});
```



**0或多个参数，用空格分割，每个参数是个 handlebars 表达式**
```
{{link story}}
link 是 helper 名字，story 是 helper 参数。
```
## 注册 helper
```
Handlebars.registerHelper('link', function(object) {  
  return new Handlebars.SafeString(
    "<a href='" + object.url + "'>" + object.text + "</a>"
  );
});
```
helper 返回 HTML ，不想被转义，用`Handlebars.SafeString()。`

## 上下文和 helper：

helper 把接收的上下文作为 this 上下文;
```
<ul>  
  {{#each items}}
  <li>{{agree_button}}</li>
  {{/each}}
</ul>  
```
```
var context = {  
  items: [
    {name: "Handlebars", emotion: "love"},
    {name: "Mustache", emotion: "enjoy"},
    {name: "Ember", emotion: "want to learn"}
  ]
};
```
```
Handlebars.registerHelper('agree_button', function() {  
  return new Handlebars.SafeString(
    "<button>I agree. I " + this.emotion + " " + this.name + "</button>"
  );
});
```
输出结果：
```
<ul>  
  <li><button>I agree. I love Handlebars</button></li>
  <li><button>I agree. I enjoy Mustache</button></li>
  <li><button>I agree. I want to learn Ember</button></li>
</ul>  
```

## 也可以直接传字符串参数
```
{{{link "See more..." story.url}}}
```
等价于
```
{{{link story.text story.url}}}

Handlebars.registerHelper('link', function(text, url) {  
  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});
```
## helper 最后一个参数也可以接收可选的键值对序列（文档提到的 hash 参数），使用options.hash来取得该对象
```
{{{link "See more..." href=story.url class="story"}}}
```
hash 参数的 key 必须是简单的标识符，value 是 Handlebars 表达式，value 可以是简单的标识符，路径，或者字符串。
```
Handlebars.registerHelper('link', function(text, options) {  
  var attrs = [];

  for(var prop in options.hash) {
    attrs.push(prop + '="' + options.hash[prop] + '"');
  }

  return new Handlebars.SafeString(
    "<a " + attrs.join(" ") + ">" + text + "</a>"
  );
});
```

# 基础 Blocks
```
<div class="entry">  
  <h1>{{title}}</h1>
  <div class="body">
    {{#noop}}
      {{body}}
    {{/noop}}
  </div>
</div>  
Handlebars.registerHelper('noop', function(options) {  
  return options.fn(this);
});
```
noop helper 实际跟没有 helper 类似，只是**传递上下文，返回字符串**。
Handlebars 把当前的上下文作为 this 。

## with helper
```
根据模板传递的上下文解析模板

<div class="entry">  
  <h1>{{title}}</h1>
  {{#with story}}
    <div class="intro">{{{intro}}}</div>
    <div class="body">{{{body}}}</div>
  {{/with}}
</div>  
当 JSON 对象包含嵌套属性时，不必再三重复父属性的名字。比如以下数据：

{
  title: "First Post",
  story: {
    intro: "Before the jump",
    body: "After the jump"
  }
}
helper 接收参数，参数为 JSON 属性的 上下文。

Handlebars.registerHelper('with', function(context, options) {  
  return options.fn(context);
});
```

## 简单迭代器 each helper
```
Handlebars 内建了　each　迭代器

<div class="comments">  
  {{#each comments}}
    <div class="comment">
      <h2>{{subject}}</h2>
      {{{body}}}
    </div>
  {{/each}}
</div>  
实现原理如下：　把 comments 数组的每一个元素作为上下文解析模板

Handlebars.registerHelper('each', function(context, options) {  
  var ret = "";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});


可以用 this 引用迭代元素

<ul class="people_list">  
  {{#each people}}
  <li>{{this}}</li>
  {{/each}}
</ul>  


上下文：

{
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
  ]
}
结果：

<ul class="people_list">  
  <li>Yehuda Katz</li>
  <li>Alan Johnson</li>
  <li>Charles Jolley</li>
</ul>  


当某一项为空时，可以用

{{else}}

表达式

{{#each paragraphs}}
  <p>{{this}}</p>
{{else}}
  <p class="empty">No content</p>
{{/each}}

通过

{{@index}}: 可以引用当前的循环索引   // 不需要重新而写helper

{{#each array}}
  {{@index}}: {{this}}
{{/each}}
用

{{@key}}： 引用当前的键名：
{{#each object}}
  {{@key}}: {{this}}
{{/each}}
```

**数组迭代**的第一步和最后一步用 @first 和 @last 变量表示， 对象迭代时仅 @first 可用。

## 条件语句 if  helper  unless(表示与if刚好相反)
```
Handlebars 内建了 if 和 unless 语句

{{#if isActive}}
  <img src="star.gif" alt="Active">
{{/if}}
实现原理：根据传入的条件参数，判断是否解析模板

Handlebars.registerHelper('if', function(conditional, options) {  
  if(conditional) {
    return options.fn(this);
  }
});
Handlebars 还提供了 else 语句

{{#if isActive}}
  <img src="star.gif" alt="Active">
{{else}}
  <img src="cry.gif" alt="Inactive">
{{/if}}

unless 跟 if 正好相反，如果表达式返回 false ，模板将被渲染。

<div class="entry">  
  {{#unless license}}
  <h3 class="warning">WARNING: This entry does not have a license!</h3>
  {{/unless}}
</div> 

```

## log helper
```
记录上下文状态

{{log "Look at me!"}}
```

# JavaScript 编译模板
```
模板可以包含在特殊的<script> 里：

<script id="entry-template" type="text/x-handlebars-template">  
  template content
</script>  
然后用 Handlebars.compile 编译模板

var source   = $("#entry-template").html();  
var template = Handlebars.compile(source);  
获取编译后的 HTML 模板，用 JSON 数据填充模板

var context = {title: "My New Post", body: "This is my first post!"}  
var html    = template(context);  
最终结果：

<div class="entry">  
  <h1>My New Post</h1>
  <div class="body">
    This is my first post!
  </div>
</div>
```

## 模板注释
```
{{! }}
或者
{{!-- --}}
```

# Partials 局部模板
```
用{{> partialName}}

引入局部模板，局部模板可以使字符串，也可以是编译模板的函数。

var source = "<ul>{{#people}}<li>{{> link}}</li>{{/people}}</ul>";

Handlebars.registerPartial('link', '<a href="/people/{{id}}">{{name}}</a>')

var template = Handlebars.compile(source);  

var data = { "people": [  
    { "name": "Alan", "id": 1 },
    { "name": "Yehuda", "id": 2 }
  ]};

template(data);

结果：Should render:
<ul>
   <li><a href="/people/1">Alan</a></li>
   <li><a href="/people/2">Yehuda</a></li>
</ul>
```
# 内建工具
```
转义字符串

Handlebars.Utils.escapeExpression(string)  
判断空值

Handlebars.Utils.isEmpty(value)  
扩展对象

Handlebars.Utils.extend(foo, {bar: true})  
转字符串

Handlebars.Utils.toString(obj)  
判断数组

Handlebars.Utils.isArray(obj)  
判断函数

Handlebars.Utils.isFunction(obj) 
```