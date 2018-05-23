
1, 判断字符串是否是这样组成的，第一个必须是字母，后面可以是字母、数字、下划线，总长度为5-20

[A-Za-z]\w{4,19}

2，截取字符串abcdefg的efg
"abcdefg".slice(-3)

3，判断一个字符串中出现次数最多的字符，统计这个次数
分隔组成一个对象，找到最大的值

var str = "abcdabcdefgdddddd";
var resObj = {};
str.split('').forEach(item => {
    if(resObj[item]) {
        resObj[item] += 1;
    }else{
        resObj[item] = 1;
    }
});
var max = 0;
for(var key in resObj) {
    if(resObj[key] >= max){
        max = resObj[key];
    }
}

console.log(max);

4，IE与FF脚本兼容性问题
```
(1) window.event： 
表示当前的事件对象，IE有这个对象，FF没有，FF通过给事件处理函数传递事件对象 
例如：e=window.event ||e;

(2) 获取事件源 
IE用srcElement获取事件源，而FF用target获取事件源； 
例如：var target = e.target || e.srcElement;

(3) 添加，去除事件 
IE：element.attachEvent(“onclick”, function) element.detachEvent(“onclick”, function) 
FF：element.addEventListener(“click”,function,true) element.removeEventListener(“click”, function, true)

(4) 获取标签的自定义属性 
IE：div1.value或div1[“value”] 
FF：可用div1.getAttribute(“value”)

(5) input.type的属性 
IE：input.type只读 
FF：input.type可读写 
例如：js修改input的type属性有些限制。当input元素还未插入文档流之前，是可以修改它的值的，在ie和ff下都没问题。但如果input已经存在于页面，其type属性在ie下就成了只读属性了，不可以修改。在ff下仍是可读写属性。

(6) innerText textContent outerHTML 
IE：支持innerText, outerHTML 
FF：支持textContent

(7) 是否可用id代替HTML元素 
IE：可以用id来代替HTML元素 
FF：不可以 
```
5，规避javascript多人开发函数重名问题

添加前缀
modules封装，自执行函数生成块级作用域
封装到一个对象或者类中

6，javascript面向对象中继承实现
1. 我们创建的每个**函数**都有一个prototype（原型）属性，**这个属性是一个指针，指向一个对象**，而这个对象的**用途**是包含可以由特定类型的所有实例共享的属性和方法。
2. 创建一个类，让其prototype指向另一个实例，类继承，（extends）；
3. 对象直接继承，创建Object.create， Object.assign（所有**可枚举属性**的值从一个或多个源对象复制到目标对象），不可以扩展原型上的属性
```
   function P() {}
   P.prototype.alert = function(){alert(this.name)}
   var xm = new P();
   Object.assign({}, xm)
```
7，FF下面实现outerHTML

```
var cell = document.getElementById("cell");
 
if(!cell.outerHTML){
    cell.outerHTML = printOuterHTML(cell);
}
 
 
function printOuterHTML(elm){
    var parent = elm.parentNode;
    var clone = parent.cloneNode(true);
    for( var i = 0,j = 0; i < parent.children.length;i++){
        parent.children[i] == elm?(
            j++
        ):(
            clone.removeChild(clone.children[j])
        );
    }
    return clone.innerHTML;
}
alert(cell.outerHTML)
```
8，编写一个方法 求一个字符串的字节长度
.split.length  区分汉字与一般字符就使用正则匹配

10，写出3个使用this的典型应用

1. 事件引用当前的元素；
2. 函数的this拿到当前的执行上下文环境；
3. 构造函数创建对象。

12，如何显示/隐藏一个DOM元素？
display： none|block|flex;
visibility: hidden| visible;

13，JavaScript中如何检测一个变量是一个String类型？请写出函数实现
typeof str;
str instanceof String; // 前边需要是一个对象， instanceof对基本数据类型不起作用，因为基本数据类型没有原型链。
toString;

14，网页中实现一个计算当年还剩多少时间的倒数计时程序，要求网页上实时动态显示“××年还剩××天××时××分××秒”

new Date ("2018") - new Date()
.getDate()
getFullYear

15，补充代码，鼠标单击Button1后将Button1移动到Button2的后面

16，JavaScript有哪几种数据类型
Boolean
Null
Undefined
Number
String
Symbol (ECMAScript 6 新定义)
Object

17，下面css标签在JavaScript中调用应如何拼写，border-left-color，-moz-viewport
18，JavaScript中如何对一个对象进行深度clone
19，如何控制alert中的换行 \n <br/>>
20，请实现，鼠标点击页面中的任意标签，alert该标签的名称．（注意兼容性）
tagName

21，请编写一个JavaScript函数 parseQueryString，它的用途是把URL参数解析为一个对象，如：
正则匹配
function parseQueryString(argu){
  var str = argu.split('?')[1];
  var result = {};
  var temp = str.split('&');
  for(var i=0; i<temp.length; i++)
  {
     var temp2 = temp[i].split('=');
     result[temp2[0]] = temp2[1];
  }
  return result;
}
22，ajax是什么? ajax的交互模型? 同步和异步的区别? 如何解决跨域问题?
（异步JavaScript和XML）Asynchronous JavaScript + XML, 其本身不是一种新技术，而是一个在 2005年被Jesse James Garrett提出的新术语，用来描述一种使用现有技术集合的‘新’方法

23，什么是闭包？下面这个UI，如何点击每一列的时候alert其index?

24，请给出异步加载js方案，不少于两种
promise，队列执行
回调callback
25，请设计一套方案，用于确保页面中JS加载完全。
 n.onreadystatechange

 n.addEventListener('load'

n.onload


26，js中如何定义class,如何扩展prototype?


27，如何添加html元素的事件,有几种方法.
28，documen.write和 innerHTML的区别
29，多浏览器检测通过什么？
30，js的基础对象有那些, window和document的常用的方法和属性列出来
31，前端开发的优化问题
32，如何控制网页在网络传输过程中的数据量
33，Flash、Ajax各自的优缺点，在使用中如何取舍？


1、js有那些数据类型

javascript中包含6种数据类型：undefined、null、string、number、boolean和object。其中，前5种是原始数据类型，object是对象类型。object类型中包括Object、Function、 String、Number、Boolean、Array、Regexp、Date、Globel、Math、Error，以及宿主环境提供的object类型。

2、js如何获取一个id


3、如何获取下面代码所有元素<form>   <input name="" type="text" />  <input name="" type="text" /></form>

4、如何给<a href=""></a>添加个事件

5、解释下<!DOCTYPE>及作用？

6、写一个三栏布局

7、画下css盒模式

8、什么是块级元素和内联级元素？区别有那些？

9、谈谈CSS hack

10、测试浏览器有那些

11、css选择符有那些

12、谈下兼容性问题，及解决方法

13、如何解决此问题